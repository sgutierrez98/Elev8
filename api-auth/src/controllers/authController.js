/**
 * Controladores de Autenticación - Elev8 Auth API
 * Maneja la lógica de registro, login y autenticación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Genera un token JWT para el usuario
 * @param {Object} user - Usuario autenticado
 * @returns {string} - Token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

/**
 * Registro de nuevo usuario
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Validar campos obligatorios
    if (!email || !password || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: email, password, firstName',
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado',
      });
    }

    // Crear nuevo usuario
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName: lastName || '',
      phone: phone || '',
    });

    await user.save();

    // Generar token
    const token = generateToken(user);

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token,
      user: user.toJSON(),
    });

    console.log(`✅ Usuario registrado: ${user.email}`);
  } catch (error) {
    console.error('❌ Error en registro:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message,
    });
  }
};

/**
 * Inicio de sesión
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son obligatorios',
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Correo o contraseña incorrectos',
      });
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario desactivado. Contacta al administrador.',
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Correo o contraseña incorrectos',
      });
    }

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generar token
    const token = generateToken(user);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Autenticación satisfactoria',
      token,
      user: user.toJSON(),
    });

    console.log(`✅ Login exitoso: ${user.email}`);
  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
};

/**
 * Verificar token JWT (para middleware)
 * GET /api/auth/verify
 */
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('❌ Error al verificar token:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: error.message,
    });
  }
};

/**
 * Obtener perfil del usuario autenticado
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('❌ Error al obtener perfil:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  getProfile,
};