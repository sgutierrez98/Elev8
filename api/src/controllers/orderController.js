const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Obtener pedidos del usuario autenticado (FILTRADO POR USUARIO)
const getOrders = async (req, res) => {
    try {
        // ✅ IMPORTANTE: Filtrar por usuario autenticado
        const orders = await Order.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos',
            error: error.message
        });
    }
};

// Obtener pedido por ID (verificar que pertenece al usuario)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        // ✅ Verificar que el pedido pertenece al usuario
        if (order.userId.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para ver este pedido'
            });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener pedido',
            error: error.message
        });
    }
};

// Crear pedido
const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod = 'Tarjeta' } = req.body;

        if (!shippingAddress || !shippingAddress.address) {
            return res.status(400).json({
                success: false,
                message: 'Dirección de envío incompleta'
            });
        }

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El carrito está vacío'
            });
        }

        const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const shippingCost = subtotal >= 150000 ? 0 : 8000;
        const orderNumber = 'ELV-' + Date.now();

        const order = new Order({
            orderNumber,
            userId: req.user.id,
            items: cart.items.map(i => ({
                productId: i.productId,
                productName: i.name,
                productEmoji: i.emoji,
                price: i.price,
                quantity: i.quantity,
                size: i.size,
                color: i.color
            })),
            subtotal,
            shippingCost,
            discount: 0,
            total: subtotal + shippingCost,
            status: 'PENDING',
            paymentMethod,
            shippingAddress
        });

        await order.save();

        // Vaciar carrito
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Pedido creado correctamente',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear pedido',
            error: error.message
        });
    }
};

// Cancelar pedido
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        if (order.userId.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para cancelar este pedido'
            });
        }

        order.status = 'CANCELLED';
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Pedido cancelado correctamente',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cancelar pedido',
            error: error.message
        });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    cancelOrder
};
