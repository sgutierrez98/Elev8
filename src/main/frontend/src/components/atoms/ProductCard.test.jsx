/**
 * Pruebas unitarias para el componente ProductCard
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

// Mock del producto de prueba
const mockProduct = {
  id: 1,
  name: 'Camiseta Dry-Fit Pro',
  category: 'Camisetas',
  emoji: '👕',
  price: 89900,
  oldPrice: 109900,
  badge: 'POPULAR',
  rating: 4.8,
  reviews: 124,
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductCard Component', () => {
  test('renders product information', () => {
    renderWithRouter(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );

    expect(screen.getByText('Camiseta Dry-Fit Pro')).toBeInTheDocument();
    expect(screen.getByText('Camisetas')).toBeInTheDocument();
    expect(screen.getByText('$89.900')).toBeInTheDocument();
    expect(screen.getByText('$109.900')).toBeInTheDocument();
    expect(screen.getByText('POPULAR')).toBeInTheDocument();
    expect(screen.getByText('(124)')).toBeInTheDocument();
  });

  test('renders discount badge when oldPrice exists', () => {
    renderWithRouter(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );

    expect(screen.getByText('-18%')).toBeInTheDocument();
  });

  test('calls onAddToCart when add button is clicked', () => {
    const handleAddToCart = jest.fn();
    renderWithRouter(
      <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
    );

    const addButton = screen.getByText('🛒 Agregar al carrito');
    fireEvent.click(addButton);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('renders emoji as fallback when no image', () => {
    renderWithRouter(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );

    expect(screen.getByText('👕')).toBeInTheDocument();
  });

  test('does not render old price when not present', () => {
    const productWithoutOldPrice = { ...mockProduct, oldPrice: null };
    renderWithRouter(
      <ProductCard product={productWithoutOldPrice} onAddToCart={() => {}} />
    );

    expect(screen.queryByText('$109.900')).not.toBeInTheDocument();
  });

  test('does not render badge when not present', () => {
    const productWithoutBadge = { ...mockProduct, badge: null };
    renderWithRouter(
      <ProductCard product={productWithoutBadge} onAddToCart={() => {}} />
    );

    expect(screen.queryByText('POPULAR')).not.toBeInTheDocument();
  });

  test('renders link to product detail', () => {
    renderWithRouter(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});