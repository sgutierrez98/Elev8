'use strict';

// ──────────────────────────────────────────────────────────────
// 1. DATOS DE PRODUCTOS (Única fuente de verdad)
// ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'camisetas', name: 'Camisetas', icon: '👕', count: 2, bg: '#E8EEFF', accent: '#1A1A2E' },
  { id: 'pantalonetas', name: 'Pantalonetas', icon: '🩳', count: 2, bg: '#FFE8E8', accent: '#C62828' },
  { id: 'licras', name: 'Licras', icon: '🩱', count: 2, bg: '#E8FFE8', accent: '#2E7D32' },
  { id: 'chaquetas', name: 'Chaquetas', icon: '🧥', count: 2, bg: '#FFFDE8', accent: '#F57F17' },
  { id: 'accesorios', name: 'Accesorios', icon: '🎒', count: 4, bg: '#F3E8FF', accent: '#6A1B9A' },
];

const PRODUCTS = [
  { id: 1, sku: 'ELV-CAM-001', name: 'Camiseta Dry-Fit Pro', cat: 'camisetas', emoji: '👕', price: 89900, oldPrice: 109900, rating: 4.8, reviews: 124, badge: 'POPULAR', brand: 'Elev8', desc: 'Camiseta de alto rendimiento con tecnología de secado rápido y protección UV UPF 30+.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['#0F0F14', '#1A237E', '#B71C1C', '#B0BEC5'] },
  { id: 2, sku: 'ELV-CAM-002', name: 'Camiseta Compresión Elite', cat: 'camisetas', emoji: '👕', price: 109900, oldPrice: null, rating: 4.5, reviews: 87, badge: 'NUEVO', brand: 'Elev8', desc: 'Camiseta de compresión para entrenamiento de fuerza.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['#0F0F14', '#1A237E', '#37474F'] },
  { id: 3, sku: 'ELV-PAN-001', name: 'Pantaloneta Running Elite', cat: 'pantalonetas', emoji: '🩳', price: 75000, oldPrice: 90000, rating: 4.6, reviews: 203, badge: 'OFERTA', brand: 'Elev8', desc: 'Pantaloneta ligera con bolsillos laterales y tecnología de ventilación.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['#0F0F14', '#1A237E', '#2E7D32'] },
  { id: 4, sku: 'ELV-PAN-002', name: 'Pantaloneta Ciclismo Pro', cat: 'pantalonetas', emoji: '🩳', price: 98000, oldPrice: null, rating: 4.3, reviews: 56, badge: null, brand: 'Elev8', desc: 'Pantaloneta acolchada para ciclismo de ruta y montaña.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#0F0F14', '#B0BEC5'] },
  { id: 5, sku: 'ELV-LIC-001', name: 'Licra Compresión Total', cat: 'licras', emoji: '🩱', price: 120000, oldPrice: 145000, rating: 4.7, reviews: 178, badge: 'OFERTA', brand: 'Elev8', desc: 'Licra de compresión graduada para fuerza, resistencia y recuperación muscular.', sizes: ['XS', 'S', 'M', 'L'], colors: ['#0F0F14', '#880E4F', '#1A237E'] },
  { id: 6, sku: 'ELV-LIC-002', name: 'Licra Running Mujer', cat: 'licras', emoji: '🩱', price: 95000, oldPrice: null, rating: 4.5, reviews: 94, badge: 'NUEVO', brand: 'Elev8', desc: 'Licra de alto rendimiento para running con bolsillo trasero.', sizes: ['XS', 'S', 'M', 'L'], colors: ['#880E4F', '#1A237E', '#0F0F14'] },
  { id: 7, sku: 'ELV-CHA-001', name: 'Chaqueta Cortaviento Sport', cat: 'chaquetas', emoji: '🧥', price: 185000, oldPrice: 220000, rating: 4.4, reviews: 67, badge: 'OFERTA', brand: 'Elev8', desc: 'Chaqueta resistente al viento con empaque compacto.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['#B71C1C', '#0F0F14', '#1A237E'] },
  { id: 8, sku: 'ELV-CHA-002', name: 'Chaqueta Térmica Pro', cat: 'chaquetas', emoji: '🧥', price: 220000, oldPrice: null, rating: 4.6, reviews: 43, badge: 'NUEVO', brand: 'Elev8', desc: 'Chaqueta térmica para entrenamientos en clima frío.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#0F0F14', '#37474F', '#B0BEC5'] },
  { id: 9, sku: 'ELV-ACC-001', name: 'Medias Deportivas Pro', cat: 'accesorios', emoji: '🧦', price: 25000, oldPrice: 30000, rating: 4.8, reviews: 412, badge: 'POPULAR', brand: 'Elev8', desc: 'Medias con amortiguación reforzada en talón y puntera.', sizes: ['Única'], colors: ['#FFFFFF', '#0F0F14', '#B0BEC5'] },
  { id: 10, sku: 'ELV-ACC-002', name: 'Gorra Deportiva Elev8', cat: 'accesorios', emoji: '🧢', price: 45000, oldPrice: null, rating: 4.4, reviews: 88, badge: null, brand: 'Elev8', desc: 'Gorra con visera curva, material Dry-Fit y ajuste velcro.', sizes: ['Única'], colors: ['#0F0F14', '#1A237E', '#B71C1C'] },
  { id: 11, sku: 'ELV-ACC-003', name: 'Guantes Training Pro', cat: 'accesorios', emoji: '🥊', price: 55000, oldPrice: null, rating: 4.2, reviews: 34, badge: 'NUEVO', brand: 'Elev8', desc: 'Guantes de entrenamiento con protección de palma y dedos libres.', sizes: ['S/M', 'L/XL'], colors: ['#0F0F14', '#B71C1C'] },
  { id: 12, sku: 'ELV-ACC-004', name: 'Morral Deportivo Elev8', cat: 'accesorios', emoji: '🎒', price: 135000, oldPrice: 160000, rating: 4.5, reviews: 71, badge: 'OFERTA', brand: 'Elev8', desc: 'Morral deportivo 28L con compartimiento para laptop y malla transpirable.', sizes: ['Única'], colors: ['#0F0F14', '#37474F', '#B71C1C'] },
];

const COUPONS = {
  'ELEV10': { type: 'percent', value: 10, minOrder: 50000, desc: '10% de descuento' },
  'ELEV20': { type: 'percent', value: 20, minOrder: 200000, desc: '20% en pedidos +$200K' },
  'ENVGRATIS': { type: 'fixed', value: 8000, minOrder: 80000, desc: 'Envío gratis' },
};

// ──────────────────────────────────────────────────────────────
// 2. PRODUCT HELPERS
// ──────────────────────────────────────────────────────────────

const Products = {
  getAll() { return PRODUCTS; },
  getById(id) { return PRODUCTS.find(p => p.id === id); },
  getByCategory(cat) { return PRODUCTS.filter(p => p.cat === cat); },
  getFeatured() { return PRODUCTS.filter(p => p.badge); },
  getPopular() { return [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4); },
  getRelated(id, n = 4) {
    const p = Products.getById(id);
    return PRODUCTS.filter(x => x.id !== id && x.cat === p?.cat).slice(0, n);
  },
  filter({ category, maxPrice, minRating, badge, search, sort } = {}) {
    let res = [...PRODUCTS];
    if (category && category !== 'todos') res = res.filter(p => p.cat === category);
    if (maxPrice) res = res.filter(p => p.price <= maxPrice);
    if (minRating) res = res.filter(p => p.rating >= minRating);
    if (badge) res = res.filter(p => p.badge === badge);
    if (search) res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') res.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') res.sort((a, b) => b.price - a.price);
    if (sort === 'rating') res.sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') res.sort((a, b) => b.reviews - a.reviews);
    return res;
  },
};

// ──────────────────────────────────────────────────────────────
// 3. STORE (Estado Global)
// ──────────────────────────────────────────────────────────────

const Store = (() => {
  let _cart = JSON.parse(localStorage.getItem('elev8_cart') || '[]');
  let _wishlist = JSON.parse(localStorage.getItem('elev8_wishlist') || '[]');
  let _user = JSON.parse(localStorage.getItem('elev8_user') || 'null');
  const _listeners = {};

  function _save() {
    localStorage.setItem('elev8_cart', JSON.stringify(_cart));
    localStorage.setItem('elev8_wishlist', JSON.stringify(_wishlist));
    _emit('cart', _cart);
    _emit('wishlist', _wishlist);
  }

  function _emit(event, data) {
    (_listeners[event] || []).forEach(fn => fn(data));
  }

  return {
    on(event, fn) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(fn);
    },

    // Cart
    getCart() { return [..._cart]; },
    cartCount() { return _cart.reduce((s, i) => s + i.qty, 0); },
    cartTotal() { return _cart.reduce((s, i) => s + i.price * i.qty, 0); },

    addToCart(product) {
      const key = `${product.id}_${product.size || 'M'}_${product.color || '#0F0F14'}`;
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

    // Wishlist
    getWishlist() { return [..._wishlist]; },
    isWishlisted(id) { return _wishlist.some(i => i.id === id); },

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

    // User
    getUser() { return _user; },
    setUser(u) { _user = u; localStorage.setItem('elev8_user', JSON.stringify(u)); _emit('user', u); },
    logout() { _user = null; localStorage.removeItem('elev8_user'); _emit('user', null); },
    isLoggedIn() { return _user !== null; },
  };
})();

// ──────────────────────────────────────────────────────────────
// 4. UTILITIES
// ──────────────────────────────────────────────────────────────

const Fmt = {
  price(n) { return '$' + Number(n).toLocaleString('es-CO'); },
  date(d) { return new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }); },
  truncate(str, max = 50) { return str.length > max ? str.slice(0, max) + '…' : str; },
};

