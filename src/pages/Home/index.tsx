import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";

import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/actions/posts";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export const Home = async () => {
  const posts = await getPosts({ perPage: 2 });
  const t = await getTranslations("HomePage");

  return (
    <Box
      gap="10"
      direction="col"
      align="center"
      justify="start"
      className="p-4"
    >
      <Box gap="12" direction="col" width="500px">
        <Box as="section" direction="col" aria-labelledby="intro-heading">
          <Typography.H1
            id="intro-heading"
            className="text-accent-foreground max-w-3xl text-left"
          >
            {t("greeting")}{" "}
            <span
              className="animate-waving z-0"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </Typography.H1>
          <Typography.P className="text-accent-foreground space-0 animate-fade-in-fast max-w-3xl p-0 text-xl">
            {t("iam")}
            <Link
              className="transition-all transition-discrete"
              href="/about"
              aria-label="Learn more about Erik on the about page"
            >
              <span className="focus:outline-accent inline-block text-3xl font-bold hover:underline focus:underline focus:outline-2 focus:outline-offset-2">
                Erik
              </span>
            </Link>
            {t("introduction")} <br />
            <Typography.Small className="text-muted-foreground text-sm md:text-xs">
              {t("curiosity")}
            </Typography.Small>
            <br />
            {t("sharing_experience")} {t("hope")}
          </Typography.P>

          <Typography.Muted className="animate-fade-in-fast w-auto max-w-3xl">
            {t("current_focus")}
          </Typography.Muted>
        </Box>
        <Box
          as="section"
          direction="col"
          gap="4"
          className="animate-fade-in-slow overflow-y-hidden rounded-sm"
        >
          <Typography.H2
            id="latest-posts-heading"
            className="text-accent-foreground max-w-3xl text-left"
          >
            {t("take_a_look")}
          </Typography.H2>
          <Box
            direction="col"
            gap="4"
            role="feed"
            aria-label="Latest blog posts"
            className="[&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground focus-within:outline-accent h-[420px] snap-y snap-mandatory overflow-y-auto pb-1 focus-within:outline-2 focus-within:outline-offset-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
            tabIndex={0}
          >
            <Suspense fallback={<>Loading...</>}>
              {posts.data.map((post, index) => (
                <PostCard
                  post={post}
                  key={post.id}
                  ariaPosinset={index + 1}
                  ariaSetsize={posts.data.length}
                />
              ))}
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
