import { call, put, takeEvery } from 'redux-saga/effects';
import { uploadMediaApi, uploadVideoApi } from 'src/apis/commonSocialApi';
import { getListPostApi } from 'src/apis/socialPost.api';
import * as types from 'src/constants/store/socialPost';
import * as actions from 'src/store/action/socialPostAction';

const typesSetting: any = types;

async function uploadMedia(media, type) {
  let fileUpload = media.id
    ? {
        description: media.description,
        position: media.position
      }
    : media;

  if (
    media.type.includes('video') &&
    type !== 'moment' &&
    type !== 'livestream' &&
    type !== 'comment'
  ) {
    return await uploadVideoApi(media);
  } else {
    return (await uploadMediaApi(
      fileUpload,
      null,
      media.id ? media.id : null
    )) as any;
  }
}

export const uploadMediaSaga = async function action(medias, type) {
  let promises: any = [];
  medias?.map((el: any) => {
    return promises.push(uploadMedia(el, type));
  });

  return Promise.all(promises).then(response => {
    return response?.map((el: any) => el.data.id);
  });
};

export const uploadMediasSaga = async function action(medias, type) {
  let promises: any = [];
  medias?.map((el: any) => {
    return promises.push(uploadMedia(el, type));
  });

  return Promise.all(promises).then(response => {
    return response?.map((el: any) => el.data);
  });
};

export const getPostSocialSagas = function* ({ payload }) {
  try {
    const { params, type } = payload;
    let response;
    if (type === 'stream_home') {
      response = yield call(getListPostApi, params);
    }

    if (response.status === 200) {
      let activities = response.data;

      yield put(actions.getPostSuccessAction(activities, type));
    }
  } catch (error) {}
};

export function* watchGetPostSocialAsync() {
  yield takeEvery(typesSetting.GET_POST_REQUEST, getPostSocialSagas);
}
