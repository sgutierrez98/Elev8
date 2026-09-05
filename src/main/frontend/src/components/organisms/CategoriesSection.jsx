/**
 * CategoriesSection - Sección de categorías
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesSection.css';

const categories = [
  { name: 'Camisetas', icon: '👕', path: 'Camisetas' },
  { name: 'Pantalonetas', icon: '🩳', path: 'Pantalonetas' },
  { name: 'Licras', icon: '🩱', path: 'Licras' },
  { name: 'Chaquetas', icon: '🧥', path: 'Chaquetas' },
  { name: 'Accesorios', icon: '🎒', path: 'Accesorios' },
];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Categorías</h2>
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
  );
};

export default CategoriesSection;