import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';


class ProductsShow extends React.Component {
  state = {
    conversation: {}
  }

  componentWillMount() {
    Axios
      .get('/api/conversations', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversation: res.data }, console.log(res.data)))
      
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }
  render() {
    console.log(this.state);
    return (
      <div className="row">
        <h1>hello</h1>
      </div>
    );
  }
}

export default ProductsShow;
