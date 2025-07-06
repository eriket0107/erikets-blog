import { getPosts } from "@/actions/posts";
import { Box } from "../Box";
import { PostCard } from "../PostCard";
import { Pagination } from "../Paginatination";
import { Typography } from "../Typography";
import { getTranslations } from "next-intl/server";

const POSTS_LENGTH = 4;

export const PostFeed = async ({
  currentPage = 1,
}: {
  currentPage: number;
}) => {
  const {
    data: posts,
    next,
    pages: totalPages,
    prev,
    first,
    last,
    items,
  } = await getPosts({ perPage: POSTS_LENGTH, currentPage });
  const t = await getTranslations("PostFeed");
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
    <Box direction="col" justify="center" align="center" gap="2">
      <Pagination
        pagination={pagination}
        className="text-muted-foreground flex md:hidden"
        aria-label="Number of pages"
        data-testid="pagination"
      />
      <Typography.Small className="text-xs md:hidden" data-testid={"from-to"}>
        {from} {t("pagination_number")} {to} | {items}
      </Typography.Small>

      <Box
        as="section"
        direction="col"
        gap="4"
        role="feed"
        width="500px"
        aria-label="Blog posts with pagination"
        className="snap-y overflow-y-auto focus-within:outline-offset-2 focus:border-none md:h-[630px] md:pb-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
        tabIndex={0}
      >
        {posts?.map((post, index) => (
          <PostCard
            post={post}
            key={post.id}
            ariaPosinset={index + 1}
            ariaSetsize={posts.length}
            hasImage={false}
          />
        ))}
        <div className="to-background/100 from-background/0 max- fixed bottom-13 hidden h-[50px] w-full bg-gradient-to-b md:block md:max-w-[500px]" />
      </Box>
      <Pagination pagination={pagination} className="hidden md:flex" />
      <Typography.Small className="text-muted-foreground hidden md:flex">
        {from} {t("pagination_number")} {to} | {items}
      </Typography.Small>
    </Box>
  );
};
