/**
 * Input - Componente de campo de entrada reutilizable
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 * 
 * @param {string} type - Tipo de input: 'text' | 'email' | 'password' | 'number' | 'tel'
 * @param {string} label - Etiqueta del campo
 * @param {string} placeholder - Texto de placeholder
 * @param {string} value - Valor del campo
 * @param {function} onChange - Función al cambiar el valor
 * @param {string} error - Mensaje de error
 * @param {boolean} required - Si el campo es obligatorio
 * @param {boolean} disabled - Si el campo está deshabilitado
 * @param {string} className - Clases CSS adicionales
 */

import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  ...props
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).slice(2, 7)}`;
  const hasError = !!error;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input-field ${hasError ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        name={name}
        {...props}
      />
      {hasError && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;