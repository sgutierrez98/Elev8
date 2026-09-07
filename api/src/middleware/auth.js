/**
 * Middleware de Autenticación - Elev8 API
 * Verifica el token JWT en las peticiones protegidas
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

/**
 * Middleware para verificar token JWT
 * @param {Object} req - Petición HTTP
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Siguiente middleware
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Obtener token del header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('🔐 Token recibido:', token ? '✅ Presente' : '❌ No presente');

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado. Acceso denegado.',
      });
    }

    // Verificar el token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token verificado para usuario:', decoded.email);

      // Buscar el usuario
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

      // Adjuntar usuario a la petición
      req.user = user;
      next();
    } catch (jwtError) {
      console.log('❌ Error al verificar token:', jwtError.message);

      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Token inválido. Verifica que el token sea correcto.',
          error: jwtError.message,
        });
      }

      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expirado. Inicia sesión nuevamente.',
        });
      }

      // Si el token está mal formado (malformed)
      if (jwtError.message && jwtError.message.includes('malformed')) {
        return res.status(401).json({
          success: false,
          message: 'Token mal formado. Verifica que el token sea completo.',
          error: 'El token parece estar incompleto o tener caracteres extra',
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Error al verificar token',
        error: jwtError.message,
      });
    }
  } catch (error) {
    console.error('❌ Error en middleware de autenticación:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

/**
 * Middleware para verificar rol de administrador
 * @param {Object} req - Petición HTTP
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Siguiente middleware
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

module.exports = {
  protect,
  admin,
};