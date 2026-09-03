/* ============================================================
   ELEV8 SPORTSWEAR – UI Component Builders
   js/components.js
   ============================================================ */
'use strict';

/* ── Navbar HTML ────────────────────────────────────────── */
const NavbarHTML = `
<nav class="navbar" id="elev8-navbar" role="navigation" aria-label="Navegación principal">
  <div class="container navbar-inner">
    <a href="/index.html" class="navbar-logo" aria-label="Elev8 Sportswear inicio">
      <span class="navbar-logo-main">ELEV8</span>
      <span class="navbar-logo-sub">Sportswear</span>
    </a>
    <nav class="navbar-nav">
      <a href="/index.html"         class="nav-link" data-page="home">Inicio</a>
      <div class="nav-dropdown">
        <a href="/pages/catalogue.html" class="nav-link" data-page="catalogue">Catálogo ▾</a>
        <div class="dropdown-menu" role="menu">
          <a href="/pages/catalogue.html?cat=camisetas"    class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#E8EEFF">👕</span>Camisetas</a>
          <a href="/pages/catalogue.html?cat=pantalonetas" class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#FFE8E8">🩳</span>Pantalonetas</a>
          <a href="/pages/catalogue.html?cat=licras"       class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#E8FFE8">🩱</span>Licras</a>
          <a href="/pages/catalogue.html?cat=chaquetas"    class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#FFFDE8">🧥</span>Chaquetas</a>
          <a href="/pages/catalogue.html?cat=accesorios"   class="dropdown-item" role="menuitem"><span class="dropdown-icon" style="background:#F3E8FF">🎒</span>Accesorios</a>
        </div>
      </div>
      <a href="/pages/catalogue.html?badge=NUEVO"  class="nav-link">Novedades</a>
      <a href="/pages/catalogue.html?badge=OFERTA" class="nav-link">Ofertas</a>
    </nav>
    <div class="navbar-search">
      <span class="navbar-search-icon" aria-hidden="true">🔍</span>
      <form id="searchForm" onsubmit="NavActions.search(event)">
        <input class="navbar-search-input" type="search" placeholder="Buscar productos..." id="navSearchInput" aria-label="Buscar productos" autocomplete="off">
      </form>
    </div>
    <div class="navbar-actions">
      <a href="/pages/wishlist.html" class="nav-icon-btn" aria-label="Favoritos">
        ❤️<span class="nav-badge" id="wishlistBadge" style="display:none">0</span>
      </a>
      <a href="/pages/cart.html" class="nav-icon-btn" aria-label="Carrito">
        🛒<span class="nav-badge cart-badge" id="cartBadge" style="display:none">0</span>
      </a>
      <a href="/pages/login.html" class="nav-icon-btn" id="userBtn" aria-label="Mi cuenta">👤</a>
      <button class="nav-burger" id="burgerBtn" aria-label="Menú" aria-expanded="false" aria-controls="mobileNav">☰</button>
    </div>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Menú móvil">
  <a href="/index.html"         class="nav-link">🏠 Inicio</a>
  <a href="/pages/catalogue.html" class="nav-link">🗂 Catálogo</a>
  <a href="/pages/catalogue.html?badge=NUEVO"  class="nav-link">✨ Novedades</a>
  <a href="/pages/catalogue.html?badge=OFERTA" class="nav-link">🏷 Ofertas</a>
  <a href="/pages/cart.html"     class="nav-link">🛒 Carrito</a>
  <a href="/pages/wishlist.html" class="nav-link">❤️ Favoritos</a>
  <a href="/pages/login.html"    class="nav-link">👤 Mi cuenta</a>
</div>`;

