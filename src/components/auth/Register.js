import React from 'react';
import LoginForm from './RegisterForm';
import Axios from 'axios';

class Register extends React.Component {

  state = {
    user: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      image: '',
      base64: ''
    },
    errors: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/register', this.state.user)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }, ()=> console.log(this.state)));
  }

  render() {
    return (
      <div className="justify-content-around box rounded col-md-6">
        <LoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default Register;
