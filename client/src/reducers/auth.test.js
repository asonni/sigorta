import auth from './auth';
import { AUTH_USER, UNAUTH_USER, AUTH_MESSAGE } from '../actions/auth/types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({});
  });

  // it('should return this object {isAdmin: true, message: null, authenticated: true} when some user is login', () => {
  //   expect(
  //     auth(
  //       {},
  //       {
  //         type: AUTH_USER,
  //         // isAdmin: JSON.parse('true'),
  //         message: null,
  //         authenticated: true
  //       }
  //     )
  //   ).toEqual({
  //     isAdmin: JSON.parse('true'),
  //     message: null,
  //     authenticated: ture
  //   });
  // });

  it('should return this object {isAdmin: null, message: null, authenticated: false} when some user is signout', () => {
    expect(
      auth(
        {},
        {
          type: UNAUTH_USER,
          isAdmin: null,
          message: null,
          authenticated: false
        }
      )
    ).toEqual({
      isAdmin: null,
      message: null,
      authenticated: false
    });
  });

  // it('should return an auth message = "some message"', () => {
  //   expect(
  //     auth(
  //       {},
  //       {
  //         type: AUTH_MESSAGE,
  //         message: 'some message'
  //       }
  //     )
  //   ).toEqual({
  //     message: 'some message'
  //   });
  // });
});
