import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from 'src/store/action/settingAction';
import * as types from 'src/constants/store/setting';
// import { getSetting } from 'src/apis/setting.api';

// export const getSettingSagas = function* (action) {
//   try {
//     let response = yield call(getSetting);
//     if (response.status === 200) {
//       let { data } = response.data;
//       yield put(actions.getSettingSuccess(data));
//     }
//   } catch (error) {}
// };

// export function* watchGetSettingAsync() {
//   yield takeEvery(types.GET_SETTING_REQ, getSettingSagas);
// }
