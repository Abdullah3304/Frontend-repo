import axios from 'axios';

// Use environment variable for backend URL, fallback to localhost for development
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors for token handling
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
