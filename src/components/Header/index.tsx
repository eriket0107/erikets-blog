import { Box } from "@/components/Box";

import { Navbar } from "@/components/Navbar";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Logo } from "@/components/Logo";

export const Header = () => {
  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className={
        "header shadow-accent animate-fade-in bg-background/30 fixed z-[100] mx-auto flex-row overflow-hidden border-b-1 p-6 shadow backdrop-blur-md"
      }
      aria-label="Header of screen"
      data-testid="header-box"
      height="100px"
    >
      <Logo />

      <div className="flex items-center justify-end gap-4">
        <Navbar />

      </div>
      <BurgerMenu />
    </Box>
  );
};
