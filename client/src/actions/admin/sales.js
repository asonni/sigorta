import axios from 'axios';
import { reset } from 'redux-form';
import { ROOT_URL, API_URL, PREFIX_TOKEN } from '../baseUrl';
import {
  FETCH_SALES_PENDING,
  FETCH_SALES_FULFILLED,
  FETCH_SALES_REJECTED
} from './types';

export const fetchSales = ({ dateType, from, to }) => async dispatch => {
  dispatch({ type: FETCH_SALES_PENDING });
  try {
    const response = await axios.get(`${ROOT_URL}/${API_URL}/sales`, {
      headers: {
        Authorization: `${PREFIX_TOKEN} ${localStorage.getItem('si_token')}`,
        'Content-Type': 'application/json'
      },
      params: {
        dateType: dateType.value,
        from,
        to
      }
    });
    dispatch({ type: FETCH_SALES_FULFILLED, payload: response });
    dispatch(reset('salesReportForm'));
  } catch ({ response }) {
    dispatch({ type: FETCH_SALES_REJECTED, payload: response });
  }
};
