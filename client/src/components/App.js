import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import rootReducer from '../reducers';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Admin from './admin';
import Client from './client';
import Page404 from './Page404';
import { requireAuthAdmin, requireAuthClient, requireGuest } from './common';
import { AUTH_USER } from '../actions/auth/types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(ReduxThunk, ReduxPromise));
const store = createStore(rootReducer, middleware);

const token = localStorage.getItem('si_token');
const isAdmin = localStorage.getItem('si_isAdmin');

if (token && isAdmin !== null) {
  store.dispatch({ type: AUTH_USER, payload: isAdmin });
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={requireGuest(Login)} />
        <Route path="/logout" component={Logout} />
        <Route path="/admin" component={requireAuthAdmin(Admin)} />
        <Route path="/client" component={requireAuthClient(Client)} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
