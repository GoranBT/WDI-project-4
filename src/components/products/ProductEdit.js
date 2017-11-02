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
      category: '',
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
      base64: '',
      category: ''
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/products/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ product: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
    Axios
      .get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
      .catch(() => console.log('Could not get categories'));
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
      .put(`/api/products/${this.props.match.params.id}`, this.state.product , {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/products/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }, ()=> console.log(this.state)));
  }

  getDataURL = (dataURL) => {
    this.setState(prevState => {
      const product = Object.assign({}, prevState.product, { base64: dataURL });
      return { product };
    });
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
        <h1 className="font-lobster text-center"> Edit your product</h1>
        <hr />
        <ProductsForm
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

export default ProductsEdit;
