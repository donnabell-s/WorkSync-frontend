import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:58581';

const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};

  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  // Ensure proper Content-Type: omit for FormData, default to JSON otherwise
  const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData;
  if (isFormData) {
    // Let the browser set the multipart boundary
    delete (config.headers as any)['Content-Type'];
  } else {
    if (!(config.headers as any)['Content-Type']) {
      (config.headers as any)['Content-Type'] = 'application/json';
    }
  }

  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { http };
