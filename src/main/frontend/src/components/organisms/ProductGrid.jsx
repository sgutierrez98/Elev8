/**
 * ProductGrid - Grid de productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import ProductCard from '../atoms/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart, loading = false }) => {
  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;