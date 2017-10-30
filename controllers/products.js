const Product = require('../models/product');

function productsIndex(req, res, next) {
  Product
    .find()
    .populate('category postedBy')
    .exec()
    .then(products => res.json(products))
    .catch(next);
}

function productsCreate(req, res, next) {
  req.body.postedBy = req.currentUser;
  if(req.file) req.body.image = req.file.filename;

  Product
    .create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next);
}

function productsShow(req, res, next) {
  Product
    .findById(req.params.id)
    .populate('category postedBy')
    .exec()
    .then((product) => {
      if(!product) return res.notFound();
      res.json(product);
    })
    .catch((err) => {
      next(err);
    });
}

function productsUpdate(req, res, next) {

  Product
    .findById(req.params.id)
    .exec()
    .then((product) => {
      if(!product) return res.notFound();
      product = Object.assign(product, req.body);
      return product.save();
    })
    .then(product => res.json(product))
    .catch(next);
}

function productsDelete(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then((product) => {
      if(!product) return res.notFound();
      return product.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: productsIndex,
  create: productsCreate,
  show: productsShow,
  update: productsUpdate,
  delete: productsDelete
};
