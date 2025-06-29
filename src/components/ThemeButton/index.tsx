"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { Beer, Coffee } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { memo } from "react";

const ThemeButtonMenu = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <Button
      className="flex flex-1 cursor-pointer flex-row items-center justify-between border-none text-base transition-all duration-100 ease-in-out focus:bg-transparent dark:bg-white"
      variant="ghost"
      size="default-icon"
      onClick={handleThemeChange}
      data-testid="theme-btn-menu"
    >
      {isDark ? "Light" : "Dark"}
      {isDark ? (
        <Coffee suppressHydrationWarning color="white" />
      ) : (
        <Beer suppressHydrationWarning color="black" />
      )}
    </Button>
  );
};

const ThemeButtonNav = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <Tooltip>
      <TooltipContent>{isDark ? "Light" : "Dark"}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          onClick={handleThemeChange}
          className={cn(
            isDark ? "bg-white" : "bg-accent-foreground",
            isDark ? "border-accent-foreground" : "border-white",
            "hidden cursor-pointer hover:scale-95 md:flex",
          )}
          data-testid="theme-btn-nav"
        >
          {isDark ? (
            <Coffee suppressHydrationWarning color="black" />
          ) : (
            <Beer suppressHydrationWarning color="white" />
          )}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

interface ThemeButtonProps {
  variant?: "nav" | "menu";
}

const ThemeButton = memo(({ variant = "nav" }: ThemeButtonProps) => {
  switch (variant) {
    case "menu":
      return <ThemeButtonMenu />;
    case "nav":
    default:
      return <ThemeButtonNav />;
  }
});

ThemeButton.displayName = "ThemeButton";
export default ThemeButton;
