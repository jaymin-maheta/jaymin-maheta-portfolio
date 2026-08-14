import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Layout } from "../../../shared/components/Layout";

export function NotFoundPage() {
  const reduceMotion = useReducedMotion();
  const t = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <Layout>
      <main id="main-content" className="flex flex-col items-center justify-center gap-4 px-6 py-32 text-center">
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={t}
          className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue"
        >
          404
        </motion.p>
        <motion.h1
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.06 }}
          className="text-2xl font-extrabold text-text-heading sm:text-3xl"
        >
          Project not found
        </motion.h1>
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.12 }}
          className="max-w-md text-[15px] leading-relaxed text-text-muted"
        >
          This case study doesn't exist or may have moved.
        </motion.p>
        <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.18 }}>
          <Link
            to="/"
            className="mt-2 inline-flex rounded-full bg-brand-blue px-5 py-2.5 text-[13.5px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-blue-dark"
          >
            Back to portfolio
          </Link>
        </motion.div>
      </main>
    </Layout>
  );
}
