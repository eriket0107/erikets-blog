"use client";

import { Button } from "@/components/ui/button";
import { Moon, MoonIcon, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const storagedTheme = localStorage.getItem("@coffeAndVanillaCode: theme");
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme =
      (storagedTheme as "dark" | "light") || (isDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.value = initialTheme;
  }, []);

  const handleThemeChange = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.value = newTheme;
      document.documentElement.style.colorScheme = newTheme;
      if (window !== undefined) {
        localStorage.setItem("@coffeAndVanillaCode: theme", newTheme);
      }
      return newTheme;
    });
  };

  return (
    <Button
      onClick={handleThemeChange}
      className="bg-accent-foreground cursor-pointer"
      variant="default"
    >
      {theme === "dark" ? <MoonStar color="black" /> : <Sun color="white" />}
    </Button>
  );
};
