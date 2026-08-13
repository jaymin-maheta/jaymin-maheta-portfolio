import { useEffect, useRef } from "react";

interface LinePoint {
  x: number;
  y: number;
  normalX: number;
  normalY: number;
  progress: number;
}

interface FlowLine {
  points: LinePoint[];
  color: [number, number, number]; // rgb 0-255, head color
  seed: number;
  opacityScale: number;
}

const PRIMARY_RGB: [number, number, number] = [24, 226, 153]; // #18e299
const NAVY_RGB: [number, number, number] = [11, 23, 48]; // #0b1730
const ACCENT_RGBS: [number, number, number][] = [
  [249, 115, 22], // orange
  [192, 132, 252], // violet
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildCurvePoints(
  start: { x: number; y: number },
  end: { x: number; y: number },
  bow: number,
  segments: number
): { x: number; y: number }[] {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  const c1 = { x: lerp(start.x, end.x, 0.33) + nx * bow * 0.7, y: lerp(start.y, end.y, 0.33) + ny * bow * 0.7 };
  const c2 = { x: lerp(start.x, end.x, 0.66) + nx * bow, y: lerp(start.y, end.y, 0.66) + ny * bow };

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    const x = mt * mt * mt * start.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * end.x;
    const y = mt * mt * mt * start.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * end.y;
    points.push({ x, y });
  }
  return points;
}

function buildBundle(
  corner: { x: number; y: number },
  count: number,
  spread: { startJitter: number; endJitter: number; reach: number; bowMin: number; bowMax: number; bowJitter: number },
  opacityScale: number,
  isAccentChance: number
): FlowLine[] {
  const segments = 48;
  const lines: FlowLine[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1);
    const start = {
      x: corner.x + (Math.random() - 0.5) * spread.startJitter,
      y: corner.y + (Math.random() - 0.5) * spread.startJitter,
    };
    const end = {
      x: corner.x * -1 * spread.reach + (Math.random() - 0.5) * spread.endJitter,
      y: corner.y * -1 * spread.reach + (Math.random() - 0.5) * spread.endJitter,
    };
    const bow = spread.bowMin + t * (spread.bowMax - spread.bowMin) + (Math.random() - 0.5) * spread.bowJitter;

    const curvePoints = buildCurvePoints(start, end, bow, segments);
    const points: LinePoint[] = curvePoints.map((pt, idx) => {
      const prev = curvePoints[Math.max(idx - 1, 0)];
      const next = curvePoints[Math.min(idx + 1, curvePoints.length - 1)];
      const tx = next.x - prev.x;
      const ty = next.y - prev.y;
      const tlen = Math.hypot(tx, ty) || 1;
      return {
        x: pt.x,
        y: pt.y,
        normalX: -ty / tlen,
        normalY: tx / tlen,
        progress: idx / (curvePoints.length - 1),
      };
    });

    const isAccent = Math.random() < isAccentChance;
    const color = isAccent ? ACCENT_RGBS[Math.floor(Math.random() * ACCENT_RGBS.length)] : PRIMARY_RGB;

    lines.push({ points, color, seed: Math.random() * 100, opacityScale });
  }

  return lines;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const containerEl = containerRef.current;
    if (!canvasEl || !containerEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const renderCtx = canvasEl.getContext("2d");
    if (!renderCtx) return;

    const canvas = canvasEl;
    const container = containerEl;
    const ctx = renderCtx;

    let lines: FlowLine[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;
    let frameId = 0;
    let startTime = performance.now();
    let resizeTimer: ReturnType<typeof setTimeout>;

    function rebuild() {
      const hx = width / 2;
      const hy = height / 2;

      const primary = buildBundle(
        { x: hx * 1.02, y: hy * 1.08 },
        42,
        { startJitter: hy * 0.16, endJitter: width * 0.6, reach: 0.6, bowMin: hy * 0.3, bowMax: hy * 1.7, bowJitter: hy * 0.4 },
        1,
        0.07
      );
      const secondary = buildBundle(
        { x: -hx * 1.1, y: -hy * 1.2 },
        10,
        { startJitter: hy * 0.12, endJitter: width * 0.28, reach: 0.3, bowMin: hy * 0.15, bowMax: hy * 0.7, bowJitter: hy * 0.2 },
        0.22,
        0.07
      );
      lines = [...primary, ...secondary];
    }

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuild, 120);
    }

    function tick(now: number) {
      frameId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = (now - startTime) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);
      ctx.rotate(Math.sin(t * 0.05) * 0.025);
      ctx.translate(-width / 2, -height / 2);
      ctx.globalCompositeOperation = "lighter";

      for (const line of lines) {
        const sway = 0.18 * Math.sin(t * 0.18 + line.seed) + 0.1 * Math.sin(t * 0.09 - line.seed * 1.7);

        ctx.beginPath();
        for (let i = 0; i < line.points.length; i++) {
          const p = line.points[i];
          const swayAmount = Math.min(1, p.progress / 0.85) * sway * Math.min(width, height) * 0.05;
          const x = p.x + width / 2 + p.normalX * swayAmount;
          const y = p.y + height / 2 + p.normalY * swayAmount;

          const fade = Math.min(1, p.progress / 0.12) * Math.min(1, (1 - p.progress) / 0.3);
          const pulse = 0.65 + 0.35 * Math.sin(p.progress * 5 - t * 0.45);
          const alpha = fade * lerp(0.3, 1, pulse) * line.opacityScale;

          const brightness = 0.22 + 0.85 * p.progress;
          const r = lerp(line.color[0] * brightness, NAVY_RGB[0], (1 - p.progress) * 0.25);
          const g = lerp(line.color[1] * brightness, NAVY_RGB[1], (1 - p.progress) * 0.25);
          const b = lerp(line.color[2] * brightness, NAVY_RGB[2], (1 - p.progress) * 0.25);

          ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
    }

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }
    resize();
    rebuild();

    let intersectionObserver: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);
    }

    frameId = requestAnimationFrame(tick);

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        startTime = performance.now() - startTime;
        frameId = requestAnimationFrame(tick);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 26%, #000 55%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 26%, #000 55%)",
        filter: "drop-shadow(0 0 5px rgba(24,226,153,0.35)) drop-shadow(0 0 14px rgba(24,226,153,0.15))",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
