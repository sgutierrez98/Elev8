/**
 * Utilidades generales - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

/**
 * Formatear un número como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return '$0';
  return '$' + Number(amount).toLocaleString('es-CO');
};

/**
 * Calcular el porcentaje de descuento
 * @param {number} price - Precio actual
 * @param {number} oldPrice - Precio anterior
 * @returns {number} - Porcentaje de descuento
 */
export const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
};

/**
 * Truncar un texto
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Validar un correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean} - true si es válido
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validar un teléfono colombiano
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
export const isValidPhone = (phone) => {
  const regex = /^(\d{10})$/;
  return regex.test(phone.replace(/\s/g, ''));
};