/**
 * Rutas de Autenticación - Elev8 Auth API
 * Define los endpoints para registro, login y autenticación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión de usuario
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   GET /api/auth/verify
 * @desc    Verificar token JWT
 * @access  Private
 */
router.get('/verify', protect, authController.verifyToken);

/**
 * @route   GET /api/auth/profile
 * @desc    Obtener perfil del usuario autenticado
 * @access  Private
 */
router.get('/profile', protect, authController.getProfile);

module.exports = router;