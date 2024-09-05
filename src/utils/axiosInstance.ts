import axios from 'axios';

import { authToken } from './localstorage';

const $api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(authToken)}`;
  return config;
});

export default $api;
