import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authStore from './admin/auth';
import userStore from './admin/user';

const rootReducer = combineReducers({
  form,
  authStore,
  userStore
});

export default rootReducer;
