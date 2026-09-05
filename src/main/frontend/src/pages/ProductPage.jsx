/**
 * ProductPage - Página de detalle de producto
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductPage.css';

const ProductPage = () => {
  return (
    <div className="product-page">
      <div className="container">
        <h1>🔍 Detalle del Producto</h1>
        <p>Página de detalle en construcción...</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default ProductPage;