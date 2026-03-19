import * as types from 'src/constants/store/user';

export const getInfoMeReq = () => ({
  type: types.GET_INFO_ME_REQ
});

export const getInfoMeSuccess = (data: Object) => ({
  type: types.GET_INFO_ME_SUCCESS,
  payload: {
    data
  }
});
