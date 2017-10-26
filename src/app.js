import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap-css-only';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/utility/Navbar';
// import 'font-awesome/css/font-awesome.css';
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
                {/* <Route exact path="/" component={ShopsIndex} />
                <ProtectedRoute exact path="/new" component={ShopsNew} /> */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                {/* <Route exact path="/shops/:id" component={ShopsShow} />
                <ProtectedRoute exact path="/shops/:id/edit" component={ShopsEdit} />
                <Route component={NoRoute} /> */}
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
