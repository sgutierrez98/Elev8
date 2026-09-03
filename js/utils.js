/* ============================================================
   ELEV8 SPORTSWEAR – Utilities
   js/utils.js
   ============================================================ */
'use strict';

/* ── Toast ──────────────────────────────────────────────── */
const Toast = (() => {
  let el = null, timer = null;

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

/* ── Format helpers ─────────────────────────────────────── */
const Fmt = {
  price(n) { return '$' + Number(n).toLocaleString('es-CO'); },
  date(d)  {
    return new Date(d).toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' });
  },
  truncate(str, max = 50) {
    return str.length > max ? str.slice(0, max) + '…' : str;
  }
};

/* ── DOM helpers ────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html')  node.innerHTML = v;
    else if (k === 'text')  node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.forEach(c => c && node.append(typeof c === 'string' ? document.createTextNode(c) : c));
  return node;
}

/* ── URL params ─────────────────────────────────────────── */
const Params = {
  get(key)  { return new URLSearchParams(window.location.search).get(key); },
  getAll()  { return Object.fromEntries(new URLSearchParams(window.location.search)); },
  set(key, value) {
    const p = new URLSearchParams(window.location.search);
    p.set(key, value);
    history.replaceState(null, '', '?' + p.toString());
  }
};

/* ── Debounce ───────────────────────────────────────────── */
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ── Scroll lock ────────────────────────────────────────── */
const ScrollLock = {
  lock()   { document.body.style.overflow = 'hidden'; },
  unlock() { document.body.style.overflow = ''; },
};

/* ── Local star rating ──────────────────────────────────── */
function renderStars(rating, max = 5) {
  let html = '';
  for (let i = 1; i <= max; i++) {
    html += i <= Math.floor(rating) ? '★' : (i - 0.5 <= rating ? '½' : '☆');
  }
  return `<span class="stars" aria-label="${rating} de ${max} estrellas">${html}</span>`;
}

/* ── Lazy image fallback ────────────────────────────────── */
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
          io.unobserve(img);
        }
      });
    });
    $$('img[data-src]').forEach(img => io.observe(img));
  }
}
