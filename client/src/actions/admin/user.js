import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  NEW_USER_PENDING,
  NEW_USER_FULFILLED,
  NEW_USER_REJECTED,
  EDIT_USER_PENDING,
  EDIT_USER_FULFILLED,
  EDIT_USER_REJECTED,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED
} from './types';

const URL = `${ROOT_URL}/${API_URL}/users`;

export const fetchUsers = () => async dispatch => {
  dispatch({ type: FETCH_USERS_PENDING });
  try {
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_USERS_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: FETCH_USERS_REJECTED, payload: response });
  }
};

export const fetchUser = id => async dispatch => {
  dispatch({ type: FETCH_USER_PENDING });
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: FETCH_USER_REJECTED, payload: response });
  }
};

export const newUser = ({
  fname,
  lname,
  email,
  password
}) => async dispatch => {
  dispatch({ type: NEW_USER_PENDING });
  try {
    const response = await axios.post(
      `${URL}`,
      { fname, lname, email, password },
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: NEW_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch(reset('userForm'));
    dispatch({ type: NEW_USER_REJECTED, payload: response });
  }
};

export const editUser = values => async dispatch => {
  dispatch({ type: EDIT_USER_PENDING });
  try {
    const response = await axios.put(`${URL}/${values._id}`, values, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: EDIT_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch(reset('userForm'));
    dispatch({ type: EDIT_USER_REJECTED, payload: response });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: DELETE_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({
      type: DELETE_USER_REJECTED,
      payload: response
    });
  }
};
