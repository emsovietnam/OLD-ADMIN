import { all } from 'redux-saga/effects';
import { watchLoginAsync } from './login';
import { watchGetPostSocialAsync } from './socialPostSaga';
// import { watchGetSettingAsync } from './settingSaga';
// import { watchUserAsync } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchLoginAsync(),
    watchGetPostSocialAsync()
    // watchUserAsync(),
    // watchGetSettingAsync()
  ]);
}
