/**
 * Controladores de Categorías - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const Category = require('../models/Category');
const Product = require('../models/Product');

/**
 * GET /api/categories
 * Obtener todas las categorías
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });

    // Contar productos por categoría
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({
          category: category.name,
          isActive: true,
        });
        return {
          ...category.toJSON(),
          productCount: count,
        };
      })
    );

    res.status(200).json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message,
    });
  }
};

/**
 * GET /api/categories/:id
 * Obtener categoría por ID
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      id: req.params.id,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    const count = await Product.countDocuments({
      category: category.name,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      category: {
        ...category.toJSON(),
        productCount: count,
      },
    });
  } catch (error) {
    console.error('❌ Error al obtener categoría:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener categoría',
      error: error.message,
    });
  }
};

/**
 * POST /api/categories
 * Crear categoría (solo admin)
 */
const createCategory = async (req, res) => {
  try {
    const { id, name, icon, bgColor, accentColor } = req.body;

    if (!id || !name) {
      return res.status(400).json({
        success: false,
        message: 'ID y nombre son obligatorios',
      });
    }

    const existing = await Category.findOne({ id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'El ID de categoría ya existe',
      });
    }

    const category = new Category({
      id,
      name,
      icon: icon || '📦',
      bgColor: bgColor || '#F5F5F7',
      accentColor: accentColor || '#1A1A2E',
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      category,
    });
  } catch (error) {
    console.error('❌ Error al crear categoría:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al crear categoría',
      error: error.message,
    });
  }
};

/**
 * PUT /api/categories/:id
 * Actualizar categoría (solo admin)
 */
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    const { name, icon, bgColor, accentColor, isActive } = req.body;
    if (name) category.name = name;
    if (icon) category.icon = icon;
    if (bgColor) category.bgColor = bgColor;
    if (accentColor) category.accentColor = accentColor;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Categoría actualizada correctamente',
      category,
    });
  } catch (error) {
    console.error('❌ Error al actualizar categoría:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar categoría',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/categories/:id
 * Eliminar categoría (solo admin)
 */
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    category.isActive = false;
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Categoría eliminada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar categoría:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar categoría',
      error: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};