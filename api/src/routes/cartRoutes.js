const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.get('/', cartController.getCart);
router.post('/items', cartController.addToCart);
router.put('/items/:index', cartController.updateCartItem);
router.delete('/items/:index', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
