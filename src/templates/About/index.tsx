import { Box } from "@/components/Box";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";

import { socialLinks } from "@/constants/Links";
import ProfileImage from "@/assets/profile-erik.webp";
import { AboutAccordion } from "@/components/AboutAccordion";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PageWrapper } from "@/components/PageWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Emojis } from "@/constants/emojis";
import Image from "next/image";
import { Location } from "@/components/Location";
import { getTranslations } from "next-intl/server";

export const About = async () => {
  const t = await getTranslations("AboutPage");
  const now = new Date();
  const birthDate = new Date("1998/07/01");
  const currentAge =
    now.getFullYear() -
    birthDate.getFullYear() -
    (now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate())
      ? 1
      : 0);
  const curretYear = now.getFullYear();

  return (
    <PageWrapper hasFooter={false}>
      <Box
        as="section"
        width="full"
        height="auto"
        className="animate-fade-in-slow z-10 px-4 pt-4 md:pt-10"
        gap="4"
      >
        <div>
          <Image
            alt="Erik Oliveira's profile picture"
            src={ProfileImage.src}
            className="border-accent-foreground float-left mr-8 block rounded-md border-2 md:hidden"
            width={115}
            height={200}
          />
          <Image
            alt="Erik Oliveira's profile picture"
            src={ProfileImage.src}
            className="border-accent-foreground float-left mr-8 mb-2 hidden rounded-md border-2 md:block"
            width={330}
            height={300}
          />
          <Typography.H2
            id="profile-heading"
            className="text-gradient text-4xl md:text-6xl"
          >
            Erik Oliveira,{" "}
            <AnimatedNumber
              value={currentAge}
              className="text-3xl md:text-5xl"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Emojis.Coffee className="ml-4" />
              </TooltipTrigger>
              <TooltipContent>{t("curiosity")}</TooltipContent>
            </Tooltip>
          </Typography.H2>

          <div>
            <div>
              <Typography.H4 className="text-accent-foreground text-xl md:text-3xl">
                {t("role")}
              </Typography.H4>
              <Location />
            </div>
            <Typography.P
              spacingTop={false}
              className="text-accent-foreground space-0 p-0 text-lg"
            >
              {t.rich("introduction", {
                br: () => <br />,
                years: () => <strong>{curretYear - 2022}</strong>,
              })}
            </Typography.P>
            <Typography.P className="text-accent-foreground max-w-full text-lg">
              {t("professional_summary")}
            </Typography.P>
          </div>

          <div className="mt-10 flex flex-col">
            <Typography.P className="text-primary">
              {t("social_invitation")}
            </Typography.P>

            <span className="flex flex-row flex-wrap gap-6">
              {socialLinks.map((social) => (
                <NavLink
                  className="hover:border-b-accent-foreground z-10 border border-transparent"
                  key={social.title}
                  link={social}
                  aria-label={`Visit Erik's ${social.title} profile`}
                />
              ))}
            </span>
          </div>
        </div>
      </Box>
      <AboutAccordion />
    </PageWrapper>
  );
};
