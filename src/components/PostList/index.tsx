import { Box } from "../Box";
import { getPosts } from "@/actions/posts";
import { PostCard } from "../PostCard";
import { Typography } from "../Typography";
import { NotebookPen } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const PostList = async () => {
  const posts = await getPosts({ perPage: 2 });
  const hasPosts = !!posts.data.length;
  const t = await getTranslations("HomePage");

  return (
    <Box
      direction="col"
      gap="4"
      role="feed"
      aria-label="Latest blog posts"
      className="[&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground focus-within:outline-accent h-[420px] snap-y snap-mandatory overflow-y-auto pb-1 focus-within:outline-2 focus-within:outline-offset-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
      tabIndex={0}
    >
      {hasPosts ? (
        posts.data.map((post, index) => (
          <PostCard
            post={post}
            key={post.id}
            ariaPosinset={index + 1}
            ariaSetsize={posts.data.length}
          />
        ))
      ) : (
        <Box
          gap="10"
          align="center"
          height="auto"
          className="py-4 text-left"
          aria-label="No posts in the screen."
          data-testid="empty-posts"
        >
          <Typography.H3 className="text-muted-foreground flex items-center">
            {t.rich("empty_posts", {
              br: () => <br />,
            })}
          </Typography.H3>
          <NotebookPen className="text-muted-foreground" size={48} />
        </Box>
      )}
    </Box>
  );
};
