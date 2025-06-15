import axios from 'axios';
import { getUserCode } from '../../lib/utils';
const BASE_URL = 'https://api.url.ajkumarray.com/';

export const commonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-App-Version': '1.0.0', // You can update this based on your app version
  'X-Platform': 'web',
};

export const createAxiosInstance = (withAuth = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: commonHeaders,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (withAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // If no token is found and auth is required, redirect to login
          window.location.href = '/login';
          return Promise.reject('No authentication token found');
        }
      } else {
        const userCode = getUserCode();
        if (userCode) {
          config.headers.UserCode = userCode;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
}; 