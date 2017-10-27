import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap-css-only';

import ProductIndex from './components/products/ProductIndex';
import ProductShow from './components/products/ProductShow';
import ConversationNew from './components/conversation/ConversationNew';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/utility/Navbar';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {

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
                <Route exact path="/products/:id" component={ProductShow} />
                <Route exact path="/conversations/:id" component={ConversationNew} />
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
