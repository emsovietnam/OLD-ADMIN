import * as types from 'src/constants/store/setting';
const _ = require('lodash');

const initialState = {};

export const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SETTING_SUCCESS: {
      let { data } = action.payload;
      let newState = _.cloneDeep(data);
      return newState;
    }
    default:
      return state;
  }
};
