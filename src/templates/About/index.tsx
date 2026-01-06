import { Box } from "@/components/Box";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";

import { socialLinks } from "@/constants/Links";
import ProfileImage from "@/assets/profile-erik.webp";
import { AccordionAbout } from "@/components/AccordionAbout";
import { useTranslations } from "next-intl";
import { Link } from "@/components/Link";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PageWrapper } from "@/components/PageWrapper";
import { BorderAnimated } from "@/components/BorderAnimated";
import { Avatar } from "@/components/Avatar";

export const About = () => {
  const t = useTranslations("AboutPage");
  const now = new Date();
  const birthDate = new Date("1998/07/01");
  const currentAge = now.getFullYear() - birthDate.getFullYear() -
    (now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate()) ? 1 : 0);
  const startYear = new Date("2020/01/02").getFullYear();

  return (
    <PageWrapper>
      <Box
        as="header"
        direction="row"
        justify="start"
        width="full"
        align="center"
        gap="8"
        height="none"
        className="pt-10 pl-4 animate-fade-in-fast"

      >
        <Avatar.Rectangular
          alt="Erik Oliveira's profile picture"
          imgSrc={ProfileImage.src}
          fallback="EO"
        />
        <Typography.H2
          id="profile-heading"
          className="text-gradient text-5xl"
        >
          Erik Oliveira
        </Typography.H2>
      </Box>
      <BorderAnimated>

        <Typography.P className="text-accent-foreground space-0 animate-fade-in-slow text-lg max-w-3xl p-0">
          {t("introduction")} <br />

          {t("sharing_experience")} {t("hope")}
        </Typography.P>

        <Box
          as="article"
          direction="col"
          className="h-full w-[320px] md:w-150 pt-10 animate-fade-in-slow"
          justify="start"
          align="start"
          gap="8"
          aria-label="About Erik Oliveira"
        >
          <Box
            as="section"
            direction="col"
            gap="6"
            className="h-full"
            aria-label="Professional summary"
          >
            <Typography.P className="text-primary">
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
            </Typography.P>

            <Box
              as="section"
              direction="col"
              gap="1"
              aria-label="Social media links"
            >
              <Typography.P className="text-primary">
                {t("social_invitation")}
              </Typography.P>
              <Box
                as="nav"
                gap="3"
                direction="row"
                role="navigation"
                aria-label="Social media navigation"
              >
                {socialLinks.map((social) => (
                  <NavLink
                    className="hover:border-b-accent-foreground border-1 border-transparent"
                    key={social.title}
                    link={social}
                    aria-label={`Visit Erik's ${social.title} profile`}
                  />
                ))}
              </Box>
            </Box>

          </Box>
        </Box>

      </BorderAnimated>
      <AccordionAbout />

    </PageWrapper>
  );
};
