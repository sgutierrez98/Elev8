/**
 * Footer - Pie de página de la aplicación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Marca */}
          <div className="footer-brand">
            <div className="footer-brand-name">ELEV8</div>
            <p className="footer-brand-description">
              Tu tienda de ropa deportiva de alto rendimiento.
              Tecnología, estilo y comodidad para cada entrenamiento.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram" className="footer-social-link">📷</a>
              <a href="#" aria-label="Facebook" className="footer-social-link">📘</a>
              <a href="#" aria-label="TikTok" className="footer-social-link">🎵</a>
              <a href="#" aria-label="YouTube" className="footer-social-link">▶️</a>
            </div>
          </div>

          {/* Tienda */}
          <div>
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
          <div>
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
          <div>
            <h4 className="footer-title">Mi cuenta</h4>
            <ul className="footer-links">
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/register">Crear cuenta</Link></li>
              <li><Link to="/cart">Mi carrito</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Elev8 Sportswear · SENA ADSO</span>
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