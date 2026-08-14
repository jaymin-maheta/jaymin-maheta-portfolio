import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCallback, useState, type ReactNode, type PointerEvent } from "react";

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
  target?: string;
  rel?: string;
  /** Shown by CustomCursor when hovering this link on desktop. */
  cursorLabel?: string;
}

const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };
const PULL = 0.35;
const MAX_OFFSET = 10;

function supportsHoverPointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function MagneticLink({ href, className, children, download, target, rel, cursorLabel }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const [canPull] = useState(supportsHoverPointer);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLAnchorElement>) => {
      if (reduceMotion || !canPull) return;
      const bounds = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - (bounds.left + bounds.width / 2);
      const relY = e.clientY - (bounds.top + bounds.height / 2);
      x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * PULL)));
      y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * PULL)));
    },
    [reduceMotion, canPull, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      href={href}
      className={className}
      download={download}
      target={target}
      rel={rel}
      data-cursor-label={cursorLabel}
      style={canPull && !reduceMotion ? { x: springX, y: springY } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.a>
  );
}
