/* ============================================================
   ELEV8 SPORTSWEAR – Core JavaScript
   GA6-220501096-AA4-EV03
   ============================================================ */
'use strict';

/* ── PRODUCTS DATA ────────────────────────────────────────── */
const PRODUCTS = [
  {id:1, name:'Camiseta Dry-Fit Pro',        cat:'Camisetas',    price:89900,  old:109900, rating:4.8, rev:124, badge:'POPULAR', emoji:'👕', desc:'Camiseta de alto rendimiento con tecnología Dry-Fit para secado rápido. Protección UV UPF 30+. Tejido 88% poliéster + 12% elastano. Ideal para entrenamiento de fuerza y cardio.'},
  {id:2, name:'Camiseta Compresión Elite',   cat:'Camisetas',    price:109900, old:null,   rating:4.5, rev:87,  badge:'NUEVO',   emoji:'👕', desc:'Camiseta de compresión para entrenamiento de fuerza. Tejido antimicrobial y tecnología de secado ultra-rápido.'},
  {id:3, name:'Pantaloneta Running Elite',   cat:'Pantalonetas', price:75000,  old:90000,  rating:4.6, rev:203, badge:'OFERTA',  emoji:'🩳', desc:'Pantaloneta ligera con bolsillos laterales y tecnología de ventilación. Perfecta para running y ciclismo.'},
  {id:4, name:'Pantaloneta Ciclismo Pro',    cat:'Pantalonetas', price:98000,  old:null,   rating:4.3, rev:56,  badge:null,      emoji:'🩳', desc:'Pantaloneta acolchada para ciclismo de ruta y montaña. Sistema de compresión y protección.'},
  {id:5, name:'Licra Compresión Total',      cat:'Licras',       price:120000, old:145000, rating:4.7, rev:178, badge:'OFERTA',  emoji:'🩱', desc:'Licra de compresión graduada para fuerza, resistencia y recuperación muscular. Tejido termoregulador.'},
  {id:6, name:'Licra Running Mujer',         cat:'Licras',       price:95000,  old:null,   rating:4.5, rev:94,  badge:'NUEVO',   emoji:'🩱', desc:'Licra de alto rendimiento para running femenino. Bolsillo trasero y cintura elástica.'},
  {id:7, name:'Chaqueta Cortaviento Sport',  cat:'Chaquetas',    price:185000, old:220000, rating:4.4, rev:67,  badge:'OFERTA',  emoji:'🧥', desc:'Chaqueta resistente al viento con empaque compacto para deporte al aire libre. Capucha ajustable.'},
  {id:8, name:'Chaqueta Térmica Pro',        cat:'Chaquetas',    price:220000, old:null,   rating:4.6, rev:43,  badge:'NUEVO',   emoji:'🧥', desc:'Chaqueta térmica para entrenamientos en clima frío. Interior polar, exterior impermeable.'},
  {id:9, name:'Medias Deportivas Pro',       cat:'Accesorios',   price:25000,  old:30000,  rating:4.8, rev:412, badge:'POPULAR', emoji:'🧦', desc:'Medias con amortiguación reforzada en talón y puntera. Tejido antibacterial y de alta transpirabilidad.'},
  {id:10,name:'Gorra Deportiva Elev8',       cat:'Accesorios',   price:45000,  old:null,   rating:4.4, rev:88,  badge:null,      emoji:'🧢', desc:'Gorra con visera curva, material dry-fit y ajuste velcro. Protección solar UV 50+.'},
  {id:11,name:'Guantes Training Pro',        cat:'Accesorios',   price:55000,  old:null,   rating:4.2, rev:34,  badge:'NUEVO',   emoji:'🥊', desc:'Guantes de entrenamiento con protección de palma, ventilación y agarre antideslizante.'},
  {id:12,name:'Morral Deportivo Elev8',      cat:'Accesorios',   price:135000, old:160000, rating:4.5, rev:71,  badge:'OFERTA',  emoji:'🎒', desc:'Morral deportivo con bolsillos organizadores, porta laptop 13" y sistema de ventilación en espalda.'},
];

/* ── STATE ────────────────────────────────────────────────── */
const State = {
  cart: JSON.parse(localStorage.getItem('e8_cart') || '[]'),
  wish: JSON.parse(localStorage.getItem('e8_wish') || '[]'),

  saveCart()  { localStorage.setItem('e8_cart', JSON.stringify(this.cart)); UI.updateBadge(); },
  saveWish()  { localStorage.setItem('e8_wish', JSON.stringify(this.wish)); },

  addToCart(id, size='M', qty=1) {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return;
    const existing = this.cart.find(i => i.id === id && i.size === size);
    if (existing) existing.qty += qty;
    else this.cart.push({ id, name: p.name, price: p.price, emoji: p.emoji, size, qty });
    this.saveCart();
    Toast.show(`✅ "${p.name}" agregado al carrito`);
  },

  removeFromCart(id, size) {
    this.cart = this.cart.filter(i => !(i.id === id && i.size === size));
    this.saveCart();
  },

  updateQty(id, size, delta) {
    const item = this.cart.find(i => i.id === id && i.size === size);
    if (item) { item.qty = Math.max(1, item.qty + delta); this.saveCart(); }
  },

  getSubtotal() { return this.cart.reduce((s, i) => s + i.price * i.qty, 0); },
  getCount()    { return this.cart.reduce((s, i) => s + i.qty, 0); },

  toggleWish(id) {
    const idx = this.wish.indexOf(id);
    if (idx > -1) { this.wish.splice(idx, 1); Toast.show('💔 Eliminado de favoritos'); }
    else          { this.wish.push(id);        Toast.show('❤️ Guardado en favoritos'); }
    this.saveWish();
    return idx === -1;
  },
  inWish(id) { return this.wish.includes(id); },
};

