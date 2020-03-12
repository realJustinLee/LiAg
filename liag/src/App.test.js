import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders fork me on github link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Fork me on GitHub/i);
  expect(linkElement).toBeInTheDocument();
});
