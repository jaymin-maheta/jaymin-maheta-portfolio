import { motion, useReducedMotion } from "framer-motion";
import { DeferredHeroBackground } from "./DeferredHeroBackground";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const t = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduceMotion ? false : { opacity: 0, y: 20 };

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-700 px-5 py-14 text-white sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800"
    >
      <DeferredHeroBackground />

      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
        {/* Avatar mark */}
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={t}
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl font-extrabold tracking-tight text-white shadow-2xl backdrop-blur-md sm:h-28 sm:w-28 sm:text-4xl"
          aria-hidden="true"
        >
          JM
        </motion.div>

        <div className="min-w-0">
          <motion.span
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.06 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" aria-hidden="true" />
            Available for opportunities
          </motion.span>

          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.12 }}
            className="text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.75rem]"
          >
            Jaymin Maheta
          </motion.h1>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.18 }}
            className="mt-2 text-lg font-semibold text-emerald-100/95 sm:text-xl"
          >
            Senior UI/UX Designer &amp; Senior UI Engineer
          </motion.p>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.24 }}
            className="mt-1 text-sm font-medium text-white/65"
          >
            Angular &amp; React · Design Systems · Frontend Architecture
          </motion.p>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.3 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base"
          >
            Senior UI Engineer with 7+ years of experience building responsive, accessible and production-ready enterprise applications using Angular and React. With a strong foundation in UI/UX design, I specialise in transforming Figma designs into pixel-perfect interfaces while bridging the gap between design and engineering — across design systems, reusable component libraries, frontend architecture, accessibility and Angular modernisation.
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.36 }}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            <a
              href="mailto:hello.jaymin.maheta@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4.5 py-2.5 text-[13px] font-semibold text-primary-950 shadow-lg transition hover:bg-emerald-50 focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
              hello.jaymin.maheta@gmail.com
            </a>

            <a
              href="https://linkedin.com/in/jaymin-maheta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4.5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>

            <a
              href="/assets/docs/jaymin-maheta-resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4.5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>

            <span className="inline-flex items-center gap-1.5 px-1 text-[13px] font-medium text-white/65">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ahmedabad, Gujarat, India
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
