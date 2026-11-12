/**
 * Middleware de Autenticación - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * Correcciones aplicadas:
 * - DEF-06: Logs sin datos sensibles (emails enmascarados, sin estado de token)
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// ==================== UTILIDADES DE LOGS (DEF-06) ====================

const isDev = process.env.NODE_ENV === 'development';

/**
 * Enmascara un email para logs seguros
 * Ejemplo: "test@elev8.com" → "te***@elev8.com"
 */
const maskEmail = (email) => {
    if (!email) return 'N/A';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `***@${domain}`;
    return `${user.substring(0, 2)}***@${domain}`;
};

/**
 * Enmascara un token para logs seguros
 * Ejemplo: "token_1_1234567890" → "tok***890"
 */
const maskToken = (token) => {
    if (!token) return 'N/A';
    if (token.length <= 8) return '***';
    return `${token.substring(0, 3)}***${token.substring(token.length - 3)}`;
};

// ==================== MIDDLEWARE ====================

/**
 * Middleware para verificar token JWT
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

        // Solo log en desarrollo (sin exponer el token)
        if (isDev) {
            console.log('🔐 Token recibido:', token ? '✅ Presente' : '❌ No presente');
        }

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
            
            // Solo log en desarrollo (email enmascarado)
            if (isDev) {
                console.log(`✅ Token verificado para usuario: ${maskEmail(decoded.email)}`);
            }

            // Buscar el usuario
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                if (isDev) {
                    console.log('❌ Usuario no encontrado en la base de datos');
                }
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado. Token inválido.',
                });
            }

            if (!user.isActive) {
                if (isDev) {
                    console.log(`❌ Usuario desactivado: ${maskEmail(user.email)}`);
                }
                return res.status(401).json({
                    success: false,
                    message: 'Usuario desactivado.',
                });
            }

            // Adjuntar usuario a la petición
            req.user = user;
            next();
        } catch (jwtError) {
            // Solo log en desarrollo (sin exponer detalles del token)
            if (isDev) {
                console.log('❌ Error al verificar token:', jwtError.name);
            }

            if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido. Verifica que el token sea correcto.',
                    error: isDev ? jwtError.message : undefined,
                });
            }

            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expirado. Inicia sesión nuevamente.',
                });
            }

            if (jwtError.message && jwtError.message.includes('malformed')) {
                return res.status(401).json({
                    success: false,
                    message: 'Token mal formado. Verifica que el token sea completo.',
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Error al verificar token',
                error: isDev ? jwtError.message : undefined,
            });
        }
    } catch (error) {
        if (isDev) {
            console.error('❌ Error en middleware de autenticación:', error.message);
        }
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: isDev ? error.message : undefined,
        });
    }
};

/**
 * Middleware para verificar rol de administrador
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
