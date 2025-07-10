"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { MoonStar, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { memo } from "react";

const ThemeButtonMenu = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <Button
      className="bg-background flex flex-1 cursor-pointer flex-row items-center justify-between border-none text-base transition-all duration-100 ease-in-out focus:bg-transparent"
      variant="ghost"
      size="default-icon"
      onClick={handleThemeChange}
      data-testid="theme-btn-menu"
    >
      {isDark ? "Light" : "Dark"}
      <span
        className={`theme-icon ${isDark ? "active-sun-spin" : "active-moon-wave"}`}
      >
        {isDark ? (
          <Sun color="yellow" size={20} />
        ) : (
          <MoonStar color="black" size={20} />
        )}
      </span>
    </Button>
  );
};

const ThemeButtonNav = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <Tooltip delayDuration={300}>
      <TooltipContent>{isDark ? "Light" : "Dark"}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          onClick={handleThemeChange}
          className="relative hidden cursor-pointer !p-1 hover:scale-110 md:flex"
          variant={"link"}
          data-testid="theme-btn-nav"
        >
          <span className={isDark ? "hover-sun-spin" : "hover-moon-wave"}>
            {isDark ? (
              <Sun color="yellow" size={24} />
            ) : (
              <MoonStar color="black" size={24} />
            )}
          </span>
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
