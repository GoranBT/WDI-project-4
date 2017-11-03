import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';
import QuestionsForm from './ProductQuestionsForm';

import Auth from '../../lib/Auth';

class ProductsShow extends React.Component {
  state = {
    product: {},
    question: ''
  }

  //Get product

  componentWillMount() {
    Axios
      .get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data }, console.log(res.data)))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  //Delete product

  deleteProduct = () => {
    Axios
      .delete(`/api/products/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/products'));
  }

  //Create conversation on click -> message button

  createConversation = (e) => {
    e.preventDefault();
    Axios
      .post('/api/conversations', { product: this.state.product }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }


  //Change Boolean to sold true on click -> sold button
  sellProduct = (e) => {
    e.preventDefault();

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

  //Ask question -> sending questions

  handleChange = ({ target: { value }}) => {
    this.setState({ question: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/products/${this.props.match.params.id}/questions`, { text: this.state.question }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState(prevState => {
        const questions = prevState.product.questions.concat(res.data);
        const product = { ...prevState.product, questions };
        return { product, question: '' };
      }))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }


  render() {
    const { product } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="my col-lg-4 col-md-12 col-sm-12">
            <div className="card overlay-wrapper">
              <img className="sold card-img-top" src={product.imageSRC} alt="Card image cap" />
              {product.sold ? <div className="sold-overlay"><span className="sold-product">Sold</span></div> : null}
            </div>
            <hr/>
            <div className="questions-hidden">
              {/* questions section */}
              <h6>Questions</h6>
              <div className="question">

                <QuestionsForm
                  question={this.state.question}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                />
                {this.state.product.questions && product.questions.map(question => {
                  return(
                    <div key={question.id}>
                      <img className="userCommentImage" src={question.createdBy.imageSRC}/>
                      <span className=""><small>{question.text}</small></span>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* Product Information section */}

          <div className="my spaceBetween col-lg-4 col-md-6 col-sm-12">
            {product.name && <p><strong>Product:</strong> {product.name}</p>}
            {product.description && <p><strong>Description:</strong> {product.description}</p>}
            {product.price && <p><strong>Price:</strong> {product.price}£</p>}
            {product.condition && <p><strong>Conditoon:</strong> {product.condition}</p>}
            {<p><strong>Category:</strong> {product.category && product.category.name}</p>}
            <hr />
            {/* message button */}

            {product.postedBy && Auth.isAuthenticated()
              && Auth.getPayload().userId !== product.postedBy.id
              && <button className="btn btn-outline-success" onClick={this.createConversation} >
                <i className="fa fa-envelope" aria-hidden="true"></i> message</button>}

            {/* edit button visible by the product's owner */}

            {product.postedBy && Auth.isAuthenticated()
                  && Auth.getPayload().userId === product.postedBy.id
                  && <Link to={`/products/${product.id}/edit`}>
                    <button className="btn btn-outline-success">
                      <i className="fa fa-pencil" aria-hidden="true"></i>Edit
                    </button></Link>}

            {/* delete button visible by the product's owner */}


            {product.postedBy && Auth.isAuthenticated()
                    && Auth.getPayload().userId === product.postedBy.id
                    && <button className="btn btn-outline-success" onClick={this.deleteProduct}>
                      <i className="fa fa-trash" aria-hidden="true"></i>Delete
                    </button>}

            {/* sold button visible by the product's owner */}


            {product.postedBy && Auth.isAuthenticated() && Auth.getPayload().userId === product.postedBy.id &&
                      <button className="btn btn-outline-success" onClick={this.sellProduct}>
                        { product.sold ? 'Mark as unsold' : 'Mark as sold'}
                      </button>}

            <hr />

            {/* GoogleMap section */}

            <div>
              {product.location &&
                          <GoogleMap
                            center={product.location}
                          />}
            </div>
          </div>

          {/* Seller Information */}

          <div className="my col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              {product.postedBy && <Link to={`/users/${product.postedBy.id}`}>
                {product.postedBy &&
                            <img className="card-img-top" src={product.postedBy.imageSRC} alt=""></img>}

                <div className="card-body">
                  <h6 className="bottom-border card-title text-center">
                                Username: {product.postedBy && product.postedBy.username}
                  </h6>
                </div>
              </Link>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsShow;
