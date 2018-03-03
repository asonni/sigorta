import _ from 'lodash';
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
} from '../../actions/admin/types';

const initState = {
  order: {},
  orders: [],
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_ORDERS_PENDING:
      return { ...state, loading: true, orders: [], error: null };

    case FETCH_ORDERS_FULFILLED:
      return {
        ...state,
        orders: _.orderBy(payload.data.orders, '_id', 'asc'),
        loading: false,
        error: null
      };

    case FETCH_ORDERS_REJECTED:
      return { ...state, loading: false, orders: [], error: payload };

    case FETCH_ORDER_PENDING:
      return { ...state, loading: true, order: {}, error: null };

    case FETCH_ORDER_FULFILLED:
      return {
        ...state,
        order: payload.data.order,
        loading: false,
        error: null
      };

    case FETCH_ORDER_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        order: {},
        error: message ? message : 'error'
      };

    case NEW_ORDER_PENDING:
      return { ...state, loading: true, error: null };

    case NEW_ORDER_FULFILLED:
      return {
        ...state,
        orders: [...state.orders, payload.data.order],
        loading: false,
        error: null
      };

    case NEW_ORDER_REJECTED:
      return { ...state, loading: false, error: payload };

    case EDIT_ORDER_PENDING:
      return { ...state, loading: true };

    case EDIT_ORDER_FULFILLED:
      const order = payload.data.order;
      return {
        ...state,
        orders: state.orders.map(
          item => (item._id === order._id ? order : item)
        ),
        loading: false,
        error: null
      };

    case EDIT_ORDER_REJECTED:
      return { ...state, loading: false, error: payload };

    case DELETE_ORDER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        orders: state.orders.filter(item => item._id !== id),
        error: null
      };

    case DELETE_ORDER_REJECTED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
