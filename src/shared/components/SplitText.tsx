import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { ElementType } from "react";

interface SplitTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Delay (s) before the first word starts animating. */
  delay?: number;
  /** Re-trigger every time the heading scrolls into view instead of once. */
  loop?: boolean;
}

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

/**
 * Splits text into words and reveals them with a staggered clip-path rise,
 * an editorial "type is setting itself" moment for headlines and section titles.
 */
export function SplitText({ children, as: Tag = "span", className, id, delay = 0, loop = true }: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  if (reduceMotion) {
    const Component = Tag as ElementType;
    return (
      <Component id={id} className={className}>
        {children}
      </Component>
    );
  }

  const MotionTag = motion[Tag as "h1"] ?? motion.span;

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={loop ? { once: false, margin: "0px 0px -20% 0px" } : { once: true, margin: "0px 0px -20% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom mr-[0.28em] last:mr-0"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: { y: "0%", rotate: 0, transition: { duration: 0.62, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
