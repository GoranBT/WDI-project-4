import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class ProductsIndex extends React.Component {
  state = {
    products: []
  }

  componentWillMount() {
    Axios
      .get('/api/products')
      .then(res => this.setState({ products: res.data }, console.log(res.data)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            {Auth.isAuthenticated() && <Link to="/products/new" className="main-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add Product
            </Link>}
          </div>
          {this.state.products.map(product => {
            return(
              <div key={product.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} className="img-responsive" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductsIndex;
