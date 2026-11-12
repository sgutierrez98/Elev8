/**
 * Servidor API - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 2.0.0
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');

// Importar rutas reales
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SEGURIDAD ====================

// Helmet: cabeceras de seguridad
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    credentials: true
}));

// ==================== RATE LIMITING (CORREGIDO DEF-11) ====================

// Límite general para todas las rutas de la API
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: {
        success: false,
        message: 'Demasiadas peticiones. Intenta más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Límite estricto SOLO para login y registro
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10,
    message: {
        success: false,
        message: 'Demasiados intentos de autenticación. Intenta más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Aplicar límite general a todas las rutas de la API
app.use('/api/', generalLimiter);

// Aplicar límite estricto SOLO a login y registro
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// NOTA: /api/auth/verify y /api/auth/profile NO tienen el límite estricto

// ==================== BODY PARSER ====================

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Ocultar X-Powered-By
app.disable('x-powered-by');

// ==================== CONEXIÓN MONGODB ====================

connectDB();

// ==================== RUTAS ====================

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Elev8 API funcionando correctamente',
        version: '2.0.0',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            categories: '/api/categories',
            cart: '/api/cart',
            orders: '/api/orders'
        }
    });
});

// Rutas reales de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ==================== MANEJO DE ERRORES ====================

// Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
});

// Error de JSON malformado (400) o cuerpo demasiado grande (413)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'JSON malformado'
        });
    }

    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'El cuerpo de la petición es demasiado grande'
        });
    }

    console.error('Error global:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
    console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`   📦 Products: http://localhost:${PORT}/api/products`);
    console.log(`   🛒 Cart: http://localhost:${PORT}/api/cart`);
    console.log(`   📋 Orders: http://localhost:${PORT}/api/orders`);
});

module.exports = app;
