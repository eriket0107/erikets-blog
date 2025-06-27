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
import { cn } from "@/utils";
import ThemeButton from "../ThemeButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

const classes = {
  link: "flex flex-row items-center text-base transition-all duration-100 ease-in-out",
  dropdownMenuItem: "flex w-full cursor-pointer justify-between text-base",
  selected: "bg-accent rounded-sm",
};

export const BurgerMenu = () => {
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="burger-menu"
          variant="default"
          className={cn(
            "bg-accent-foreground flex cursor-pointer gap-4 md:hidden",
          )}
        >
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex min-w-0 md:hidden">
        <DropdownMenuGroup data-testid="burger-menu-container">
          <Link
            href="/"
            className={cn(classes.link, location === "/" && classes.selected)}
          >
            <DropdownMenuItem className={classes.dropdownMenuItem}>
              Home
              <Home size={16} className="text-primary" />
            </DropdownMenuItem>
          </Link>
          <Link
            href="/about"
            className={cn(
              classes.link,
              location === "/about" && classes.selected,
            )}
          >
            <DropdownMenuItem className={classes.dropdownMenuItem}>
              About
              <User size={16} className="text-primary" />
            </DropdownMenuItem>
          </Link>
          <Link
            href="/blog"
            className={cn(
              classes.link,
              location === "/blog" && classes.selected,
            )}
          >
            <DropdownMenuItem className={classes.dropdownMenuItem}>
              Blog
              <BookUser size={16} className="text-primary" />
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className={classes.dropdownMenuItem}
            onSelect={(e) => e.preventDefault()}
          >
            <ThemeButton variant="menu" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
