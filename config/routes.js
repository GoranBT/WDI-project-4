const router = require('express').Router();
const products  = require('../controllers/products');
const categories  = require('../controllers/categories');
const conversations  = require('../controllers/conversations');
const users  = require('../controllers/users');
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');



router.route('/products')
  .get(products.index)
  .post(secureRoute, imageUpload, products.create);

router.route('/products/:id')
  .get(products.show)
  .put(secureRoute, imageUpload, products.update)
  .delete(secureRoute, products.delete);

router.route('/categories')
  .get(categories.index)
  .post(secureRoute, categories.create);

router.route('/categories/:id')
  .get(categories.show)
  .put(secureRoute, categories.update)
  .delete(secureRoute, categories.delete);

router.route('/conversations')
  .get(secureRoute, conversations.index)
  .post(secureRoute, conversations.create);

router.route('/conversations/:id/messages')
  .post(secureRoute, conversations.messagesCreate);

router.route('/conversations/:id')
  .get(secureRoute, conversations.show);

router.route('/products/:id/comments')
  .post(secureRoute, products.createComments);

router.route('/products/:id/comments/:commentId')
  .delete(secureRoute, products.deleteComments);

router.route('/users')
  .get(secureRoute, imageUpload, users.index);

router.route('/users/:id')
  .get(secureRoute, imageUpload, users.show)
  .put(secureRoute, imageUpload, users.update);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
