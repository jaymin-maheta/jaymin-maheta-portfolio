import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const RING_SPRING = { stiffness: 260, damping: 26, mass: 0.5 };
const DOT_SPRING = { stiffness: 900, damping: 40, mass: 0.2 };

function supportsFinePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Replaces the system cursor with a two-part dot + ring that grows and
 * labels itself over interactive elements. Desktop/fine-pointer only —
 * inert (and unmounted) on touch devices and under reduced motion.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled] = useState(supportsFinePointer);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "text">("default");
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);
  const dotX = useSpring(x, DOT_SPRING);
  const dotY = useSpring(y, DOT_SPRING);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    document.documentElement.classList.add("custom-cursor");

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as Element | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, [role="tab"], summary'
      );
      const textTarget = target?.closest("h1, h2, h3, blockquote");

      if (interactive) {
        setVariant("link");
        const magnetic = interactive.closest("[data-cursor-label]");
        setLabel(magnetic?.getAttribute("data-cursor-label") ?? null);
      } else if (textTarget) {
        setVariant("text");
        setLabel(null);
      } else {
        setVariant("default");
        setLabel(null);
      }
    }

    function handleEnter() {
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }
    function handleDown() {
      setPressed(true);
    }
    function handleUp() {
      setPressed(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[200] hidden transition-opacity duration-300 md:block ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-brand-blue"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: variant === "link" ? 0 : 6,
          height: variant === "link" ? 0 : 6,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-brand-blue/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: variant === "link" ? 64 : variant === "text" ? 48 : 32,
          height: variant === "link" ? 64 : variant === "text" ? 48 : 32,
          scale: pressed ? 0.82 : 1,
          backgroundColor:
            variant === "link" ? "rgba(253,157,39,0.12)" : variant === "text" ? "rgba(253,157,39,0.06)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-brand-blue"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
