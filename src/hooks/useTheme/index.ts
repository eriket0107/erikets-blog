'use client'

import { themeKeyCookie } from "@/constants/cookies";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
      },
    }),
    {
      name: '@coffeAndVanillaCode:theme',
    }
  )
);

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
    document.cookie = `${themeKeyCookie}=${theme}`
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    document.documentElement.style.colorScheme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);

    document.cookie = `${themeKeyCookie}=${newTheme}`;

    toggleTheme();
  };

  const isDark = theme === 'dark'

  return {
    isDark,
    theme,
    handleThemeChange,
    setTheme,
  };
};