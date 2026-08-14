import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

interface NavSection {
  href: string;
  label: string;
}

interface NavbarProps {
  shortName: string;
  eyebrow: string;
  title: string;
  homeLink?: { href: string; label: string };
  switcher?: ReactNode;
  sections?: NavSection[];
}

export function Navbar({ shortName, eyebrow, title, homeLink, switcher, sections }: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.3 });

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="theme-transition sticky top-0 z-50 border-b border-border-light bg-bg-surface/80 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 sm:py-5 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
        <div className="flex items-center gap-3.5">
          <Link
            to="/"
            aria-label="Home — Jaymin Maheta"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 font-display text-sm font-semibold text-white shadow-md shadow-primary-900/20 transition hover:shadow-lg hover:shadow-primary-900/30 focus-visible:outline-offset-2"
          >
            {shortName}
          </Link>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
              {eyebrow}
            </p>
            <p className="truncate font-display text-base font-semibold leading-tight text-text-heading sm:text-lg">
              {title}
            </p>
            {homeLink && (
              <Link
                to={homeLink.href}
                className="text-[12px] font-medium text-text-muted transition hover:text-brand-blue"
              >
                {homeLink.label}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {sections && sections.length > 0 && (
            <nav aria-label="Section navigation" className="hidden items-center gap-5 lg:flex">
              {sections.map((section) => (
                <a
                  key={section.href}
                  href={section.href}
                  className="text-[13px] font-medium text-text-muted transition hover:text-text-heading"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {switcher}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? 0 : progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300"
      />
    </motion.header>
  );
}
