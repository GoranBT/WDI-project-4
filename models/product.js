const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  description: String,
  price: Number,
  image: [String],
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  condition: String,
  location: {
    lat: String,
    lng: String
  }
});

module.exports = mongoose.model('Product', productSchema);
