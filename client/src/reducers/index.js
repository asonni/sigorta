import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authStore from './auth';
import userStore from './admin/user';
import clientStore from './admin/client';
import planStore from './admin/plan';
import balanceStore from './admin/balance';
import orderStore from './admin/order';
import salesStore from './admin/sales';
import clientBalanceStore from './client/balance';
import clientOrderStore from './client/order';

const rootReducer = combineReducers({
  form,
  authStore,
  userStore,
  clientStore,
  planStore,
  balanceStore,
  orderStore,
  salesStore,
  clientBalanceStore,
  clientOrderStore
});

export default rootReducer;
