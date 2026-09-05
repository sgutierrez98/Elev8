/**
 * Utilidades generales - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

/**
 * Formatear un número como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada (ej: $89.900)
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return '$0';
  return '$' + Number(amount).toLocaleString('es-CO');
};

/**
 * Formatear un número como moneda con separadores
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad con separadores (ej: 89.900)
 */
export const formatNumber = (amount) => {
  if (amount === undefined || amount === null) return '0';
  return Number(amount).toLocaleString('es-CO');
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
 * @returns {string} - Texto truncado con "..."
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generar un ID único
 * @returns {string} - ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

/**
 * Obtener el nombre de un color a partir de su código hexadecimal
 * @param {string} hexCode - Código hexadecimal (ej: #0F0F14)
 * @returns {string} - Nombre del color
 */
export const getColorName = (hexCode) => {
  const colors = {
    '#0F0F14': 'Negro',
    '#1A237E': 'Azul marino',
    '#B71C1C': 'Rojo',
    '#B0BEC5': 'Gris',
    '#37474F': 'Gris oscuro',
    '#2E7D32': 'Verde',
    '#880E4F': 'Borgoña',
    '#FFFFFF': 'Blanco',
    '#E94560': 'Rojo',
    '#1A1A2E': 'Azul oscuro',
  };
  return colors[hexCode] || hexCode;
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

/**
 * Obtener la fecha actual formateada
 * @returns {string} - Fecha actual (ej: 04/09/2024)
 */
export const getToday = () => {
  const date = new Date();
  return date.toLocaleDateString('es-CO');
};

/**
 * Scroll suave al inicio de la página
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Debounce para evitar múltiples llamadas
 * @param {Function} fn - Función a ejecutar
 * @param {number} delay - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};