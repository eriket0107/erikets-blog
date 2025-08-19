import { getPosts } from "@/actions/posts";
import { PageWrapper } from "@/components/PageWrapper";
import { Pagination } from "@/components/Paginatination";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { PostFeed } from "@/components/PostFeed";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

const POSTS_LENGTH = 3;
export const Blog = async ({ currentPage }: { currentPage: number }) => {
  const {
    data: posts,
    next,
    pages: totalPages,
    prev,
    first,
    last,
    items,
  } = await getPosts({ perPage: POSTS_LENGTH, currentPage });
  const t = await getTranslations("BlogPage");

  const pagination = {
    prev,
    next,
    first,
    last,
    totalPages: totalPages || 1,
    currentPage,
  };

  const from = (currentPage - 1) * POSTS_LENGTH + 1;
  const to = Math.min(currentPage * POSTS_LENGTH, items);

  return (
    <PageWrapper>
      <Typography.H2
        id="intro-blog"
        className="animate-fade-in-fast text-accent-foreground max-w-3xl text-left"
      >
        {t("title")}
      </Typography.H2>

      <div className="bg-background sticky top-20 z-60 flex w-full flex-col items-center p-1">
        <Pagination
          pagination={pagination}
          className="text-muted-foreground"
          aria-label="Number of pages"
          data-testid="pagination"
        />
        <Typography.Small className="text-xs" data-testid={"from-to"}>
          {from} {t("pagination_number")} {to} | {items}
        </Typography.Small>
      </div>

      <Suspense
        fallback={
          <>
            <PaginationSkeleton className="flex md:hidden" />
            <PostCardSkeleton length={POSTS_LENGTH} hasImage={false} />
          </>
        }
      >
        <PostFeed posts={posts} />
      </Suspense>
    </PageWrapper>
  );
};
