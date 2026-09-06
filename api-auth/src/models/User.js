/**
 * Modelo de Usuario - Elev8 Auth API
 * Define la estructura de usuarios en MongoDB
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Esquema de Usuario
 * Define los campos y validaciones para el registro de usuarios
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Ingresa un correo electrónico válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'El apellido no puede tener más de 50 caracteres'],
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

/**
 * Middleware pre-save: Hashea la contraseña antes de guardar
 */
UserSchema.pre('save', async function (next) {
  // Solo hashear si la contraseña fue modificada
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Método para comparar contraseñas
 * @param {string} candidatePassword - Contraseña a comparar
 * @returns {boolean} - true si coinciden
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Método para ocultar información sensible del usuario
 * @returns {Object} - Usuario sin contraseña ni campos sensibles
 */
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

module.exports = mongoose.model('User', UserSchema);