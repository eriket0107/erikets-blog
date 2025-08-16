import { Box } from "@/components/Box";

import { Navbar } from "@/components/Navbar";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Suspense } from "react";

import dynamic from "next/dynamic";
import { Logo } from "@/components/Logo";

const ThemeButton = dynamic(() => import("@/components/ThemeButton"));

export const Header = () => {
  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className={
        "shadow-accent animate-fade-in sticky top-0 z-1 flex max-h-[70px] flex-row border-b-1 p-4 shadow backdrop-blur-3xl"
      }
      aria-label="Header of screen"
      data-testid="header-box"
    >
      <Box>
        <Logo />
      </Box>

      <Box justify="end" align="center" gap="4">
        <Navbar />
        <Suspense fallback={<></>}>
          <ThemeButton variant="nav" />
        </Suspense>
      </Box>

      <BurgerMenu />
    </Box>
  );
};
