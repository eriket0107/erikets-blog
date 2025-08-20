import { Box } from "../Box";
import { Typography } from "../Typography";
import { NavLink } from "../NavLink";
import { socialLinks } from "@/constants/Links";

export const Footer = () => {
  return (
    <Box
      as="footer"
      align="center"
      justify="between"
      className="bg-background z-50 mx-auto flex h-[50px] max-w-[700px] flex-row gap-10 p-3 px-6 md:sticky"
      aria-label="Footer of screen"
      data-testid="footer"
    >
      <Typography.Small className="text-muted-foreground w-[450px] md:w-full">
        by: Erik Oliveira ⓒ - 🇧🇷 - {new Date().getFullYear()}
      </Typography.Small>
      <Box as="span" justify="end" className="w-auto" gap="5">
        {socialLinks.map((link) => (
          <NavLink
            link={link}
            key={link.href}
            isFooter
            target="_blank"
            className="text-muted-foreground hover:border-b-muted-foreground flex flex-row items-center gap-1 border-b-1 border-b-transparent text-sm"
          />
        ))}
      </Box>
    </Box>
  );
};
