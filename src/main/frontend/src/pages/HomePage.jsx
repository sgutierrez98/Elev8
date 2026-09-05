/**
 * HomePage - Página principal de Elev8
 * Muestra el hero, categorías y productos populares
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import '../styles/HomePage.css';

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: 'Camisetas', icon: '👕', path: 'camisetas' },
    { name: 'Pantalonetas', icon: '🩳', path: 'pantalonetas' },
    { name: 'Licras', icon: '🩱', path: 'licras' },
    { name: 'Chaquetas', icon: '🧥', path: 'chaquetas' },
    { name: 'Accesorios', icon: '🎒', path: 'accesorios' },
  ];

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const data = await getPopularProducts(4);
      setPopularProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos populares:', err);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // Mostrar mensaje de confirmación
    alert(`✅ ${product.name} agregado al carrito`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">🔥 Colección 2025</span>
            <h1 className="hero-title" id="hero-title">
              Ropa deportiva <br />
              <span className="hero-accent">para superar tus límites</span>
            </h1>
            <p className="hero-subtitle">
              Tecnología Dry-Fit, compresión y estilo. Diseñado para atletas que exigen lo mejor.
            </p>
            <div className="hero-actions">
              <Link to="/catalogue" className="btn btn-primary btn-lg">
                Ver catálogo
              </Link>
              <Link to="/catalogue?onSale=true" className="btn btn-outline btn-lg">
                Ver ofertas
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <span className="hero-stat-number">12+</span>
                <span className="hero-stat-label">Productos exclusivos</span>
              </div>
              <div>
                <span className="hero-stat-number">4.8★</span>
                <span className="hero-stat-label">Calificación promedio</span>
              </div>
              <div>
                <span className="hero-stat-number">1K+</span>
                <span className="hero-stat-label">Clientes satisfechos</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-emoji">👕</div>
            <div className="hero-card-name">Camiseta Dry-Fit Pro</div>
            <div className="hero-card-price">$89.900</div>
            <Link to="/product/1" className="btn btn-primary btn-sm">
              Ver detalle
            </Link>
            <div className="hero-card-badge">-20%</div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="categories-title">Categorías</h2>
            <Link to="/catalogue" className="section-link">Ver todos →</Link>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/catalogue?category=${category.path}`}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos populares */}
      <section className="products-section" aria-labelledby="popular-title">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="popular-title">⭐ Más populares</h2>
            <Link to="/catalogue" className="section-link">Ver todos →</Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">❌ {error}</p>
              <button onClick={fetchPopularProducts} className="btn btn-primary">
                Reintentar
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {popularProducts.map((product) => {
                const discount = calculateDiscount(product.price, product.oldPrice);
                return (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`} className="product-link">
                      <div className="product-image">
                        <span className="product-emoji">{product.emoji || '👕'}</span>
                        {product.badge && (
                          <span className="product-badge">{product.badge}</span>
                        )}
                        {discount > 0 && (
                          <span className="product-discount">-{discount}%</span>
                        )}
                      </div>
                      <div className="product-info">
                        <p className="product-category">{product.category || 'Categoría'}</p>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-prices">
                          <span className="product-price">{formatPrice(product.price)}</span>
                          {product.oldPrice > 0 && (
                            <span className="product-old-price">{formatPrice(product.oldPrice)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary btn-sm add-to-cart-btn"
                    >
                      🛒 Agregar al carrito
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner" aria-labelledby="promo-title">
        <div className="container promo-container">
          <div className="promo-content">
            <span className="promo-badge">💥 Oferta especial</span>
            <h2 className="promo-title" id="promo-title">
              Hasta 30% OFF en ropa de compresión
            </h2>
            <p className="promo-text">
              Licras y camisetas de compresión para mejorar tu rendimiento.
              Oferta válida por tiempo limitado.
            </p>
            <Link to="/catalogue?category=licras" className="btn btn-primary btn-lg">
              Ver licras
            </Link>
          </div>
          <div className="promo-pills">
            <span className="promo-pill">🔥 20% OFF</span>
            <span className="promo-pill">⚡ Envío gratis</span>
            <span className="promo-pill">🎁 Regalo sorpresa</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="container">
          <h2 className="section-title text-center" id="features-title">
            ¿Por qué elegir Elev8?
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧵</div>
              <h3 className="feature-title">Calidad premium</h3>
              <p className="feature-text">
                Tejidos de alta durabilidad y tecnología Dry-Fit para máximo confort.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Envío rápido</h3>
              <p className="feature-text">
                Entregas en 24-48 horas en todo el país. Seguimiento en tiempo real.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Cambios sin preguntas</h3>
              <p className="feature-text">
                30 días para cambiar o devolver tu producto sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;