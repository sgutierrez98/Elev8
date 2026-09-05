/**
 * Servicio del Carrito - Elev8 Sportswear
 * Maneja operaciones del carrito de compras (localStorage + API)
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

/**
 * Obtener el carrito desde localStorage
 * @returns {Array} - Lista de items en el carrito
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

/**
 * Guardar el carrito en localStorage
 * @param {Array} cart - Lista de items del carrito
 */
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  // Disparar evento para actualizar el contador en el navbar
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Agregar un producto al carrito
 * @param {Object} product - Producto a agregar
 * @param {string} product.id - ID del producto
 * @param {string} product.name - Nombre del producto
 * @param {string} product.emoji - Emoji del producto
 * @param {number} product.price - Precio del producto
 * @param {number} quantity - Cantidad (default: 1)
 * @param {string} size - Talla (opcional)
 * @param {string} color - Color (opcional)
 */
export const addToCart = (product, quantity = 1, size = null, color = null) => {
  const cart = getCart();
  
  // Buscar si el producto ya existe en el carrito
  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.size === size && item.color === color
  );
  
  if (existingIndex !== -1) {
    // Actualizar cantidad
    cart[existingIndex].quantity += quantity;
  } else {
    // Agregar nuevo item
    cart.push({
      id: product.id,
      name: product.name,
      emoji: product.emoji || '📦',
      price: product.price,
      quantity: quantity,
      size: size,
      color: color,
    });
  }
  
  saveCart(cart);
};

/**
 * Eliminar un producto del carrito
 * @param {number} index - Índice del producto en el carrito
 */
export const removeFromCart = (index) => {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
};

/**
 * Actualizar la cantidad de un producto
 * @param {number} index - Índice del producto en el carrito
 * @param {number} quantity - Nueva cantidad
 */
export const updateQuantity = (index, quantity) => {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveCart(cart);
  }
};

/**
 * Vaciar el carrito completamente
 */
export const clearCart = () => {
  saveCart([]);
};

/**
 * Obtener el número total de items en el carrito
 * @returns {number} - Total de items
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Obtener el subtotal del carrito
 * @returns {number} - Subtotal del carrito
 */
export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Obtener el total del carrito (con envío)
 * @returns {Object} - { subtotal, shipping, total }
 */
export const getCartTotals = () => {
  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 150000 ? 0 : 8000;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
};

/**
 * Verificar si el carrito está vacío
 * @returns {boolean} - true si está vacío
 */
export const isCartEmpty = () => {
  return getCartCount() === 0;
};

/**
 * Obtener el carrito para enviar al backend
 * @returns {Array} - Items del carrito formateados para la API
 */
export const getCartForAPI = () => {
  const cart = getCart();
  return cart.map(item => ({
    productId: item.id,
    productName: item.name,
    productEmoji: item.emoji,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));
};