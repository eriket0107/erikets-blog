import { Box } from "../Box";
import { getAllPosts } from "@/actions/posts";
import { PostCard } from "../PostCard";
import { Typography } from "../Typography";
import { NotebookText, Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const PostList = async ({ quantity = 2 }: { quantity?: number }) => {
  const { data: allPosts } = await getAllPosts();
  const posts = allPosts?.slice(0, quantity) ?? [];
  const hasPosts = !!posts.length;
  const t = await getTranslations("HomePage");

  return (
    <section
      role="feed"
      aria-label="Latest blog posts"
      className="&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground focus-within:outline-accent flex h-full w-full snap-y snap-mandatory flex-col gap-6 overflow-y-auto p-2 focus-within:outline-2 focus-within:outline-offset-2 md:gap-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
      tabIndex={0}
    >
      {hasPosts ? (
        posts.map((post, index) => (
          <PostCard
            post={post}
            key={post.id}
            ariaPosinset={index + 1}
            ariaSetsize={posts.length}
            hasImage={false}
          />
        ))
      ) : (
        <Box
          gap="6"
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
          <div className="relative">
            <Pencil
              className="animate-waving text-muted-foreground absolute top-0 left-2.5 z-1"
              size={30}
              fill="grey"
            />
            <NotebookText className="text-muted-foreground z-[-1]" size={48} />
          </div>
        </Box>
      )}
    </section>
  );
};
