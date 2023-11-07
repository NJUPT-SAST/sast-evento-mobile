import axios, { AxiosInstance } from 'axios';

const BASEURL = 'http://192.168.0.154:19711/api';
// const BASEURL = 'https://evento.sast.fun/api';
const TIMEOUT = 10000;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASEURL,
    timeout: TIMEOUT,
  });
  
  instance.interceptors.request.use((config) => {
    // config.headers['Content-Type'] = 'application/json';
    const token = window.localStorage.getItem('token');
    config.headers['TOKEN'] = token !== null ? token : null;
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
        console.log(response.data.errCode + ": " + response.data.errMsg);
      }
      throw new Error("Error");
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
