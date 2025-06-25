'use client'

import { useEffect, useState } from "react";

export const useTheme = () => {
  const storagedTheme = localStorage?.getItem("@coffeAndVanillaCode: theme") || 'light'

  const [theme, setTheme] = useState<"dark" | "light">(storagedTheme as "dark" | "light" || 'light');

  useEffect(() => {
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

  return {
    theme,
    handleThemeChange
  }
}