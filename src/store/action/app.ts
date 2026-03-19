import * as types from 'src/constants/store/app';

export const logoutReq = () => ({
  type: types.LOGOUT
});

export const toggleSideNav = () => ({
  type: types.CLOSE_SIDE_NAV
});
