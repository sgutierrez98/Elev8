/**
 * Elev8 Sportswear - Frontend React
 * Punto de entrada principal de la aplicación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);