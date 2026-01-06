import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePostSearch } from './index';
import { PostType } from '@/interfaces/post';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockPosts: PostType[] = [
  {
    id: '1',
    title: 'React Hooks Guide',
    description: 'Learn about React hooks',
    tags: ['react', 'javascript'],
    date: '2024-01-01',
    content: 'Content 1',
    imgSrc: '/image1.jpg',
    isPublished: true,
  },
  {
    id: '2',
    title: 'Next.js Tutorial',
    description: 'Building apps with Next.js',
    tags: ['nextjs', 'react'],
    date: '2024-01-02',
    content: 'Content 2',
    imgSrc: '/image2.jpg',
    isPublished: true,
  },
  {
    id: '3',
    title: 'TypeScript Basics',
    description: 'Introduction to TypeScript',
    tags: ['typescript', 'javascript'],
    date: '2024-01-03',
    content: 'Content 3',
    imgSrc: '/image3.jpg',
    isPublished: true,
  },
];

describe('usePostSearch', () => {
  const mockReplace = vi.fn();
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      replace: mockReplace,
    });

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: mockGet,
      toString: () => '',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return all posts when no search query', () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts })
    );

    expect(result.current.filteredPosts).toHaveLength(3);
    expect(result.current.searchQuery).toBe('');
  });

  it('should filter posts by title', async () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100 })
    );

    act(() => {
      result.current.setSearchQuery('React');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.filteredPosts).toHaveLength(2);
    expect(result.current.filteredPosts[0].title).toBe('React Hooks Guide');
    expect(result.current.filteredPosts[1].title).toBe('Next.js Tutorial');
  });

  it('should filter posts by description', async () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100 })
    );

    act(() => {
      result.current.setSearchQuery('TypeScript');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('TypeScript Basics');
  });

  it('should filter posts by tags', async () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100 })
    );

    act(() => {
      result.current.setSearchQuery('javascript');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.filteredPosts).toHaveLength(2);
  });

  it('should be case insensitive', async () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100 })
    );

    act(() => {
      result.current.setSearchQuery('REACT');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.filteredPosts).toHaveLength(2);
  });

  it('should update URL with search query', async () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100 })
    );

    act(() => {
      result.current.setSearchQuery('react');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(mockReplace).toHaveBeenCalledWith('?q=react', { scroll: false });
  });

  it('should remove query param when search is cleared', async () => {
    mockGet.mockReturnValue('react');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts, debounceMs: 100, initialQuery: 'react' })
    );

    act(() => {
      result.current.setSearchQuery('');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(mockReplace).toHaveBeenCalledWith('', { scroll: false });
  });

  it('should use initial query from URL', () => {
    mockGet.mockReturnValue('typescript');

    const { result } = renderHook(() =>
      usePostSearch({ posts: mockPosts })
    );

    expect(result.current.searchQuery).toBe('typescript');
  });
});
