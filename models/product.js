const mongoose = require('mongoose');
const s3 = require('../lib/s3');



const commentSchema = new mongoose.Schema({
  text: { type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const productSchema = mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  description: { type: String, required: 'Description is required' },
  price: { type: Number, required: 'Price is required' },
  image: { type: String, required: 'Image is required' },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  sold: { type: Boolean, default: false },
  condition: { type: String, required: 'Condition is required' },
  location: {
    lat: Number,
    lng: Number
  },
  comments: [ commentSchema ]
}, {
  timestamps: true
});

productSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

productSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

productSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

productSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});



module.exports = mongoose.model('Product', productSchema);
