import { getAllPosts } from "@/actions/posts";
import { PageWrapper } from "@/components/PageWrapper";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { Blog } from "./BlogClient";

export const BlogPage = async ({ initialQuery = '' }: { initialQuery?: string }) => {
  const { data: posts } = await getAllPosts();
  const t = await getTranslations("BlogPage");

  return (
    <PageWrapper>
      <Typography.H2
        id="intro-blog"
        className="animate-fade-in-fast text-accent-foreground max-w-3xl text-left mb-4"
      >
        {t('title')}
      </Typography.H2>

      <Blog posts={posts} initialQuery={initialQuery} />
    </PageWrapper>
  );
};
