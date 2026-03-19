import * as types from 'src/constants/store/socialPost';
export const getPostRequestAction = (params: any, type: string) => ({
  type: types.GET_POST_REQUEST,
  payload: {
    params,
    type
  }
});

export const getPostSuccessAction = (activities: any, type) => ({
  type: types.GET_POST_SUCCESS,
  payload: {
    activities,
    type
  }
});

export const resetActivities = (type: any = null) => ({
  type: types.RESET_ACTIVITIES,
  payload: type
});

export const resetPostLoad = () => ({
  type: types.RESET_POST_LOAD
});

export const resetFalsePostLoad = () => ({
  type: types.RESET_FALSE_POST_LOAD
});

export const updatePath = path => ({
  type: types.UPDATE_PATH,
  payload: {
    path
  }
});
