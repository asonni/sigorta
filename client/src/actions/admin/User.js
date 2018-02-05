import axios from 'axios';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  NEW_USER_PENDING,
  NEW_USER_FULFILLED,
  NEW_USER_REJECTED,
  EDIT_USER_PENDING,
  EDIT_USER_FULFILLED,
  EDIT_USER_REJECTED,
  DELETE_USER_PENDING,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED
} from './Types';

export const fetchUsers = () => async dispatch => {
  dispatch({ type: FETCH_USERS_PENDING });
  try {
    const response = await axios.get(`${ROOT_URL}/${API_URL}/users`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`
      }
    });
    dispatch({ type: FETCH_USERS_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: FETCH_USERS_REJECTED, payload: response });
  }
};

export const newUser = ({
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  dispatch({ type: NEW_USER_PENDING });
  try {
    const response = await axios.post(
      `${ROOT_URL}/${API_URL}/users`,
      { firstName, lastName, email, password },
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Language': localStorage.getItem('lng') || 'en'
        }
      }
    );
    dispatch({ type: NEW_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: NEW_USER_REJECTED, payload: response });
  }
};

export const editUser = (id, { firstName, lastName }) => async dispatch => {
  dispatch({ type: EDIT_USER_PENDING });
  try {
    const response = await axios.put(
      `${ROOT_URL}/${API_URL}/users/${id}`,
      { firstName, lastName },
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Language': localStorage.getItem('lng') || 'en'
        }
      }
    );
    dispatch({ type: EDIT_USER_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: EDIT_USER_REJECTED, payload: response });
  }
};

export const deleteUser = id => async dispatch => {
  dispatch({ type: DELETE_USER_PENDING });
  try {
    const response = await axios.delete(`${ROOT_URL}/${API_URL}/users/${id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Language': localStorage.getItem('lng') || 'en'
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
