import { call, put, takeEvery } from 'redux-saga/effects';
import { getInfoMe } from 'src/apis/user.api';
import * as types from 'src/constants/store/user';
import * as actions from 'src/store/action/userAction';

const typesUser: any = types;

export const getInfoMeSagas = function* ({ payload }) {
  try {
    let response = yield call(getInfoMe);
    if (response.status === 200) {
      let { data } = response.data;
      let infoMe = {
        ...data
      };
      yield put(actions.getInfoMeSuccess(infoMe));
    }
  } catch (err) {}
};

export function* watchUserAsync() {
  yield takeEvery(typesUser.GET_INFO_ME_REQ, getInfoMeSagas);
}
