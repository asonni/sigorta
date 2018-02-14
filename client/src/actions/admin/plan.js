import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_PLANS_PENDING,
  FETCH_PLANS_FULFILLED,
  FETCH_PLANS_REJECTED,
  FETCH_PLAN_PENDING,
  FETCH_PLAN_FULFILLED,
  FETCH_PLAN_REJECTED,
  NEW_PLAN_PENDING,
  NEW_PLAN_FULFILLED,
  NEW_PLAN_REJECTED,
  EDIT_PLAN_PENDING,
  EDIT_PLAN_FULFILLED,
  EDIT_PLAN_REJECTED,
  DELETE_PLAN_FULFILLED,
  DELETE_PLAN_REJECTED
} from './types';

const URL = `${ROOT_URL}/${API_URL}/plans`;

export const fetchPlans = () => async dispatch => {
  dispatch({ type: FETCH_PLANS_PENDING });
  try {
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_PLANS_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_PLANS_REJECTED, payload: error });
  }
};

export const fetchPlan = id => async dispatch => {
  dispatch({ type: FETCH_PLAN_PENDING });
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: FETCH_PLAN_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({ type: FETCH_PLAN_REJECTED, payload: error });
  }
};

export const newPlan = ({ name, price }) => async dispatch => {
  dispatch({ type: NEW_PLAN_PENDING });
  try {
    const response = await axios.post(
      `${URL}`,
      {
        name,
        price
      },
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: NEW_PLAN_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('clinet'));
    dispatch({ type: NEW_PLAN_REJECTED, payload: error });
  }
};

export const editPlan = ({ _id, name, price }) => async dispatch => {
  dispatch({ type: EDIT_PLAN_PENDING });
  try {
    const response = await axios.put(
      `${URL}/${_id}`,
      {
        name,
        price
      },
      {
        headers: {
          Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: EDIT_PLAN_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch(reset('clinet'));
    dispatch({ type: EDIT_PLAN_REJECTED, payload: error });
  }
};

export const deletePlan = id => async dispatch => {
  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: DELETE_PLAN_FULFILLED, payload: response });
  } catch ({ error }) {
    dispatch({
      type: DELETE_PLAN_REJECTED,
      payload: error
    });
  }
};
