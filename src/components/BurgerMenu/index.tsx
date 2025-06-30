"use client";

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
import { getRoutesConfig } from "@/constants/Links";
import { memo } from "react";
import { Link } from "../Link";
import { usePathname } from "@/hooks/usePathname";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";

const classes = {
  link: "flex flex-row items-center text-base transition-all duration-100 ease-in-out",
  dropdownMenuItem: "flex w-full cursor-pointer justify-between text-base",
  selected: "bg-accent rounded-sm",
};

export const BurgerMenu = memo(() => {
  const pathname = usePathname();
  const t = useTranslations("Constants");
  const routesConfig = getRoutesConfig(t);

  return (
    <DropdownMenu>
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
          <DropdownMenuItem
            className={classes.dropdownMenuItem}
            onSelect={(e) => e.preventDefault()}
          >
            <LocaleSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

BurgerMenu.displayName = "BurgerMenu";
