const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

// Rutas públicas
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Rutas privadas (solo admin)
router.post('/', protect, admin, categoryController.createCategory);
router.put('/:id', protect, admin, categoryController.updateCategory);
router.delete('/:id', protect, admin, categoryController.deleteCategory);

module.exports = router;