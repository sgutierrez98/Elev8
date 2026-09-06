const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// Todas las rutas de carrito requieren autenticación
router.get('/', protect, cartController.getCart);
router.post('/items', protect, cartController.addToCart);
router.put('/items/:index', protect, cartController.updateCartItem);
router.delete('/items/:index', protect, cartController.removeFromCart);
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;