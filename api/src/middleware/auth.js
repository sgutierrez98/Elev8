/**
 * Middleware de Autenticación - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

/**
 * Verificar token JWT
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado. Acceso denegado.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado. Token inválido.',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario desactivado.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Error en middleware de autenticación:', error.message);
    res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido',
      error: error.message,
    });
  }
};

/**
 * Verificar rol de administrador
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol de administrador.',
    });
  }
};

module.exports = { protect, admin };