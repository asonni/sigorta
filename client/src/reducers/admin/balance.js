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
  // balance: {},
  balances: [],
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_BALANCES_PENDING:
      return { ...state, loading: true, balances: [], error: null };

    case FETCH_BALANCES_FULFILLED:
      return {
        ...state,
        balances: _.orderBy(payload.data.balances, '_id', 'asc'),
        loading: false,
        error: null
      };

    case FETCH_BALANCES_REJECTED:
      return { ...state, loading: false, balances: [], error: payload };

    // case FETCH_BALANCE_PENDING:
    //   return { ...state, loading: true, balance: {}, error: null };
    //
    // case FETCH_BALANCE_FULFILLED:
    //   return {
    //     ...state,
    //     balance: payload.data.balance,
    //     loading: false,
    //     error: null
    //   };
    //
    // case FETCH_BALANCE_REJECTED:
    //   const { message } = payload.data.error;
    //   return {
    //     ...state,
    //     loading: false,
    //     balance: {},
    //     error: message ? message : 'error'
    //   };

    case NEW_BALANCE_PENDING:
      return { ...state, loading: true, error: null };

    case NEW_BALANCE_FULFILLED:
      return {
        ...state,
        balances: [...state.balances, payload.data.balance],
        loading: false,
        error: null
      };

    case NEW_BALANCE_REJECTED:
      return { ...state, loading: false, error: payload };

    // case EDIT_BALANCE_PENDING:
    //   return { ...state, loading: true };
    //
    // case EDIT_BALANCE_FULFILLED:
    //   const balance = payload.data;
    //   return {
    //     ...state,
    //     balances: state.balances.map(
    //       item => (item._id === balance._id ? balance : item)
    //     ),
    //     loading: false,
    //     error: null
    //   };
    //
    // case EDIT_BALANCE_REJECTED:
    //   return { ...state, loading: false, error: payload };

    case DELETE_BALANCE_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        balances: state.balances.filter(item => item._id !== id),
        error: null
      };

    case DELETE_BALANCE_REJECTED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
