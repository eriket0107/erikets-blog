"use client";

import Link from "next/link";
import { Box } from "../Box";
import { ThemeButton } from "../ThemeButton";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Header = () => {
  const location = usePathname();
  const isHome = location === "/" || location === "home";

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
    >
      <Link href="/">
        <Typography.H2 className={`${robotoMono.className} hidden lg:block`}>
          coffee & vanilla code ☕️
        </Typography.H2>
        <Typography.H3 className={`${robotoMono.className} block lg:hidden`}>
          coffee & <br /> vanilla code ☕️
        </Typography.H3>
      </Link>

      <nav className="hidden items-center gap-5 md:flex">
        <Link href="/" className="hover:underline hover:opacity-85">
          Home
        </Link>
        <Link href="/blog" className="hover:underline hover:opacity-85">
          Blog
        </Link>
        <Link href="/about" className="hover:underline hover:opacity-85">
          About
        </Link>
        <ThemeButton />
      </nav>
    </Box>
  );
};
