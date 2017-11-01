/* global api, describe, it, expect, before, after, afterEach */
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


describe('POST /api/products', () => {
  let token = null;

  before(done => {
    User.create({
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test'
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  after(done => {
    User.remove(done);
  });

  afterEach(done => {
    Product.remove(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(productData[0])
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(productData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(productData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(productData[0])
      .end((err, res) => {
        const productItem = res.body;
        expect(productItem.id).to.be.a('string');
        expect(productItem.name).to.equal(productData[0].name);
        expect(productItem.image).to.equal(productData[0].image);
        expect(productItem.price).to.equal(productData[0].price);
        expect(productItem.description).to.equal(productData[0].description);
        expect(productItem.condition).to.equal(productData[0].condition);
        done();
      });
  });
});
