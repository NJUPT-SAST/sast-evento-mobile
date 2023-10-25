import React, { ReactNode, useState } from 'react';
import { ToggleCustomEvent } from '@ionic/core';
import { useEffect } from 'react';

export const ThemeContext = React.createContext({
  themeToggle: true,
  toggleChange: (ev: ToggleCustomEvent) => void 0 as any
})

const ThemeChange = (props: { children?: ReactNode }) => {
  const [themeToggle, setThemeToggle] = useState(true);

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    console.log(ev);
    setThemeToggle(ev.detail.checked)
    toggleDarkTheme(ev.detail.checked);
  };

  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd: boolean) => {
    console.log(document.body.classList);

    document.body.classList.toggle('dark', shouldAdd);
    // document.body.classList.toggle('light', !shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    console.log(isDark);

    toggleDarkTheme(isDark);
  };
  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ themeToggle, toggleChange }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeChange;