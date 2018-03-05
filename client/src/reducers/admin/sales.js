import {
  FETCH_SALES_PENDING,
  FETCH_SALES_FULFILLED,
  FETCH_SALES_REJECTED
} from '../../actions/admin/types';

const initState = {
  sales: {},
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_SALES_PENDING:
      return { ...state, loading: true, error: null };

    case FETCH_SALES_FULFILLED:
      return {
        ...state,
        sales: payload.data,
        loading: false,
        error: null
      };

    case FETCH_SALES_REJECTED:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};