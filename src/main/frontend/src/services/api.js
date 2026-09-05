/**
 * Servicio base de API - Elev8 Sportswear
 * Configuración de Axios para comunicarse con el backend Java
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import axios from 'axios';

/**
 * Configuración base de Axios
 * Usa el proxy de React para evitar problemas de CORS
 */
const api = axios.create({
  baseURL: '/elev8',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Interceptor de peticiones
 * Agrega el token de autenticación si existe
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 Petición: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Error en petición:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas
 * Maneja errores de autenticación (401)
 */
api.interceptors.response.use(
  (response) => {
    console.log(`📥 Respuesta: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Error en respuesta:', error.response?.status, error.response?.data);

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;