import { useEffect, useRef } from "react";

/**
 * Subtle radial glow that follows the pointer within its parent (which must
 * be `position: relative`). CSS-variable driven — no React re-render per move.
 */
export function SpotlightLayer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleMove(e: PointerEvent) {
      const bounds = parent!.getBoundingClientRect();
      el!.style.setProperty("--spot-x", `${e.clientX - bounds.left}px`);
      el!.style.setProperty("--spot-y", `${e.clientY - bounds.top}px`);
      el!.style.opacity = "1";
    }

    function handleLeave() {
      el!.style.opacity = "0";
    }

    parent.addEventListener("pointermove", handleMove);
    parent.addEventListener("pointerleave", handleLeave);
    return () => {
      parent.removeEventListener("pointermove", handleMove);
      parent.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(253,157,39,0.12), transparent 65%)",
      }}
    />
  );
}
