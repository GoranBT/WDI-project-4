import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import ProductsForm from './ProductForm';

class ProductsEdit extends React.Component {
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
      category: {}
    },
    errors: {}
  };

  componentDidMount() {
    Axios
      .get(`/api/products/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ product: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => {
      prevState.product[name] = value;
      return prevState;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/products/${this.props.match.params.id}`, this.state.product)
      .then(res => this.props.history.push(`/products/${res.data.id}`))
      .catch(err => console.log(err));
  }

  getDataURL = (dataURL) => {
    this.setState(prevState => {
      const food = Object.assign({}, prevState.food, { base64: dataURL });
      return { food };
    });
  }

  render() {
    return (
      <ProductsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        getDataURL={this.getDataURL}
        product={this.state.product}
        errors={this.state.errors}
      />
    );
  }
}

export default ProductsEdit;
