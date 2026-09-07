const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'El ID de categoría es obligatorio'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
    },
    icon: {
      type: String,
      default: '📦',
    },
    bgColor: {
      type: String,
      default: '#F5F5F7',
    },
    accentColor: {
      type: String,
      default: '#1A1A2E',
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

CategorySchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  return category;
};

module.exports = mongoose.model('Category', CategorySchema);