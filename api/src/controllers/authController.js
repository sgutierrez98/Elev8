/**
 * Controladores de Autenticación - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const User = require('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * POST /api/auth/register
 * Registro de nuevo usuario
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: email, password, firstName',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado',
      });
    }

    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName: lastName || '',
      phone: phone || '',
    });

    await user.save();

    // Crear carrito vacío para el usuario
    await Cart.create({ userId: user._id, items: [] });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token,
      user: user.toJSON(),
    });
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
 * POST /api/auth/login
 * Inicio de sesión
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son obligatorios',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Correo o contraseña incorrectos',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario desactivado',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Correo o contraseña incorrectos',
      });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Autenticación satisfactoria',
      token,
      user: user.toJSON(),
    });
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
 * GET /api/auth/verify
 * Verificar token JWT
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
      message: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido',
      error: error.message,
    });
  }
};

/**
 * GET /api/auth/profile
 * Obtener perfil del usuario autenticado
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

/**
 * PUT /api/auth/profile
 * Actualizar perfil del usuario autenticado
 */
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado correctamente',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  getProfile,
  updateProfile,
};