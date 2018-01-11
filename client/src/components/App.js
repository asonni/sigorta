import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
