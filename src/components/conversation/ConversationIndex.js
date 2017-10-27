import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';


class ProductsShow extends React.Component {
  state = {
    conversations: []
  }

  componentWillMount() {
    Axios
      .get('/api/conversations', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversations: res.data }, console.log(res.data)))

      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }
  render() {
    return (
      <div className="row">
        {this.state.conversations.map(conversation => <div key={conversation.id}>
          <a href={`/conversations/${conversation.id}`}>{conversation.product.name}</a>
        </div>)}
      </div>
    );
  }
}

export default ProductsShow;
