import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { Box } from "../Box";

import { routesConfig } from "@/constants/Routes";

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
      {routesConfig.map(({ href, icon, title, label }) => (
        <Link
          key={href}
          href={href}
          className={
            "border-b-accent-foreground flex flex-row items-center gap-1 text-base font-normal transition-all duration-100 ease-in-out hover:border-b-1 hover:opacity-85"
          }
          prefetch
          aria-label={label}
          role="link"
        >
          {icon}
          {title}
        </Link>
      ))}
      <Suspense>
        <ThemeButton variant="nav" />
      </Suspense>
    </Box>
  );
};
