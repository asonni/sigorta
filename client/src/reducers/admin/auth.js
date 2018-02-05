import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_MESSAGE
} from '../../actions/admin/Types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return { ...state, message: '', authenticated: true };

    case UNAUTH_USER:
      return { ...state, authenticated: false };

    case AUTH_MESSAGE:
      return { ...state, message: payload };

    default:
      return state;
  }
};
