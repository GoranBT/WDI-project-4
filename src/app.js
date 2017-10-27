import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap-css-only';

import ProductIndex from './components/products/ProductIndex';
import ProductNew from './components/products/ProductNew';
import ProductShow from './components/products/ProductShow';
import ConversationShow from './components/conversation/ConversationShow';
import ConversationIndex from './components/conversation/ConversationIndex';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/utility/Navbar';
import Auth from './lib/Auth';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {

  state = {
    currentUser: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`)
      .then(res => this.setState({ currentUser: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  render() {
    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <h1>WDI Project 4: MERN Stack App</h1>
          <div className="container">
            <main>
              <Switch>
                <Route exact path="/products" component={ProductIndex} />
                <Route exact path="/products/new" component={ProductNew} />
                <Route exact path="/products/:id" component={ProductShow} />
                <Route exact path="/conversations" component={ConversationIndex} />
                <Route exact path="/conversations/:id" render={props => <ConversationShow currentUser={this.state.currentUser} {...props} />} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
