import _ from 'lodash';
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
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
  count: 0,
  user: {},
  users: [],
  errors: {},
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_PENDING:
      return { ...state, isFetching: true, errors: {} };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: _.orderBy(payload.data.rows, 'id', 'asc'),
        count: payload.data.count,
        isFetching: false,
        errors: {}
      };

    case FETCH_USERS_REJECTED:
      return { ...state, isFetching: false, errors: payload };

    case NEW_USER_PENDING:
      return { ...state, isCreating: true };

    case NEW_USER_FULFILLED:
      return {
        ...state,
        users: [...state.users, payload.data],
        isCreating: false,
        errors: {}
      };
    case NEW_USER_REJECTED:
      return { ...state, isCreating: false, errors: payload };

    case EDIT_USER_PENDING:
      return { ...state, isUpdating: true };

    case EDIT_USER_FULFILLED:
      const user = payload.data;
      return {
        ...state,
        users: state.users.map(item => (item.id === user.id ? user : item)),
        isUpdating: false,
        errors: {}
      };

    case EDIT_USER_REJECTED:
      return { ...state, isUpdating: false, errors: payload };

    case DELETE_USER_PENDING:
      return { ...state, isDeleting: true };

    case DELETE_USER_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        users: state.users.filter(item => item.id !== id),
        isDeleting: false,
        errors: {}
      };

    case DELETE_USER_REJECTED:
      return { ...state, isDeleting: false, errors: payload };

    default:
      return state;
  }
};
