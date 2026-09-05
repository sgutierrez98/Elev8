/**
 * Navbar - Barra de navegación principal
 * Muestra el logo, enlaces de navegación y estado del usuario
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';
import { getCartCount } from '../services/cartService';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Función para actualizar el estado del navbar
  const updateNavbarState = () => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const user = getCurrentUser();
      setUserName(user?.firstName || user?.name || 'Usuario');
    } else {
      setUserName('');
    }
    
    setCartCount(getCartCount());
  };

  // Verificar estado al cargar el componente
  useEffect(() => {
    updateNavbarState();
  }, []);

  // Escuchar cambios en autenticación y carrito
  useEffect(() => {
    const handleAuthChange = () => {
      updateNavbarState();
    };
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('authChanged', handleAuthChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout(true); // Redirige al inicio
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Elev8 Sportswear inicio">
          ELEV8 <span className="navbar-logo-sub">Sportswear</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/catalogue" className="nav-link">Catálogo</Link>
          <Link to="/cart" className="nav-link nav-cart" aria-label="Carrito de compras">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} productos en el carrito`}>
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <span className="nav-user" aria-label={`Usuario: ${userName}`}>
                👤 {userName}
              </span>
              <button
                onClick={handleLogout}
                className="nav-link nav-logout"
                aria-label="Cerrar sesión"
              >
                🚪
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">👤 Iniciar sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;