/* ── Footer HTML ────────────────────────────────────────── */
const FooterHTML = `
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
          <a href="/pages/catalogue.html">Todos los productos</a>
          <a href="/pages/catalogue.html?cat=camisetas">Camisetas</a>
          <a href="/pages/catalogue.html?cat=pantalonetas">Pantalonetas</a>
          <a href="/pages/catalogue.html?cat=licras">Licras</a>
          <a href="/pages/catalogue.html?badge=OFERTA">Ofertas</a>
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
          <a href="/pages/login.html">Iniciar sesión</a>
          <a href="/pages/login.html#register">Crear cuenta</a>
          <a href="/pages/account.html">Mis pedidos</a>
          <a href="/pages/wishlist.html">Mis favoritos</a>
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

/* ── Product card builder ───────────────────────────────── */
function buildProductCard(p, linkPrefix = '') {
  const inWish = typeof Store !== 'undefined' ? Store.isWishlisted(p.id) : false;
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <article class="card product-card" itemscope itemtype="https://schema.org/Product" data-id="${p.id}">
    <div class="prod-img-wrap">
      <div class="prod-img-inner">${p.emoji}</div>
      ${p.badge ? `<span class="badge badge-red prod-badge">${p.badge}</span>` : ''}
      ${discount ? `<span class="badge badge-green prod-badge" style="top:10px;left:${p.badge?'72px':'10px'}">-${discount}%</span>` : ''}
      <button class="wish-btn ${inWish?'active':''}" onclick="UI.toggleWish(event,${p.id})" aria-label="${inWish?'Quitar de favoritos':'Agregar a favoritos'}">
        ${inWish?'❤️':'🤍'}
      </button>
      <div class="prod-overlay">
        <a href="${linkPrefix}pages/product.html?id=${p.id}" class="btn btn-primary btn-sm">Ver detalle</a>
      </div>
    </div>
    <div class="prod-info">
      <p class="prod-category">${CATEGORIES.find(c=>c.id===p.cat)?.name || p.cat}</p>
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

/* ── Global UI actions ──────────────────────────────────── */
const UI = {
  toggleWish(event, productId) {
    event.stopPropagation();
    const p = Products.getById(productId);
    if (!p) return;
    const added = Store.toggleWishlist(p);
    const btn = event.currentTarget;
    btn.textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('active', added);
    UI.updateBadges();
  },

  addToCart(event, productId) {
    event.stopPropagation();
    const p = Products.getById(productId);
    if (!p) return;
    Store.addToCart({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, size: p.sizes?.[2] || p.sizes?.[0] || 'M', color: '#0F0F14' });
    UI.updateBadges();
    const btn = event.currentTarget;
    btn.textContent = '✅ Agregado';
    setTimeout(() => { btn.innerHTML = '🛒 Agregar al carrito'; }, 1500);
  },

  updateBadges() {
    const cartCount = Store.cartCount();
    const wishCount = Store.getWishlist().length;
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = cartCount;
      b.style.display = cartCount > 0 ? 'flex' : 'none';
    });
    const wishBadge = document.getElementById('wishlistBadge');
    if (wishBadge) { wishBadge.textContent = wishCount; wishBadge.style.display = wishCount > 0 ? 'flex' : 'none'; }
  },
};

/* ── Navbar Actions ─────────────────────────────────────── */
const NavActions = {
  search(e) {
    e.preventDefault();
    const q = document.getElementById('navSearchInput')?.value.trim();
    if (q) window.location.href = `/pages/catalogue.html?q=${encodeURIComponent(q)}`;
  },
  newsletter(e) {
    e.preventDefault();
    Toast.show('✅ ¡Suscrito! Recibirás tu cupón del 10% pronto.');
    e.target.reset();
  },
};

/* ── Inject navbar + footer ─────────────────────────────── */
function injectLayout() {
  const navSlot = document.getElementById('navbar-slot');
  if (navSlot) navSlot.innerHTML = NavbarHTML;

  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) footerSlot.innerHTML = FooterHTML;

  // Burger toggle
  document.addEventListener('click', e => {
    const btn = e.target.closest('#burgerBtn');
    if (!btn) return;
    const nav  = document.getElementById('mobileNav');
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
  });

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

document.addEventListener('DOMContentLoaded', injectLayout);
