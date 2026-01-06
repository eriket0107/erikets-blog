'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { PostType } from '@/interfaces/post';
import { PostCard } from '../PostCard';
import { cn } from '@/utils';
import { Box } from '../Box';

interface VirtualizedPostFeedProps {
  posts: PostType[];
  className?: string;
  estimateSize?: number;
}

export const VirtualizedPostFeed = ({
  posts = [],
  className,
  estimateSize = 250,
}: VirtualizedPostFeedProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });

  if (!posts || posts.length === 0) {
    return (
      <Box
        as="section"
        direction="col"
        align="center"
        justify="center"
        className={cn('min-h-[400px] p-4', className)}
        role="feed"
        aria-label="No blog posts found"
      >
        <p className="text-muted-foreground text-center">
          No posts found. Try adjusting your search query.
        </p>
      </Box>
    );
  }

  return (
    <div
      ref={parentRef}
      className={cn(
        'w-full overflow-auto',
        className
      )}
      role="feed"
      aria-label="Blog posts"
      aria-busy="false"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const post = posts[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Box className="px-4 pb-4 md:px-0 md:mx-auto md:max-w-[700px]">
                <PostCard
                  post={post}
                  ariaPosinset={virtualItem.index + 1}
                  ariaSetsize={posts.length}
                  hasImage={false}
                />
              </Box>
            </div>
          );
        })}
      </div>
    </div>
  );
};
