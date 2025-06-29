// src/api/apiProveedores.js
import axios from 'axios';

const apiProveedores = axios.create({
  baseURL: 'http://localhost:8000',
});

apiProveedores.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiProveedores;
