import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import Home from '../home/Home';
import ProductIndex from '../products/ProductIndex';
import ProductNew from '../products/ProductNew';
import ProductEdit from '../products/ProductEdit';
import ProductShow from '../products/ProductShow';
import ConversationShow from '../conversation/ConversationShow';
import ConversationIndex from '../conversation/ConversationIndex';
import UsersShow from '../users/UsersShow';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NoRoute from './NoRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={ProductIndex} />
      <ProtectedRoute exact path="/products/new" component={ProductNew} />
      <ProtectedRoute  path="/products/:id/edit" component={ProductEdit} />
      <Route exact path="/products/:id" component={ProductShow} />
      <ProtectedRoute exact path="/conversations" component={ConversationIndex} />
      <ProtectedRoute exact path="/conversations/:id" component={ConversationShow} />
      <ProtectedRoute exact path="/users/:id" component={UsersShow} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Routes;
