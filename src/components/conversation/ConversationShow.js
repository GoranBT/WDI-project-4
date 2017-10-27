import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import ConversationForm from './ConversationForm';

class ConversationNew extends React.Component {
  state = {
    conversation: {
      messages: [],
      product: {}
    },
    message: '',
    errors: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/conversations/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversation: res.data }));
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ message: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/api/conversations/${this.props.match.params.id}/messages`, { text: this.state.message }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.setState({ message: '' }))
      .catch(err => this.setState({ errors: err.response.data.errors }));

  }

  render() {
    return (
      <div>
        <h1>{this.state.conversation.product.name}</h1>
        <ul>
          <ul>
            {this.state.conversation.messages.map(message => <li key={message.id}>
              <p>{message.createdAt.substr(11, 8)}</p>
              <p>{message.text}</p>
              <p>{message.user.username}</p>
            </li> )}
          </ul>
        </ul>
        <ConversationForm
          conversation={this.state.conversation}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default ConversationNew;
