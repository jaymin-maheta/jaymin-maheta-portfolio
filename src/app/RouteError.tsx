import { Link, useRouteError } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Layout } from "../shared/components/Layout";

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /failed to fetch dynamically imported module|dynamically imported module|importing a module script failed/i.test(
    message
  );
}

export function RouteError() {
  const error = useRouteError();
  const chunkError = isChunkLoadError(error);
  const reduceMotion = useReducedMotion();
  const t = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <Layout>
      <main
        id="main-content"
        className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 py-32 text-center"
      >
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={t}
          className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue"
        >
          {chunkError ? "Update Available" : "Something Went Wrong"}
        </motion.p>
        <motion.h1
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.06 }}
          className="font-display text-2xl font-semibold text-text-heading sm:text-3xl"
        >
          {chunkError ? "This page was updated" : "Unexpected error"}
        </motion.h1>
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.12 }}
          className="max-w-md text-[15px] leading-relaxed text-text-muted"
        >
          {chunkError
            ? "The site was updated since you loaded this page. Reload to get the latest version."
            : "Something didn't load correctly. Try reloading the page, or head back to the homepage."}
        </motion.p>
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.18 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            type="button"
            onClick={() => window.location.reload()}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="cursor-pointer rounded-full bg-brand-blue px-5 py-2.5 text-[13.5px] font-bold text-white shadow-lg transition-colors hover:bg-brand-blue-dark"
          >
            Reload Page
          </motion.button>
          <Link
            to="/"
            className="rounded-full border border-border-strong px-5 py-2.5 text-[13.5px] font-bold text-text-body transition hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
          >
            Back to portfolio
          </Link>
        </motion.div>
      </main>
    </Layout>
  );
}
