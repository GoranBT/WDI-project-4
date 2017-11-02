import React from 'react';
import LoginForm from './LoginForm';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import OAuthButton from './OAuthButton';

class Login extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    },
    error: null
  };

  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then((res) => {
        Auth.setToken(res.data.token);
        this.props.history.push('/');
        console.log(res);
      })
      .catch(() => this.setState({ error: 'Invalid Credentials'}));
  }

  render() {
    return (
      <div className="container">
        <div className="newProduct shaddow white box rounded col-md-8 offset-md-2">
          <LoginForm
            credentials={this.state.credentials}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
          <OAuthButton provider="facebook"><i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</OAuthButton>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Login;
