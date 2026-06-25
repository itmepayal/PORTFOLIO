"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center border border-border bg-card text-base text-foreground transition-colors duration-200 hover:border-primary"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
