const Conversation = require('../models/conversation');

function conversationIndex(req, res, next) {
  Conversation.find({ $or: [{ sender: req.currentUser.id }, { receiver: req.currentUser.id }] })
    .then(conversations => res.json(conversations))
    .catch(next);
}

function conversationsCreate(req, res, next) {
  Conversation.findOne({ $or: [{ sender: req.body.userId }, {receiver: req.body.userId }], product: req.productId})
    .then(conversation => {
      if(!conversation) return Conversation.create({ receiever: req.body.userId, product: req.body.productId });
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
  Conversation.findById(req.params.id)
    .populate('user')
    .then(conversation => {
      console.log(conversation);
      conversation.messages.push(req.body);
      return conversation.save();
    })
    .then(conversation => res.json(conversation))
    .catch(next);
}

module.exports = {
  index: conversationIndex,
  create: conversationsCreate,
  show: conversationShow,
  messagesCreate: conversationsMessagesCreate
};
