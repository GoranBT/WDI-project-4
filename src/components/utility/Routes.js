import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import ProductIndex from '../products/ProductIndex';
import ProductNew from '../products/ProductNew';
import ProductEdit from '../products/ProductEdit';
import ProductShow from '../products/ProductShow';
import ConversationShow from '../conversation/ConversationShow';
import ConversationIndex from '../conversation/ConversationIndex';

import Login from '../auth/Login';
import Register from '../auth/Register';
import NoRoute from './NoRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ProductIndex} />
      <ProtectedRoute exact path="/products/new" component={ProductNew} />
      <ProtectedRoute exact path="/products/:id/edit" component={ProductEdit} />
      <Route exact path="/products/:id" component={ProductShow} />
      <ProtectedRoute exact path="/conversations" component={ConversationIndex} />
      <ProtectedRoute exact path="/conversations/:id" render={props => <ConversationShow currentUser={this.state.currentUser} {...props} />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Routes;
