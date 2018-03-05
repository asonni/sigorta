import axios from 'axios';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_BALANCES_PENDING,
  FETCH_BALANCES_FULFILLED,
  FETCH_BALANCES_REJECTED
} from './types';

export const fetchBalances = () => async dispatch => {
  dispatch({ type: FETCH_BALANCES_PENDING });
  try {
    const response = await axios.get(
      `${ROOT_URL}/${API_URL}/clients/${localStorage.getItem(
        'si_clientID'
      )}/balances`,
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: FETCH_BALANCES_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_BALANCES_REJECTED, payload: error });
  }
};
