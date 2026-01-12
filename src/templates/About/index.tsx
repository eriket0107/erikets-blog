import { Box } from "@/components/Box";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";

import { socialLinks } from "@/constants/Links";
import ProfileImage from "@/assets/profile-erik.webp";
import { AccordionAbout } from "@/components/AccordionAbout";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PageWrapper } from "@/components/PageWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Emojis } from "@/constants/emojis";
import Image from "next/image";
import { Location } from "@/components/Location";
import { getTranslations } from "next-intl/server";

export const About = async () => {
  const t = await getTranslations("AboutPage");
  const now = new Date();
  const birthDate = new Date("1998/07/01");
  const currentAge = now.getFullYear() - birthDate.getFullYear() -
    (now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate()) ? 1 : 0);
  const curretYear = now.getFullYear();

  return (
    <PageWrapper hasFooter={false}>
      <Box
        as="section"
        width="full"
        height="auto"
        className="z-10 pt-10 pl-4 animate-fade-in-slow"
        gap="4"
      >
        <div>
          <Image
            alt="Erik Oliveira's profile picture"
            src={ProfileImage.src}
            className="float-left hidden md:block mb-2 rounded-md mr-8 border-2 border-accent-foreground"
            width={330}
            height={300}
          />
          <Typography.H2
            id="profile-heading"
            className="text-gradient text-4xl md:text-6xl mt-2"
          >
            Erik Oliveira, <AnimatedNumber value={currentAge} className="md:text-5xl text-3xl" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Emojis.Coffee className="ml-4" />
              </TooltipTrigger>
              <TooltipContent>
                {t("curiosity")}
              </TooltipContent>
            </Tooltip>
          </Typography.H2>
          <div>
            <div>
              <Typography.H4 className="text-accent-foreground text-3xl">
                {t("role")}
              </Typography.H4>
              <Location />
            </div>
            <Typography.P spacingTop={false} className="text-accent-foreground space-0 text-lg p-0">
              {t.rich("introduction", {
                br: () => <br />,
                years: () => <strong>{curretYear - 2022}</strong>,
              })}
            </Typography.P>
            <Typography.P className="text-accent-foreground  text-lg max-w-full">
              {t("professional_summary")}

            </Typography.P>
          </div>

          <div className="flex flex-col mt-10">
            <Typography.P className="text-primary ">
              {t("social_invitation")}
            </Typography.P>

            <span className="flex flex-row gap-6 flex-wrap">
              {socialLinks.map((social) => (
                <NavLink
                  className="z-10 hover:border-b-accent-foreground border border-transparent"
                  key={social.title}
                  link={social}
                  aria-label={`Visit Erik's ${social.title} profile`}
                />
              ))}
            </span >
          </div>
        </div>
      </Box>
      <AccordionAbout />
    </PageWrapper>
  );
};
