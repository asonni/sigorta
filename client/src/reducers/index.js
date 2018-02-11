import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authStore from './auth';
import userStore from './admin/user';
import clientStore from './admin/client';

const rootReducer = combineReducers({
  form,
  authStore,
  userStore,
  clientStore
});

export default rootReducer;
