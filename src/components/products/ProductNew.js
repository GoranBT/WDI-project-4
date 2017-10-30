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
      category: '',
      postedBy: ''
    },
    categories: [],
    errors: {}
  };

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
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  getAutocompleteInfo = (place) => {
    console.log('place', place);
    const { lat, lng } = place.geometry.location.toJSON();


    this.setState(prevState => {
      const locations = prevState.data.locations.map((location) => {
        Object.assign(location, { location: { lat, lng }});
        console.log(location);
        return location;
      });

      const data = Object.assign({}, this.state.data, { locations });
      this.setState({ data });
    });
  }

  render() {

    return (
      <div>
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
