import * as types from 'src/constants/store/login';
import * as actions from 'src/store/action/login';
import * as loginApi from 'src/apis/socialAuth.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { getInfoMe } from 'src/apis/user.api';

export const LoginSagas = function* (action) {
  try {
    let data = action.payload;
    let response: any;
    if (!data.token) {
      response = yield call(loginApi.socialLoginApi, data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        if (localStorage.getItem('isFastLogin') === null)
          localStorage.setItem('isFastLogin', 'no');
      }
    } else {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    }

    if (response.status === 200 && localStorage.getItem('token')) {
      let res = yield call(getInfoMe, localStorage.getItem('token'));
      if (res.status === 200) {
        if (res.data?.id && res.data.theme !== 'light') {
          localStorage.setItem('darkThemeUser', res.data?.theme);
        }
      }
      yield put(actions.loginSuccess());
      window.location.href = '/';
    }
  } catch (err) {
    yield put(
      actions.loginFailed({
        isError: true
      })
    );
  }
};

export function* watchLoginAsync() {
  yield takeEvery(types.LOGIN_REQ, LoginSagas);
}
