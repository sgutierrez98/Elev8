/**
 * Servicio de Productos - Elev8 Sportswear
 * Maneja operaciones CRUD de productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import api from './api';

/**
 * Obtener todos los productos
 * @param {Object} params - Parámetros de filtro
 * @returns {Promise} - Lista de productos
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/api/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 * @param {number} id - ID del producto
 * @returns {Promise} - Datos del producto
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

/**
 * Obtener productos populares
 * @param {number} limit - Cantidad de productos
 * @returns {Promise} - Lista de productos populares
 */
export const getPopularProducts = async (limit = 4) => {
  try {
    const response = await api.get('/api/products/popular', { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos populares:', error);
    throw error;
  }
};

/**
 * Obtener productos en oferta
 * @returns {Promise} - Lista de productos en oferta
 */
export const getProductsOnSale = async () => {
  try {
    const response = await api.get('/api/products/onsale');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos en oferta:', error);
    throw error;
  }
};

/**
 * Obtener productos por categoría
 * @param {string} category - ID de la categoría
 * @returns {Promise} - Lista de productos
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get('/api/products', { params: { category } });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${category}:`, error);
    throw error;
  }
};