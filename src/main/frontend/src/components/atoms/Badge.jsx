/**
 * Badge - Componente de etiqueta/badge
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * @param {string} variant - Variante: 'red' | 'green' | 'navy' | 'gold'
 * @param {ReactNode} children - Contenido del badge
 * @param {string} className - Clases CSS adicionales
 */

import React from 'react';
import './Badge.css';

const Badge = ({ variant = 'red', children, className = '', ...props }) => {
  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;