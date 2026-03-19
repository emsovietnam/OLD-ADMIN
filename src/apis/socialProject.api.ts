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

export const getCalendarProjectApi = async (params: any) => {
  return fetchApiAdmin('projects', 'GET', params, null);
};

export const getDetailProjectApi = async (idProject: any) => {
  return fetchApiAdmin(`projects/${idProject}`, 'GET', null, null);
};

export const getProjectCategories = async () => {
  return fetchApiAdmin('project_categories', 'GET', null, null);
};

export const deleteProjectApi = async (id: any) => {
  return fetchApiAdmin(`projects/${id}`, 'DELETE', null, null);
};

export const getListHostOfProject = async (idProject: any, params: any) => {
  return fetchApiAdmin(
    `/projects/${idProject}/invitation_hosts`,
    'GET',
    params,
    null
  );
};

export const getListHostProject = async (idProject: any, params: any) => {
  return fetchApiAdmin(`projects/${idProject}/hosts`, 'GET', params, null);
};

export const getListUserApplyProject = async (
  idProject: any,
  action: any,
  params = null
) => {
  return fetchApiAdmin(
    `projects/${idProject}/project_applies`,
    action,
    null,
    action === 'POST' ? params : null
  );
};

export const getProjectContentLibrary = async () => {
  return fetchApiAdmin('project_content_library', 'GET', null, null);
};

export const approvalProject = async (idProject: any, data) => {
  return fetchApiAdmin(
    `projects/${idProject}/verify_respond`,
    'POST',
    null,
    data
  );
};

export const getBalance = async () => {
  return fetchApiAdmin(`transactions`, 'GET', null, null);
};

export const rechargeEcoin = async (data: any) => {
  return fetchApiAdmin(`transfer`, 'POST', null, data);
};
