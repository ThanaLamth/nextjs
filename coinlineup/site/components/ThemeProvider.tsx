"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const THEME_KEY = "cl-theme";
const THEME_VERSION_KEY = "cl-theme-version";
const THEME_VERSION = "2";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const savedVersion = localStorage.getItem(THEME_VERSION_KEY);
    const initial =
      savedVersion === THEME_VERSION && (saved === "light" || saved === "dark")
        ? saved
        : "light";

    localStorage.setItem(THEME_KEY, initial);
    localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
    applyTheme(next);
  }

  if (!mounted) return <>{children}</>;

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
