/* ============================================================
   ELEV8 SPORTSWEAR – Product Data Catalog
   js/data.js
   ============================================================ */
'use strict';

const CATEGORIES = [
  { id:'camisetas',    name:'Camisetas',    icon:'👕', count:2, bg:'#E8EEFF', accent:'#1A1A2E' },
  { id:'pantalonetas', name:'Pantalonetas', icon:'🩳', count:2, bg:'#FFE8E8', accent:'#C62828' },
  { id:'licras',       name:'Licras',       icon:'🩱', count:2, bg:'#E8FFE8', accent:'#2E7D32' },
  { id:'chaquetas',    name:'Chaquetas',    icon:'🧥', count:2, bg:'#FFFDE8', accent:'#F57F17' },
  { id:'accesorios',   name:'Accesorios',   icon:'🎒', count:4, bg:'#F3E8FF', accent:'#6A1B9A' },
];

const PRODUCTS = [
  { id:1,  sku:'ELV-CAM-001', name:'Camiseta Dry-Fit Pro',        cat:'camisetas',    emoji:'👕', price:89900,  oldPrice:109900, rating:4.8, reviews:124, badge:'POPULAR', brand:'Elev8', desc:'Camiseta de alto rendimiento con tecnología de secado rápido y protección UV UPF 30+. Tejido antimicrobial. Ideal para entrenamiento de fuerza y cardio.', sizes:['XS','S','M','L','XL'], colors:['#0F0F14','#1A237E','#B71C1C','#B0BEC5'] },
  { id:2,  sku:'ELV-CAM-002', name:'Camiseta Compresión Elite',   cat:'camisetas',    emoji:'👕', price:109900, oldPrice:null,   rating:4.5, reviews:87,  badge:'NUEVO',   brand:'Elev8', desc:'Camiseta de compresión para entrenamiento de fuerza. Tejido de alta elasticidad con compresión graduada.', sizes:['S','M','L','XL','XXL'], colors:['#0F0F14','#1A237E','#37474F'] },
  { id:3,  sku:'ELV-PAN-001', name:'Pantaloneta Running Elite',   cat:'pantalonetas', emoji:'🩳', price:75000,  oldPrice:90000,  rating:4.6, reviews:203, badge:'OFERTA',  brand:'Elev8', desc:'Pantaloneta ligera con bolsillos laterales y tecnología de ventilación. Tejido de secado ultra-rápido.', sizes:['XS','S','M','L','XL'], colors:['#0F0F14','#1A237E','#2E7D32'] },
  { id:4,  sku:'ELV-PAN-002', name:'Pantaloneta Ciclismo Pro',    cat:'pantalonetas', emoji:'🩳', price:98000,  oldPrice:null,   rating:4.3, reviews:56,  badge:null,      brand:'Elev8', desc:'Pantaloneta acolchada para ciclismo de ruta y montaña. Inserción de gel en zona de contacto.', sizes:['S','M','L','XL'], colors:['#0F0F14','#B0BEC5'] },
  { id:5,  sku:'ELV-LIC-001', name:'Licra Compresión Total',      cat:'licras',       emoji:'🩱', price:120000, oldPrice:145000, rating:4.7, reviews:178, badge:'OFERTA',  brand:'Elev8', desc:'Licra de compresión graduada para fuerza, resistencia y recuperación muscular acelerada.', sizes:['XS','S','M','L'], colors:['#0F0F14','#880E4F','#1A237E'] },
  { id:6,  sku:'ELV-LIC-002', name:'Licra Running Mujer',         cat:'licras',       emoji:'🩱', price:95000,  oldPrice:null,   rating:4.5, reviews:94,  badge:'NUEVO',   brand:'Elev8', desc:'Licra de alto rendimiento para running con bolsillo trasero. Tela suave y confortable.', sizes:['XS','S','M','L'], colors:['#880E4F','#1A237E','#0F0F14'] },
  { id:7,  sku:'ELV-CHA-001', name:'Chaqueta Cortaviento Sport',  cat:'chaquetas',    emoji:'🧥', price:185000, oldPrice:220000, rating:4.4, reviews:67,  badge:'OFERTA',  brand:'Elev8', desc:'Chaqueta resistente al viento con empaque compacto. Ideal para deporte exterior y climas variables.', sizes:['XS','S','M','L','XL','XXL'], colors:['#B71C1C','#0F0F14','#1A237E'] },
  { id:8,  sku:'ELV-CHA-002', name:'Chaqueta Térmica Pro',        cat:'chaquetas',    emoji:'🧥', price:220000, oldPrice:null,   rating:4.6, reviews:43,  badge:'NUEVO',   brand:'Elev8', desc:'Chaqueta térmica para entrenamientos en clima frío. Material polar interior de alta suavidad.', sizes:['S','M','L','XL'], colors:['#0F0F14','#37474F','#B0BEC5'] },
  { id:9,  sku:'ELV-ACC-001', name:'Medias Deportivas Pro',       cat:'accesorios',   emoji:'🧦', price:25000,  oldPrice:30000,  rating:4.8, reviews:412, badge:'POPULAR', brand:'Elev8', desc:'Medias con amortiguación reforzada en talón y puntera. Altura media. Tejido antimicrobial.', sizes:['Única'], colors:['#FFFFFF','#0F0F14','#B0BEC5'] },
  { id:10, sku:'ELV-ACC-002', name:'Gorra Deportiva Elev8',       cat:'accesorios',   emoji:'🧢', price:45000,  oldPrice:null,   rating:4.4, reviews:88,  badge:null,      brand:'Elev8', desc:'Gorra con visera curva, material Dry-Fit y ajuste con velcro posterior. Protección UV.', sizes:['Única'], colors:['#0F0F14','#1A237E','#B71C1C'] },
  { id:11, sku:'ELV-ACC-003', name:'Guantes Training Pro',        cat:'accesorios',   emoji:'🥊', price:55000,  oldPrice:null,   rating:4.2, reviews:34,  badge:'NUEVO',   brand:'Elev8', desc:'Guantes de entrenamiento con protección de palma y dedos libres. Refuerzo de silicona antideslizante.', sizes:['S/M','L/XL'], colors:['#0F0F14','#B71C1C'] },
  { id:12, sku:'ELV-ACC-004', name:'Morral Deportivo Elev8',      cat:'accesorios',   emoji:'🎒', price:135000, oldPrice:160000, rating:4.5, reviews:71,  badge:'OFERTA',  brand:'Elev8', desc:'Morral deportivo 28L con compartimiento para laptop, porta-bidón lateral y malla transpirable.', sizes:['Única'], colors:['#0F0F14','#37474F','#B71C1C'] },
];

