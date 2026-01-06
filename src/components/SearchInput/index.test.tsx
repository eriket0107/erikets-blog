import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';



vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  usePathname: () => '/',
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({ locale: 'en' }),
  useSelectedLayoutSegment: () => ({ locale: 'en' }),
}));

import { SearchInput } from './index';

describe('SearchInput', () => {
  it('should render search input', () => {
    render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByRole('searchbox', { name: /search posts/i });
    expect(input).toBeInTheDocument();
  });

  it('should display placeholder text', () => {
    render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
        placeholder="Custom placeholder"
      />
    );

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const handleChange = vi.fn();
    function Wrapper() {
      const [value, setValue] = React.useState('');
      return (
        <SearchInput
          value={value}
          onChange={v => {
            setValue(v);
            handleChange(v);
          }}
          onClear={vi.fn()}
        />
      );
    }
    render(<Wrapper />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith('test');
  });

  it('should show clear button when value is not empty', () => {
    render(
      <SearchInput
        value="search query"
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when value is empty', () => {
    render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', () => {
    const handleClear = vi.fn();

    render(
      <SearchInput
        value="search query"
        onChange={vi.fn()}
        onClear={handleClear}
      />
    );

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
        className="custom-class"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should show searching state with accent color', () => {
    const { container } = render(
      <SearchInput
        value="test"
        onChange={vi.fn()}
        onClear={vi.fn()}
        isSearching={true}
      />
    );

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toHaveClass('text-accent-foreground');
  });

  it('should show normal state without accent color', () => {
    const { container } = render(
      <SearchInput
        value="test"
        onChange={vi.fn()}
        onClear={vi.fn()}
        isSearching={false}
      />
    );

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toHaveClass('text-muted-foreground');
  });

  it('should have sticky positioning', () => {
    const { container } = render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('sticky');
    expect(wrapper).toHaveClass('top-20');
    expect(wrapper).toHaveClass('z-40');
  });

  it('should have backdrop blur styling', () => {
    const { container } = render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('backdrop-blur-md');
  });
});
