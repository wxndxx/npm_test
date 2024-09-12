import axios, {InternalAxiosRequestConfig} from "axios";
import {MyStorage} from "../utils/MyStorage";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const API_BASE_URL = `http://89.111.137.106:3001`
export const API_BASE_URL_2 = `https://api.matalex.team`
export const CLOUD = `https://s3.timeweb.cloud/e6aea069-matalex`
export const BASE_URL = `http://89.111.137.106:3001`

const $api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

const $api2 = axios.create({
  baseURL: API_BASE_URL_2,
  headers: {
    'Content-Type': 'application/json',
  }
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  if(config.headers){
      config.headers.Authorization = MyStorage.get("accessToken");
  }
  return config;
};

const refreshAuthLogic = async (error: any) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${API_BASE_URL_2}/jwt/refresh`, {}, {withCredentials: true})
      MyStorage.set('accessToken', 'Bearer ' + response.data.access);
      window.location.replace('/')
    } catch (e) {
      MyStorage.delete('accessToken');
      window.location.replace('/')
    }
  }
  throw error;
}

$api2.interceptors.request.use(authInterceptor)
createAuthRefreshInterceptor($api2, refreshAuthLogic);

export { $api, $api2 };