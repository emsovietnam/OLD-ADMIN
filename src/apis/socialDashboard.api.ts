import axios, { AxiosRequestConfig } from 'axios';
import { USER_TOKEN } from 'src/util/config';
import { BASE_ROOT } from 'src/util/config';

const fetchApiAdmin = async (endPoint, method, params, _data) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/admin/${endPoint}`,
    method: method,
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params,
    data: _data
  };

  let response = await axios(configs);
  return response;
};

const fetchApiRequest = async (endPoint, method, params, _data) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/${endPoint}`,
    method: method,
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params,
    data: _data
  };

  let response = await axios(configs);
  return response;
};

export const getDataChartApi = async (params: any) => {
  return fetchApiAdmin(`dashboard`, 'GET', params, null);
};
