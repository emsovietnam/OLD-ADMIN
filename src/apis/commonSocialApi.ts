import axios, { AxiosRequestConfig } from 'axios';
import { videoUrlApi } from 'src/store/common';
import { TOKEN_VIDEO_UPLOAD, USER_TOKEN } from 'src/util/config';
import { BASE_ROOT } from 'src/util/config';

export const uploadMediaApi = async (data: any, setState: any, id = null) => {
  let dataFile = new FormData();
  if (!id) {
    dataFile.append('file', data);
    if (data.description) {
      dataFile.append('description', data.description);
    } else if (data.show_url) {
      dataFile.append('show_url', data.show_url);
    }
    if (data.position) {
      dataFile.append('position', data.position);
    }
  } else {
    dataFile.append('description', data.description ? data.description : '');
    dataFile.append('position', data.position ? data.position : null);
  }

  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/media${id ? '/' + id : ''}`,
    method: id ? 'patch' : 'post',
    headers: {
      'content-Type': 'multipart/form-data',
      Authorization: `Bearer ${USER_TOKEN}`
    },
    data: dataFile,
    onUploadProgress: (progressEvent: any) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;
      if (setState) {
        setState(progress);
      }
    }
  };

  let response = await axios(configs);
  return response;
};

export const uploadVideoApi = async (file: any) => {
  let dataFile = new FormData();

  dataFile.append('videofile', file);
  dataFile.append('name', file?.name);
  dataFile.append('token', USER_TOKEN);
  dataFile.append('channelId', '2');
  dataFile.append('privacy', '1');
  dataFile.append('mimeType', 'video/mp4');
  if (file.position) {
    dataFile.append('position', file.position);
  }

  let configs: AxiosRequestConfig = {
    url: `${videoUrlApi}/api/v1/videos/upload`,
    method: 'post',
    headers: {
      'content-Type': 'multipart/form-data',
      Authorization: `Bearer ${TOKEN_VIDEO_UPLOAD}`
    },
    data: dataFile
  };

  let response = await axios(configs);
  return response;
};

export const getMediaApi = async id => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/media/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    }
  };

  let response = await axios(configs);
  return response;
};

export const deleteMediaApi = async id => {
  let configs: AxiosRequestConfig = {
    url: `${BASE_ROOT}/api/v1/media/${id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`
    }
  };

  let response = await axios(configs);
  return response;
};
