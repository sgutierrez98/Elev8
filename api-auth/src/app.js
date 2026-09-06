/**
 * Servidor de Autenticación - Elev8 Auth API
 * Punto de entrada principal para el servicio de autenticación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Inicializar Express
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
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear URL-encoded

// Conectar a MongoDB
connectDB();

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Ruta de prueba (health check)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Elev8 Auth API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      verify: 'GET /api/auth/verify',
      profile: 'GET /api/auth/profile',
    },
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

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
  console.log(`✅ Servidor de autenticación corriendo en http://localhost:${PORT}`);
  console.log(`📋 Registro: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`📋 Login: POST http://localhost:${PORT}/api/auth/login`);
});

module.exports = app;