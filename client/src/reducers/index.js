import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './admin/auth';
import user from './admin/user';

const rootReducer = combineReducers({
  form,
  auth,
  user
});

export default rootReducer;
