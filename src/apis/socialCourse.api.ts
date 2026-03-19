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

export const getCalendarCourseApi = async (params: any) => {
  return fetchApiAdmin('courses', 'GET', params, null);
};

export const getDetailCourseApi = async (idCourse: any) => {
  return fetchApiAdmin(`courses/${idCourse}`, 'GET', null, null);
};

export const getCourseCategories = async () => {
  return fetchApiAdmin('course_categories', 'GET', null, null);
};

export const deleteCourseApi = async (id: any) => {
  return fetchApiAdmin(`courses/${id}`, 'DELETE', null, null);
};

export const getListHostOfCourse = async (idCourse: any, params: any) => {
  return fetchApiAdmin(
    `/courses/${idCourse}/invitation_hosts`,
    'GET',
    params,
    null
  );
};

export const getListHostCourse = async (idCourse: any, params: any) => {
  return fetchApiAdmin(`courses/${idCourse}/hosts`, 'GET', params, null);
};

export const getListUserApplyCourse = async (
  idCourse: any,
  action: any,
  params = null
) => {
  return fetchApiAdmin(
    `courses/${idCourse}/course_applies`,
    action,
    null,
    action === 'POST' ? params : null
  );
};

export const getCourseContentLibrary = async () => {
  return fetchApiAdmin('course_content_library', 'GET', null, null);
};

export const approvalCourse = async (idCourse: any, data) => {
  return fetchApiAdmin(
    `courses/${idCourse}/verify_respond`,
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
