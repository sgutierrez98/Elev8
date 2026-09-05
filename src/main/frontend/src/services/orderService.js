/**
 * Servicio de Órdenes - Elev8 Sportswear
 * Maneja la creación y consulta de pedidos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import api from './api';
import { getCartForAPI, clearCart, getCartTotals } from './cartService';

/**
 * Crear un nuevo pedido
 * @param {Object} orderData - Datos del pedido
 * @param {string} orderData.address - Dirección de envío
 * @param {string} orderData.city - Ciudad
 * @param {string} orderData.department - Departamento
 * @param {string} orderData.paymentMethod - Método de pago
 * @returns {Promise} - Pedido creado
 */
export const createOrder = async (orderData) => {
  try {
    const cartItems = getCartForAPI();
    const totals = getCartTotals();
    
    const payload = {
      ...orderData,
      items: cartItems,
      subtotal: totals.subtotal,
      shippingCost: totals.shipping,
      total: totals.total,
    };
    
    const response = await api.post('/api/orders', payload);
    
    if (response.data.success) {
      // Limpiar el carrito después de crear el pedido
      clearCart();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

/**
 * Obtener pedidos del usuario actual
 * @returns {Promise} - Lista de pedidos
 */
export const getUserOrders = async () => {
  try {
    const response = await api.get('/api/orders');
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
};

/**
 * Obtener un pedido por ID
 * @param {number} orderId - ID del pedido
 * @returns {Promise} - Datos del pedido
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedido ${orderId}:`, error);
    throw error;
  }
};