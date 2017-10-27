const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});

const conversationSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  messages: [ messageSchema ]
});

module.exports = mongoose.model('Conversation', conversationSchema);

// conversationSchema
//   .virtual('users', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'conversations'
//   });
