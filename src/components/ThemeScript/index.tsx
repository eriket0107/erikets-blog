import React from "react";

const themeScript = `
(function() {
  function getTheme() {
    const themeKey = '@coffeAndVanillaCode:theme';
    try {
      const storedData = localStorage.getItem(themeKey);
      if (storedData) {
        return JSON.parse(storedData).state.theme;
      }
    } catch (e) {
      console.error('Error reading theme from localStorage', e);
    }
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDark ? 'dark' : 'light';
  }
  const theme = getTheme();
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
})();
`;

export const ThemeScript = () => {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};
