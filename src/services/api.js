import axios from 'axios';

// --- Configuración Central de Axios ---
// Idealmente, la URL base de tu API debería estar en una variable de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  --- Interceptor para Tokens de Autenticación (Ejemplo) ---
  Si tu aplicación requiere autenticación, este es un buen lugar
  para interceptar las peticiones y añadir el token.

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
*/

export default apiClient;