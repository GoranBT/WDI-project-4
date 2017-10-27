const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const conversationSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  messages: [ messageSchema ]
});

module.exports = mongoose.model('Conversation', conversationSchema);
