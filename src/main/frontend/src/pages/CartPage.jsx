/**
 * CartPage - Página del carrito de compras
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  getCartTotals,
  isCartEmpty 
} from '../services/cartService';
import { formatPrice } from '../utils/helpers';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, total: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    setTotals(getCartTotals());
  };

  useEffect(() => {
    loadCart();

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      loadCart();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleRemoveItem = (index) => {
    removeFromCart(index);
    setMessage({ type: 'success', text: 'Producto eliminado del carrito' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    updateQuantity(index, newQuantity);
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      clearCart();
      setMessage({ type: 'success', text: 'Carrito vaciado' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (isCartEmpty()) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>🛒 Mi Carrito</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos para empezar</p>
            <Link to="/catalogue" className="btn btn-primary">
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>🛒 Mi Carrito</h1>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-header">
              <span>Producto</span>
              <span>Precio</span>
              <span>Cantidad</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-emoji">{item.emoji || '📦'}</span>
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    {item.size && <div className="cart-item-meta">Talla: {item.size}</div>}
                    {item.color && <div className="cart-item-meta">Color: {item.color}</div>}
                  </div>
                </div>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="cart-item-remove"
                  aria-label="Eliminar producto"
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/catalogue" className="btn btn-ghost">
                ← Seguir comprando
              </Link>
              <button onClick={handleClearCart} className="btn btn-ghost btn-danger">
                🗑 Vaciar carrito
              </button>
            </div>
          </div>

          <div className="cart-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span className={totals.shipping === 0 ? 'free-shipping' : ''}>
                {totals.shipping === 0 ? 'GRATIS' : formatPrice(totals.shipping)}
              </span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-price">{formatPrice(totals.total)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-full btn-lg">
              Proceder al pago →
            </Link>
            <div className="payment-icons">
              <span>💳 Visa</span>
              <span>💳 MC</span>
              <span>🏦 PSE</span>
              <span>📱 Nequi</span>
            </div>
            <p className="secure-text">🔒 Compra 100% segura</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;