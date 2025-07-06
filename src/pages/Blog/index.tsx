import { Box } from "@/components/Box";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { PostFeed } from "@/components/PostFeed";
import { Typography } from "@/components/Typography";
import { Suspense } from "react";

const POSTS_LENGTH = 3;

export const Blog = ({ currentPage }: { currentPage: number }) => {
  return (
    <Box
      justify="center"
      align="center"
      padding="4"
      direction="col"
      gap="4"
      width="full"
      height="full"
      className="overflow-hidden"
    >
      <Typography.H1
        id="intro-blog"
        className="animate-fade-in-fast text-accent-foreground max-w-3xl text-left"
      >
        Posts
      </Typography.H1>

      <Box
        direction="col"
        width="auto"
        justify="none"
        align="center"
        className="animate-fade-in-slow overflow-y-scroll rounded-sm"
        gap="4"
      >
        <Suspense
          fallback={
            <>
              <PaginationSkeleton className="flex md:hidden" />
              <PostCardSkeleton length={POSTS_LENGTH} hasImage={false} />
              <PaginationSkeleton className="hidden md:flex" />
            </>
          }
        >
          <PostFeed currentPage={currentPage} />
        </Suspense>
      </Box>
    </Box>
  );
};
