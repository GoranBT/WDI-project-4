import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import ConversationForm from './ConversationForm';

class ConversationShow extends React.Component {
  state = {
    conversation: {
      messages: [],
      product: {}
    },
    message: '',
    errors: {
      message: ''
    }
  }

  // get conversations

  componentWillMount() {
    Axios
      .get(`/api/conversations/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversation: res.data }, this.stickyScroll));
  }


  // control the scroll position -> chat

  stickyScroll() {
    var objDiv = document.getElementsByClassName('conversation')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }



  handleChange = ({ target: { value }}) => {
    this.setState({ message: value });
  }

  // post massages

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/api/conversations/${this.props.match.params.id}/messages`, { text: this.state.message }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ conversation: res.data, message: '' }, this.stickyScroll))
      .catch(err => this.setState({ errors: err.response.data.errors }));

  }

  render() {
    const { userId } = Auth.getPayload();
    return (
      <div className="container">
        <div className="box white rounded">
          {<h1>{!this.state.conversation && this.state.conversation.sender.username}</h1>}
          <div className="conversation content container-fluid bootstrap snippets">
            <div className="row row-broken">
              <div className="col-sm-11 col-xs-12 chat">
                <div className="col-inside-lg decor-default">
                  <div className="chat-body">
                    {this.state.conversation.messages.map(message => (
                      <div key={message.id} className={message.user.id === userId ? 'answer right' : 'answer left'}>
                        <div className="avatar">
                          <img src={message.user.imageSRC}/>
                        </div>
                        <div className="name">{message.user.username}</div>
                        <div className="text">{message.text}</div>
                        <div className="time">{message.createdAt.substr(11, 8)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConversationForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            message={this.state.message}
          />
        </div>
      </div>
    );
  }
}

export default ConversationShow;
