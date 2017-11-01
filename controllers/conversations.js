const Conversation = require('../models/conversation');
const emails = require('../lib/email');

function conversationIndex(req, res, next) {
  Conversation.find({ $or: [{ sender: req.currentUser }, { receiver: req.currentUser }] })
    .populate('product sender receiver')
    .then(conversations => res.json(conversations))
    .catch(next);
}

function conversationsCreate(req, res, next) {
  Conversation.findOne({ $or: [
    { sender: req.body.product.postedBy, receiver: req.currentUser },
    { receiver: req.body.product.postedBy, sender: req.currentUser }
  ], product: req.product })
    .then(conversation => {
      if(!conversation) return Conversation.create({ sender: req.currentUser, receiver: req.body.product.postedBy, product: req.body.product });
      else return conversation;
    })
    .then(conversation => res.json(conversation))
    .catch(next);
}

function conversationShow(req, res, next) {
  Conversation
    .findById(req.params.id)
    .populate('product messages.user')
    .sort('messages.createdAt')
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();
      res.json(conversation);
    })
    .catch((err) => {
      next(err);
    });
}


function conversationsMessagesCreate(req, res, next) {
  req.body.user = req.currentUser;
  let receiver = null;
  Conversation.findById(req.params.id)
    .populate('messages.user product sender receiver')
    .then(conversation => {
      const message = conversation.messages.create(req.body);
      conversation.messages.push(message);
      receiver = (conversation.sender.id !== req.currentUser.id) ? conversation.sender : conversation.receiver;
      return conversation.save();
    })
    .then(conversation => res.json(conversation))
    .then(() => emails.send(receiver))
    .catch(next);
}

module.exports = {
  index: conversationIndex,
  create: conversationsCreate,
  show: conversationShow,
  messagesCreate: conversationsMessagesCreate
};
