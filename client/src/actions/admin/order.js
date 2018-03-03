import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_FULFILLED,
  FETCH_ORDERS_REJECTED,
  FETCH_ORDER_PENDING,
  FETCH_ORDER_FULFILLED,
  FETCH_ORDER_REJECTED,
  NEW_ORDER_PENDING,
  NEW_ORDER_FULFILLED,
  NEW_ORDER_REJECTED,
  EDIT_ORDER_PENDING,
  EDIT_ORDER_FULFILLED,
  EDIT_ORDER_REJECTED,
  DELETE_ORDER_FULFILLED,
  DELETE_ORDER_REJECTED
} from './types';

const URL = `${ROOT_URL}/${API_URL}/orders`;

export const fetchOrders = () => async dispatch => {
  dispatch({ type: FETCH_ORDERS_PENDING });
  try {
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_ORDERS_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_ORDERS_REJECTED, payload: error });
  }
};

export const fetchOrder = id => async dispatch => {
  dispatch({ type: FETCH_ORDER_PENDING });
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_ORDER_REJECTED, payload: error });
  }
};

export const newOrder = values => async dispatch => {
  const newOrderObj = {
    ...values,
    plan: values.plan.value,
    gender: values.gender.value,
    client: values.client.value,
    numberOfYears: values.numberOfYears.value
  };
  dispatch({ type: NEW_ORDER_PENDING });
  try {
    const response = await axios.post(`${URL}`, newOrderObj, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: NEW_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    console.log(error);
    dispatch({ type: NEW_ORDER_REJECTED, payload: error });
  }
};

export const editOrder = values => async dispatch => {
  const editOrderObj = {
    ...values,
    plan: values.plan.value,
    gender: values.gender.value,
    client: values.client.value,
    numberOfYears: values.numberOfYears.value
  };
  dispatch({ type: EDIT_ORDER_PENDING });
  try {
    const response = await axios.put(
      `${URL}/${editOrderObj._id}`,
      editOrderObj,
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: EDIT_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('clinet'));
    dispatch({ type: EDIT_ORDER_REJECTED, payload: error });
  }
};

export const approveOrder = id => async dispatch => {
  try {
    const response = await axios.put(
      `${URL}/${id}`,
      { status: 'approved' },
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: EDIT_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({
      type: EDIT_ORDER_REJECTED,
      payload: error
    });
  }
};

export const deleteOrder = id => async dispatch => {
  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: DELETE_ORDER_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({
      type: DELETE_ORDER_REJECTED,
      payload: error
    });
  }
};
