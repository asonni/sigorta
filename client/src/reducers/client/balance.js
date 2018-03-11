import _ from 'lodash';
import {
  FETCH_BALANCES_PENDING,
  FETCH_BALANCES_FULFILLED,
  FETCH_BALANCES_REJECTED
} from '../../actions/client/types';

const initState = {
  errors: {},
  balances: [],
  loading: false
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

    default:
      return state;
  }
};
