"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { Beer, Coffee } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ThemeButtonVariant = "nav" | "menu";

interface ThemeButtonProps {
  variant?: ThemeButtonVariant;
}

const ThemeButton = ({ variant = "nav" }: ThemeButtonProps) => {
  const { handleThemeChange, isDark } = useTheme();

  switch (variant) {
    case "menu":
      return (
        <Button
          className="flex cursor-pointer flex-row items-center border-none text-base transition-all duration-100 ease-in-out dark:bg-white"
          variant="ghost"
          size="default-icon"
          onClick={handleThemeChange}
          data-testid="theme-btn-menu"
        >
          Theme
          {isDark ? (
            <Coffee suppressHydrationWarning color="white" />
          ) : (
            <Beer suppressHydrationWarning color="black" />
          )}
        </Button>
      );

    case "nav":
    default:
      return (
        <Tooltip>
          <TooltipContent>{isDark ? "Light" : "Dark"}</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              onClick={handleThemeChange}
              className={cn(
                isDark ? "bg-white" : "bg-accent-foreground",
                isDark ? "border-accent-foreground" : "border-white",
                "cursor-pointer",
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
  }
};

export default ThemeButton;
