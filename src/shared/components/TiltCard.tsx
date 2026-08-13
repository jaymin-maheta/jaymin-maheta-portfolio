import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useState, type ReactNode, type PointerEvent } from "react";

interface TiltCardProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const SPRING = { stiffness: 300, damping: 22, mass: 0.6 };

function supportsHoverTilt(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TiltCard({ href, className, children }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const [canTilt] = useState(supportsHoverTilt);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  function handlePointerMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || !canTilt) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(relY * -6);
    rotateY.set(relX * 6);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.a
      href={href}
      className={className}
      style={
        canTilt
          ? { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800, transformStyle: "preserve-3d" }
          : undefined
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={!canTilt && !reduceMotion ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", ...SPRING }}
    >
      {children}
    </motion.a>
  );
}
