import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";
// import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";

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
    <Box gap="10" direction="col" align="center" justify="start">
      <Box gap="10" direction="col" width="500px">
        <Box direction="col">
          <Typography.H2 className="text-accent-foreground max-w-3xl text-left">
            Hello there! <span className="animate-waving z-0">👋</span>
          </Typography.H2>
          <Typography.P className="text-accent-foreground space-0 max-w-3xl p-0 text-xl">
            I&apos;m{" "}
            <Link className="transition-all transition-discrete" href="/about">
              <span className="animation-duration-initial inline-block text-3xl font-bold hover:underline">
                Erik
              </span>
              ,{" "}
            </Link>
            a curious Software Developer and technology enthusiastic. <br />
            Eager to share some experiences with my posts, in there you&apos;ll
            find topics about programming, working experiences and whatever
            comes up with life. <br /> I hope my thoughts can be useful for you
            somehow!
          </Typography.P>

          <Typography.Muted className="w-auto max-w-3xl">
            Right now I&apos;m Fullstacking my career, however primarily I
            started as Frontend
          </Typography.Muted>
        </Box>
        <Box direction="col">
          <Typography.H3 className="text-accent-foreground max-w-3xl text-left">
            Be my guest and take a look on my recent post!
          </Typography.H3>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
