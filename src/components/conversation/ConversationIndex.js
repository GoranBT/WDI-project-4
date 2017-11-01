import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
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

  getUser = (conversation) => {
    const { userId } = Auth.getPayload();
    return conversation.sender.id === userId ? conversation.sender : conversation.receiver;
  }

  render() {
    return (
      <div className="row" id="conversationsIndex">
        {this.state.conversations && this.state.conversations.map(conversation => <div className="boxClass col-md-6" key={conversation.id}>
          <Link className="btn btn-outline-success"
            to={`/conversations/${conversation.id}`}>
            <img src={this.getUser(conversation).imageSRC}/>
            <span>{this.getUser(conversation).username}</span>
          </Link>
          <hr />
        </div>)}

      </div>
    );
  }
}

export default ProductsShow;
