"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils";
import { MoonStar, Sun } from "lucide-react";

export const ThemeButton = () => {
  const { handleThemeChange, theme } = useTheme();
  return (
    <Button
      onClick={handleThemeChange}
      className={cn(
        theme === "dark" ? "bg-white" : "bg-accent-foreground",
        "cursor-pointer",
      )}
      data-testid="theme-btn"
    >
      {theme === "dark" ? <MoonStar color="black" /> : <Sun color="white" />}
    </Button>
  );
};
