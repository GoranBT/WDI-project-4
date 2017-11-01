import React from 'react';
// import { Link } from 'react-router-dom';
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
      <div className="row">
        <div className="col-md-6">
          <div className="medium objectImage">
            {this.state.user.createdAt && <img src={this.state.user.imageSRC} className="userImage rounded-circle" />}
          </div>
          <div>
            {this.state.user.createdAt && <p>User: {this.state.user.username}</p>}
            {this.state.user.createdAt && <p>since: {this.state.user.createdAt.substr(0, 10)}</p>}
          </div>
        </div>
        <div className="col-md-6">
          {this.state.user.products && this.state.user.products.map(product => <div key={product.id}>{product.name}</div>)}
        </div>

      </div>
    );
  }
}

export default UsersShow;
