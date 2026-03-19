import * as types from 'src/constants/store/socialPost';
const _ = require('lodash');

const initialState = {
  activities: [],
  hasMore: true,
  page: 1,
  isLoad: false,
  isLoadActivitiesFirst: false,
  flagPath: null,
  error: {},
  scheduledPost: [],
  pinnedPost: [],
  listPostTags: [],
  collectionSaved: [],
  checkLoadMore: false,
  notiPost: null,
  notiGroup: false,
  notiScheduledPostGroup: false,
  isUpdatingPost: false,
  pageFollow: null
};

export const socialPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POST_SUCCESS: {
      let newState = _.cloneDeep(state);
      let newActivity = action.payload.activities;
      if (newActivity.length > 0) {
        if (action.payload.type === 'banner_group') {
          newState.activities = newState.activities.unshift(newActivity[0]);
        } else {
          newState.activities = newState.activities.concat(newActivity);
        }
        newState.hasMore = true;
      } else {
        newState.isLoadActivitiesFirst = true;
        newState.hasMore = false;
      }
      return {
        ...newState,
        activities: _.uniqBy(newState.activities, 'id'),
        checkLoadMore: !state.checkLoadMore
      };
    }

    case types.RESET_ACTIVITIES: {
      let newState;
      if (action.payload === 'activity') {
        newState = {
          ...state,
          activities: []
        };
      } else {
        newState = {
          ...initialState
        };
      }
      return newState;
    }

    case types.UPDATE_PATH: {
      return {
        ...state,
        flagPath: action.payload.path
      };
    }

    case types.RESET_POST_LOAD: {
      let newState = {
        ...state,
        isLoad: true
      };
      return newState;
    }

    case types.RESET_FALSE_POST_LOAD: {
      let newState = {
        ...state,
        isLoad: false
      };
      return newState;
    }

    default:
      return state;
  }
};
