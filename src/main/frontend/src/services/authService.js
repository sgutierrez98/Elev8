/**
 * Servicio de Autenticación - Elev8 Sportswear
 * Maneja login, register, logout y verificación de sesión
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import api from './api';

/**
 * Iniciar sesión
 * @param {string} email - Correo del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} - Datos del usuario y token
 */
export const login = async (email, password) => {
  try {
    console.log('🔐 Intentando login:', email);

    const response = await api.post('/api/auth/login', { email, password });

    console.log('📥 Respuesta login:', response.data);

    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token || 'dummy-token');
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('authChanged'));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error en login:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Registrar nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Resultado del registro
 */
export const register = async (userData) => {
  try {
    console.log('📝 Intentando registro:', userData.email);

    const response = await api.post('/api/auth/register', userData);

    console.log('📥 Respuesta registro:', response.data);

    return response.data;
  } catch (error) {
    console.error('❌ Error en registro:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Cerrar sesión
 * @param {boolean} redirect - Si debe redirigir al inicio
 */
export const logout = (redirect = true) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');

  window.dispatchEvent(new Event('authChanged'));

  if (redirect) {
    window.location.href = '/';
  }
};

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean} - true si está autenticado
 */
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return !!(user && token);
};

/**
 * Obtener el usuario actual
 * @returns {Object|null} - Datos del usuario o null
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return null;
};