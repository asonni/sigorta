import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import reducers from '../reducers';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Admin from './Admin';
import Client from './Client';
import Page404 from './Page404';
import { RequireAuth, RequireGuest } from './Common';
import { AUTH_USER } from '../actions/admin/types';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(
  createStore
);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('si_token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={RequireGuest(Login)} />
        <Route path="/logout" component={RequireAuth(Logout)} />
        <Route path="/admin" component={RequireAuth(Admin)} />
        <Route path="/client" component={Client} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
