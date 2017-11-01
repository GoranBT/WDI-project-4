/* global api, describe, expect, it, before, after, beforeEach, afterEach */
require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Product = require('../../../models/product');
const User = require('../../../models/user');

const productData = [
  {
    '_id': '59f6753b877e3a3926f6c7fc',
    'name': 'Mish tank',
    'category': {
      '_id': '59f6753b877e3a3926f6c7f5',
      'name': 'Fashion',
      'id': '59f6753b877e3a3926f6c7f5'
    },
    'description': '40l fish tank filter and air pump are included',
    'price': 50,
    'image': 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
    'postedBy': {
      '_id': '59f6753b877e3a3926f6c7ee',
      'username': 'goran',
      'email': 'goran@ga.com',
      'favorites': [],
      'products': null,
      'conversations': null,
      'passwordConfirmation': null,
      'imageSRC': null,
      'id': '59f6753b877e3a3926f6c7ee'
    },
    'condition': 'Used',
    'comments': [],
    'location': {
      'lat': 50.12,
      'lng': -0.12
    },
    'sold': false,
    'imageSRC': 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
    'id': '59f6753b877e3a3926f6c7fc'
  }
];


describe('DELETE /api/products/:id', ()=> {

  let product = null;
  let token = null;

  before(done =>{
    User.create({
      username: 'goran',
      email: 'email@email.com',
      password: 'test',
      passwordConfirmation: 'test'
    }, (err, user) => {
      token = jwt.sign({ userId: user.id}, secret, {expiresIn: '1hr'});
      done(err);
    });
  });

  after(done => {
    User.collection.remove();
    done();
  });

  beforeEach(done =>{
    Product.create(productData, (err, products) => {
      product = products[0];
      done();
    });
  });

  afterEach(done => {
    Product.collection.remove();
    done();
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/products/${product.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });
  it('should return a 401 response ', done => {
    api
      .delete(`/api/products/${product.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should actually delete the document', done => {
    api
      .delete(`/api/products/${product.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Product.findById(product.id, (err, product) => {
          expect(product).to.be.null;
          done();
        });
      });
  });




});
