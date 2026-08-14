import { motion, useReducedMotion } from "framer-motion";

interface SectionDividerProps {
  index: number;
  label: string;
}

/**
 * Editorial chapter marker between major sections — a numbered rule that
 * draws itself in as it enters the viewport, giving the page a sense of
 * progression (01 / 02 / 03…) as the reader scrolls.
 */
export function SectionDivider({ index, label }: SectionDividerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="my-14 flex items-center gap-4 md:my-20" aria-hidden="true">
      <span className="font-display text-xs font-semibold tabular-nums tracking-[0.2em] text-text-subtle">
        {String(index).padStart(2, "0")}
      </span>
      <motion.span
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "0px 0px -40% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-px flex-1 origin-left bg-gradient-to-r from-border-strong via-border-light to-transparent"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
        {label}
      </span>
    </div>
  );
}
