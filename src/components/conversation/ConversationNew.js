import React from 'react';
import Axios from 'axios';

class ConversationNew extends React.Component {
  state = {
    message: []
  }

  componentWillMount() {
    Axios
      .get(`/api/conversations/${this.props.match.params.id}`);
    // .then(res => this.setState({ message: res.data.messages }, console.log(res.data)))
    // .catch(err => {
  //   if(err.response.status === 404) return this.props.history.replace('/404');
  //   console.log(err);
  // });
  }

  handleChange = ({ target: { name, value }}) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.match.params.id, this.state.message.text, this.state);
    Axios.post(`/api/conversations/${this.props.match.params.id}/messages/`, {text: this.state.message.text, userId: this.state.message.user})
      .then((res) => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }, ()=> console.log(this.state)));
  }

  render() {
    console.log(this.state);
    return (
      <form>
        <input
          type="text"
          name="text"
          placeholder="Type your message"
          onChange={this.handleChange}
          value={this.state.message.text}
          className="form-control"></input>
        <button onClick={this.handleSubmit} className="btn btn-primary">Send</button>
      </form>

    );
  }

}

export default ConversationNew;
