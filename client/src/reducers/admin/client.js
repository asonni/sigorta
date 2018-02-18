import _ from 'lodash';
import {
  FETCH_CLINETS_PENDING,
  FETCH_CLINETS_FULFILLED,
  FETCH_CLINETS_REJECTED,
  FETCH_CLINET_PENDING,
  FETCH_CLINET_FULFILLED,
  FETCH_CLINET_REJECTED,
  NEW_CLINET_PENDING,
  NEW_CLINET_FULFILLED,
  NEW_CLINET_REJECTED,
  EDIT_CLINET_PENDING,
  EDIT_CLINET_FULFILLED,
  EDIT_CLINET_REJECTED,
  DELETE_CLINET_FULFILLED,
  DELETE_CLINET_REJECTED
} from '../../actions/admin/types';

const initState = {
  client: {},
  clients: [],
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_CLINETS_PENDING:
      return { ...state, loading: true, error: null };

    case FETCH_CLINETS_FULFILLED:
      return {
        ...state,
        clients: _.orderBy(payload.data.clients, '_id', 'asc'),
        loading: false,
        error: null
      };

    case FETCH_CLINETS_REJECTED:
      return { ...state, loading: false, error: payload };

    case FETCH_CLINET_PENDING:
      return { ...state, loading: true, client: {}, error: null };

    case FETCH_CLINET_FULFILLED:
      return {
        ...state,
        client: payload.data.client,
        loading: false,
        error: null
      };

    case FETCH_CLINET_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        client: {},
        error: payload.data ? message : undefined
      };

    case NEW_CLINET_PENDING:
      return { ...state, loading: true, error: null };

    case NEW_CLINET_FULFILLED:
      return {
        ...state,
        clients: [...state.clients, payload.data.client],
        loading: false,
        error: null
      };

    case NEW_CLINET_REJECTED:
      return { ...state, loading: false, error: payload.data.error };

    case EDIT_CLINET_PENDING:
      return { ...state, loading: true };

    case EDIT_CLINET_FULFILLED:
      const client = payload.data;
      return {
        ...state,
        clients: state.clients.map(
          item => (item._id === client._id ? client : item)
        ),
        loading: false,
        error: null
      };

    case EDIT_CLINET_REJECTED:
      return { ...state, loading: false, error: payload };

    case DELETE_CLINET_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        clients: state.clients.filter(item => item._id !== id),
        error: null
      };

    case DELETE_CLINET_REJECTED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
