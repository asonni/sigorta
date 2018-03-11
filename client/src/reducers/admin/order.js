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
  APPROVE_ORDER_FULFILLED,
  APPROVE_ORDER_REJECTED,
  DELETE_ORDER_FULFILLED,
  DELETE_ORDER_REJECTED
} from '../../actions/admin/types';

const initState = {
  order: {},
  orders: [],
  errors: {},
  loading: false,
  deleteErrors: {},
  approveErrors: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_ORDERS_PENDING:
      return { ...state, loading: true, orders: [], errors: {} };

    case FETCH_ORDERS_FULFILLED:
      return {
        ...state,
        orders: _.orderBy(payload.data.orders, '_id', 'asc'),
        loading: false,
        errors: {}
      };

    case FETCH_ORDERS_REJECTED:
      return { ...state, loading: false, orders: [], errors: payload };

    case FETCH_ORDER_PENDING:
      return { ...state, loading: true, order: {}, errors: {} };

    case FETCH_ORDER_FULFILLED:
      return {
        ...state,
        order: payload.data.order,
        loading: false,
        errors: {}
      };

    case FETCH_ORDER_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        order: {},
        errors: { message, status: payload.status }
      };

    case NEW_ORDER_PENDING:
      return { ...state, loading: true, errors: {} };

    case NEW_ORDER_FULFILLED:
      return {
        ...state,
        orders: [...state.orders, payload.data.order],
        loading: false,
        errors: {}
      };

    case NEW_ORDER_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

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
        errors: {}
      };

    case EDIT_ORDER_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

    case APPROVE_ORDER_FULFILLED:
      const approveOrder = payload.data.order;
      return {
        ...state,
        orders: state.orders.map(
          item => (item._id === approveOrder._id ? approveOrder : item)
        ),
        approveErrors: {}
      };

    case APPROVE_ORDER_REJECTED:
      return {
        ...state,
        approveErrors: { message: payload.data.error, status: payload.status }
      };

    case DELETE_ORDER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        orders: state.orders.filter(item => item._id !== id),
        deleteErrors: {}
      };

    case DELETE_ORDER_REJECTED:
      return {
        ...state,
        deleteErrors: {
          message: payload.data.error.message,
          status: payload.status
        }
      };

    default:
      return state;
  }
};
