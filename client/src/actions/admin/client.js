import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_CLINETS_PENDING,
  FETCH_CLINETS_FULFILLED,
  FETCH_CLINETS_REJECTED,
  FETCH_CLINET_PENDING,
  FETCH_CLINET_FULFILLED,
  FETCH_CLINET_REJECTED,
  NEW_CLINET_PENDING,
  NEW_CLINET_FULFILLED,
  NEW_CLINET_REJECTED,
  EDIT_CLINET_PENDING,
  EDIT_CLINET_FULFILLED,
  EDIT_CLINET_REJECTED,
  DELETE_CLINET_PENDING,
  DELETE_CLINET_FULFILLED,
  DELETE_CLINET_REJECTED
} from './types';

const headers = {
  Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
  'Content-Type': 'application/json'
};

export const fetchClients = () => async dispatch => {
  dispatch({ type: FETCH_CLINETS_PENDING });
  try {
    const response = await axios.get(`${ROOT_URL}/${API_URL}/clients`, {
      headers
    });
    dispatch({ type: FETCH_CLINETS_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_CLINETS_REJECTED, payload: error });
  }
};

export const fetchClient = id => async dispatch => {
  dispatch({ type: FETCH_CLINET_PENDING });
  try {
    const response = await axios.get(`${ROOT_URL}/${API_URL}/clients/${id}`, {
      headers
    });
    dispatch({ type: FETCH_CLINET_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_CLINET_REJECTED, payload: error });
  }
};

export const newClinet = ({ name, discount, user }) => async dispatch => {
  dispatch({ type: NEW_CLINET_PENDING });
  try {
    const response = await axios.post(
      `${ROOT_URL}/${API_URL}/clients`,
      {
        name,
        discount,
        user: user.value
      },
      {
        headers
      }
    );
    dispatch({ type: NEW_CLINET_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('clinet'));
    dispatch({ type: NEW_CLINET_REJECTED, payload: error });
  }
};

export const editClinet = ({ _id, name, discount, user }) => async dispatch => {
  dispatch({ type: EDIT_CLINET_PENDING });
  try {
    const response = await axios.put(
      `${ROOT_URL}/${API_URL}/clients/${_id}`,
      {
        name,
        discount,
        user: user.value
      },
      {
        headers
      }
    );
    dispatch({ type: EDIT_CLINET_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('clinet'));
    dispatch({ type: EDIT_CLINET_REJECTED, payload: error });
  }
};

export const deleteClient = id => async dispatch => {
  dispatch({ type: DELETE_CLINET_PENDING });
  try {
    const response = await axios.delete(
      `${ROOT_URL}/${API_URL}/clinets/${id}`,
      {
        headers
      }
    );
    dispatch({ type: DELETE_CLINET_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({
      type: DELETE_CLINET_REJECTED,
      payload: error
    });
  }
};
