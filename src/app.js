import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch } from 'react-router-dom';

import 'bootstrap-css-only';
// import Routes from './components/utility/Routes';

import ProductIndex from './components/products/ProductIndex';
import ProductNew from './components/products/ProductNew';
import ProductEdit from './components/products/ProductEdit';
import ProductShow from './components/products/ProductShow';
import ConversationShow from './components/conversation/ConversationShow';
import ConversationIndex from './components/conversation/ConversationIndex';
import UsersShow from './components/users/UsersShow';
// import UsersEdit from './components/users/UsersEdit';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/utility/Navbar';

import NoRoute from './components/utility/NoRoute';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {

  state = {
    currentUser: {}
  }

  render() {
    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            <main>
              {/* <Routes/> */}
              <Switch>
                <Route exact path="/products" component={ProductIndex} />
                <Route exact path="/products/new" component={ProductNew} />
                <Route exact path="/products/:id/edit" component={ProductEdit} />
                <Route exact path="/products/:id" component={ProductShow} />
                <Route exact path="/conversations" component={ConversationIndex} />
                <Route exact path="/conversations/:id" component={ConversationShow} />
                {/* <Route exact path="/users/:id/edit" component={UsersEdit} /> */}
                <Route exact path="/users/:id" component={UsersShow} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route component={NoRoute} />
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
