import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { toggle } = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt text-text-heading transition hover:border-brand-blue hover:text-brand-blue"
    >
      <svg className="hidden h-5 w-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
      </svg>
      <svg className="block h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </motion.button>
  );
}
