/* ============================================================
   ELEV8 SPORTSWEAR – Store (State Management)
   js/store.js
   GA6-220501096-AA4-EV03
   ============================================================ */
'use strict';

const Store = (() => {
  // ── Private state ──────────────────────────────────────
  let _cart     = JSON.parse(localStorage.getItem('elev8_cart')     || '[]');
  let _wishlist = JSON.parse(localStorage.getItem('elev8_wishlist') || '[]');
  let _user     = JSON.parse(localStorage.getItem('elev8_user')     || 'null');
  const _listeners = {};

  // ── Private helpers ────────────────────────────────────
  function _save() {
    localStorage.setItem('elev8_cart',     JSON.stringify(_cart));
    localStorage.setItem('elev8_wishlist', JSON.stringify(_wishlist));
    _emit('cart',     _cart);
    _emit('wishlist', _wishlist);
  }

  function _emit(event, data) {
    (_listeners[event] || []).forEach(fn => fn(data));
  }

  // ── Public API ─────────────────────────────────────────
  return {
    // Subscribe to store events
    on(event, fn) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(fn);
    },

    // ── Cart ──────────────────────────────────────────────
    getCart()  { return [..._cart]; },
    cartCount(){ return _cart.reduce((s,i) => s + i.qty, 0); },
    cartTotal(){ return _cart.reduce((s,i) => s + i.price * i.qty, 0); },

    addToCart(product) {
      const key = `${product.id}_${product.size}_${product.color}`;
      const existing = _cart.find(i => i.key === key);
      if (existing) {
        existing.qty = Math.min(existing.qty + (product.qty || 1), 99);
      } else {
        _cart.push({ ...product, key, qty: product.qty || 1 });
      }
      _save();
      Toast.show(`🛒 ${product.name} agregado al carrito`);
    },

    removeFromCart(key) {
      _cart = _cart.filter(i => i.key !== key);
      _save();
    },

    updateQty(key, qty) {
      const item = _cart.find(i => i.key === key);
      if (item) { item.qty = Math.max(1, Math.min(qty, 99)); _save(); }
    },

    clearCart() { _cart = []; _save(); },

    // ── Wishlist ──────────────────────────────────────────
    getWishlist()   { return [..._wishlist]; },
    isWishlisted(id){ return _wishlist.some(i => i.id === id); },

    toggleWishlist(product) {
      const idx = _wishlist.findIndex(i => i.id === product.id);
      if (idx > -1) {
        _wishlist.splice(idx, 1);
        Toast.show(`💔 Eliminado de favoritos`);
        return false;
      } else {
        _wishlist.push(product);
        Toast.show(`❤️ Guardado en favoritos`);
        return true;
      }
    },

    // ── User ──────────────────────────────────────────────
    getUser()  { return _user; },
    setUser(u) { _user = u; localStorage.setItem('elev8_user', JSON.stringify(u)); _emit('user', u); },
    logout()   { _user = null; localStorage.removeItem('elev8_user'); _emit('user', null); },
    isLoggedIn(){ return _user !== null; },
  };
})();
