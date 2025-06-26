"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BookUser, Home, Menu, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import ThemeButton from "../ThemeButton";
import { usePathname } from "next/navigation";

const linkClass =
  "flex flex-row items-center text-base transition-all duration-100 ease-in-out";

export const BurgerMenu = () => {
  const location = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "bg-accent-foreground",
            "flex cursor-pointer gap-4 md:hidden",
          )}
        >
          <Menu className={cn("bg-accent-foreground", "text-accent")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex min-w-0 md:hidden">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex w-full flex-1 justify-between">
            <Link
              href="/"
              className={cn(location === "/" && "underline", linkClass)}
            >
              Home
            </Link>
            <Home size={16} className="text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex w-full justify-between">
            <Link
              href="/about"
              className={cn(location === "/about" && "underline", linkClass)}
            >
              About
            </Link>
            <User size={16} className="text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex w-full justify-between">
            <Link
              href="/blog"
              className={cn(location === "/blog" && "underline", linkClass)}
            >
              Blog
            </Link>
            <BookUser size={16} className="text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full justify-between"
            onSelect={(e) => e.preventDefault()}
          >
            <ThemeButton variant="menu" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
