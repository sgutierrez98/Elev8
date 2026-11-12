const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    productEmoji: { type: String, default: '📦' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, default: '' },
    color: { type: String, default: '' }
});

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    paymentMethod: { type: String, default: 'Tarjeta' },
    shippingAddress: {
        address: String,
        city: String,
        department: String,
        phone: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
