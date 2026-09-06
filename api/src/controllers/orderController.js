/**
 * Controladores de Pedidos - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * GET /api/orders
 * Obtener pedidos del usuario
 */
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pedidos',
      error: error.message,
    });
  }
};

/**
 * GET /api/orders/:id
 * Obtener pedido por ID
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado',
      });
    }

    // Verificar que el pedido pertenece al usuario
    if (order.userId.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para ver este pedido',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('❌ Error al obtener pedido:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pedido',
      error: error.message,
    });
  }
};

/**
 * POST /api/orders
 * Crear nuevo pedido
 */
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = 'Tarjeta', couponCode = '' } = req.body;

    // Validar dirección de envío
    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return res.status(400).json({
        success: false,
        message: 'Dirección de envío incompleta',
      });
    }

    // Obtener carrito
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carrito está vacío',
      });
    }

    // Calcular totales
    const subtotal = cart.getSubtotal();
    const shippingCost = subtotal >= 150000 ? 0 : 8000;
    const discount = 0; // Por ahora sin descuentos
    const total = subtotal + shippingCost - discount;

    // Crear pedido
    const order = new Order({
      userId: req.user.id,
      items: cart.items.map(item => ({
        productId: item.productId,
        productName: item.name,
        productEmoji: item.emoji,
        price: item.price,
        quantity: item.quantity,
        size: item.size || '',
        color: item.color || '',
      })),
      subtotal,
      shippingCost,
      discount,
      total,
      paymentMethod,
      shippingAddress,
      couponCode,
    });

    // Generar número de orden
    order.orderNumber = order.generateOrderNumber();

    await order.save();

    // Vaciar carrito
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Pedido creado correctamente',
      order,
    });
  } catch (error) {
    console.error('❌ Error al crear pedido:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al crear pedido',
      error: error.message,
    });
  }
};

/**
 * PUT /api/orders/:id/cancel
 * Cancelar pedido
 */
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado',
      });
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para cancelar este pedido',
      });
    }

    if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: `El pedido no se puede cancelar (estado: ${order.status})`,
      });
    }

    order.status = 'CANCELLED';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Pedido cancelado correctamente',
      order,
    });
  } catch (error) {
    console.error('❌ Error al cancelar pedido:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al cancelar pedido',
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
};