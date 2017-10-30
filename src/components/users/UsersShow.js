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
        <div className="image-tile col-md-6">
          <img src={this.state.user.username} className="img-responsive" />
        </div>
        <h1>{this.state.user.username}</h1>
      </div>
    );
  }
}

export default UsersShow;
