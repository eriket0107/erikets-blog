import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';



vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  usePathname: () => '/',
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({ locale: 'en' }),
  useSelectedLayoutSegment: () => ({ locale: 'en' }),
}));

vi.mock('@/hooks/useRouter', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

import { SearchInput } from './index';

describe('SearchInput', () => {
  it('should render search input', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox', { name: /search posts/i });
    expect(input).toBeInTheDocument();
  });

  it('should display placeholder text', () => {
    render(<SearchInput placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('should update value when typing', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('should show clear button when value is not empty', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'search query' } });
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when value is empty', () => {
    render(<SearchInput />);
    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should clear value when clear button is clicked', () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'search query' } });
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('should apply custom className', () => {
    const { container } = render(<SearchInput className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should have sticky positioning', () => {
    const { container } = render(<SearchInput />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('sticky');
    expect(wrapper).toHaveClass('top-20');
    expect(wrapper).toHaveClass('z-40');
  });

  it('should have fade-in animation', () => {
    const { container } = render(<SearchInput />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('animate-fade-in-slow');
  });
});
