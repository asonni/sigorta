import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL } from '../baseUrl';
import { AUTH_USER, AUTH_MESSAGE, UNAUTH_USER } from './types';

export const loginUser = ({ email, password }, callback) => async dispatch => {
  try {
    // Submit username/password to the server
    const response = await axios.post(`${ROOT_URL}/${API_URL}/users/login`, {
      email,
      password
    });
    // If request is good...
    // - Update state to indicate user is authenticated
    const { id_token, user } = response.data;
    if (id_token && user) {
      dispatch({ type: AUTH_USER, payload: user.isAdmin });
      // - Save the JWT token
      localStorage.setItem('si_token', id_token);
      localStorage.setItem('si_isAdmin', user.isAdmin);
      callback(true);
    }
  } catch ({ response }) {
    // If request is bad...
    // - Show an error to the user
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
  return { type: UNAUTH_USER };
};

export const authMessage = message => {
  return { type: AUTH_MESSAGE, payload: message };
};
