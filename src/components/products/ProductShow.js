import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';
import CommentsForm from './ProductCommentsForm';

import Auth from '../../lib/Auth';

class ProductsShow extends React.Component {
  state = {
    product: {},
    comment: ''
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

  createConversation = (e) => {
    e.preventDefault();
    Axios
      .post('/api/conversations', { product: this.state.product }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }

  sellProduct = (e) => {
    e.preventDefault();
    console.log('check box',  e.target);

    Axios
      .put(`/api/products/${this.props.match.params.id}`, { sold: !this.state.product.sold }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState(prevState => {
        const product = {  ...prevState.product, sold: res.data.sold };
        return { product };
      }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }


  handleChange = ({ target: { value }}) => {
    this.setState({ comment: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/products/${this.props.match.params.id}/comments`, { text: this.state.comment }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState(prevState => {
        const comments = prevState.product.comments.concat(res.data);
        const product = { ...prevState.product, comments };
        return { product, comment: '' };
      }))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }


  render() {
    const { product } = this.state;
    return (
      <div className="row justify-content-between">
        <div className="my col-lg-4 col-md-6 mb-4">
          <div className="card overlay-wrapper">
            <img className="sold card-img-top" src={product.imageSRC} alt="Card image cap" />
            {product.sold ? <div className="sold-overlay"><span>Sold</span></div> : null}
          </div>
          <ul>
            {this.state.product.comments && product.comments.map(comment => {
              return(
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  <small>{comment.createdBy.username}</small>
                </li>
              );
            })}
          </ul>
          <CommentsForm
            comment={this.state.comment}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>

        <div className="my spaceBetween col-lg-4 col-md-6 mb-4">
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.price}£</p>
          <p><strong>Conditoon:</strong> {product.condition}</p>
          {<p><strong>Category:</strong> {product.category && product.category.name}</p>}
          {product.postedBy && Auth.isAuthenticated() && Auth.getPayload().userId !== product.postedBy.id && <button className="btn btn-outline-success" onClick={this.createConversation} ><i className="fa fa-envelope" aria-hidden="true"></i> message</button>}
          {product.postedBy && Auth.isAuthenticated() && Auth.getPayload().userId === product.postedBy.id && <Link to={`/products/${product.id}/edit`}><button className="btn btn-outline-success">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </button></Link>}
          {' '}
          {product.postedBy && Auth.isAuthenticated() && Auth.getPayload().userId === product.postedBy.id && <button className="btn btn-outline-success" onClick={this.deleteProduct}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
          {
            product.postedBy && Auth.isAuthenticated() && Auth.getPayload().userId === product.postedBy.id &&
              <button className="btn btn-outline-success" onClick={this.sellProduct}>
                { product.sold ? 'Mark as unsold' : 'Mark as sold'}
              </button>
          }
          <hr />
          <div>
            {product.location &&
              <GoogleMap
                center={product.location}
              />}
          </div>
        </div>
        <div className="my col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            {product.postedBy && <Link to={`/users/${product.postedBy.id}`}>
              {product.postedBy && <img className="card-img-top" src={product.postedBy.imageSRC} alt=""></img>}
              <div className="card-body">
                <h4 className="bottom-border card-title">
                  {product.postedBy && product.postedBy.username}
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
