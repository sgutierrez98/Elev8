/**
 * Servicio del Carrito - Elev8 Sportswear
 * Maneja operaciones del carrito de compras
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
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Agregar un producto al carrito
 * @param {Object} product - Producto a agregar
 * @param {number} quantity - Cantidad (default: 1)
 */
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      emoji: product.emoji || '📦',
      price: product.price,
      quantity: quantity,
    });
  }

  saveCart(cart);
};

/**
 * Eliminar un producto del carrito
 * @param {number} index - Índice del producto
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
 * @param {number} index - Índice del producto
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
 * Vaciar el carrito
 */
export const clearCart = () => {
  saveCart([]);
};

/**
 * Obtener el número total de items
 * @returns {number} - Total de items
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Verificar si el carrito está vacío
 * @returns {boolean} - true si está vacío
 */
export const isCartEmpty = () => {
  return getCartCount() === 0;
};

/**
 * Obtener el subtotal del carrito
 * @returns {number} - Subtotal
 */
export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Obtener totales del carrito
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