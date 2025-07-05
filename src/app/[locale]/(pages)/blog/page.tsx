import { Box } from "@/components/Box";
import { PaginationSkeleton } from "@/components/Paginatination/skeleton";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { PostFeed } from "@/components/PostFeed";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataBlog" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe and Vanilla Code",
    },
  };
}
const POSTS_LENGTH = 3;

const Blog = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

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
        Teste
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
export default Blog;
