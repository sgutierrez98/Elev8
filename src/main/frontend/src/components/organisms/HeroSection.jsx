/**
 * HeroSection - Sección Hero de la página principal
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;