import _ from 'lodash';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  NEW_USER_PENDING,
  NEW_USER_FULFILLED,
  NEW_USER_REJECTED,
  EDIT_USER_PENDING,
  EDIT_USER_FULFILLED,
  EDIT_USER_REJECTED,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED
} from '../../actions/admin/types';

const initState = {
  user: {},
  users: [],
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_PENDING:
      return { ...state, loading: true, users: [], error: null };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: _.orderBy(payload.data.users, '_id', 'asc'),
        loading: false,
        error: null
      };

    case FETCH_USERS_REJECTED:
      return { ...state, loading: false, users: [], error: payload };

    case FETCH_USER_PENDING:
      return { ...state, loading: true, user: {}, error: null };

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: payload.data.user,
        loading: false,
        error: null
      };

    case FETCH_USER_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        user: {},
        error: message ? message : 'error'
      };

    case NEW_USER_PENDING:
      return { ...state, loading: true, error: null };

    case NEW_USER_FULFILLED:
      return {
        ...state,
        users: [...state.users, payload.data.user],
        loading: false,
        error: null
      };

    case NEW_USER_REJECTED:
      return { ...state, loading: false, error: payload.data.error };

    case EDIT_USER_PENDING:
      return { ...state, loading: true };

    case EDIT_USER_FULFILLED:
      const user = payload.data.user;
      return {
        ...state,
        users: state.users.map(item => (item.id === user._id ? user : item)),
        loading: false,
        error: null
      };

    case EDIT_USER_REJECTED:
      return { ...state, loading: false, error: payload };

    case DELETE_USER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        users: state.users.filter(item => item._id !== id),
        error: null
      };

    case DELETE_USER_REJECTED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
