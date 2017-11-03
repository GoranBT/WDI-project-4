import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {
  state = {
    user: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ user: res.data }, console.log(res.data)))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 my">
            <div className="">
              {this.state.user.createdAt && <img src={this.state.user.imageSRC} className="userImage rounded-circle objectImage" />}
            </div>
            <hr />
            <div>
              {this.state.user.username && <h4 className="">User: {this.state.user.username}</h4>}
              {this.state.user.createdAt && <h4 className="">Registered since: {this.state.user.createdAt.substr(0, 10)}</h4>}
            </div>

          </div>

          <div className="col-md-6 col-sm-12 my">

            {this.state.user.products && <h4 className="">Total products: {this.state.user.products.length} </h4>}
            {this.state.user && <h4 className="">More products from {this.state.user.username}</h4>}
            <hr />
            <div className="row">

              {this.state.user.products && this.state.user.products.map(product => <div  className="col-md-4 col-sm-6-offset-4" key={product.id}>
                <Link to={`/products/${product.id}`}> <div>
                  <img className="userItems" src={product.imageSRC}/>
                  <p className="text-center">{product.name}</p>
                </div>
                </Link>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
