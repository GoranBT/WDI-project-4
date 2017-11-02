import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import ProductForm from './ProductForm';

class ProductsNew extends React.Component {
  state = {
    product: {
      name: '',
      description: '',
      price: '',
      location: {
        lat: '',
        lng: ''
      },
      image: '',
      base64: '',
      postedBy: ''
    },
    categories: [],
    errors: {
      name: '',
      description: '',
      price: '',
      location: {
        lat: '',
        lng: ''
      },
      image: '',
      base64: ''

    }
  };

  // get categories

  componentDidMount() {
    Axios
      .get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
      .catch(() => console.log('Could not get categories'));
  }

  handleChange = ({ target: { name, value } }) => {
    console.log('VAL',value);
    const product = Object.assign({}, this.state.product, { [name]: value });
    this.setState({ product });
  }


  handleLocationChange = ({ target: { name, value } }) => {
    const product = { ...this.state.product, location: { ...this.state.product.location, [name]: value } };
    this.setState({ product });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/products', this.state.product, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/products'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  //Autocomplete LatLng

  getAutocompleteInfo = (place) => {
    console.log('place', place);
    const product = Object.assign({}, this.state.product, { location: place.geometry.location.toJSON() });
    this.setState({ product });
  }

  render() {

    return (
      <div className="container">
        <h1 className="font-lobster text-center"> Add new product</h1>
        <hr />
        <ProductForm
          categories={this.state.categories}
          history={this.props.history}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          product={this.state.product}
          errors={this.state.errors}
          handleLocationChange={this.handleLocationChange}
          getAutocompleteInfo={this.getAutocompleteInfo}
        />
      </div>
    );
  }
}

export default ProductsNew;
