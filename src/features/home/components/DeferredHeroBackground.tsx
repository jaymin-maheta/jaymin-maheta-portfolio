import { lazy, Suspense, useEffect, useState } from "react";

const RibbonBackground = lazy(() =>
  import("../../../shared/components/RibbonBackground").then((m) => ({
    default: m.RibbonBackground,
  }))
);

/**
 * Mounts the canvas hero only after the first paint / idle time so it
 * cannot compete with FCP/LCP on the critical path.
 */
export function DeferredHeroBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    const idleRequest = (
      globalThis as typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;

    // Prefer idle callback; fall back to a short timeout after first paint
    if (typeof idleRequest === "function") {
      const id = idleRequest(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        const cancelIdle = (
          globalThis as typeof globalThis & {
            cancelIdleCallback?: (handle: number) => void;
          }
        ).cancelIdleCallback;
        if (typeof cancelIdle === "function") cancelIdle(id);
      };
    }

    const t = globalThis.setTimeout(enable, 200);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <RibbonBackground />
    </Suspense>
  );
}
