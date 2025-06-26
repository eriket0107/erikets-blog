"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { Beer, Coffee, MoonStar, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ThemeButton = ({
  variant = "button",
}: {
  variant?: "button" | "menu";
}) => {
  const { handleThemeChange, theme } = useTheme();
  const isDark = theme === "dark";

  const ThemeButton = {
    menu: () => (
      <Button
        className={
          "flex flex-row items-center text-base transition-all duration-100 ease-in-out"
        }
        variant={"link"}
        size={"default-icon"}
        onClick={handleThemeChange}
        data-testid="theme-btn"
      >
        Theme
        {isDark ? (
          <Coffee suppressHydrationWarning color="white" />
        ) : (
          <Beer suppressHydrationWarning color="black" />
        )}
      </Button>
    ),
    button: () => (
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
            data-testid="theme-btn"
          >
            {isDark ? (
              <Coffee suppressHydrationWarning color="black" />
            ) : (
              <Beer suppressHydrationWarning color="white" />
            )}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    ),
  };

  return ThemeButton[variant]();
};

export default ThemeButton;
