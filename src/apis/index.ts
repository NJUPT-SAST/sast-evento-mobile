import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Toast } from '@capacitor/toast';
import axios, { AxiosInstance } from 'axios';
import { useSettingStore } from '../util/setting';

// isUsedWithoutLogin is a boolean value that indicates whether the user has chosen to continue browsing without logging in.
const showActions = async () => {
  const settingStore = useSettingStore.getState();
  if (settingStore.isGuestMode) {
    return;
  }
  const result = await ActionSheet.showActions({
    title: '是否以游客身份继续浏览',
    message: '如果不登录，部分功能会受到限制',
    options: [
      {
        title: '前往登录',
      },
      {
        title: '暂不登录',
        style: ActionSheetButtonStyle.Cancel,
      },
    ],
  });
  console.log('Action Sheet result:', result.index);
  
  if (result.index === 0) {
    window.location.href = '/login';
  } else {
    settingStore.setIsGuestMode(true);
  }
};

// const BASEURL = 'http://192.168.0.154:19711/api';
const BASEURL = 'https://evento.sast.fun/api';
const TIMEOUT = 10000;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASEURL,
    timeout: TIMEOUT,
  });

  instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers['TOKEN'] = token !== null ? token : null;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => {
    if (response.data.success === true) {
      console.log(response.data);
      return response.data;
    }
    
    if ((response.data.errCode === 1000 && String(response.data.errMsg).includes('login has expired')) || response.data.errCode === 1003) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userInfo');
      showActions();
    } else {
      Toast.show({
        text: response.data.errCode + " + " + response.data.errMsg,
        duration: "short"
      })
    }

    throw new Error("Error");
  }, (error) => {
    return Promise.reject(error);
  }
  )
  return instance;
};

const request = createAxiosInstance();

export default request;
