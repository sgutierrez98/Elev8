/**
 * CataloguePage - Página de catálogo de productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import '../styles/CataloguePage.css';

const CataloguePage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // Obtener filtros de la URL
  const category = searchParams.get('category') || '';
  const onSale = searchParams.get('onSale') === 'true';

  useEffect(() => {
    fetchProducts();
  }, [category, onSale]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      if (onSale) params.onSale = true;
      
      const data = await getProducts(params);
      setProducts(data);
      setTotalProducts(data.length);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`✅ ${product.name} agregado al carrito`);
  };

  const categories = [
    { name: 'Camisetas', path: 'camisetas' },
    { name: 'Pantalonetas', path: 'pantalonetas' },
    { name: 'Licras', path: 'licras' },
    { name: 'Chaquetas', path: 'chaquetas' },
    { name: 'Accesorios', path: 'accesorios' },
  ];

  return (
    <div className="catalogue-page">
      <div className="container">
        <div className="catalogue-header">
          <h1>📦 Catálogo de Productos</h1>
          <p className="catalogue-count">{totalProducts} productos encontrados</p>
        </div>

        <div className="catalogue-layout">
          {/* Filtros */}
          <aside className="filters-sidebar">
            <h3>Categorías</h3>
            <ul className="filters-list">
              <li>
                <Link to="/catalogue" className={!category ? 'active' : ''}>
                  Todos los productos
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={`/catalogue?category=${cat.path}`}
                    className={category === cat.path ? 'active' : ''}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="filters-divider"></div>
            <Link to="/catalogue?onSale=true" className="filter-link">
              🏷️ Ofertas especiales
            </Link>
          </aside>

          {/* Productos */}
          <div className="catalogue-products">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">❌ {error}</p>
                <button onClick={fetchProducts} className="btn btn-primary">
                  Reintentar
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No se encontraron productos</p>
                <Link to="/catalogue" className="btn btn-primary">
                  Ver todos
                </Link>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => {
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
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;