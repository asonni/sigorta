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
  DELETE_USER_PENDING,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED
} from '../../actions/admin/Types';

const initState = {
  user: {},
  users: [],
  errors: '',
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_PENDING:
      return { ...state, loading: true, errors: '' };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: _.orderBy(payload.data.users, 'id', 'asc'),
        loading: false,
        errors: ''
      };

    case FETCH_USERS_REJECTED:
      return { ...state, loading: false, errors: payload };

    case FETCH_USER_PENDING:
      return { ...state, loading: true, errors: '' };

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: payload.data.user,
        loading: false,
        errors: ''
      };

    case FETCH_USER_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        errors: message ? message : 'error'
      };

    case NEW_USER_PENDING:
      return { ...state, loading: true, errors: '' };

    case NEW_USER_FULFILLED:
      console.log(payload.data);
      return {
        ...state,
        users: [...state.users, payload.data],
        loading: false,
        errors: ''
      };

    case NEW_USER_REJECTED:
      return { ...state, loading: false, errors: payload.data.error };

    case EDIT_USER_PENDING:
      return { ...state, loading: true };

    case EDIT_USER_FULFILLED:
      const user = payload.data;
      return {
        ...state,
        users: state.users.map(item => (item.id === user.id ? user : item)),
        loading: false,
        errors: ''
      };

    case EDIT_USER_REJECTED:
      return { ...state, loading: false, errors: payload };

    case DELETE_USER_PENDING:
      return { ...state, loading: true };

    case DELETE_USER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        users: state.users.filter(item => item.id !== id),
        loading: false,
        errors: ''
      };

    case DELETE_USER_REJECTED:
      return { ...state, loading: false, errors: payload };

    default:
      return state;
  }
};
