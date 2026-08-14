import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCallback, useState, type ReactNode, type PointerEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface TiltCardProps {
  /** SPA route path */
  to: string;
  className?: string;
  children: ReactNode;
  /** Shown by CustomCursor when hovering this card on desktop. */
  cursorLabel?: string;
}

const SPRING = { stiffness: 300, damping: 22, mass: 0.6 };

function supportsHoverTilt(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TiltCard({ to, className, children, cursorLabel }: TiltCardProps) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [canTilt] = useState(supportsHoverTilt);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLAnchorElement>) => {
      if (reduceMotion || !canTilt) return;
      const bounds = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
      rotateX.set(relY * -6);
      rotateY.set(relX * 6);
    },
    [reduceMotion, canTilt, rotateX, rotateY]
  );

  const handlePointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  // Client-side navigation (no full page reload)
  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Allow modified clicks (new tab, etc.) to use native behavior
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  return (
    <motion.a
      href={to}
      className={className}
      data-cursor-label={cursorLabel}
      style={
        canTilt && !reduceMotion
          ? {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 800,
              transformStyle: "preserve-3d" as const,
            }
          : undefined
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      whileTap={!canTilt && !reduceMotion ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", ...SPRING }}
    >
      {children}
    </motion.a>
  );
}
