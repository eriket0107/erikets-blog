"use client";

import Link from "next/link";
import { Box } from "../Box";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { Navbar } from "../Navbar";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Header = () => {
  const location = usePathname();
  const isHome = location === "/";

  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className={cn(
        isHome ? "animate-fade-in" : "",
        "shadow-accent flex flex-row border-b-1 px-15 py-4 shadow",
      )}
      aria-label="Header of screen"
      data-testid="header-box"
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
    </Box>
  );
};
