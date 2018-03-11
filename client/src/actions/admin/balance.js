import axios from 'axios';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_BALANCES_PENDING,
  FETCH_BALANCES_FULFILLED,
  FETCH_BALANCES_REJECTED,
  NEW_BALANCE_PENDING,
  NEW_BALANCE_FULFILLED,
  NEW_BALANCE_REJECTED,
  DELETE_BALANCE_FULFILLED,
  DELETE_BALANCE_REJECTED
} from './types';

const URL = `${ROOT_URL}/${API_URL}/balances`;

export const fetchBalances = () => async dispatch => {
  dispatch({ type: FETCH_BALANCES_PENDING });
  try {
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_BALANCES_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: FETCH_BALANCES_REJECTED, payload: response });
  }
};

export const newBalance = ({ client, balance }) => async dispatch => {
  dispatch({ type: NEW_BALANCE_PENDING });
  try {
    const response = await axios.post(
      `${URL}`,
      {
        client: client.value,
        balance
      },
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: NEW_BALANCE_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({ type: NEW_BALANCE_REJECTED, payload: response });
  }
};

export const deleteBalance = id => async dispatch => {
  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: DELETE_BALANCE_FULFILLED, payload: response });
  } catch ({ response }) {
    dispatch({
      type: DELETE_BALANCE_REJECTED,
      payload: response
    });
  }
};
