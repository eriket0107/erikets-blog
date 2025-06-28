import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Box } from "../Box";

import { NavLink } from "../NavLink";
import { routesConfig } from "@/constants/Links";

const ThemeButton = dynamic(() => import("../ThemeButton"), {
  ssr: true,
});

export const Navbar = () => {
  return (
    <Box
      as="nav"
      width="auto"
      className="hidden items-center gap-5 font-medium md:flex"
      data-testid="navbar"
      aria-label="Main navigation"
    >
      {routesConfig.map((link) => (
        <NavLink link={link} key={link.href} />
      ))}
      <Suspense>
        <ThemeButton variant="nav" />
      </Suspense>
    </Box>
  );
};
