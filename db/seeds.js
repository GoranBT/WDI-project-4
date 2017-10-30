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

}, {
  username: 'Dush',
  email: 'dush@ga.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'Mike',
  email: 'mike@ga.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'Vlad',
  email: 'vlad@ga.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'Leo',
  email: 'leo@ga.com',
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
          .create([{
            name: 'Mish tank',
            category: categories[2],
            description: '40l fish tank filter and air pump are included',
            price: 50,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[0],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Nish tank',
            category: categories[2],
            description: '40l fish tank filter and air pump are included',
            price: 40,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[0],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Bish tank',
            category: categories[2],
            description: '40l fish tank filter and air pump are included',
            price: 30,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[0],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Vish tank',
            category: categories[4],
            description: '40l fish tank filter and air pump are included',
            price: 20,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[1],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Cish tank',
            category: categories[3],
            description: '40l fish tank filter and air pump are included',
            price: 80,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[0],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Xish tank',
            category: categories[4],
            description: '40l fish tank filter and air pump are included',
            price: 100,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[3],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Zish tank',
            category: categories[5],
            description: '40l fish tank filter and air pump are included',
            price: 200,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51GV%2BHvLEtL._SL500_AC_SS350_.jpg',
            postedBy: users[0],
            condition: 'Used',
            location: {
              lat: '50.12',
              lng: '-0.12'
            }
          },
          {
            name: 'Aish tank',
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
          },
          {
            name: 'Rish tank',
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
          },
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
          },
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
          },
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
          },
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
