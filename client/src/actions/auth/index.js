import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL } from '../baseUrl';
import { AUTH_USER, AUTH_MESSAGE, UNAUTH_USER } from './types';

export const loginUser = ({ email, password }, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/${API_URL}/users/login`, {
      email,
      password
    });
    const { id_token, user } = response.data;
    if (id_token && user && user.isAdmin === true) {
      dispatch({ type: AUTH_USER, payload: user.isAdmin });
      localStorage.setItem('si_token', id_token);
      localStorage.setItem('si_isAdmin', user.isAdmin);
      callback(true);
    } else if (id_token && user && user.isAdmin === false && user.client) {
      dispatch({ type: AUTH_USER, payload: user.isAdmin });
      localStorage.setItem('si_token', id_token);
      localStorage.setItem('si_isAdmin', user.isAdmin);
      localStorage.setItem('si_clientID', user.client);
      callback(true);
    } else {
      dispatch(
        authMessage("This account hasn't been assigned to any client yet")
      );
      dispatch(reset('login'));
      callback(false);
    }
  } catch ({ response }) {
    if (response && response.data.error) {
      dispatch(authMessage('Authentication failed'));
    } else {
      dispatch(authMessage('You must provide the email and the password'));
    }
    dispatch(reset('login'));
    callback(false);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('si_token');
  localStorage.removeItem('si_isAdmin');
  localStorage.removeItem('si_clientID');
  return { type: UNAUTH_USER };
};

export const authMessage = message => {
  return { type: AUTH_MESSAGE, payload: message };
};
