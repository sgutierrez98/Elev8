/**
 * Button - Componente de botón reutilizable
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * @param {string} variant - Variante del botón: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - Tamaño del botón: 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Si el botón ocupa todo el ancho disponible
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {function} onClick - Función a ejecutar al hacer clic
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases CSS adicionales
 */

import React from 'react';
import './Button.css';

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  // Construir clases CSS
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;