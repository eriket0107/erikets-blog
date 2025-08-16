import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";

import { getTranslations } from "next-intl/server";
import { PostList } from "@/components/PostList";
import { Suspense } from "react";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";

export const Home = async () => {
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
        <Box
          height="auto"
          as="section"
          direction="col"
          aria-labelledby="intro-heading"
        >
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
              <span className="text-gradient focus:outline-accent inline-block text-3xl font-bold hover:underline focus:underline focus:outline-2 focus:outline-offset-2">
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
            className="text-accent-foreground max-w-3xl pb-0 text-left"
          >
            {t("take_a_look")}
          </Typography.H2>
          <Suspense fallback={<PostCardSkeleton hasImage={false} />}>
            <PostList quantity={1} />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
