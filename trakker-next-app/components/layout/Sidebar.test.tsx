import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import '@testing-library/jest-dom';

// Mock the next/link module
jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockedLink.displayName = 'Link';
  return MockedLink;
});

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Home: () => <div data-testid="home-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  List: () => <div data-testid="list-icon" />,
}));

describe('Sidebar', () => {
  it('renders navigation links', () => {
    render(<Sidebar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
  });

  it('renders correct icons', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('list-icon')).toBeInTheDocument();
  });
});
