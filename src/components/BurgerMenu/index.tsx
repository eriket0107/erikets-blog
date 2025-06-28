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
import { Menu } from "lucide-react";
import { cn } from "@/utils";
import ThemeButton from "../ThemeButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { routesConfig } from "@/constants/Routes";

const classes = {
  link: "flex flex-row items-center text-base transition-all duration-100 ease-in-out",
  dropdownMenuItem: "flex w-full cursor-pointer justify-between text-base",
  selected: "bg-accent rounded-sm",
};

export const BurgerMenu = () => {
  const pathname = usePathname();
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
          {routesConfig.map(({ href, icon, title }) => (
            <Link
              key={title}
              href={href}
              className={cn(
                classes.link,
                pathname === href && classes.selected,
              )}
            >
              <DropdownMenuItem className={classes.dropdownMenuItem}>
                {title}
                {icon}
              </DropdownMenuItem>
            </Link>
          ))}
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
