/**
 * App - Componente raíz de Elev8
 * Configura las rutas y el layout principal
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar páginas
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Importar componentes compartidos
import Navbar from './components/molecules/Navbar';
import Footer from './components/molecules/Footer';

// Estilos globales
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rutas con prefijo /elev8/react (para compatibilidad) */}
            <Route path="/elev8/react" element={<HomePage />} />
            <Route path="/elev8/react/catalogue" element={<CataloguePage />} />
            <Route path="/elev8/react/product/:id" element={<ProductPage />} />
            <Route path="/elev8/react/cart" element={<CartPage />} />
            <Route path="/elev8/react/login" element={<LoginPage />} />
            <Route path="/elev8/react/register" element={<RegisterPage />} />
            
            {/* Redirección para /elev8/ */}
            <Route path="/elev8" element={<Navigate to="/" replace />} />
            <Route path="/elev8/" element={<Navigate to="/" replace />} />
            
            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;