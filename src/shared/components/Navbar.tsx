import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

interface NavbarProps {
  shortName: string;
  eyebrow: string;
  title: string;
  homeLink?: { href: string; label: string };
  switcher?: ReactNode;
}

export function Navbar({ shortName, eyebrow, title, homeLink, switcher }: NavbarProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col gap-5 border-b-2 border-border-light bg-bg-surface px-6 py-6 transition-colors duration-300 sm:px-10 md:flex-row md:items-center md:justify-between md:px-16 md:py-8 lg:px-20"
    >
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-base font-extrabold text-white shadow-lg shadow-brand-blue/25"
        >
          {shortName}
        </Link>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-blue">{eyebrow}</p>
          <p className="text-lg font-extrabold leading-tight text-text-heading">{title}</p>
          {homeLink && (
            <Link to={homeLink.href} className="text-[11.5px] font-semibold text-text-muted transition hover:text-brand-blue">
              {homeLink.label}
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {switcher}
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
