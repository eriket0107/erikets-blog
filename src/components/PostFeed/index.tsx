import { cn } from "@/utils";
import { Box } from "../Box";
import { PostCard } from "../PostCard";

import { PostType } from "@/interfaces/post";
import { cookies } from "next/headers";
import { paginationCookie } from "@/constants/cookies";

export const PostFeed = async ({ posts }: { posts: PostType[] }) => {
  const isPaginated = (await cookies()).get(paginationCookie)?.value;

  return (
    <Box
      as="section"
      direction="col"
      gap="2"
      role="feed"
      align="center"
      aria-label="Blog posts with pagination"
      className={cn(
        "snap-y overflow-y-scroll px-4 focus-within:outline-offset-2 focus:border-none md:w-[700px] md:p-0",
        isPaginated === "true" ? "md:max-h-[700px]" : "",
      )}
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
