const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .populate('products')
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('products')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      return res.json(user);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
