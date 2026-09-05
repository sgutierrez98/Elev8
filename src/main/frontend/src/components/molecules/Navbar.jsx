import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated, logout } from '../../services/authService';
import { getCartCount } from '../../services/cartService';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const updateNavbarState = () => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const user = getCurrentUser();
      setUserName(user?.firstName || user?.name || 'Usuario');
    }
    setCartCount(getCartCount());
  };

  useEffect(() => {
    updateNavbarState();

    const handleAuthChange = () => updateNavbarState();
    const handleCartUpdate = () => setCartCount(getCartCount());

    window.addEventListener('authChanged', handleAuthChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          ELEV8 <span className="navbar-logo-sub">Sportswear</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/catalogue" className="nav-link">Catálogo</Link>
          <Link to="/cart" className="nav-link nav-cart">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <>
              <span className="nav-user">👤 {userName}</span>
              <button onClick={handleLogout} className="nav-link nav-logout">🚪</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">👤 Iniciar sesión</Link>
          )}
        </div>

        <button className="navbar-mobile-toggle" onClick={toggleMobileMenu} aria-label="Menú">
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Inicio</Link>
          <Link to="/catalogue" className="nav-link" onClick={toggleMobileMenu}>Catálogo</Link>
          <Link to="/cart" className="nav-link" onClick={toggleMobileMenu}>🛒 Carrito</Link>
          {isLoggedIn ? (
            <>
              <span className="nav-user">👤 {userName}</span>
              <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="nav-link">🚪 Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>👤 Iniciar sesión</Link>
              <Link to="/register" className="nav-link" onClick={toggleMobileMenu}>📝 Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;