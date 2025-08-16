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
        "shadow-accent animate-fade-in z-1 flex flex-row overflow-hidden border-b-1 bg-transparent p-6 shadow backdrop-blur-3xl"
      }
      aria-label="Header of screen"
      data-testid="header-box"
      height="100px"
    >
      <Logo />

      <div className="flex items-center justify-end gap-4">
        <Navbar />
        <Suspense fallback={<></>}>
          <ThemeButton variant="nav" />
        </Suspense>
      </div>

      <BurgerMenu />
    </Box>
  );
};