const COUPONS = {
  'ELEV10':    { type: 'percent', value: 10,   minOrder: 50000,  desc: '10% de descuento' },
  'ELEV20':    { type: 'percent', value: 20,   minOrder: 200000, desc: '20% en pedidos +$200K' },
  'ENVGRATIS': { type: 'fixed',   value: 8000, minOrder: 80000,  desc: 'Envío gratis' },
};

// ── Product helpers ──────────────────────────────────────
const Products = {
  getAll()            { return PRODUCTS; },
  getById(id)         { return PRODUCTS.find(p => p.id === id); },
  getByCategory(cat)  { return PRODUCTS.filter(p => p.cat === cat); },
  getFeatured()       { return PRODUCTS.filter(p => p.badge); },
  getPopular()        { return [...PRODUCTS].sort((a,b) => b.reviews - a.reviews).slice(0,4); },
  getRelated(id, n=4) {
    const p = Products.getById(id);
    return PRODUCTS.filter(x => x.id !== id && x.cat === p?.cat).slice(0,n);
  },

  filter({ category, maxPrice, minRating, badge, search, sort } = {}) {
    let res = [...PRODUCTS];
    if (category && category !== 'todos') res = res.filter(p => p.cat === category);
    if (maxPrice)   res = res.filter(p => p.price <= maxPrice);
    if (minRating)  res = res.filter(p => p.rating >= minRating);
    if (badge)      res = res.filter(p => p.badge === badge);
    if (search)     res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc')  res.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') res.sort((a,b) => b.price - a.price);
    if (sort === 'rating')     res.sort((a,b) => b.rating - a.rating);
    if (sort === 'popular')    res.sort((a,b) => b.reviews - a.reviews);
    return res;
  },
};
