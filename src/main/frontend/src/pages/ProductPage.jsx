/**
 * ProductPage - Página de detalle de producto
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import ProductCard from '../components/atoms/ProductCard';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(productId);
      setProduct(data);
      
      // Si el producto tiene colores, seleccionar el primero
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
      
      // Simular productos relacionados (en una implementación real, vendrían de la API)
      if (data.category) {
        // Aquí se cargarían productos relacionados desde la API
        setRelatedProducts([]);
      }
    } catch (err) {
      console.error('Error al cargar producto:', err);
      setError('No se pudo cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`✅ ${product.name} agregado al carrito`);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <LoadingSpinner message="Cargando producto..." />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-error">
            <h2>❌ {error || 'Producto no encontrado'}</h2>
            <Link to="/catalogue" className="btn btn-primary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.oldPrice);
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const colors = product.colors || ['#0F0F14', '#1A237E', '#B71C1C'];

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/catalogue">Catálogo</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Detalle del producto */}
        <div className="product-detail">
          {/* Imagen */}
          <div className="product-detail-image">
            <div className="product-detail-emoji">{product.emoji || '👕'}</div>
            {discount > 0 && (
              <span className="product-detail-discount">-{discount}%</span>
            )}
            {product.badge && (
              <span className="product-detail-badge">{product.badge}</span>
            )}
          </div>

          {/* Información */}
          <div className="product-detail-info">
            <p className="product-detail-category">{product.category || 'Categoría'}</p>
            <h1 className="product-detail-name">{product.name}</h1>
            
            <div className="product-detail-rating">
              <span className="product-detail-stars">
                {'★'.repeat(Math.floor(product.rating || 0))}
                {'☆'.repeat(5 - Math.floor(product.rating || 0))}
              </span>
              <span className="product-detail-reviews">
                ({product.reviews || 0} reseñas)
              </span>
            </div>

            <div className="product-detail-prices">
              <span className="product-detail-price">{formatPrice(product.price)}</span>
              {product.oldPrice > 0 && (
                <span className="product-detail-old-price">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="product-detail-description">
              {product.description || 'Descripción no disponible'}
            </p>

            {/* Tallas */}
            {sizes.length > 0 && (
              <div className="product-detail-size">
                <label>Talla:</label>
                <div className="product-detail-size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colores */}
            {colors.length > 0 && (
              <div className="product-detail-color">
                <label>Color:</label>
                <div className="product-detail-color-options">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="product-detail-quantity">
              <label>Cantidad:</label>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="product-detail-actions">
              <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                🛒 Agregar al carrito
              </button>
              <Link to="/cart" className="btn btn-outline btn-lg">
                ⚡ Comprar ahora
              </Link>
            </div>

            {/* Garantías */}
            <div className="product-detail-guarantees">
              <div className="guarantee-item">
                <span>🚚</span>
                <span>Envío gratis en compras mayores a $150.000</span>
              </div>
              <div className="guarantee-item">
                <span>↩️</span>
                <span>30 días para devoluciones sin preguntas</span>
              </div>
              <div className="guarantee-item">
                <span>🔒</span>
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>También te puede gustar</h2>
            <div className="related-products-grid">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;