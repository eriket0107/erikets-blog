import { Box } from "@/components/Box";
import { Link } from "@/components/Link";
import { Typography } from "@/components/Typography";

import { getTranslations } from "next-intl/server";
import { PageWrapper } from "@/components/PageWrapper";
import { Emojis } from "@/constants/emojis";
import { SparklesCore } from "@/components/ui/sparkles";

export const Home = async () => {
  const t = await getTranslations("HomePage");

  return (
    <PageWrapper className="flex justify-center items-center m-auto! relative h-screen! w-screen!">
      <div className="w-full absolute inset-0 h-screen invisible! dark:visible! ">
        <SparklesCore
          id="tsparticlesfullpage-dark"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="w-full absolute inset-0 h-screen visible! dark:invisible!">
        <SparklesCore
          id="tsparticlesfullpage-light"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#3b82f6"
        />
      </div>

      <Box
        height="auto"
        as="section"
        direction="col"
        aria-labelledby="intro-heading"
        className="mb-10 max-w-175 pt-10 animate-fade-in-fast"
      >
        {/* <BorderAnimated> */}

        <div className="flex flex-row items-center gap-4">
          <Typography.H1
            id="intro-heading"
            className="text-accent-foreground max-w-3xl text-left text-5xl"
          >
            {t("greeting")}
          </Typography.H1>
          <span
            className="animate-waving z-0 inline-block text-5xl mb-2"
            role="img"
            aria-label="waving hand"
          >
            <Emojis.WavingHand />
          </span>
        </div>


        <Typography.P className="text-accent-foreground space-0 animate-fade-in-slow text-2xl max-w-3xl p-0">
          {t("iam")}
          <Link
            className="transition-all transition-discrete "
            href="/about"
            aria-label="Learn more about Erik on the about page"
          >
            <span className="text-gradient focus:outline-accent hover:-translate-y-0.5 transition-all inline-block text-3xl font-bold hover:underline focus:underline focus:outline-2 focus:outline-offset-2">
              Erik
            </span>
          </Link>
          {t("introduction")} <br />
          <Typography.Small className="text-muted-foreground text-md md:text-xl">
            {t("curiosity")}
          </Typography.Small>
          <br />
        </Typography.P>

        {/* </BorderAnimated> */}
      </Box>
    </PageWrapper>
  );
};
