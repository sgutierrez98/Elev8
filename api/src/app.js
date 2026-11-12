/**
 * Servidor API - Elev8 Sportswear
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * Correcciones aplicadas:
 * - DEF-01: Rate limiting general y estricto para auth
 * - DEF-03: JSON malformado devuelve 400
 * - DEF-04: Cuerpo >100KB devuelve 413
 * - DEF-05: Cabeceras de seguridad HTTP con helmet
 * - DEF-06: Logs sin datos sensibles
 * - DEF-07: X-Powered-By eliminado
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== UTILIDADES DE LOGS (DEF-06) ====================

const isDev = process.env.NODE_ENV === 'development';

/**
 * Enmascara un email para logs seguros
 * Ejemplo: "test@elev8.com" → "te***@elev8.com"
 */
const maskEmail = (email) => {
    if (!email) return 'N/A';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `***@${domain}`;
    return `${user.substring(0, 2)}***@${domain}`;
};

/**
 * Enmascara un token para logs seguros
 * Ejemplo: "token_1_1234567890" → "tok***890"
 */
const maskToken = (token) => {
    if (!token) return 'N/A';
    if (token.length <= 8) return '***';
    return `${token.substring(0, 3)}***${token.substring(token.length - 3)}`;
};

// ==================== MIDDLEWARES ====================

// Deshabilitar X-Powered-By (DEF-07)
app.disable('x-powered-by');

// Helmet: Cabeceras de seguridad HTTP (DEF-05)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS
app.use(cors());

// JSON con límite de tamaño (100KB) - DEF-04
app.use(express.json({ limit: '100kb' }));

// URL-encoded con límite de tamaño
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ==================== RATE LIMITING (DEF-01) ====================

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Demasiadas peticiones. Intenta de nuevo más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Demasiados intentos de autenticación. Intenta de nuevo en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// ==================== RUTA PRINCIPAL ====================
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Elev8 API funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            cart: '/api/cart',
            orders: '/api/orders'
        }
    });
});

// ==================== AUTENTICACIÓN ====================

let users = [];
let userIdCounter = 1;

app.post('/api/auth/register', (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        if (!email || !password || !firstName) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: email, password, firstName'
            });
        }

        const existingUser = users.find(u => u.email === email.toLowerCase());
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El correo electrónico ya está registrado'
            });
        }

        const newUser = {
            id: userIdCounter++,
            email: email.toLowerCase(),
            password: password,
            firstName: firstName,
            lastName: lastName || '',
            phone: phone || '',
            role: 'USER',
            isActive: true,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        const token = 'token_' + newUser.id + '_' + Date.now();

        const userResponse = { ...newUser };
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            token: token,
            user: userResponse
        });

        if (isDev) {
            console.log(`✅ Usuario registrado: ${maskEmail(email)}`);
        }
    } catch (error) {
        if (isDev) {
            console.error('❌ Error en registro:', error.message);
        }
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: isDev ? error.message : undefined
        });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son obligatorios'
            });
        }

        const user = users.find(u => u.email === email.toLowerCase());

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Correo o contraseña incorrectos'
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Correo o contraseña incorrectos'
            });
        }

        const token = 'token_' + user.id + '_' + Date.now();

        const userResponse = { ...user };
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: 'Autenticación satisfactoria',
            token: token,
            user: userResponse
        });

        if (isDev) {
            console.log(`✅ Login exitoso: ${maskEmail(email)}`);
        }
    } catch (error) {
        if (isDev) {
            console.error('❌ Error en login:', error.message);
        }
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: isDev ? error.message : undefined
        });
    }
});

app.get('/api/auth/verify', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        const userId = token.split('_')[1];
        const user = users.find(u => u.id === parseInt(userId));

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        const userResponse = { ...user };
        delete userResponse.password;

        res.status(200).json({
            success: true,
            user: userResponse
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token inválido',
            error: isDev ? error.message : undefined
        });
    }
});

// ==================== PRODUCTOS ====================

const products = [
    { id: 1, sku: 'ELV-CAM-001', name: 'Camiseta Dry-Fit Pro', category: 'Camisetas', emoji: '👕', price: 89900, oldPrice: 109900, rating: 4.8, reviews: 124, badge: 'POPULAR', description: 'Camiseta de alto rendimiento' },
    { id: 2, sku: 'ELV-CAM-002', name: 'Camiseta Compresión Elite', category: 'Camisetas', emoji: '👕', price: 109900, oldPrice: null, rating: 4.5, reviews: 87, badge: 'NUEVO', description: 'Camiseta de compresión' },
    { id: 3, sku: 'ELV-PAN-001', name: 'Pantaloneta Running Elite', category: 'Pantalonetas', emoji: '🩳', price: 75000, oldPrice: 90000, rating: 4.6, reviews: 203, badge: 'OFERTA', description: 'Pantaloneta ligera' },
    { id: 4, sku: 'ELV-PAN-002', name: 'Pantaloneta Ciclismo Pro', category: 'Pantalonetas', emoji: '🩳', price: 98000, oldPrice: null, rating: 4.3, reviews: 56, badge: null, description: 'Pantaloneta acolchada' },
    { id: 5, sku: 'ELV-LIC-001', name: 'Licra Compresión Total', category: 'Licras', emoji: '🩱', price: 120000, oldPrice: 145000, rating: 4.7, reviews: 178, badge: 'OFERTA', description: 'Licra de compresión' }
];

