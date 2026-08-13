import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "../../../shared/components/HeroBackground";
import type { HeroContent } from "../types";

export function CaseStudyHero({ hero }: { hero: HeroContent }) {
  const reduceMotion = useReducedMotion();
  const heroTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-brand-blue-dark to-brand-blue px-6 pb-24 pt-12 text-white transition-colors duration-300 dark:from-black dark:via-neutral-950 dark:to-neutral-900 sm:px-10 md:px-16 md:pb-28 md:pt-16 lg:px-20 lg:pb-[110px] lg:pt-[70px]">
      <HeroBackground />
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.1 }}
        className="relative z-10 mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffd166] backdrop-blur"
      >
        {hero.eyebrow}
      </motion.span>
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.18 }}
        className="relative z-10 max-w-4xl text-[26px] font-extrabold leading-[1.2] tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]"
      >
        {hero.heading}
      </motion.h1>
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.26 }}
        className="relative z-10 mt-5 max-w-2xl text-[15px] font-medium leading-relaxed text-white/80 sm:text-base"
      >
        {hero.subheading}
      </motion.p>
    </div>
  );
}
