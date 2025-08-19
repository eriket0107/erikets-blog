import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";

import { getTranslations } from "next-intl/server";
import { PostList } from "@/components/PostList";
import { Suspense } from "react";
import { PostCardSkeleton } from "@/components/PostCard/skeleton";
import { BorderAnimated } from "@/components/BorderAnimated";
import { PageWrapper } from "@/components/PageWrapper";

export const Home = async () => {
  const t = await getTranslations("HomePage");

  return (
    <PageWrapper>
      <Box
        height="auto"
        as="section"
        direction="col"
        aria-labelledby="intro-heading"
        className="max-w-[700px]"
      >
        <BorderAnimated>
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
          <Typography.P className="text-accent-foreground space-0 animate-fade-in-fast text-md max-w-3xl p-0">
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
        </BorderAnimated>
      </Box>
      <Box
        as="section"
        direction="col"
        gap="2"
        className="bg-background animate-fade-in-slow max-w-[700px] rounded-sm p-2"
      >
        <Typography.H2
          id="latest-posts-heading"
          className="text-accent-foreground max-w-3xl pb-0 text-left"
        >
          {t("take_a_look")}
        </Typography.H2>
        <Suspense fallback={<PostCardSkeleton hasImage={false} />}>
          <PostList quantity={2} />
        </Suspense>
      </Box>
    </PageWrapper>
  );
};
