import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const OFFSETS = {
  up: { y: 24, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
} as const;

interface RevealProps {
  direction?: keyof typeof OFFSETS;
  className?: string;
  children: ReactNode;
}

export function Reveal({ direction = "up", className, children }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