function renderStars(rating, max = 5) {
  let html = '';
  for (let i = 1; i <= max; i++) {
    html += i <= Math.floor(rating) ? '★' : (i - 0.5 <= rating ? '½' : '☆');
  }
  return `<span class="stars" aria-label="${rating} de ${max} estrellas">${html}</span>`;
}

function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const ScrollLock = {
  lock() { document.body.style.overflow = 'hidden'; },
  unlock() { document.body.style.overflow = ''; },
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ──────────────────────────────────────────────────────────────
// 5. TOAST
// ──────────────────────────────────────────────────────────────

const Toast = (() => {
  let el = null,
    timer = null;

  function _createEl() {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }

  return {
    show(msg, duration = 3000) {
      if (!el) _createEl();
      el.innerHTML = `<span>${msg}</span>`;
      el.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('show'), duration);
    }
  };
})();

// ──────────────────────────────────────────────────────────────
// 6. UI COMPONENT BUILDERS
// ──────────────────────────────────────────────────────────────

function buildProductCard(p, linkPrefix = '') {
  const inWish = Store.isWishlisted(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <article class="card product-card" itemscope itemtype="https://schema.org/Product" data-id="${p.id}">
    <div class="prod-img-wrap">
      <div class="prod-img-inner">${p.emoji}</div>
      ${p.badge ? `<span class="badge badge-red prod-badge">${p.badge}</span>` : ''}
      ${discount ? `<span class="badge badge-green prod-badge" style="top:10px;left:${p.badge ? '72px' : '10px'}">-${discount}%</span>` : ''}
      <button class="prod-wish ${inWish ? 'active' : ''}" onclick="UI.toggleWish(event,${p.id})" aria-label="${inWish ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
        ${inWish ? '❤️' : '🤍'}
      </button>
      <div class="prod-overlay">
        <a href="${linkPrefix}pages/product.html?id=${p.id}" class="btn btn-primary btn-sm">Ver detalle</a>
      </div>
    </div>
    <div class="prod-info">
      <p class="prod-category">${CATEGORIES.find(c => c.id === p.cat)?.name || p.cat}</p>
      <h3 class="prod-name" itemprop="name">
        <a href="${linkPrefix}pages/product.html?id=${p.id}">${p.name}</a>
      </h3>
      <div class="prod-rating">
        ${renderStars(p.rating)}
        <span class="prod-reviews">(${p.reviews})</span>
      </div>
      <div class="prod-prices">
        <span class="price" itemprop="price" content="${p.price}">${Fmt.price(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${Fmt.price(p.oldPrice)}</span>` : ''}
      </div>
      <button class="btn btn-primary btn-full btn-sm" onclick="UI.addToCart(event,${p.id})">
        🛒 Agregar al carrito
      </button>
    </div>
  </article>`;
}

// ──────────────────────────────────────────────────────────────
// 7. UI ACTIONS
// ──────────────────────────────────────────────────────────────

const UI = {
  toggleWish(event, productId) {
    event.stopPropagation();
    const p = Products.getById(productId);
    if (!p) return;
    const added = Store.toggleWishlist(p);
    const btn = event.currentTarget;
    btn.textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('active', added);
    this.updateBadges();
  },

  addToCart(event, productId) {
    event.stopPropagation();
    const p = Products.getById(productId);
    if (!p) return;
    Store.addToCart({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, size: p.sizes?.[2] || p.sizes?.[0] || 'M', color: '#0F0F14' });
    this.updateBadges();
    const btn = event.currentTarget;
    btn.textContent = '✅ Agregado';
    setTimeout(() => { btn.innerHTML = '🛒 Agregar al carrito'; }, 1500);
  },

  updateBadges() {
    const cartCount = Store.cartCount();
    const wishCount = Store.getWishlist().length;
    document.querySelectorAll('.cart-badge, .cart-count').forEach(b => {
      b.textContent = cartCount;
      b.style.display = cartCount > 0 ? 'flex' : 'none';
    });
    const wishBadge = document.getElementById('wishlistBadge');
    if (wishBadge) {
      wishBadge.textContent = wishCount;
      wishBadge.style.display = wishCount > 0 ? 'flex' : 'none';
    }
  },
};

// ──────────────────────────────────────────────────────────────
// 8. NAVBAR & FOOTER HTML
// ──────────────────────────────────────────────────────────────

function getBasePath() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function getNavbarHTML() {
  const base = getBasePath();
  return `
  <nav class="navbar" id="elev8-navbar" role="navigation" aria-label="Navegación principal">
    <div class="container navbar-inner">
      <a href="${base}index.html" class="navbar-logo" aria-label="Elev8 Sportswear inicio">
        <span class="navbar-logo-main">ELEV8</span>
        <span class="navbar-logo-sub">Sportswear</span>
      </a>
      <nav class="navbar-nav">
        <a href="${base}index.html" class="nav-link" data-page="home">Inicio</a>
        <div class="nav-dropdown">
          <a href="${base}pages/catalogue.html" class="nav-link" data-page="catalogue">Catálogo ▾</a>
          <div class="dropdown-menu" role="menu">
            <a href="${base}pages/catalogue.html?cat=camisetas" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#E8EEFF">👕</span>Camisetas</a>
            <a href="${base}pages/catalogue.html?cat=pantalonetas" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#FFE8E8">🩳</span>Pantalonetas</a>
            <a href="${base}pages/catalogue.html?cat=licras" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#E8FFE8">🩱</span>Licras</a>
            <a href="${base}pages/catalogue.html?cat=chaquetas" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#FFFDE8">🧥</span>Chaquetas</a>
            <a href="${base}pages/catalogue.html?cat=accesorios" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#F3E8FF">🎒</span>Accesorios</a>
          </div>
        </div>
        <a href="${base}pages/catalogue.html?badge=NUEVO" class="nav-link">Novedades</a>
        <a href="${base}pages/catalogue.html?badge=OFERTA" class="nav-link">Ofertas</a>
      </nav>
      <div class="navbar-search">
        <span class="navbar-search-icon" aria-hidden="true">🔍</span>
        <form id="searchForm" onsubmit="NavActions.search(event)">
          <input class="navbar-search-input" type="search" placeholder="Buscar productos..." id="navSearchInput" aria-label="Buscar productos" autocomplete="off">
        </form>
      </div>
      <div class="navbar-actions">
        <a href="${base}pages/wishlist.html" class="nav-icon-btn" aria-label="Favoritos">
          ❤️<span class="nav-badge" id="wishlistBadge" style="display:none">0</span>
        </a>
        <a href="${base}pages/cart.html" class="nav-icon-btn" aria-label="Carrito">
          🛒<span class="nav-badge cart-badge" id="cartBadge" style="display:none">0</span>
        </a>
        <a href="${base}pages/login.html" class="nav-icon-btn" id="userBtn" aria-label="Mi cuenta">👤</a>
        <button class="nav-burger" id="burgerBtn" aria-label="Menú" aria-expanded="false" aria-controls="mobileNav">☰</button>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Menú móvil">
    <a href="${base}index.html" class="nav-link">🏠 Inicio</a>
    <a href="${base}pages/catalogue.html" class="nav-link">🗂 Catálogo</a>
    <a href="${base}pages/catalogue.html?badge=NUEVO" class="nav-link">✨ Novedades</a>
    <a href="${base}pages/catalogue.html?badge=OFERTA" class="nav-link">🏷 Ofertas</a>
    <a href="${base}pages/cart.html" class="nav-link">🛒 Carrito</a>
    <a href="${base}pages/wishlist.html" class="nav-link">❤️ Favoritos</a>
    <a href="${base}pages/login.html" class="nav-link">👤 Mi cuenta</a>
  </div>`;
}

function getFooterHTML() {
  const base = getBasePath();
  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-main">
        <div>
          <div class="footer-brand-name">ELEV8</div>
          <p class="footer-brand-tagline">Tu tienda de ropa deportiva de alto rendimiento.<br>Tecnología, estilo y comodidad para cada entrenamiento.</p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Instagram">📷</a>
            <a href="#" class="social-link" aria-label="Facebook">📘</a>
            <a href="#" class="social-link" aria-label="TikTok">🎵</a>
            <a href="#" class="social-link" aria-label="YouTube">▶️</a>
          </div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.5);margin-top:1.25rem;font-weight:600;">Suscríbete y obtén 10% OFF en tu primera compra</p>
          <form class="newsletter-form" aria-label="Newsletter" onsubmit="NavActions.newsletter(event)">
            <input type="email" class="newsletter-input" placeholder="tu@email.com" aria-label="Correo electrónico" required>
            <button type="submit" class="btn btn-primary btn-sm">Suscribir</button>
          </form>
        </div>
        <div>
          <h4 class="footer-col-title">Tienda</h4>
          <nav class="footer-links" aria-label="Tienda">
            <a href="${base}pages/catalogue.html">Todos los productos</a>
            <a href="${base}pages/catalogue.html?cat=camisetas">Camisetas</a>
            <a href="${base}pages/catalogue.html?cat=pantalonetas">Pantalonetas</a>
            <a href="${base}pages/catalogue.html?cat=licras">Licras</a>
            <a href="${base}pages/catalogue.html?badge=OFERTA">Ofertas</a>
          </nav>
        </div>
        <div>
          <h4 class="footer-col-title">Ayuda</h4>
          <nav class="footer-links" aria-label="Ayuda">
            <a href="#">Envíos y entregas</a>
            <a href="#">Devoluciones</a>
            <a href="#">Guía de tallas</a>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Contacto</a>
          </nav>
        </div>
        <div>
          <h4 class="footer-col-title">Mi cuenta</h4>
          <nav class="footer-links" aria-label="Mi cuenta">
            <a href="${base}pages/login.html">Iniciar sesión</a>
            <a href="${base}pages/login.html#register">Crear cuenta</a>
            <a href="${base}pages/account.html">Mis pedidos</a>
            <a href="${base}pages/wishlist.html">Mis favoritos</a>
          </nav>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Elev8 Sportswear · GA6-220501096-AA4-EV03 · SENA ADSO · Fabián Santiago Gutiérrez</span>
        <div class="payment-icons">
          <span class="pay-icon">💳 Visa</span>
          <span class="pay-icon">💳 MC</span>
          <span class="pay-icon">🏦 PSE</span>
          <span class="pay-icon">📱 Nequi</span>
          <span class="pay-icon">💸 Efecty</span>
        </div>
      </div>
    </div>
  </footer>`;
}

// ──────────────────────────────────────────────────────────────
// 9. NAVBAR ACTIONS
// ──────────────────────────────────────────────────────────────

const NavActions = {
  search(e) {
    e.preventDefault();
    const q = document.getElementById('navSearchInput')?.value.trim();
    if (q) {
      const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
      window.location.href = `${base}catalogue.html?q=${encodeURIComponent(q)}`;
    }
  },
  newsletter(e) {
    e.preventDefault();
    Toast.show('✅ ¡Suscrito! Recibirás tu cupón del 10% pronto.');
    e.target.reset();
  },
};

// ──────────────────────────────────────────────────────────────
// 10. LAYOUT INJECTION
// ──────────────────────────────────────────────────────────────

function injectLayout() {
  // Inject Navbar
  const navSlot = document.getElementById('navbar-slot');
  if (navSlot) navSlot.innerHTML = getNavbarHTML();

  // Inject Footer
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) footerSlot.innerHTML = getFooterHTML();

  // Burger toggle
  document.addEventListener('click', e => {
    const btn = e.target.closest('#burgerBtn');
    if (!btn) return;
    const nav = document.getElementById('mobileNav');
    const open = nav.classList.toggle('open');
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', open);
    open ? ScrollLock.lock() : ScrollLock.unlock();
  });

  // Close mobile nav on link click
  document.getElementById('mobileNav')?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('open');
      document.getElementById('burgerBtn').textContent = '☰';
      ScrollLock.unlock();
    });
  });

  // Navbar scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('elev8-navbar')?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    a.classList.toggle('active', path.includes(a.dataset.page));
  });
  if (path === '/' || path.endsWith('index.html')) {
    document.querySelector('.nav-link[data-page="home"]')?.classList.add('active');
  }

  // Update badges
  UI.updateBadges();
}

// ──────────────────────────────────────────────────────────────
// 11. INIT
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', injectLayout);

// Exponer para uso en HTML
window.Store = Store;
window.Products = Products;
window.UI = UI;
window.Toast = Toast;
window.Fmt = Fmt;
window.NavActions = NavActions;
window.renderStars = renderStars;
window.buildProductCard = buildProductCard;