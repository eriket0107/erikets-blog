import { getAllPosts } from "@/actions/posts";
import { PageWrapper } from "@/components/PageWrapper";
import { Typography } from "@/components/Typography";
import { getTranslations } from "next-intl/server";
import { VirtualizedPostFeed } from "@/components/VirtualizedPostFeed";
import { SearchInput } from "@/components/SearchInput";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Activity } from "react";

const SEARCH_DISPLAY_THRESHOLD = 5;

export const BlogPage = async ({ initialQuery = '' }: { initialQuery?: string }) => {
  const posts = await getAllPosts({ searchQuery: initialQuery });
  const t = await getTranslations("BlogPage");
  const isToDisplaySearch = !!posts.data.length && posts.data.length > SEARCH_DISPLAY_THRESHOLD || !!initialQuery.length

  return (
    <PageWrapper>
      <ScrollProgress />
      <Typography.H2
        id="intro-blog"
        className="animate-fade-in-fast text-accent-foreground max-w-175 text-left pt-10"
      >
        {t('title')}
      </Typography.H2>

      <Activity mode={isToDisplaySearch ? 'visible' : 'hidden'}>
        <SearchInput
          placeholder={t('search_placeholder')}
        />
      </Activity>

      <Activity mode={!!initialQuery.length ? 'visible' : 'hidden'}>

        <Typography.Small className="text-muted-foreground text-center mb-4">
          {posts.data.length} {posts.data.length === 1 ? 'result found' : 'results found'} | "{initialQuery}"
        </Typography.Small>
      </Activity>

      <VirtualizedPostFeed posts={posts.data} />
    </PageWrapper>
  );
};