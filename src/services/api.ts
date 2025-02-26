import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
  baseURL: 'https://demometaway.vps-kinghost.net:8485/api',
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
