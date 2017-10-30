import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';

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

  deleteProduct = () => {
    Axios
      .delete(`/api/products/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/products'));
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', { product: this.state.product }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="row">
        <div className="my col-lg-4 col-md-6 mb-4">
          <div className="card">
            <img className="card-img-top" src={this.state.product.imageSRC} alt="Card image cap" />
          </div>
        </div>

        <div className="my col-lg-4 col-md-6 mb-4">
          <p><strong>Product:</strong> {this.state.product.name}</p>
          <p><strong>Description:</strong> {this.state.product.description}</p>
          <p><strong>Price:</strong> {this.state.product.price}£</p>
          <p><strong>Conditoon:</strong> {this.state.product.condition}</p>
          {<p><strong>Category:</strong> {this.state.product.category && this.state.product.category.name}</p>}
          {Auth.isAuthenticated() && <button className="btn btn-outline-success" onClick={this.createConversation} ><i className="fa fa-envelope" aria-hidden="true"></i> message</button>}
          {Auth.isAuthenticated() && <Link to={`/products/${this.state.product.id}/edit`}><button className="btn btn-outline-success">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </button></Link>}
          {' '}
          {Auth.isAuthenticated() && <button className="btn btn-outline-success" onClick={this.deleteProduct}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
          <hr />
          <div>
            {this.state.product.location &&
              <GoogleMap
                center={this.state.product.location}
              />}
          </div>
        </div>
        <div className="my col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            {this.state.product.postedBy && <Link to={`/users/${this.state.product.postedBy.id}`}>
              <img className="card-img-top" src="http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png" alt=""></img>
              <div className="card-body">
                <h4 className="bottom-border card-title">
                  {this.state.product.postedBy.username}
                </h4>
              </div>
            </Link>}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsShow;
