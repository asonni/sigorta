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
  errors: {},
  loading: false,
  deleteErrors: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_PLANS_PENDING:
      return { ...state, loading: true, plans: [], errors: {} };

    case FETCH_PLANS_FULFILLED:
      return {
        ...state,
        plans: _.orderBy(payload.data.plans, '_id', 'asc'),
        loading: false,
        errors: {}
      };

    case FETCH_PLANS_REJECTED:
      return { ...state, loading: false, plans: [], errors: payload };

    case FETCH_PLAN_PENDING:
      return { ...state, loading: true, plan: {}, errors: {} };

    case FETCH_PLAN_FULFILLED:
      return {
        ...state,
        plan: payload.data.plan,
        loading: false,
        errors: {}
      };

    case FETCH_PLAN_REJECTED:
      const { message } = payload.data.error;
      return {
        ...state,
        loading: false,
        plan: {},
        errors: { message, status: payload.status }
      };

    case NEW_PLAN_PENDING:
      return { ...state, loading: true, errors: {} };

    case NEW_PLAN_FULFILLED:
      return {
        ...state,
        plans: [...state.plans, payload.data.plan],
        loading: false,
        errors: {}
      };

    case NEW_PLAN_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

    case EDIT_PLAN_PENDING:
      return { ...state, loading: true };

    case EDIT_PLAN_FULFILLED:
      const plan = payload.data.plan;
      return {
        ...state,
        plans: state.plans.map(item => (item.id === plan._id ? plan : item)),
        loading: false,
        errors: {}
      };

    case EDIT_PLAN_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { message: payload.data.error, status: payload.status }
      };

    case DELETE_PLAN_FULFILLED:
      const { id } = payload.data;
      return {
        ...state,
        plans: state.plans.filter(item => item._id !== id),
        deleteErrors: {}
      };

    case DELETE_PLAN_REJECTED:
      return {
        ...state,
        deleteErrors: {
          message: payload.data.error.message,
          status: payload.status
        }
      };

    default:
      return state;
  }
};
