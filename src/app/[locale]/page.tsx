import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";
// import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import postsMock from "../../../mocks/posts";
import { PostCard } from "@/components/PostCard";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataHome" });

  return {
    title: {
      default: t("title"),
      template: "%s | Coffe and Vanilla Code",
    },
  };
}

const Home = () => {
  // const t = useTranslations("Home");
  // t("title")
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
            Hello there!{" "}
            <span
              className="animate-waving z-0"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </Typography.H1>
          <Typography.P className="text-accent-foreground space-0 animate-fade-in-fast max-w-3xl p-0 text-xl">
            I&apos;m{" "}
            <Link
              className="transition-all transition-discrete"
              href="/about"
              aria-label="Learn more about Erik on the about page"
            >
              <span className="focus:outline-accent inline-block text-3xl font-bold hover:underline focus:underline focus:outline-2 focus:outline-offset-2">
                Erik
              </span>
              ,{" "}
            </Link>
            a curious Software Developer and technology enthusiastic <br />
            <Typography.Small className="text-muted-foreground text-sm md:text-xs">
              (and as you probably have noticed, also a coffee lover).
            </Typography.Small>
            <br />
            Eager to share some experiences with my posts, in there you&apos;ll
            find topics about programming, working experiences and whatever
            comes up with life. <br /> I hope my thoughts can be useful for you
            somehow!
          </Typography.P>

          <Typography.Muted className="animate-fade-in-fast w-auto max-w-3xl">
            Right now I&apos;m Fullstacking my career, however primarily I
            started as Frontend
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
            Be my guest and take a look on my latest posts!
          </Typography.H2>
          <Box
            direction="col"
            gap="4"
            role="feed"
            aria-label="Latest blog posts"
            className="[&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground focus-within:outline-accent h-[420px] snap-y snap-mandatory overflow-y-auto pb-1 focus-within:outline-2 focus-within:outline-offset-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md"
            tabIndex={0}
          >
            {postsMock.map((post, index) => (
              <PostCard
                post={post}
                key={post.id}
                ariaPosinset={index + 1}
                ariaSetsize={postsMock.length}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
