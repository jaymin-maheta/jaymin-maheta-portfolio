import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface RevealGroupProps {
  className?: string;
  children: ReactNode;
}

export function RevealGroup({ className, children }: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: false, margin: "0px 0px -33% 0px" }}
      variants={reduceMotion ? undefined : containerVariants}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  className?: string;
  children: ReactNode;
}

export function RevealItem({ className, children }: RevealItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
