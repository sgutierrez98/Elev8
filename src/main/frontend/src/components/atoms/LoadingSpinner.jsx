/**
 * LoadingSpinner - Componente de carga
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * @param {string} size - Tamaño: 'sm' | 'md' | 'lg'
 * @param {string} message - Mensaje de carga
 * @param {boolean} fullPage - Si ocupa toda la página
 */

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({
  size = 'md',
  message = 'Cargando...',
  fullPage = false
}) => {
  return (
    <div className={`loading-container ${fullPage ? 'loading-fullpage' : ''}`}>
      <div className={`loading-spinner loading-spinner-${size}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;