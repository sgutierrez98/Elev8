const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Todas las rutas de pedidos requieren autenticación
router.get('/', protect, orderController.getOrders);
router.get('/:id', protect, orderController.getOrderById);
router.post('/', protect, orderController.createOrder);
router.put('/:id/cancel', protect, orderController.cancelOrder);

// Ruta para admin: ver todos los pedidos (opcional)
// router.get('/admin/all', protect, admin, orderController.getAllOrders);

module.exports = router;