import axios, { AxiosInstance } from 'axios';

const BASEURL = 'http://192.168.0.154:19711/api';
// const BASEURL = 'http://192.168.0.154:2222';
// const BASEURL = 'https://evento.sast.fun/api';
const TIMEOUT = 10000;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASEURL,
    timeout: TIMEOUT,
  });
  
  instance.interceptors.request.use((config) => {
    // config.headers['Content-Type'] = 'application/json';
    config.headers['TOKEN'] = window.localStorage.getItem('token');
    return config;
  },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use((response) => {
    if (response.data.success !== true) {
      if (response.data.errCode === '1003') {
        window.localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        throw new Error(response.data.errMsg);
      }
    }
    console.log(response.data);
    
    return response.data;
  },
    (error) => {
      return Promise.reject(error);
    }
  )
  return instance;
};

const request = createAxiosInstance();

export default request;
