import * as types from 'src/constants/store/login';
const _ = require('lodash');

const initialState = {
  loading: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQ:
      let newState = _.cloneDeep(state);
      newState.loading = true;
      return newState;
    case types.LOGIN_SUCCESS: {
      let newState = _.cloneDeep(state);
      newState.loading = false;
      return newState;
    }
    case types.LOGIN_FAILED: {
      let newState = _.cloneDeep(state);
      newState.loading = false;
      return newState;
    }
    default:
      return state;
  }
};
