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
  DELETE_CLINET_PENDING,
  DELETE_CLINET_FULFILLED,
  DELETE_CLINET_REJECTED
} from '../../actions/admin/types';

const initState = {
  client: {},
  clients: [],
  errors: '',
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_CLINETS_PENDING:
      return { ...state, loading: true, errors: '' };

    case FETCH_CLINETS_FULFILLED:
      return {
        ...state,
        clients: _.orderBy(payload.data.clients, '_id', 'asc'),
        loading: false,
        errors: ''
      };

    case FETCH_CLINETS_REJECTED:
      return { ...state, loading: false, errors: payload };

    case FETCH_CLINET_PENDING:
      return { ...state, loading: true, errors: '' };

    case FETCH_CLINET_FULFILLED:
      return {
        ...state,
        client: payload.data.client,
        loading: false,
        errors: ''
      };

    case FETCH_CLINET_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        errors: message ? message : 'error'
      };

    case NEW_CLINET_PENDING:
      return { ...state, loading: true, errors: '' };

    case NEW_CLINET_FULFILLED:
      return {
        ...state,
        clients: [...state.clients, payload.data],
        loading: false,
        errors: ''
      };

    case NEW_CLINET_REJECTED:
      return { ...state, loading: false, errors: payload.data.error };

    case EDIT_CLINET_PENDING:
      return { ...state, loading: true };

    case EDIT_CLINET_FULFILLED:
      const client = payload.data;
      return {
        ...state,
        clients: state.clients.map(
          item => (item.id === client.id ? client : item)
        ),
        loading: false,
        errors: ''
      };

    case EDIT_CLINET_REJECTED:
      return { ...state, loading: false, errors: payload };

    case DELETE_CLINET_PENDING:
      return { ...state, loading: true };

    case DELETE_CLINET_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        clients: state.clients.filter(item => item.id !== id),
        loading: false,
        errors: ''
      };

    case DELETE_CLINET_REJECTED:
      return { ...state, loading: false, errors: payload };

    default:
      return state;
  }
};
