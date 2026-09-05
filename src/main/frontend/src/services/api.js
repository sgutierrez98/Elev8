/**
 * Servicio base de API - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import axios from 'axios';

/**
 * Configuración base de Axios
 * Usa el proxy de React (configurado en package.json)
 */
const api = axios.create({
  // Usa una URL relativa, el proxy de React la redirigirá
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Interceptor de peticiones
 */
api.interceptors.request.use(
  (config) => {
    // Ajustar la URL para que el proxy funcione
    if (config.url && !config.url.startsWith('http')) {
      config.url = config.url.startsWith('/') ? config.url : '/' + config.url;
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Petición:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas
 */
api.interceptors.response.use(
  (response) => {
    console.log('📥 Respuesta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error API:', error);
    
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