"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { Beer, Coffee, MoonStar, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ThemeButton = () => {
  const { handleThemeChange, theme } = useTheme();
  return (
    <Tooltip>
      <TooltipContent>{theme === "dark" ? "Light" : "Dark"}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          onClick={handleThemeChange}
          className={cn(
            theme === "dark" ? "bg-white" : "bg-accent-foreground",
            theme === "dark" ? "border-accent-foreground" : "border-white",
            "cursor-pointer",
          )}
          data-testid="theme-btn"
        >
          {theme === "dark" ? (
            <Coffee suppressHydrationWarning color="black" />
          ) : (
            <Beer suppressHydrationWarning color="white" />
          )}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default ThemeButton;
