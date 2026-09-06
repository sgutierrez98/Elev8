/**
 * Controladores de Productos - Elev8 API
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const Product = require('../models/Product');

/**
 * GET /api/products
 * Obtener todos los productos
 */
const getProducts = async (req, res) => {
  try {
    const { category, onSale, search, limit = 20, page = 1 } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (onSale === 'true') filter.oldPrice = { $gt: 0 };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('❌ Error al obtener productos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message,
    });
  }
};

/**
 * GET /api/products/popular
 * Obtener productos populares
 */
const getPopularProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const products = await Product.find({ isActive: true })
      .sort({ reviews: -1, rating: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('❌ Error al obtener productos populares:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos populares',
      error: error.message,
    });
  }
};

/**
 * GET /api/products/onsale
 * Obtener productos en oferta
 */
const getProductsOnSale = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
      oldPrice: { $gt: 0 },
      $expr: { $gt: ['$oldPrice', '$price'] },
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('❌ Error al obtener productos en oferta:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos en oferta',
      error: error.message,
    });
  }
};

/**
 * GET /api/products/:id
 * Obtener producto por ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('❌ Error al obtener producto:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message,
    });
  }
};

/**
 * GET /api/products/related/:id
 * Obtener productos relacionados
 */
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    const products = await Product.find({
      _id: { $ne: req.params.id },
      category: product.category,
      isActive: true,
    }).limit(4);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('❌ Error al obtener productos relacionados:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos relacionados',
      error: error.message,
    });
  }
};

/**
 * POST /api/products
 * Crear nuevo producto (solo admin)
 */
const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Verificar SKU único
    const existing = await Product.findOne({ sku: productData.sku });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado',
      });
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      product,
    });
  } catch (error) {
    console.error('❌ Error al crear producto:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message,
    });
  }
};

/**
 * PUT /api/products/:id
 * Actualizar producto (solo admin)
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      product: updated,
    });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/products/:id
 * Eliminar producto (solo admin)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    // Eliminación lógica
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getPopularProducts,
  getProductsOnSale,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};