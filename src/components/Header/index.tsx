import Link from "next/link";
import { Box } from "../Box";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";
import { cn } from "@/utils";
import { Navbar } from "../Navbar";
import { BurgerMenu } from "../BurgerMenu";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Header = () => {
  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className={cn(
        "shadow-accent animate-fade-in flex flex-row border-b-1 p-4 shadow",
      )}
      aria-label="Header of screen"
      data-testid="header-box"
      role="header"
    >
      <Link href="/">
        <Typography.H2
          className={`${robotoMono.className} hidden flex-1 lg:block`}
        >
          coffee & vanilla code ☕️
        </Typography.H2>
        <Typography.H3
          className={`${robotoMono.className} block flex-1 lg:hidden`}
        >
          coffee & <br /> vanilla code ☕️
        </Typography.H3>
      </Link>

      <Navbar />
      <BurgerMenu />
    </Box>
  );
};
