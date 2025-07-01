import { Box } from "../Box";

import { Navbar } from "../Navbar";
import { BurgerMenu } from "../BurgerMenu";
import { memo } from "react";
import { Suspense } from "react";

import dynamic from "next/dynamic";
import { Logo } from "../Logo";

const ThemeButton = dynamic(() => import("../ThemeButton"), {
  ssr: true,
});

export const Header = memo(() => {
  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className={
        "shadow-accent animate-fade-in bg-background sticky top-0 z-1 flex max-h-[70px] flex-row border-b-1 p-4 shadow"
      }
      aria-label="Header of screen"
      data-testid="header-box"
    >
      <Box>
        <Logo />
      </Box>

      <Box justify="end" align="center" gap="4">
        <Navbar />
        <Suspense>
          <ThemeButton variant="nav" />
        </Suspense>
      </Box>

      <BurgerMenu />
    </Box>
  );
});

Header.displayName = "Header";
