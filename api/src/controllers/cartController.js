/**
 * Controladores de Carrito - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * GET /api/cart
 * Obtener carrito del usuario
 */
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    res.status(200).json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.getSubtotal(),
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error('❌ Error al obtener carrito:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener carrito',
      error: error.message,
    });
  }
};

/**
 * POST /api/cart/items
 * Agregar item al carrito
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = '', color = '' } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Producto ID es obligatorio',
      });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Verificar si el producto ya está en el carrito
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        emoji: product.emoji || '📦',
        price: product.price,
        quantity,
        size,
        color,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Producto agregado al carrito',
      cart: {
        items: cart.items,
        subtotal: cart.getSubtotal(),
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error('❌ Error al agregar al carrito:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al agregar al carrito',
      error: error.message,
    });
  }
};

/**
 * PUT /api/cart/items/:index
 * Actualizar item del carrito
 */
const updateCartItem = async (req, res) => {
  try {
    const { index } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado',
      });
    }

    if (index < 0 || index >= cart.items.length) {
      return res.status(400).json({
        success: false,
        message: 'Ítem no encontrado en el carrito',
      });
    }

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Carrito actualizado',
      cart: {
        items: cart.items,
        subtotal: cart.getSubtotal(),
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error('❌ Error al actualizar carrito:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar carrito',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/cart/items/:index
 * Eliminar item del carrito
 */
const removeFromCart = async (req, res) => {
  try {
    const { index } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado',
      });
    }

    if (index < 0 || index >= cart.items.length) {
      return res.status(400).json({
        success: false,
        message: 'Ítem no encontrado en el carrito',
      });
    }

    cart.items.splice(index, 1);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Producto eliminado del carrito',
      cart: {
        items: cart.items,
        subtotal: cart.getSubtotal(),
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error('❌ Error al eliminar del carrito:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar del carrito',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/cart/clear
 * Vaciar carrito
 */
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Carrito vaciado correctamente',
    });
  } catch (error) {
    console.error('❌ Error al vaciar carrito:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al vaciar carrito',
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};