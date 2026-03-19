// //*****sn.emso.vn*****
export let USER_TOKEN = '';
let tokenUser = localStorage.getItem('token');
if (tokenUser) {
  USER_TOKEN = tokenUser;
}

export const BASE_ROOT = 'https://snapi.emso.asia';
// export const BASE_ROOT = 'https://mxh.emso.asia';

// // rocket chat production env
export const urlRocketChat = 'https://chat.emso.vn';
export const urlWebSocket = 'wss://chat.emso.vn/websocket';

export const TOKEN_VIDEO_UPLOAD = '21fbd3b2e427d9b9bae405e6480695e6bd233e44';

export const urlWebEmso = 'https://sn.emso.vn';
export const urlStreamingSocket = 'wss://comment-ws.emso.vn/api/v1/streaming';
export const urlNotificationApi = 'https://notification-api.emso.vn';
export const urlNotificationSocket = 'https://notification-ws.emso.vn';

//*****cmc-sn.emso.vn*****
// export let USER_TOKEN = '';
// let tokenUser = localStorage.getItem('token');
// if (tokenUser) {
//   USER_TOKEN = tokenUser;
// }

// export const BASE_ROOT = 'https://cmc-sn.emso.vn';
// // export const BASE_ROOT = 'https://mxh.emso.asia';

// // // rocket chat production env
// export const urlRocketChat = 'https://chat.emso.vn';
// export const urlWebSocket = 'wss://chat.emso.vn/websocket';

// export const TOKEN_VIDEO_UPLOAD = '21fbd3b2e427d9b9bae405e6480695e6bd233e44';

// export const urlWebEmso = 'https://cmc-fe.emso.vn';
// export const urlStreamingSocket = 'wss://comment-ws.emso.vn/api/v1/streaming';
// export const urlNotificationApi = 'https://notification-api.emso.vn';
// export const urlNotificationSocket = 'https://notification-ws.emso.vn';

// const baseRootPtube = 'https://pt3.emso.vn';
// export const urlRocketChat = 'https://chat.emso.asia';
// export const urlWebSocket = 'wss://chat.emso.asia/websocket';

// // rocket chat dev env
// export const urlRocketChat = 'http://localhost:3000';
// export const urlWebSocket = 'ws://localhost:3000/websocket';
