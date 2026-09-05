/**
 * HomePage - Página principal
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { getPopularProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import HeroSection from '../components/organisms/HeroSection';
import CategoriesSection from '../components/organisms/CategoriesSection';
import ProductGrid from '../components/organisms/ProductGrid';
import './HomePage.css';

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const data = await getPopularProducts(4);
      setPopularProducts(data);
    } catch (error) {
      console.error('Error al cargar productos populares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`✅ ${product.name} agregado al carrito`);
  };

  return (
    <div className="home-page">
      <HeroSection />
      <CategoriesSection />
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">⭐ Más populares</h2>
          </div>
          <ProductGrid
            products={popularProducts}
            onAddToCart={handleAddToCart}
            loading={loading}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;