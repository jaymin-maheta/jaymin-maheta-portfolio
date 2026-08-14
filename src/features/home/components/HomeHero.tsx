import { motion, useReducedMotion } from "framer-motion";
import { DeferredHeroBackground } from "./DeferredHeroBackground";
import { MagneticLink } from "../../../shared/components/MagneticLink";
import { SpotlightLayer } from "../../../shared/components/SpotlightLayer";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const t = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduceMotion ? false : { opacity: 0, y: 20 };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-5 py-16 text-white sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16"
    >
      <DeferredHeroBackground />
      <SpotlightLayer />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
        {/* Avatar mark */}
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={t}
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/6 font-display text-3xl font-semibold tracking-tight text-white shadow-2xl backdrop-blur-md sm:h-28 sm:w-28 sm:text-4xl"
          aria-hidden="true"
        >
          JM
        </motion.div>

        <div className="min-w-0">
          <motion.span
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.06 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-200 backdrop-blur-sm"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_2px_rgba(253,157,39,0.55)]"
              aria-hidden="true"
            />
            Available for senior roles &amp; consulting
          </motion.span>

          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.12 }}
            className="text-balance font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.75rem] md:text-[3.4rem]"
          >
            Building scalable digital experiences that drive business growth.
          </motion.h1>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.18 }}
            className="mt-4 text-lg font-medium text-accent-100/90 sm:text-xl"
          >
            Senior UI Engineer &amp; UI/UX Designer — Angular, React &amp; Design Systems
          </motion.p>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.24 }}
            className="mt-1 text-sm font-medium text-white/55"
          >
            7+ years · Design Systems · Frontend Architecture · Accessibility
          </motion.p>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.3 }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base"
          >
            I build responsive, accessible, production-ready enterprise applications using
            Angular and React. With a design foundation in Figma, I turn high-fidelity mockups
            into pixel-perfect interfaces — bridging design and engineering across component
            libraries, frontend architecture, and Angular modernisation for healthcare,
            government, and SaaS products.
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-primary-950 shadow-lg transition-colors hover:bg-accent-50 focus-visible:outline-offset-2"
            >
              View Projects
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </MagneticLink>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/4 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-offset-2"
            >
              Let&rsquo;s Work Together
            </a>

            <a
              href="/assets/docs/jaymin-maheta-resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white/85 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-offset-2"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[13px] font-medium text-white/55"
          >
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ahmedabad, Gujarat, India
            </span>
            <a
              href="mailto:hello.jaymin.maheta@gmail.com"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
              hello.jaymin.maheta@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jaymin-maheta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
