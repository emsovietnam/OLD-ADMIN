import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { USER_TOKEN } from 'src/util/config';
import { BASE_ROOT } from 'src/util/config';

const fetchApi = async (endPoint, method, params, data) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/${endPoint}`,
    method: method,
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params,
    data
  };

  let response = await axios(configs);
  return response;
};

export const getListPostApi = async (params: Object) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/timelines/home`,
    method: 'get',
    headers: {
      //   'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params
  };

  let response = await axios(configs);
  return response;
};

export const getListMomentApi = async (params: Object) => {
  return fetchApi('timelines/moment', 'GET', params, {});
};

export const getPostMediaApi = async (id: any) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/media/${id}`,
    method: 'get',
    headers: {
      //   'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${USER_TOKEN}`
    }
  };

  let response = await axios(configs);
  return response;
};
