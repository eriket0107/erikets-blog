import { getPosts } from "@/actions/posts";
import { Box } from "../Box";
import { PostCard } from "../PostCard";
import { Pagination } from "../Paginatination";
import { Typography } from "../Typography";

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
      />
      <Typography.Small className="text-xs md:hidden">
        {from} to {to} | {items}
      </Typography.Small>

      <Box
        as="section"
        direction="col"
        gap="4"
        role="feed"
        width="500px"
        aria-label="Blog posts with pagination"
        className="[&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground focus-within:outline-accent snap-y snap-mandatory overflow-y-auto focus-within:outline-2 focus-within:outline-offset-2 md:h-[638px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
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
      </Box>
      <Pagination pagination={pagination} className="hidden md:flex" />
      <Typography.Small className="text-muted-foreground hidden md:flex">
        {from} to {to} | {items}
      </Typography.Small>
    </Box>
  );
};
