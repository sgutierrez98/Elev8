const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, 'El SKU es obligatorio'],
      unique: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true,
    },
    categoryId: {
      type: String,
      required: [true, 'El ID de categoría es obligatorio'],
      trim: true,
    },
    emoji: {
      type: String,
      default: '📦',
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      enum: ['', 'POPULAR', 'NUEVO', 'OFERTA'],
      default: '',
    },
    brand: {
      type: String,
      default: 'Elev8',
    },
    description: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL'],
    },
    colors: {
      type: [String],
      default: ['#0F0F14'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  delete product.__v;
  return product;
};

module.exports = mongoose.model('Product', ProductSchema);