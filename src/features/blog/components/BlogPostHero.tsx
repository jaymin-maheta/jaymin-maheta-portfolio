import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DeferredHeroBackground } from "../../home/components/DeferredHeroBackground";
import { SpotlightLayer } from "../../../shared/components/SpotlightLayer";
import type { BlogPostMeta } from "../types";

export function BlogPostHero({ meta }: { meta: BlogPostMeta }) {
  const reduceMotion = useReducedMotion();
  const t = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      ref={sectionRef}
      aria-label="Post overview"
      className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-5 pb-16 pt-10 text-white sm:px-8 sm:pb-20 sm:pt-12 md:px-12 md:pb-24 md:pt-14 lg:px-16"
    >
      <DeferredHeroBackground />
      <SpotlightLayer />
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.08 }}
          className="mb-4 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200 backdrop-blur-sm">
            {meta.tag}
          </span>
          <span className="text-[13px] text-white/60">
            {meta.publishedLabel} · {meta.readTime} read
          </span>
        </motion.div>
        <motion.h1
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.14 }}
          className="font-display text-[1.6rem] font-semibold leading-[1.2] tracking-tight sm:text-3xl md:text-4xl"
        >
          {meta.title}
        </motion.h1>
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.2 }}
          className="mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-white/80 sm:text-base"
        >
          {meta.excerpt}
        </motion.p>
      </motion.div>
    </section>
  );
}
