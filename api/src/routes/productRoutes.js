const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// Rutas públicas
router.get('/', productController.getProducts);
router.get('/popular', productController.getPopularProducts);
router.get('/onsale', productController.getProductsOnSale);
router.get('/related/:id', productController.getRelatedProducts);
router.get('/:id', productController.getProductById);

// Rutas privadas (solo admin)
router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);

module.exports = router;