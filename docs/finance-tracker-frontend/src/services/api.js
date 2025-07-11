import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // Backend base URL
});

// Automatically attach the JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
