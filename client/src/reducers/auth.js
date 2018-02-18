import { AUTH_USER, UNAUTH_USER, AUTH_MESSAGE } from '../actions/auth/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        isAdmin: JSON.parse(payload),
        message: null,
        authenticated: true
      };

    case UNAUTH_USER:
      return { ...state, isAdmin: null, message: null, authenticated: false };

    case AUTH_MESSAGE:
      return { ...state, message: payload };

    default:
      return state;
  }
};
