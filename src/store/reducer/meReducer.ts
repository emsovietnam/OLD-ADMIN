import * as types from 'src/constants/store/user';
const _ = require('lodash');

const initialState = {
  info: {}
};

export const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFO_ME_SUCCESS: {
      let { data } = action.payload;
      let newState = _.cloneDeep(state);
      newState.info = _.cloneDeep(data);
      return newState;
    }
    default:
      return state;
  }
};
