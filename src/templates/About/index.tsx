import { Box } from "@/components/Box";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";

import { socialLinks } from "@/constants/Links";
import ProfileImage from "@/assets/profile-erik.webp";
import { AccordionAbout } from "@/components/AccordionAbout";
import { useTranslations } from "next-intl";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PageWrapper } from "@/components/PageWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Emojis } from "@/constants/emojis";
import Image from "next/image";

export const About = () => {
  const t = useTranslations("AboutPage");
  const now = new Date();
  const birthDate = new Date("1998/07/01");
  const currentAge = now.getFullYear() - birthDate.getFullYear() -
    (now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate()) ? 1 : 0);

  return (
    <PageWrapper>
      <Box
        as="header"
        width="full"
        height="auto"
        className="pt-10 pl-4 animate-fade-in-slow"
        gap="4"

      >
        <Image
          alt="Erik Oliveira's profile picture"
          src={ProfileImage.src}
          className="hidden md:block mb-2 rounded-md mr-8 float-left border-2 border-accent-foreground"
          width={330}
          height={300}
        />

        <div className="flex flex-col ">
          <div className="relative">
            <div className="overflow-hidden ">
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
            </div>
          </div>

          <div>
            <Typography.H4 className="text-accent-foreground text-3xl">
              {t("role")}
            </Typography.H4>
            <Typography.P spacingTop={false} className="text-accent-foreground space-0 text-xl max-w-full p-0">
              {t("introduction")}
            </Typography.P>
            <Typography.P className="text-accent-foreground space-0 text-xl max-w-full p-0">
              {t("sharing_experience")}

            </Typography.P>
            <Typography.P className="text-accent-foreground space-0 text-xl max-w-full p-0">
              {t("personal_space")}
            </Typography.P>
          </div>

          <div className="flex flex-col mt-10">
            <Typography.P className="text-primary ">
              {t("social_invitation")}
            </Typography.P>

            <span className="flex flex-row gap-6 flex-wrap">
              {socialLinks.map((social) => (
                <NavLink
                  className="hover:border-b-accent-foreground border-1 border-transparent"
                  key={social.title}
                  link={social}
                  aria-label={`Visit Erik's ${social.title} profile`}
                />
              ))}
            </span >
          </div>
        </div>
      </Box>






      {/* <Typography.P className="text-primary">
        {t.rich("greeting", {
          age: () => <AnimatedNumber value={currentAge} />,
          startYear: () => (
            <AnimatedNumber timer="0.75s" value={startYear} />
          ),
          link: (chunks) => (
            <Link
              className="text-gradient border-b-1 transition-all transition-discrete hover:scale-105"
              href={"https://www.meumulti.com.br/"}
              target="_blank"
            >
              {chunks}
            </Link>
          ),
        })}
      </Typography.P> */}






      <AccordionAbout />

    </PageWrapper>
  );
};
