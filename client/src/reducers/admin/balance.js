import _ from 'lodash';
import {
  FETCH_BALANCES_PENDING,
  FETCH_BALANCES_FULFILLED,
  FETCH_BALANCES_REJECTED,
  NEW_BALANCE_PENDING,
  NEW_BALANCE_FULFILLED,
  NEW_BALANCE_REJECTED,
  DELETE_BALANCE_FULFILLED,
  DELETE_BALANCE_REJECTED
} from '../../actions/admin/types';

const initState = {
  errors: {},
  balances: [],
  loading: false,
  deleteErrors: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_BALANCES_PENDING:
      return { ...state, loading: true, balances: [], errors: {} };

    case FETCH_BALANCES_FULFILLED:
      return {
        ...state,
        balances: _.orderBy(payload.data.balances, '_id', 'asc'),
        loading: false,
        errors: {}
      };

    case FETCH_BALANCES_REJECTED:
      return { ...state, loading: false, balances: [], errors: payload };

    case NEW_BALANCE_PENDING:
      return { ...state, loading: true, errors: {} };

    case NEW_BALANCE_FULFILLED:
      return {
        ...state,
        balances: [...state.balances, payload.data.balance],
        loading: false,
        errors: {}
      };

    case NEW_BALANCE_REJECTED:
      return {
        ...state,
        loading: false,
        errors: {
          message: 'Something went wrong please try again later',
          status: 400
        }
      };

    case DELETE_BALANCE_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        balances: state.balances.filter(item => item._id !== id),
        deleteErrors: {}
      };

    case DELETE_BALANCE_REJECTED:
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
