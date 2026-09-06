/**
 * Modelo de Carrito - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    default: '📦',
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1'],
  },
  size: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

CartSchema.methods.getSubtotal = function () {
  return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

CartSchema.methods.toJSON = function () {
  const cart = this.toObject();
  delete cart.__v;
  return cart;
};

module.exports = mongoose.model('Cart', CartSchema);