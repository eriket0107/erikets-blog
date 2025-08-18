import { Box } from "../Box";
import { PostCard } from "../PostCard";

import { PostType } from "@/interfaces/post";

export const PostFeed = ({ posts }: { posts: PostType[] }) => {
  return (
    <Box
      as="section"
      direction="col"
      gap="4"
      role="feed"
      width="500px"
      align="center"
      aria-label="Blog posts with pagination"
      className="snap-y p-4 focus-within:outline-offset-2 focus:border-none md:p-0 md:pb-6"
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
  );
};
