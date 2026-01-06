'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PostType } from '@/interfaces/post';

interface UsePostSearchProps {
  posts: PostType[];
  initialQuery?: string;
  debounceMs?: number;
}

interface UsePostSearchReturn {
  filteredPosts: PostType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
}

/**
 * Hook for managing post search with URL state synchronization
 * Filters posts by title, description, and tags
 */
export function usePostSearch({
  posts,
  initialQuery = '',
  debounceMs = 300,
}: UsePostSearchProps): UsePostSearchReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery || urlQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debounceMs]);

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(newUrl, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  // Filter posts based on debounced query
  const filteredPosts = debouncedQuery
    ? posts.filter((post) => {
      const query = debouncedQuery.toLowerCase();
      const matchesTitle = post.title?.toLowerCase().includes(query);
      const matchesDescription = post.description?.toLowerCase().includes(query);
      const matchesTags = post.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return matchesTitle || matchesDescription || matchesTags;
    })
    : posts;

  return {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    isSearching,
  };
}
