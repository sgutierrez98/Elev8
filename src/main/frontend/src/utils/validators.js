/**
 * Validadores - Elev8 Sportswear
 * Funciones para validar formularios y datos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

/**
 * Validar campos de registro de usuario
 * @param {Object} data - Datos del formulario
 * @param {string} data.email - Correo electrónico
 * @param {string} data.password - Contraseña
 * @param {string} data.confirmPassword - Confirmación de contraseña
 * @param {string} data.firstName - Nombre
 * @param {string} data.lastName - Apellido
 * @param {string} data.phone - Teléfono
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateRegister = (data) => {
  const errors = {};
  
  // Email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'El correo es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un correo válido';
  }
  
  // Password
  if (!data.password || data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  // Confirm Password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }
  
  // First Name
  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'El nombre es obligatorio';
  }
  
  // Phone (opcional, pero si se ingresa debe ser válido)
  if (data.phone && !/^(\d{10})$/.test(data.phone.replace(/\s/g, ''))) {
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
 * @param {string} data.email - Correo electrónico
 * @param {string} data.password - Contraseña
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
 * @param {string} data.address - Dirección
 * @param {string} data.city - Ciudad
 * @param {string} data.department - Departamento
 * @param {string} data.phone - Teléfono
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
  } else if (!/^(\d{10})$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Ingresa un teléfono válido (10 dígitos)';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar creación/edición de producto
 * @param {Object} data - Datos del producto
 * @param {string} data.sku - SKU
 * @param {string} data.name - Nombre
 * @param {string} data.categoryId - ID de categoría
 * @param {number} data.price - Precio
 * @param {number} data.stock - Stock
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateProduct = (data) => {
  const errors = {};
  
  if (!data.sku || data.sku.trim() === '') {
    errors.sku = 'El SKU es obligatorio';
  }
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }
  
  if (!data.categoryId || data.categoryId.trim() === '') {
    errors.categoryId = 'La categoría es obligatoria';
  }
  
  if (!data.price || data.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }
  
  if (data.stock === undefined || data.stock === null || data.stock < 0) {
    errors.stock = 'El stock no puede ser negativo';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};