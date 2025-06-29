"use client";

import { Box } from "../Box";

import { NavLink } from "../NavLink";
import { routesConfig } from "@/constants/Links";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
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
          isSelected={pathname === link.href}
        />
      ))}
    </Box>
  );
};
