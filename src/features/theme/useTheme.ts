import { useCallback, useEffect, useState } from "react";

function readInitialIsDark(): boolean {
  if (document.documentElement.classList.contains("dark")) return true;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(readInitialIsDark);

  // Apply initial theme class on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // ignore storage errors (private browsing, etc.)
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
