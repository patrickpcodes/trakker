import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopBar } from './TopBar';
import "@testing-library/jest-dom";

// Mock the React hooks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [true, jest.fn()]),
  useEffect: jest.fn((f) => f()),
}));

// Mock the next-themes module
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('TopBar', () => {
  it('renders the page name', () => {
    render(<TopBar pageName="Test Page" />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    render(<TopBar pageName="Test Page" />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});