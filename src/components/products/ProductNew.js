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
      location: {},
      image: '',
      category: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const product = Object.assign({}, this.state.product, { [name]: value });
    this.setState({ product });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/products', this.state.product, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <ProductForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        product={this.state.product}
        errors={this.state.errors}
      />
    );
  }
}

export default ProductsNew;
