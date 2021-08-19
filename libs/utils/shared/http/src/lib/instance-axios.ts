import axios from 'axios';

export const BASE_URL = 'http://localhost:3333/api';
const HTTP_STATUS_UNAUTHORIZED = 401;

//ts-ignore
const interceptor = async (error: Record<any, any>) => {
  const originalRequest = error.config;
  if (error.response.status === HTTP_STATUS_UNAUTHORIZED && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      return axios.request(originalRequest);
    } catch (e) {
      console.log('не авторизований');
    }
  }
  throw error;
};

const instanceAxios = axios.create({ baseURL: BASE_URL, withCredentials: true });

instanceAxios.interceptors.response.use((config) => config, interceptor);

export const api = instanceAxios
