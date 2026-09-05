/**
 * Footer - Pie de página de la aplicación
 * Muestra información de la empresa y enlaces útiles
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Marca */}
          <div className="footer-brand-section">
            <div className="footer-brand">ELEV8</div>
            <p className="footer-description">
              Tu tienda de ropa deportiva de alto rendimiento.
              Tecnología, estilo y comodidad para cada entrenamiento.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="TikTok">🎵</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Tienda */}
          <div className="footer-links-section">
            <h4 className="footer-title">Tienda</h4>
            <ul className="footer-links">
              <li><Link to="/catalogue">Todos los productos</Link></li>
              <li><Link to="/catalogue?category=Camisetas">Camisetas</Link></li>
              <li><Link to="/catalogue?category=Pantalonetas">Pantalonetas</Link></li>
              <li><Link to="/catalogue?category=Licras">Licras</Link></li>
              <li><Link to="/catalogue?category=Chaquetas">Chaquetas</Link></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className="footer-links-section">
            <h4 className="footer-title">Ayuda</h4>
            <ul className="footer-links">
              <li><a href="#">Envíos y entregas</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Guía de tallas</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          {/* Mi cuenta */}
          <div className="footer-links-section">
            <h4 className="footer-title">Mi cuenta</h4>
            <ul className="footer-links">
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/register">Crear cuenta</Link></li>
              <li><Link to="/cart">Mi carrito</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Elev8 Sportswear · SENA ADSO · GA6-220501096-AA4-EV03</span>
          <div className="footer-payments">
            <span>💳 Visa</span>
            <span>💳 MC</span>
            <span>🏦 PSE</span>
            <span>📱 Nequi</span>
            <span>💸 Efecty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;