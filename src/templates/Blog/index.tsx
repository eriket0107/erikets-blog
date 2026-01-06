import { getAllPosts } from "@/actions/posts";
import { PageWrapper } from "@/components/PageWrapper";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { VirtualizedPostFeed } from "@/components/VirtualizedPostFeed";
import { SearchInput } from "@/components/SearchInput";
import { ScrollProgress } from "@/components/ScrollProgress";

export const BlogPage = async ({ initialQuery = '' }: { initialQuery?: string }) => {
  const posts = await getAllPosts({ searchQuery: initialQuery });
  const t = await getTranslations("BlogPage");

  return (
    <PageWrapper>
      <ScrollProgress />
      <Typography.H2
        id="intro-blog"
        className="animate-fade-in-fast text-accent-foreground max-w-175 text-left pt-10"
      >
        {t('title')}
      </Typography.H2>

      <SearchInput
        placeholder={t('search_placeholder')}
      />

      {initialQuery && (
        <Typography.Small className="text-muted-foreground text-center mb-4">
          {posts.data.length} {posts.data.length === 1 ? 'result found' : 'results found'} for "{initialQuery}"
        </Typography.Small>
      )}

      <VirtualizedPostFeed posts={posts.data} />
    </PageWrapper>
  );
};