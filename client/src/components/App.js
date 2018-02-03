import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Admin from './Admin';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default App;
