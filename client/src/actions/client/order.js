import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_FULFILLED,
  FETCH_ORDERS_REJECTED,
  NEW_ORDER_PENDING,
  NEW_ORDER_FULFILLED,
  NEW_ORDER_REJECTED
} from './types';

export const fetchOrders = () => async dispatch => {
  dispatch({ type: FETCH_ORDERS_PENDING });
  try {
    const response = await axios.get(
      `${ROOT_URL}/${API_URL}/clients/${localStorage.getItem(
        'si_clientID'
      )}/orders`,
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: FETCH_ORDERS_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_ORDERS_REJECTED, payload: error });
  }
};

export const newOrder = values => async dispatch => {
  const newOrderObj = {
    ...values,
    plan: values.plan.value,
    gender: values.gender.value,
    numberOfYears: values.numberOfYears.value
  };
  dispatch({ type: NEW_ORDER_PENDING });
  try {
    const response = await axios.post(
      `${ROOT_URL}/${API_URL}/orders`,
      newOrderObj,
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: NEW_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('orderForm'));
    dispatch({ type: NEW_ORDER_REJECTED, payload: error });
  }
};
