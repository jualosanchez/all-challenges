import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders main title and navigation links', () => {
  // Renderiza el componente App envuelto en BrowserRouter
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Verifica que el título principal está en el documento
  const titleElement = screen.getByRole('heading', { name: /React Challenges/i });
  expect(titleElement).toBeInTheDocument();
});