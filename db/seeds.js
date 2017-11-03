const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });


const Product      = require('../models/product');
const User      = require('../models/user');
const Category      = require('../models/category');

User.collection.drop();
Product.collection.drop();
Category.collection.drop();

User.create([{
  username: 'goran',
  email: 'goran@ga.com',
  password: 'password',
  passwordConfirmation: 'password'

}
])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Category
      .create([{
        name: 'Vehicles and Bicycles'
      },
      {
        name: 'Pets'
      },
      {
        name: 'Fashion'
      },
      {
        name: 'Toys'
      },
      {
        name: 'Entertainment'
      },
      {
        name: 'Electronics'
      },
      {
        name: 'Hobbies'
      },
      {
        name: 'Housing'
      },
      {
        name: 'Home and Garden'
      }])
      .then((categories) => {
        console.log(`${categories.length} categories created!`);
        return Product
          .create([
            {
              name: 'Fish tank',
              category: categories[2],
              description: '40l fish tank filter and air pump are included',
              price: 80,
              image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
              postedBy: users[0],
              condition: 'Used',
              location: {
                lat: '50.12',
                lng: '-0.12'
              }
            }])
          .then(products => console.log(`${products.length} products created!`));
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
