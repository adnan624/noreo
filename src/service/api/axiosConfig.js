// api/axiosConfig.js
import axios from 'axios';
import { logout } from '../../store/slices/authSlice/authSlice';

// Create a function to handle store access
let storeRef = null;

export const injectStore = (store) => {
  storeRef = store;
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (this remains as we need it for auth headers)
    const token = localStorage.getItem('authToken');
    console.log(token , 7689)
    
    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = token;
      config.headers['x-auth-token'] = token;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Dispatch logout action to Redux store if available
      if (storeRef) {
        // The logout action in Redux will handle clearing localStorage
        storeRef.dispatch(logout());
      } else {
        // Fallback if store isn't available
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;