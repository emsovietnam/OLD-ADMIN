import * as types from 'src/constants/store/setting';

export const getSettingReq = () => ({
  type: types.GET_SETTING_REQ
});

export const getSettingSuccess = (data: any) => ({
  type: types.GET_SETTING_SUCCESS,
  payload: {
    data
  }
});
