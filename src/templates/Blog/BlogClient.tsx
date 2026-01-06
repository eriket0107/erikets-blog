'use client';

import { PostType } from '@/interfaces/post';
import { SearchInput } from '@/components/SearchInput';
import { VirtualizedPostFeed } from '@/components/VirtualizedPostFeed';
import { usePostSearch } from '@/hooks/usePostSearch';
import { Typography } from '@/components/Typography';
import { useTranslations } from 'next-intl';

interface BlogProps {
  posts: PostType[];
  initialQuery?: string;
}

export const Blog = ({ posts, initialQuery = '' }: BlogProps) => {
  const t = useTranslations('BlogPage');
  const { filteredPosts, searchQuery, setSearchQuery, isSearching } =
    usePostSearch({
      posts,
      initialQuery,
      debounceMs: 300,
    });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className='w-full h-full'>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={handleClearSearch}
        isSearching={isSearching}
        className="animate-fade-in-slow mb-4"
      />

      <div className="animate-fade-in-slow">
        {searchQuery && (
          <Typography.Small className="text-muted-foreground text-center mb-4">
            {filteredPosts.length} {t('results_found')} &quot;{searchQuery}&quot;
          </Typography.Small>
        )}

        <Typography.Small className="text-muted-foreground text-center mt-4 mb-8">
          {filteredPosts.length} {t('total_posts')}
        </Typography.Small>

        <VirtualizedPostFeed
          posts={filteredPosts}
          className="h-[calc(100vh-280px)] w-full"
        />
      </div>
    </div>
  );
};
