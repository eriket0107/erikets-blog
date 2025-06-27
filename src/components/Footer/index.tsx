import { socialLinks } from "@/constants/SocialLinks";
import { Box } from "../Box";
import { Typography } from "../Typography";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box
      as="footer"
      align="center"
      justify="between"
      className="shadow-accent bottom-0 flex flex-row gap-10 border-t-1 p-3 shadow"
      aria-label="Footer of screen"
    >
      <Typography.Small className="text-muted-foreground w-[450px] md:w-full">
        by: Erik Oliveira ⓒ - 🇧🇷 - {new Date().getFullYear()}
      </Typography.Small>

      <Box as="span" justify="end" className="w-auto" gap="5">
        {socialLinks.map(({ href, icon, title }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className="text-muted-foreground group hover:border-b-muted-foreground flex flex-row items-center gap-1 border-b-1 border-b-transparent text-sm"
          >
            {icon}
            <Typography.Small className="hidden text-base md:flex">
              {title}
            </Typography.Small>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
