import _ from 'lodash';
import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_FULFILLED,
  FETCH_ORDERS_REJECTED,
  NEW_ORDER_PENDING,
  NEW_ORDER_FULFILLED,
  NEW_ORDER_REJECTED
} from '../../actions/client/types';

const initState = {
  orders: [],
  errors: {},
  loading: false
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

    default:
      return state;
  }
};
