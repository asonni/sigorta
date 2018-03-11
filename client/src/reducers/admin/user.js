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
  errors: {},
  loading: false,
  deleteErrors: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_PENDING:
      return { ...state, loading: true, users: [], errors: {} };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: _.orderBy(payload.data.users, '_id', 'asc'),
        loading: false,
        errors: {}
      };

    case FETCH_USERS_REJECTED:
      return { ...state, loading: false, users: [], errors: payload };

    case FETCH_USER_PENDING:
      return { ...state, loading: true, user: {}, errors: {} };

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: payload.data.user,
        loading: false,
        errors: {}
      };

    case FETCH_USER_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        user: {},
        errors: { message, status: payload.status }
      };

    case NEW_USER_PENDING:
      return { ...state, loading: true, errors: {} };

    case NEW_USER_FULFILLED:
      return {
        ...state,
        users: [...state.users, payload.data.user],
        loading: false,
        errors: {}
      };

    case NEW_USER_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

    case EDIT_USER_PENDING:
      return { ...state, loading: true };

    case EDIT_USER_FULFILLED:
      const user = payload.data.user;
      return {
        ...state,
        users: state.users.map(item => (item.id === user._id ? user : item)),
        loading: false,
        errors: {}
      };

    case EDIT_USER_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

    case DELETE_USER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        users: state.users.filter(item => item._id !== id),
        deleteErrors: {}
      };

    case DELETE_USER_REJECTED:
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
