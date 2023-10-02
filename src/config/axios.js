import axios from 'axios'
import { BACKEND_URL } from'./env'
import { getAccessToken, removeAccessToken } from '../utils/local-Storage'

axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

});

axios.interceptors.response.use(                 // ฝั่ง response ถ้า success ไม่ได้ modify 
    response => response,
    error => {                                   // error response 401 token fix  modify 
      if (error.response.status === 401) {
        removeAccessToken();
        window.location.href = '/login';          // redireact ด้วย java script 
      }
      return Promise.reject(error);
    }
  );

// axios.interceptors.response.use(response =>{})
export default axios