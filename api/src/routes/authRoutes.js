/**
 * Rutas de Autenticación - Elev8 API
 * Define los endpoints para registro, login y autenticación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

/**
 * Rutas públicas (sin autenticación)
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

/**
 * Rutas privadas (requieren autenticación)
 */
router.get('/verify', protect, authController.verifyToken);
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.post('/logout', protect, authController.logout);

/**
 * Ruta de administrador (requiere rol ADMIN)
 */
router.get('/admin/users', protect, admin, (req, res) => {
  // Solo administradores pueden acceder
  res.json({
    success: true,
    message: 'Lista de usuarios (solo admin)',
  });
});

module.exports = router;