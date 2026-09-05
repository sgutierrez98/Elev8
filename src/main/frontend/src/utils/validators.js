/**
 * Validadores - Elev8 Sportswear
 * Funciones para validar formularios
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import { isValidEmail, isValidPhone } from './helpers';

/**
 * Validar campos de registro
 * @param {Object} data - Datos del formulario
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateRegister = (data) => {
  const errors = {};

  if (!data.email || data.email.trim() === '') {
    errors.email = 'El correo es obligatorio';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Ingresa un correo válido';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'El nombre es obligatorio';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Ingresa un teléfono válido (10 dígitos)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar inicio de sesión
 * @param {Object} data - Datos del formulario
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateLogin = (data) => {
  const errors = {};

  if (!data.email || data.email.trim() === '') {
    errors.email = 'El correo es obligatorio';
  }

  if (!data.password || data.password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar dirección de envío
 * @param {Object} data - Datos del formulario
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateAddress = (data) => {
  const errors = {};

  if (!data.address || data.address.trim() === '') {
    errors.address = 'La dirección es obligatoria';
  }

  if (!data.city || data.city.trim() === '') {
    errors.city = 'La ciudad es obligatoria';
  }

  if (!data.department || data.department.trim() === '') {
    errors.department = 'El departamento es obligatorio';
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'El teléfono es obligatorio';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Ingresa un teléfono válido (10 dígitos)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};