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

export const createCampaignsApi = async (data: any, type: any) => {
  var formdata = new FormData();
  formdata.append('title', data.title);
  formdata.append('description', data.description ?? '');
  if (data.banner) {
    formdata.append('banner[id]', data.banner);
  }
  if (data.start_date) {
    formdata.append('start_date', data.start_date);
  }
  if (data.due_date) {
    formdata.append('due_date', data.due_date);
  }
  return fetchApiAdmin(
    type === 'create' ? 'campaigns' : `campaigns/${type}`,
    type === 'create' ? 'POST' : 'PATCH',
    null,
    formdata
  );
  return fetchApiAdmin('campaigns', 'POST', null, formdata);
};

export const getListCampaignsApi = async () => {
  return fetchApiAdmin('campaigns', 'GET', null, null);
};

export const getDetailCampaignsApi = async (id: any) => {
  return fetchApiAdmin(`campaigns/${id}`, 'GET', null, null);
};

export const UDCampaignsApi = async (id: any, type: any, data: any) => {
  return fetchApiAdmin(
    `campaigns/${id}`,
    type,
    null,
    type === 'delete' ? null : data
  );
};
