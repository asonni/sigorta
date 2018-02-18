import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authStore from './auth';
import userStore from './admin/user';
import clientStore from './admin/client';
import planStore from './admin/plan';
import balanceStore from './admin/balance';

const rootReducer = combineReducers({
  form,
  authStore,
  userStore,
  clientStore,
  planStore,
  balanceStore
});

export default rootReducer;
