"use client";

import { getRoutesConfig } from "@/constants/Links";
import { Box } from "../Box";

import { NavLink } from "../NavLink";
import { usePathname } from "@/hooks/usePathname";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";
import { useCallback } from "react";
import { getBasePath } from "@/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Constants");
  const routesConfig = getRoutesConfig(t);

  const isSelected = useCallback(
    (href: string) => getBasePath({ pathname, href }),
    [pathname],
  );

  return (
    <Box
      as="nav"
      width="auto"
      className="hidden items-center gap-5 font-medium md:flex"
      data-testid="navbar"
      aria-label="Main navigation"
    >
      {routesConfig.map((link) => (
        <NavLink
          link={link}
          key={link.href}
          isSelected={isSelected(link.href)}
          suppressHydrationWarning
        />
      ))}
      <LocaleSwitcher />
    </Box>
  );
};
