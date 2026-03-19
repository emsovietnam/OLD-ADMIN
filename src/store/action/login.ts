import * as types from 'src/constants/store/login';

export const loginReq = (userName: any, passWord: any, token = null) => ({
  type: types.LOGIN_REQ,
  payload: {
    userName,
    passWord,
    token
  }
});

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});

export const loginFailed = data => ({
  type: types.LOGIN_FAILED,
  payload: data
});
