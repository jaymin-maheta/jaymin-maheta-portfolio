import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";
import { ScrollToTopButton } from "./ScrollToTopButton";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="theme-transition min-h-screen bg-bg-canvas font-sans text-text-body antialiased">
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary-950 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus-visible:outline-offset-2"
      >
        Skip to content
      </a>
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="theme-transition relative w-full bg-bg-surface"
      >
        {children}
      </motion.div>
      <ScrollToTopButton />
    </div>
  );
}
