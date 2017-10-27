import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class ProductsShow extends React.Component {
  state = {
    product: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data }, console.log(res.data)))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  deleteFood = () => {
    Axios
      .delete(`/api/products/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', { productId: this.state.product.id, userId: this.state.product.postedBy.id }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="row">
        <div className="image-tile col-md-6">
          <img src={this.state.product.image} className="img-responsive" />
        </div>

        <div className="col-md-6">
          <h1>{this.state.product.id}</h1>
          <h1>{this.state.product.postedBy && this.state.product.postedBy.id}</h1>
          <h3>Description: {this.state.product.description}</h3>
          <h3>Conditoon: {this.state.product.condition}</h3>
          {<h4>Category: {this.state.product.category && this.state.product.category.name}</h4>}
          {<h4>Seller name: {this.state.product.category && this.state.product.postedBy.username}</h4>}
          {<h4>Seller name: {this.state.product.category && this.state.product.postedBy.email}</h4>}
          <button onClick={this.createConversation} >message</button>
          {Auth.isAuthenticated() && <Link to={`/products/${this.state.product.id}/edit`} className="standard-button">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </Link>}
          {' '}
          {Auth.isAuthenticated() && <button className="main-button" onClick={this.deleteProduct}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
        </div>
      </div>
    );
  }
}

export default ProductsShow;
