import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggle}
      whileTap={reduceMotion ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="theme-transition flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-surface-alt text-text-heading transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2"
    >
      {/* Sun — visible in dark mode */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon — visible in light mode */}
      <svg
        className="block h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </motion.button>
  );
}
