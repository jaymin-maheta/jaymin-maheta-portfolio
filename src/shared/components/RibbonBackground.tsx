import { useEffect, useRef } from "react";

interface RibbonPoint {
  x: number;
  y: number;
}

interface Ribbon {
  points: RibbonPoint[];
  lane: number;
}

interface Comet {
  ribbonIndex: number;
  progress: number;
  speed: number;
  color: string;
}

const settings = {
  width: 1920,
  height: 1080,

  count: 24,
  resolution: 81,

  spacing: 16,

  amplitude: 220,
  frequency: 0.75,

  phase: 0.14,

  twist: 0.41,
  bulge: 0.66,
  morph: 0.5,

  speed: 0.66,

  strokeWidth: 2,
  opacity: 1,

  gradientStart: "#18e299",
  gradientEnd: "#baff24",

  rotate: 0,

  particleColors: ["#d87cff", "#ffa723", "#44aeff", "#ffa3d3"],
  particleLength: 88,
  particleSpeed: 1.15,
  particleSparse: 0.32,
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/** Precomputes the wave-space (x, y) samples for every ribbon in the 1920x1080 design space. */
function buildRibbons(t: number): Ribbon[] {
  const count = Math.max(1, Math.floor(settings.count));
  const samples = Math.max(16, Math.floor(settings.resolution));
  const ribbons: Ribbon[] = [];

  for (let i = 0; i < count; i++) {
    const u = i / Math.max(1, count - 1);
    const lane = (u - 0.5) * (count - 1) * settings.spacing;
    const points: RibbonPoint[] = [];

    for (let j = 0; j <= samples; j++) {
      const progress = j / samples;
      const x = progress * settings.width;

      const wave = Math.sin(
        progress * Math.PI * 2 * settings.frequency +
          settings.phase +
          t * 0.55 +
          u * settings.twist * Math.PI
      );

      const envelope =
        0.32 + 0.68 * Math.pow(Math.sin(Math.PI * clamp(progress, 0, 1)), 1 + settings.bulge * 2);

      const spin =
        Math.sin(t * 0.32 + progress * Math.PI * 2 + u * 5) * settings.morph * settings.amplitude * 0.22;

      const centerLine =
        settings.height / 2 +
        lane +
        wave * settings.amplitude * envelope +
        spin;

      points.push({ x, y: centerLine });
    }

    ribbons.push({ points, lane });
  }

  return ribbons;
}

function pointAt(ribbon: Ribbon, progress: number): RibbonPoint {
  const idx = clamp(progress, 0, 1) * (ribbon.points.length - 1);
  const i0 = Math.floor(idx);
  const i1 = Math.min(i0 + 1, ribbon.points.length - 1);
  const frac = idx - i0;
  const a = ribbon.points[i0];
  const b = ribbon.points[i1];
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
}

function createComets(ribbonCount: number): Comet[] {
  const cometCount = Math.max(1, Math.round(ribbonCount * settings.particleSparse));
  const comets: Comet[] = [];
  for (let i = 0; i < cometCount; i++) {
    comets.push({
      ribbonIndex: Math.floor(Math.random() * ribbonCount),
      progress: Math.random(),
      speed: settings.particleSpeed * (0.7 + Math.random() * 0.6),
      color: settings.particleColors[i % settings.particleColors.length],
    });
  }
  return comets;
}

export function RibbonBackground() {
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

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;
    let frameId = 0;
    let startTime = performance.now();

    const comets = createComets(settings.count);

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    function draw(now: number) {
      frameId = requestAnimationFrame(draw);
      if (!isVisible) return;

      const t = ((now - startTime) / 1000) * settings.speed;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const scaleX = width / settings.width;
      const scaleY = height / settings.height;

      ctx.translate(width / 2, height / 2);
      ctx.rotate((settings.rotate * Math.PI) / 180);
      ctx.scale(scaleX, scaleY);
      ctx.translate(-settings.width / 2, -settings.height / 2);

      const gradient = ctx.createLinearGradient(0, 0, settings.width, 0);
      gradient.addColorStop(0, settings.gradientStart);
      gradient.addColorStop(1, settings.gradientEnd);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = settings.strokeWidth;
      ctx.globalAlpha = settings.opacity;
      ctx.lineCap = "round";

      const ribbons = buildRibbons(t);

      for (const ribbon of ribbons) {
        ctx.beginPath();
        ribbon.points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const comet of comets) {
        comet.progress += (comet.speed * 0.0035);
        if (comet.progress > 1) {
          comet.progress = 0;
          comet.ribbonIndex = Math.floor(Math.random() * ribbons.length);
        }

        const ribbon = ribbons[comet.ribbonIndex];
        if (!ribbon) continue;

        const trailSteps = 18;
        for (let s = 0; s < trailSteps; s++) {
          const trailProgress = comet.progress - (s / trailSteps) * (settings.particleLength / settings.width);
          if (trailProgress < 0) break;
          const pt = pointAt(ribbon, trailProgress);
          const fade = 1 - s / trailSteps;
          ctx.beginPath();
          ctx.fillStyle = comet.color;
          ctx.globalAlpha = fade * 0.8;
          ctx.arc(pt.x, pt.y, 2.2 * fade, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      ctx.restore();
    }

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }
    resize();

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

    frameId = requestAnimationFrame(draw);

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        startTime = performance.now() - startTime;
        frameId = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
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
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
