import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { Box } from "../Box";

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
      <Link
        href="/"
        className="hover:underline hover:opacity-85"
        aria-label="Navigate to home page"
        role="link"
      >
        Home
      </Link>
      <Link
        href="/blog"
        className="hover:underline hover:opacity-85"
        aria-label="Navigate to blog page"
        role="link"
      >
        Blog
      </Link>
      <Link
        href="/about"
        className="hover:underline hover:opacity-85"
        aria-label="Navigate to about page"
        role="link"
      >
        About
      </Link>
      <ThemeButton />
    </Box>
  );
};
