import axios, { AxiosRequestConfig } from 'axios';
import { BASE_ROOT } from 'src/util/config';

export const socialLoginApi = async (data: any) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/oauth/token`,
    method: 'post',
    headers: {
      //   'content-type': 'application/vnd.api+json',
      // Authorization: `Bearer ${USER_TOKEN}`
    },
    data: {
      username: data.userName,
      password: data.passWord,
      grant_type: 'password',
      client_id: 'Ev2mh1kSfbrea3IodHtNd7aA4QlkMbDIOPr4Y5eEjNg',
      client_secret: 'f2PrtRsNb7scscIn_3R_cz6k_fzPUv1uj7ZollSWBBY',
      scope: 'write read follow'
    }
  };

  let response = await axios(configs);
  return response;
};
