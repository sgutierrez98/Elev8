/**
 * ProductCard - Componente de tarjeta de producto
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * @param {Object} product - Datos del producto
 * @param {function} onAddToCart - Función al agregar al carrito
 * @param {string} className - Clases CSS adicionales
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import Badge from './Badge';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const {
    id,
    name,
    category,
    emoji = '📦',
    price,
    oldPrice,
    badge,
    rating,
    reviews
  } = product;

  const discount = calculateDiscount(price, oldPrice);
  const formattedPrice = formatPrice(price);
  const formattedOldPrice = oldPrice ? formatPrice(oldPrice) : null;

  return (
    <div className={`product-card ${className}`}>
      <Link to={`/product/${id}`} className="product-card-link">
        <div className="product-card-image">
          <span className="product-card-emoji">{emoji}</span>
          {badge && <Badge variant="red" className="product-card-badge">{badge}</Badge>}
          {discount > 0 && (
            <Badge variant="green" className="product-card-discount">
              -{discount}%
            </Badge>
          )}
        </div>
        <div className="product-card-info">
          <p className="product-card-category">{category || 'Categoría'}</p>
          <h3 className="product-card-name">{name}</h3>
          {rating > 0 && (
            <div className="product-card-rating">
              <span className="product-card-stars">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
              <span className="product-card-reviews">({reviews || 0})</span>
            </div>
          )}
          <div className="product-card-prices">
            <span className="product-card-price">{formattedPrice}</span>
            {formattedOldPrice && (
              <span className="product-card-old-price">{formattedOldPrice}</span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={() => onAddToCart(product)}
        className="product-card-add-btn"
        aria-label={`Agregar ${name} al carrito`}
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;