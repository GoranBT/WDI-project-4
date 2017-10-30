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


function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  update: updateRoute,
  show: showRoute
};
