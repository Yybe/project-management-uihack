"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with a default, but we'll update it immediately in useEffect
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // This effect runs once on mount to set up the theme from localStorage
  useEffect(() => {
    // Check if theme is stored in localStorage
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("taskverse_theme") as Theme | null;
      const initialTheme = storedTheme || "light";

      setTheme(initialTheme);

      // Apply theme to document immediately
      if (initialTheme === "light") {
        document.documentElement.classList.add("light-theme");
        document.body.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
        document.body.classList.remove("light-theme");
      }

      // If no theme was stored, save the default
      if (!storedTheme) {
        localStorage.setItem("taskverse_theme", "light");
      }

      // Mark as mounted to prevent flash of wrong theme
      setMounted(true);
    }
  }, []);

  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log('New theme will be:', newTheme);
    setTheme(newTheme);

    // Save to localStorage for persistence across pages
    console.log('Saving theme to localStorage:', newTheme);
    localStorage.setItem("taskverse_theme", newTheme);

    // Apply theme to body immediately
    if (newTheme === "light") {
      console.log('Adding light-theme class to body');
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      console.log('Removing light-theme class from body');
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
    }

    // No need to reload the page, the theme is applied immediately
    console.log('Theme applied successfully');
  };

  // Don't render children until after the theme has been determined
  // This prevents the flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
