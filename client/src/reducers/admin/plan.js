import _ from 'lodash';
import {
  FETCH_PLANS_PENDING,
  FETCH_PLANS_FULFILLED,
  FETCH_PLANS_REJECTED,
  FETCH_PLAN_PENDING,
  FETCH_PLAN_FULFILLED,
  FETCH_PLAN_REJECTED,
  NEW_PLAN_PENDING,
  NEW_PLAN_FULFILLED,
  NEW_PLAN_REJECTED,
  EDIT_PLAN_PENDING,
  EDIT_PLAN_FULFILLED,
  EDIT_PLAN_REJECTED,
  DELETE_PLAN_FULFILLED,
  DELETE_PLAN_REJECTED
} from '../../actions/admin/types';

const initState = {
  plan: {},
  plans: [],
  error: null,
  loading: false
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_PLANS_PENDING:
      return { ...state, loading: true, plans: [], error: null };

    case FETCH_PLANS_FULFILLED:
      return {
        ...state,
        plans: _.orderBy(payload.data.plans, '_id', 'asc'),
        loading: false,
        error: null
      };

    case FETCH_PLANS_REJECTED:
      return { ...state, loading: false, plans: [], error: payload };

    case FETCH_PLAN_PENDING:
      return { ...state, loading: true, plan: {}, error: null };

    case FETCH_PLAN_FULFILLED:
      return {
        ...state,
        plan: payload.data.plan,
        loading: false,
        error: null
      };

    case FETCH_PLAN_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        plan: {},
        error: message ? message : 'error'
      };

    case NEW_PLAN_PENDING:
      return { ...state, loading: true, error: null };

    case NEW_PLAN_FULFILLED:
      return {
        ...state,
        plans: [...state.plans, payload.data.plan],
        loading: false,
        error: null
      };

    case NEW_PLAN_REJECTED:
      return { ...state, loading: false, error: payload.data.error };

    case EDIT_PLAN_PENDING:
      return { ...state, loading: true };

    case EDIT_PLAN_FULFILLED:
      const plan = payload.data.plan;
      return {
        ...state,
        plans: state.plans.map(item => (item.id === plan._id ? plan : item)),
        loading: false,
        error: null
      };

    case EDIT_PLAN_REJECTED:
      return { ...state, loading: false, error: payload };

    case DELETE_PLAN_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        plans: state.plans.filter(item => item._id !== id),
        error: null
      };

    case DELETE_PLAN_REJECTED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
