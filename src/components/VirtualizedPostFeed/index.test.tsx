import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VirtualizedPostFeed } from './index';
import { PostType } from '@/interfaces/post';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: vi.fn(() => ({
    getVirtualItems: () => [
      { key: '0', index: 0, start: 0, size: 250 },
      { key: '1', index: 1, start: 250, size: 250 },
    ],
    getTotalSize: () => 500,
    measureElement: vi.fn(),
  })),
}));

const mockPosts: PostType[] = [
  {
    id: '1',
    title: 'Test Post 1',
    description: 'Description 1',
    tags: ['react', 'typescript'],
    date: '2024-01-01',
    content: 'Content 1',
    imgSrc: '/image1.jpg',
    isPublished: true,
  },
  {
    id: '2',
    title: 'Test Post 2',
    description: 'Description 2',
    tags: ['nextjs', 'testing'],
    date: '2024-01-02',
    content: 'Content 2',
    imgSrc: '/image2.jpg',
    isPublished: true,
  },
];

const messages = {
  PostCard: {
    read_time: 'Read time',
    min: 'min',
  },
};

const renderWithIntl = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('VirtualizedPostFeed', () => {
  it('should render virtualized posts', () => {
    renderWithIntl(<VirtualizedPostFeed posts={mockPosts} />);

    expect(screen.getByRole('feed', { name: /blog posts/i })).toBeInTheDocument();
  });

  it('should render post cards', () => {
    renderWithIntl(<VirtualizedPostFeed posts={mockPosts} />);

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('should show empty state when no posts', () => {
    renderWithIntl(<VirtualizedPostFeed posts={[]} />);

    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
    expect(
      screen.getByRole('feed', { name: /no blog posts found/i })
    ).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    renderWithIntl(<VirtualizedPostFeed posts={mockPosts} className="custom-class" />);

    const feed = screen.getByRole('feed', { name: /blog posts/i });
    expect(feed).toHaveClass('custom-class');
  });

  it('should have proper ARIA attributes', () => {
    renderWithIntl(<VirtualizedPostFeed posts={mockPosts} />);

    const feed = screen.getByRole('feed');
    expect(feed).toHaveAttribute('aria-busy', 'false');
    expect(feed).toHaveAttribute('aria-label', 'Blog posts');
  });

  it('should render with overflow-auto class', () => {
    renderWithIntl(<VirtualizedPostFeed posts={mockPosts} />);

    const feed = screen.getByRole('feed', { name: /blog posts/i });
    expect(feed).toHaveClass('overflow-auto');
  });
});
