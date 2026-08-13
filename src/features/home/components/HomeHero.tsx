import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "../../../shared/components/HeroBackground";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const heroTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };
  const heroInitial = reduceMotion ? false : { opacity: 0, y: 24 };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-brand-blue-dark to-brand-blue px-6 py-14 text-white transition-colors duration-300 dark:from-black dark:via-neutral-950 dark:to-neutral-900 sm:px-10 md:px-16 md:py-20 lg:px-20">
      <HeroBackground />
      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={heroInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[28px] border-4 border-white/20 bg-gradient-to-br from-white/25 to-white/5 text-4xl font-extrabold text-white shadow-2xl backdrop-blur sm:h-32 sm:w-32"
        >
          JM
        </motion.div>
        <div>
          <motion.span
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.08 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffd166] backdrop-blur"
          >
            Available for opportunities
          </motion.span>
          <motion.h1
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.16 }}
            className="text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-[44px]"
          >
            Jaymin Maheta
          </motion.h1>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.24 }}
            className="mt-2 text-lg font-bold text-sky-100 sm:text-xl"
          >
            Senior UI/UX Designer &amp; Senior UI Engineer
          </motion.p>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.32 }}
            className="mt-1 text-sm font-semibold text-white/70"
          >
            Angular &amp; React &middot; Design Systems &middot; Frontend Architecture
          </motion.p>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.4 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base"
          >
            Senior UI Engineer with 7+ years of experience building responsive, accessible and production-ready enterprise applications using Angular and React. With a strong foundation in UI/UX design, I specialise in transforming Figma designs into pixel-perfect interfaces while bridging the gap between design and engineering — across design systems, reusable component libraries, frontend architecture, accessibility and Angular modernisation.
          </motion.p>

          <motion.div
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.48 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a href="mailto:hello.jaymin.maheta@gmail.com" className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-bold text-primary-navy shadow-lg transition hover:bg-sky-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                <polyline points="22 6 12 13 2 6"></polyline>
              </svg>{" "}
              hello.jaymin.maheta@gmail.com
            </a>
            <a href="https://linkedin.com/in/jaymin-maheta" target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[13.5px] font-bold text-white backdrop-blur transition hover:bg-white/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>{" "}
              linkedin.com/in/jaymin-maheta
            </a>
            <a href="/assets/docs/jaymin-maheta-resume.pdf" download className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[13.5px] font-bold text-white backdrop-blur transition hover:bg-white/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>{" "}
              Download Resume
            </a>
            <span className="flex items-center gap-1.5 px-1 text-[13px] font-semibold text-white/70">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>{" "}
              Ahmedabad, Gujarat, India
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
