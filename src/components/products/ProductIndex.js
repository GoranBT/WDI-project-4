import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../utility/SearchBar';
import _ from 'lodash';
import 'bootstrap-css-only';


class ProductIndex extends React.Component {
  state = {
    products: [],
    categories: [],
    sortBy: 'strength',
    sortDirection: 'desc',
    query: '',
    filter: ''
  }

  componentDidMount() {
    Axios
      .get('/api/products')
      .then(res => this.setState({ products: res.data }, console.log(res.data)))
      .catch(err => console.log(err));
    Axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }, ()=> console.log(res.data)))
      .catch(err => console.error(err));
  }

  handleOrigin = (e) => {
    const filter = e.target.value;
    this.setState({ filter });
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({query});
  }

  handleSort = (e) => {
    const [sortBy, sortDirection] = e.target.value.split('|');
    this.setState({ sortBy, sortDirection });
    console.log(sortBy, sortDirection);
  }

  render() {
    const { sortBy, sortDirection, query } = this.state;
    const regex = new RegExp(query, 'i');

    const orderedProducts = _.orderBy(this.state.products, sortBy, sortDirection, query);
    let products = _.filter(orderedProducts, (product) => regex.test(product.name));
    if(this.state.filter) products = _.filter(products, (product) => this.state.filter === product.category.name);

    return (



      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            {products.map(product => {
              return (
                <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="shaddow card h-100">
                    <Link to={`/products/${product.id}`}>
                      <div className="overlay-wrapper">
                        <img className="card-img-top medium objectImage" src={product.imageSRC} alt=""></img>
                        {product.sold ? <div className="sold-overlay"><span>Sold</span></div> : null}
                      </div>

                      <div className="card-body">
                        <h4 className="bottom-border card-title">
                          {product.name}
                        </h4>
                        <h5 className="bottom-border">price £{product.price}</h5>
                        <p className="card-text">{product.description}</p>
                      </div>
                    </Link>
                  </div>
                </div>);
            })}
          </div>
        </div>
        <div id="search-bar" className="col-lg-3">
          <SearchBar
            categories={this.state.categories}
            handleOrigin={this.handleOrigin}
            handleSort={this.handleSort}
            handleSearch={this.handleSearch}
          />
        </div>

      </div>);
  }
}
export default ProductIndex;
