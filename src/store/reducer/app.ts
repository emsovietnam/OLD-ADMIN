import * as types from 'src/constants/store/app';
import { LOGIN_SUCCESS } from 'src/constants/store/login';
import _ from 'lodash';

const initialState = {
  isAuthenticated: false
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGOUT: {
      let newState = _.cloneDeep(state);
      localStorage.removeItem('token');
      newState.isAuthenticated = false;
      return newState;
    }
    case LOGIN_SUCCESS: {
      let newState = _.cloneDeep(state);
      newState.isAuthenticated = true;
      return newState;
    }
    default:
      return state;
  }
};
