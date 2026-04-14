import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

// Interceptor for requests (Add Authorization Header)
api.interceptors.request.use(
  (config) => {
    const userCred = localStorage.getItem('userCred');
    if (userCred) {
      const { token } = JSON.parse(userCred);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses (Handle 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401, it means Session Expired or Invalid
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