/* ── UI HELPERS ───────────────────────────────────────────── */
const UI = {
  fmt(n) { return '$' + n.toLocaleString('es-CO'); },

  updateBadge() {
    const n = State.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  },

  stars(r) {
    const full = Math.floor(r), half = r % 1 >= 0.5 ? 1 : 0, empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  },

  productCard(p) {
    const inW = State.inWish(p.id);
    const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    return `
    <article class="card product-card" data-id="${p.id}">
      <div class="prod-img-wrap">
        <div class="prod-emoji">${p.emoji}</div>
        ${p.badge ? `<span class="badge badge-red prod-badge">${p.badge}</span>` : ''}
        <button class="prod-wish ${inW ? 'wished' : ''}" onclick="toggleWish(${p.id},this)" aria-label="Favorito">${inW ? '❤️' : '🤍'}</button>
        <div class="prod-overlay">
          <a href="pages/product.html?id=${p.id}" class="btn btn-primary btn-sm">Ver detalle</a>
        </div>
      </div>
      <div class="prod-info">
        <p class="prod-cat">${p.cat}</p>
        <h3 class="prod-name"><a href="pages/product.html?id=${p.id}">${p.name}</a></h3>
        <div class="prod-rating-row">
          <span class="stars">${this.stars(p.rating)}</span>
          <span class="prod-reviews">(${p.rev})</span>
        </div>
        <div class="prod-price-row">
          <span class="price price-lg">${this.fmt(p.price)}</span>
          ${p.old ? `<span class="price-old">${this.fmt(p.old)}</span><span class="badge badge-green">-${disc}%</span>` : ''}
        </div>
        <button class="btn btn-primary btn-full" onclick="State.addToCart(${p.id})">🛒 Agregar al carrito</button>
      </div>
    </article>`;
  },
};

/* ── TOAST ────────────────────────────────────────────────── */
const Toast = {
  _t: null,
  show(msg, dur = 3000) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.innerHTML = `<span>${msg}</span>`;
    el.classList.add('show');
    clearTimeout(this._t);
    this._t = setTimeout(() => el.classList.remove('show'), dur);
  }
};

/* ── GLOBAL HANDLERS ──────────────────────────────────────── */
function toggleWish(id, btn) {
  const added = State.toggleWish(id);
  if (btn) btn.textContent = added ? '❤️' : '🤍';
}

/* ── NAVBAR ───────────────────────────────────────────────── */
function initNavbar() {
  // Active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(a => {
    const href = a.getAttribute('href').split('/').pop().split('?')[0];
    if (path === href || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Toggle mobile
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Scroll shadow
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', scrollY > 10);
  }, { passive: true });

  // Search
  const sf = document.querySelector('form[role="search"]');
  if (sf) sf.addEventListener('submit', e => {
    e.preventDefault();
    const q = sf.querySelector('input').value.trim();
    if (q) {
      const base = location.pathname.includes('/pages/') ? '' : 'pages/';
      location.href = `${base}catalogue.html?q=${encodeURIComponent(q)}`;
    }
  });

  UI.updateBadge();
}

