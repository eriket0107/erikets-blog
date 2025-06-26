import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { Box } from "../Box";
import { BookUser, Home, User } from "lucide-react";
import { cn } from "@/utils";

const ThemeButton = dynamic(() => import("../ThemeButton"), {
  ssr: true,
});

const linkClass =
  "flex flex-row items-center hover:border-b-1 border-b-accent-foreground hover:opacity-85 text-base gap-1 transition-all duration-100 ease-in-out";

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
        className={cn(linkClass)}
        prefetch
        aria-label="Navigate to home page"
        role="link"
      >
        <Home size={16} /> Home
      </Link>
      <Link
        href="/blog"
        className={cn(linkClass)}
        prefetch
        aria-label="Navigate to blog page"
        role="link"
      >
        <BookUser size={16} />
        Blog
      </Link>
      <Link
        href="/about"
        prefetch
        className={cn(linkClass)}
        aria-label="Navigate to about page"
        role="link"
      >
        <User size={16} />
        About
      </Link>
      <ThemeButton />
    </Box>
  );
};
