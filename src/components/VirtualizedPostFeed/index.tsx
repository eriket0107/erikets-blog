'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { PostType } from '@/interfaces/post';
import { PostCard } from '../PostCard';
import { cn } from '@/utils';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { NotebookText, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollProgress } from '../ScrollProgress';

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
  const t = useTranslations("HomePage");

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });

  if (!posts || !posts.length) {
    return (
      <Box
        as="section"
        direction="col"
        align="center"
        justify="center"
        className={cn('min-h-100 p-4', className)}
        role="feed"
        aria-label="No blog posts found"
      >
        <Box
          gap="6"
          align="center"
          height="auto"
          className="py-4 text-left"
          aria-label="No posts in the screen."
          data-testid="empty-posts"
        >
          <Typography.H3 className="text-muted-foreground flex items-center">
            {t.rich("empty_posts", {
              br: () => <br />,
            })}
          </Typography.H3>
          <div className="relative">
            <Pencil
              className="animate-waving text-muted-foreground absolute top-0 left-2.5 z-1"
              size={30}
              fill="grey"
            />
            <NotebookText className="text-muted-foreground z-[-1]" size={48} />
          </div>
        </Box>
      </Box>
    );
  }

  return (
    <div
      ref={parentRef}
      className={cn(
        'w-full overflow-auto animate-fade-in-slow',
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
              <Box className="px-4 pb-4 md:px-0 md:mx-auto md:max-w-175">
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
