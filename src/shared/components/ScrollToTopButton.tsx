import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const SHOW_AFTER = 480;

export function ScrollToTopButton() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (y) => setVisible(y > SHOW_AFTER));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          aria-label="Scroll to top"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="theme-transition fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-bg-surface text-text-heading shadow-lg shadow-black/10 backdrop-blur-sm hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2 sm:bottom-8 sm:right-8"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