/* ── FOOTER inject ────────────────────────────────────────── */
function injectFooter() {
  const slot = document.getElementById('footer-slot');
  if (!slot) return;
  const base = location.pathname.includes('/pages/') ? '../' : '';
  slot.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <div>
          <div class="footer-brand-name">ELEV8</div>
          <p class="footer-tagline">Tu tienda de ropa deportiva de alto rendimiento.</p>
          <div class="footer-social">
            <a href="#" class="footer-social-link" aria-label="Instagram">📷</a>
            <a href="#" class="footer-social-link" aria-label="Facebook">📘</a>
            <a href="#" class="footer-social-link" aria-label="TikTok">🎵</a>
            <a href="#" class="footer-social-link" aria-label="YouTube">▶️</a>
          </div>
          <div class="footer-newsletter">
            <p>Suscríbete y obtén 10% de descuento</p>
            <form class="footer-nl-form" onsubmit="event.preventDefault();Toast.show('✅ ¡Suscrito!')">
              <input type="email" class="footer-nl-input" placeholder="tu@email.com" required>
              <button type="submit" class="btn btn-primary btn-sm">Suscribir</button>
            </form>
          </div>
        </div>
        <div>
          <h4 class="footer-col-title">Tienda</h4>
          <ul class="footer-links">
            <li><a href="${base}pages/catalogue.html">Todos los productos</a></li>
            <li><a href="${base}pages/catalogue.html?cat=Camisetas">Camisetas</a></li>
            <li><a href="${base}pages/catalogue.html?cat=Pantalonetas">Pantalonetas</a></li>
            <li><a href="${base}pages/catalogue.html?oferta=1">Ofertas</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Ayuda</h4>
          <ul class="footer-links">
            <li><a href="#">Envíos y entregas</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Guía de tallas</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Mi cuenta</h4>
          <ul class="footer-links">
            <li><a href="${base}pages/login.html">Iniciar sesión</a></li>
            <li><a href="${base}pages/login.html#register">Crear cuenta</a></li>
            <li><a href="${base}pages/cart.html">Mi carrito</a></li>
            <li><a href="#">Mis pedidos</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Elev8 Sportswear · GA6-220501096-AA4-EV03 · SENA ADSO</span>
        <div class="pay-pills">
          <span class="pay-pill">💳 Visa</span><span class="pay-pill">💳 MC</span>
          <span class="pay-pill">🏦 PSE</span><span class="pay-pill">📱 Nequi</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ── NAVBAR inject ─────────────────────────────────────────── */
function injectNavbar() {
  const slot = document.getElementById('navbar-slot');
  if (!slot) return;
  const base = location.pathname.includes('/pages/') ? '../' : '';
  slot.innerHTML = `
  <nav class="navbar" role="navigation" aria-label="Navegación principal">
    <div class="container nav-inner">
      <a href="${base}index.html" class="nav-logo">
        <div><div class="nav-logo-text">ELEV8</div><div class="nav-logo-sub">Sportswear</div></div>
      </a>
      <nav class="nav-menu">
        <a href="${base}index.html" class="nav-link">Inicio</a>
        <div class="nav-dropdown">
          <a href="${base}pages/catalogue.html" class="nav-link">Catálogo ▾</a>
          <div class="nav-dd-menu">
            <a href="${base}pages/catalogue.html?cat=Camisetas" class="nav-dd-item"><span class="nav-dd-ico" style="background:#EEF2FF">👕</span>Camisetas</a>
            <a href="${base}pages/catalogue.html?cat=Pantalonetas" class="nav-dd-item"><span class="nav-dd-ico" style="background:#FFF0F0">🩳</span>Pantalonetas</a>
            <a href="${base}pages/catalogue.html?cat=Licras" class="nav-dd-item"><span class="nav-dd-ico" style="background:#F0FFF0">🩱</span>Licras</a>
            <a href="${base}pages/catalogue.html?cat=Chaquetas" class="nav-dd-item"><span class="nav-dd-ico" style="background:#FFFDF0">🧥</span>Chaquetas</a>
            <a href="${base}pages/catalogue.html?cat=Accesorios" class="nav-dd-item"><span class="nav-dd-ico" style="background:#F5F0FF">🎒</span>Accesorios</a>
          </div>
        </div>
        <a href="${base}pages/catalogue.html?nuevo=1" class="nav-link">Novedades</a>
        <a href="${base}pages/catalogue.html?oferta=1" class="nav-link">Ofertas</a>
      </nav>
      <div class="nav-search">
        <span class="nav-search-ico">🔍</span>
        <form role="search"><input type="search" placeholder="Buscar productos..." aria-label="Buscar"></form>
      </div>
      <div class="nav-actions">
        <a href="${base}pages/wishlist.html" class="nav-icon-btn" aria-label="Favoritos">❤️</a>
        <a href="${base}pages/cart.html" class="nav-icon-btn" aria-label="Carrito">
          🛒<span class="nav-badge cart-count" style="display:none">0</span>
        </a>
        <a href="${base}pages/login.html" class="nav-icon-btn" aria-label="Mi cuenta">👤</a>
        <button class="nav-toggle" id="navToggle" aria-label="Menú" aria-expanded="false">☰</button>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <a href="${base}index.html" class="nav-link">🏠 Inicio</a>
    <a href="${base}pages/catalogue.html" class="nav-link">🗂 Catálogo</a>
    <a href="${base}pages/catalogue.html?nuevo=1" class="nav-link">✨ Novedades</a>
    <a href="${base}pages/catalogue.html?oferta=1" class="nav-link">🏷 Ofertas</a>
    <a href="${base}pages/cart.html" class="nav-link">🛒 Carrito <span class="cart-count" style="display:none;background:var(--red);color:#fff;border-radius:50%;padding:2px 6px;font-size:.7rem"></span></a>
    <a href="${base}pages/login.html" class="nav-link">👤 Mi cuenta</a>
  </div>`;
}

/* ── AUTO INIT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  initNavbar();
});
