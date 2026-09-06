/**
 * Servidor Principal - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Elev8 API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      orders: '/api/orders',
    },
  });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error global:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Elev8 API corriendo en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   📦 Products: http://localhost:${PORT}/api/products`);
  console.log(`   📂 Categories: http://localhost:${PORT}/api/categories`);
  console.log(`   🛒 Cart: http://localhost:${PORT}/api/cart`);
  console.log(`   📦 Orders: http://localhost:${PORT}/api/orders`);
});

module.exports = app;