app.get('/api/products', (req, res) => {
    try {
        const { category, onSale, search } = req.query;
        let result = [...products];

        if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
        if (onSale === 'true') result = result.filter(p => p.oldPrice && p.oldPrice > p.price);
        if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener productos', error: isDev ? error.message : undefined });
    }
});

app.get('/api/products/popular', (req, res) => {
    const limit = parseInt(req.query.limit) || 4;
    const result = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
    res.json({ success: true, data: result });
});

app.get('/api/products/onsale', (req, res) => {
    const result = products.filter(p => p.oldPrice && p.oldPrice > p.price);
    res.json({ success: true, data: result });
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    res.json({ success: true, data: product });
});

// ==================== CARRITO ====================

let carts = {};

app.get('/api/cart', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token no proporcionado' });
    const cart = carts[token] || { items: [], subtotal: 0, totalItems: 0 };
    res.json({ success: true, cart: cart });
});

app.post('/api/cart/items', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token no proporcionado' });

    const { productId, quantity = 1, size = '', color = '' } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    if (!carts[token]) carts[token] = { items: [], subtotal: 0, totalItems: 0 };

    const existingItem = carts[token].items.find(i => i.productId === productId && i.size === size && i.color === color);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[token].items.push({ productId: product.id, name: product.name, emoji: product.emoji, price: product.price, quantity, size, color });
    }

    carts[token].subtotal = carts[token].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts[token].totalItems = carts[token].items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({ success: true, message: 'Producto agregado al carrito', cart: carts[token] });
});

// ==================== PEDIDOS ====================

let orders = [];
let orderCounter = 1;

app.post('/api/orders', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token no proporcionado' });

    const cart = carts[token];
    if (!cart || cart.items.length === 0) return res.status(400).json({ success: false, message: 'El carrito está vacío' });

    const { shippingAddress, paymentMethod = 'Tarjeta' } = req.body;
    if (!shippingAddress || !shippingAddress.address) return res.status(400).json({ success: false, message: 'Dirección de envío incompleta' });

    const orderNumber = 'ELV-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(orderCounter++).padStart(4, '0');

    const order = {
        id: orders.length + 1,
        orderNumber,
        items: cart.items,
        subtotal: cart.subtotal,
        shippingCost: cart.subtotal >= 150000 ? 0 : 8000,
        discount: 0,
        total: cart.subtotal + (cart.subtotal >= 150000 ? 0 : 8000),
        status: 'PENDING',
        paymentMethod,
        shippingAddress,
        createdAt: new Date().toISOString()
    };

    orders.push(order);
    delete carts[token];

    res.status(201).json({ success: true, message: 'Pedido creado correctamente', order });
});

app.get('/api/orders', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token no proporcionado' });
    res.json({ success: true, orders });
});

// ==================== MANEJADOR DE ERRORES GLOBAL ====================

app.use((err, req, res, next) => {
    if (isDev) {
        console.error('❌ Error global:', err.message);
    }
    
    const status = err.status || err.statusCode || 500;
    
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'JSON malformado en el cuerpo de la petición'
        });
    }
    
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'El cuerpo de la petición excede el límite permitido'
        });
    }
    
    res.status(status).json({
        success: false,
        message: status === 500 ? 'Error interno del servidor' : err.message,
        error: isDev ? err.message : undefined,
    });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
    console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`   📦 Products: http://localhost:${PORT}/api/products`);
    console.log(`   🛒 Cart: http://localhost:${PORT}/api/cart`);
    console.log(`   📋 Orders: http://localhost:${PORT}/api/orders`);
    console.log(`\n✅ Correcciones aplicadas:`);
    console.log(`   DEF-01: Rate limiting (100 req/15min general, 10 req/15min auth)`);
    console.log(`   DEF-03: JSON malformado → 400 Bad Request`);
    console.log(`   DEF-04: Cuerpo >100KB → 413 Payload Too Large`);
    console.log(`   DEF-05: Cabeceras de seguridad con helmet`);
    console.log(`   DEF-06: Logs sin datos sensibles (emails enmascarados)`);
    console.log(`   DEF-07: X-Powered-By eliminado`);
    console.log(`\n🔧 Modo: ${isDev ? 'DESARROLLO (logs detallados)' : 'PRODUCCIÓN (logs mínimos)'}`);
});
