const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Obtener carrito del usuario autenticado
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                subtotal: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
                totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener carrito',
            error: error.message
        });
    }
};

// Agregar producto al carrito
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, size = '', color = '' } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }

        const existingIndex = cart.items.findIndex(
            i => i.productId.toString() === productId && i.size === size && i.color === color
        );

        if (existingIndex !== -1) {
            cart.items[existingIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name: product.name,
                emoji: product.emoji || '📦',
                price: product.price,
                quantity,
                size,
                color
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Producto agregado al carrito',
            cart: {
                items: cart.items,
                subtotal: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
                totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar al carrito',
            error: error.message
        });
    }
};

// Actualizar cantidad
const updateCartItem = async (req, res) => {
    try {
        const { index } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart || index >= cart.items.length) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        if (quantity <= 0) {
            cart.items.splice(index, 1);
        } else {
            cart.items[index].quantity = quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                subtotal: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
                totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar carrito',
            error: error.message
        });
    }
};

// Eliminar item
const removeFromCart = async (req, res) => {
    try {
        const { index } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart || index >= cart.items.length) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        cart.items.splice(index, 1);
        await cart.save();

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                subtotal: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
                totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar del carrito',
            error: error.message
        });
    }
};

// Vaciar carrito
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.status(200).json({
            success: true,
            message: 'Carrito vaciado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al vaciar carrito',
            error: error.message
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
