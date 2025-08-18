import { Avatar } from "@/components/Avatar";
import { Box } from "@/components/Box";
import { NavLink } from "@/components/NavLink";
import { Typography } from "@/components/Typography";

import { socialLinks } from "@/constants/Links";
import ProfileImage from "@/assets/profile-erik.webp";
import { AccordionAbout } from "@/components/AccordionAbout";
import { useTranslations } from "next-intl";
import { Link } from "@/components/Link";
import { AnimatedNumber } from "@/components/AnimatedNumber";

export const About = () => {
  const t = useTranslations("AboutPage");
  const currentAge =
    new Date().getFullYear() - new Date("1998/07/01").getFullYear();
  const startYear = new Date("2020/01/02").getFullYear();

  return (
    <Box
      as="main"
      justify="center"
      direction="col"
      align="center"
      role="main"
      aria-label="About Erik Oliveira"
      gap="10"
      className="p-4 pt-30 md:pt-24"
    >
      <Box
        as="article"
        direction="col"
        className="w-[320px] md:w-[600px]"
        justify="start"
        align="start"
        gap="8"
      >
        <Box
          as="section"
          direction="col"
          gap="4"
          align="start"
          height="auto"
          justify="start"
          className="animate-fade-in-fast"
          aria-labelledby="profile-heading"
        >
          <Box
            as="header"
            direction="row"
            justify="none"
            width="auto"
            align="center"
            gap="2"
          >
            <Avatar
              alt="Erik Oliveira's profile picture"
              imgSrc={ProfileImage.src}
              fallback="EO"
            />
            <Typography.H2
              id="profile-heading"
              className="text-gradient text-4xl"
            >
              Erik Oliveira
            </Typography.H2>
          </Box>

          <Box
            as="section"
            direction="col"
            gap="6"
            className="h-full"
            aria-label="Professional summary"
          >
            <Typography.P>
              {t.rich("greeting", {
                age: () => <AnimatedNumber value={currentAge} />,
                startYear: () => (
                  <AnimatedNumber timer="0.75s" value={startYear} />
                ),
                link: (chunks) => (
                  <Link
                    className="hover:border-gradient border-b-1 border-transparent transition-all transition-discrete hover:scale-105"
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
              <Typography.P>{t("social_invitation")}</Typography.P>
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
            <AccordionAbout />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
