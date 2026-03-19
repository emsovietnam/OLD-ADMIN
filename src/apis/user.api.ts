import axios, { AxiosRequestConfig } from 'axios';
import { BASE_ROOT, USER_TOKEN } from 'src/util/config';

export const loginApi = async (userName, passWord) => {
  let data = JSON.stringify({});

  let config: AxiosRequestConfig = {
    method: 'get',
    url: '',
    data: data
  };
  let response = await axios(config);
  return response;
};

export const getInfoMe = async (token?: any) => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/me`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${USER_TOKEN === '' && token ? token : USER_TOKEN}`
    }
  };
  let response = await axios(configs);
  return response;
};

export const updateThemeApi = async params => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/theme`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params
  };
  let response = await axios(configs);
  return response;
};

export const requestResetPasswordApi = async data => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/forgot_password`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    data
  };
  let response = await axios(configs);
  return response;
};

export const sendEmailResetPasswordApi = async data => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/reconfirmation`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    data
  };
  let response = await axios(configs);
  return response;
};

export const changePasswordApi = async data => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/reset_password`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    data
  };
  let response = await axios(configs);
  return response;
};

export const registrationAccountApi = async data => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/registrations`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    data
  };
  let response = await axios(configs);
  return response;
};

export const checkEmailUniqueApi = async params => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/validate_email`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    },
    params
  };
  let response = await axios(configs);
  return response;
};

export async function signInGoogle(data) {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/authorization`,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data
  };
  let response = await axios(configs);
  return response;
}
