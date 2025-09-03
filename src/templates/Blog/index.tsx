import { getPosts } from "@/actions/posts";
import { Box } from "@/components/Box";
import { PageWrapper } from "@/components/PageWrapper";
import { Pagination } from "@/components/Paginatination";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { PostFeed } from "@/components/PostFeed";
import { SeeAllPostsButton } from "@/components/ShowAllPostsButton";
import { Typography } from "@/components/Typography";
import { paginationCookie } from "@/constants/cookies";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

const POSTS_LENGTH = 3;
export const Blog = async ({ currentPage }: { currentPage: number }) => {
  const isPaginated = (await cookies()).get(paginationCookie)?.value;

  const {
    data: posts,
    next,
    pages: totalPages,
    prev,
    first,
    last,
    items,
  } = await getPosts({
    perPage: POSTS_LENGTH,
    currentPage,
    isPaginated: isPaginated === "true",
  });
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
      <Box height="auto" className="relative">
        <SeeAllPostsButton initialValue={isPaginated === "true"} />
        <Box className="w-full" height="auto" direction="col" align="center">
          <Typography.H2
            id="intro-blog"
            className="animate-fade-in-fast text-accent-foreground max-w-3xl pb-0 text-left"
          >
            {t("title")}
          </Typography.H2>
        </Box>
      </Box>

      {isPaginated === "true" && (
        <Suspense
          fallback={
            <PaginationSkeleton className="animate-fade-in-fast flex" />
          }
        >
          <div className="animate-fade-in-fast justifiy-center bg-background sticky top-20 z-60 flex w-full flex-col items-center gap-2 p-1">
            <Pagination
              pagination={pagination}
              className="text-muted-foreground"
              aria-label="Number of pages"
              data-testid="pagination"
            />
            <Typography.Small
              className="text-muted-foreground text-xs"
              data-testid={"from-to"}
            >
              {from} {t("pagination_number")} {to} | {items}
            </Typography.Small>
          </div>
        </Suspense>
      )}

      <Suspense
        fallback={<PostCardSkeleton length={POSTS_LENGTH} hasImage={false} />}
      >
        <PostFeed posts={posts} />
      </Suspense>
    </PageWrapper>
  );
};
