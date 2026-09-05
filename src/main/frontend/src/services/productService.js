/**
 * Servicio de Productos - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import api from './api';

/**
 * Obtener todos los productos
 */
export const getProducts = async (params = {}) => {
  try {
    // Usar URL absoluta para que el proxy funcione
    const response = await api.get('/elev8/api/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtener productos populares
 */
export const getPopularProducts = async (limit = 4) => {
  try {
    const response = await api.get('/elev8/api/products/popular', { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos populares:', error);
    throw error;
  }
};

/**
 * Obtener productos en oferta
 */
export const getProductsOnSale = async () => {
  try {
    const response = await api.get('/elev8/api/products/onsale');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos en oferta:', error);
    throw error;
  }
};

/**
 * Obtener producto por ID
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/elev8/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

/**
 * Buscar productos
 */
export const searchProducts = async (searchText) => {
  try {
    const response = await api.get('/elev8/api/products', { params: { search: searchText } });
    return response.data;
  } catch (error) {
    console.error(`Error al buscar productos "${searchText}":`, error);
    throw error;
  }
};

/**
 * Obtener productos por categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get('/elev8/api/products', { params: { category } });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${category}:`, error);
    throw error;
  }
};