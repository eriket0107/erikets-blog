import { Box } from "@/components/Box";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { PostFeed } from "@/components/PostFeed";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

const POSTS_LENGTH = 3;

export const Blog = async ({ currentPage }: { currentPage: number }) => {
  const t = await getTranslations("BlogPage");
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
        {t("title")}
      </Typography.H1>

      <Box
        direction="col"
        width="full"
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
            </>
          }
        >
          <PostFeed currentPage={currentPage} />
        </Suspense>
      </Box>
    </Box>
  );
};
