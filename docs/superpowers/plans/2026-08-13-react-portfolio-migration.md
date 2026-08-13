# React Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static 6-page HTML portfolio site as a Vite + React + TypeScript app with a single dynamic case-study route driven by strictly-typed data, behind a repository seam ready for a future admin panel.

**Architecture:** Feature-based folders (`features/case-studies`, `features/home`, `features/theme`) plus `shared/` for cross-feature components. One `/:slug` route renders any case study from a `CaseStudyData` object looked up via `repository.ts`. Framer-motion replaces GSAP/ScrollTrigger for reveals and tilt; a hand-rolled canvas component replaces three.js for the hero background.

**Tech Stack:** Vite, React 18, TypeScript (strict), React Router v6, Tailwind CSS v4 (build-time, not CDN), framer-motion. No GSAP, ScrollTrigger, or three.js.

**Spec:** [docs/superpowers/specs/2026-08-13-react-portfolio-migration-design.md](../specs/2026-08-13-react-portfolio-migration-design.md)

## Global Constraints

- **100% visual/behavioral parity** with the current static HTML — same layout, spacing, colors, copy, icons, gradients, light/dark theming, responsive breakpoints, and interactive behavior (theme toggle, link targets, what triggers when) — **except** the deliberate motion/interaction-quality exception below. Non-1:1 swaps (canvas hero vs. three.js) must be visually indistinguishable at normal viewing, not merely "close."
- **Motion & interaction quality bar (the one deliberate exception to parity):** every animation and micro-interaction must be purposeful (communicates state, hierarchy, or causality — never decorative for its own sake) and premium: Apple-caliber product-site motion — spring-based or custom decelerating cubic-bezier curves (e.g. `[0.16, 1, 0.3, 1]`), never a linear or default ease-in-out, short durations (150–400ms for UI feedback; scroll-reveals can run longer). The original's reveal/tilt/hero motion is the *floor*, not the ceiling — small, justifiable micro-interactions (press feedback, hover polish, focus states) may be added on interactive elements (buttons, links, toggles, cards, nav pills) even where the original had none, as long as layout/content/function don't change and each addition is justifiable in one sentence. `prefers-reduced-motion` disables all motion, including anything added under this exception, with an instant state change as the fallback — never a stripped-down animation.
- **Fully interactive on every device, adapted per input type:** pointer-hover-only effects (tilt, hover states) must have a touch-appropriate equivalent (e.g. tap/press scale or elevation feedback on `pointerdown`/`pointerup`) on devices that fail a `(hover: hover) and (pointer: fine)` check, rather than going inert. Scroll-driven reveals already work identically across input types.
- **Fully responsive** at mobile/tablet/desktop breakpoints, with touch targets sized appropriately and no functionality reachable only via hover.
- Every case-study page section is driven by typed data (`CaseStudyData`), never hardcoded per-project JSX.
- All content access goes through `features/case-studies/repository.ts` (`getAllCaseStudies()`, `getCaseStudyBySlug()`) — components and pages never import `data/*.ts` files directly.
- Strict TypeScript (`strict: true` in tsconfig) — no `any`, no implicit any.
- Drop GSAP, ScrollTrigger, three.js entirely. Use framer-motion for reveal/stagger/tilt/micro-interactions; hand-rolled `<canvas>` for the hero background.
- Theme (light/dark) persists to `localStorage['theme']`, with no flash-of-wrong-theme on load.
- Original files (`index.html`, `compito.html`, `farmgate.html`, `valyxto.html`, `bmc.html`, `rota.html`, `assets/`) are transcription sources — read them, don't delete them until the migration is verified complete (final cleanup is out of scope for this plan).
- After every task that produces a renderable page, do a manual visual-parity check against the corresponding original static HTML file (open both in a browser, compare light + dark mode) before marking the task done, plus a manual check that motion/interaction feels premium and works correctly on both a mouse/trackpad and a touch device (or devtools touch emulation).

---

## File Structure

```
src/
  app/
    App.tsx
    routes.tsx
  features/
    case-studies/
      types.ts
      data/
        compito.ts
        farmgate.ts
        valyxto.ts
        bmc.ts
        rota.ts
        index.ts
      repository.ts
      components/
        CaseStudyHero.tsx
        MetaBadges.tsx
        MetricsGrid.tsx
        FlowDiagram.tsx
        InfoCard.tsx
        ContributionCard.tsx
        OutcomesSection.tsx
        ApproachSteps.tsx
        TechStackGrid.tsx
        SnapshotFooter.tsx
      pages/
        CaseStudyPage.tsx
    home/
      components/
        HomeHero.tsx
        RecognitionStrip.tsx
        ProjectGrid.tsx
        ProjectCard.tsx
      pages/
        HomePage.tsx
    theme/
      useTheme.ts
      ThemeToggle.tsx
  shared/
    components/
      Layout.tsx
      Navbar.tsx
      ProjectSwitcher.tsx
      Footer.tsx
      Icon.tsx
      Reveal.tsx
      RevealGroup.tsx
      TiltCard.tsx
      HeroBackground.tsx
  main.tsx
  index.css
index.html
vite.config.ts
tailwind.config.ts
tsconfig.json
package.json
```

---

### Task 1: Project Scaffold (Vite + React + TS + Tailwind)

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/index.css`, `.gitignore`

**Interfaces:**
- Produces: a running Vite dev server rendering a placeholder `<div>Portfolio</div>` from `src/main.tsx`; Tailwind utility classes available in any `.tsx` file; CSS custom properties `--primary-navy`, `--brand-blue`, `--brand-blue-dark`, `--brand-accent`, `--brand-gold`, `--bg-canvas`, `--bg-surface`, `--bg-surface-alt`, `--text-heading`, `--text-body`, `--text-muted`, `--border-light`, `--border-strong` defined on `:root` and `:root.dark`, mapped into Tailwind via `@theme inline` in `src/index.css` (Tailwind v4 CSS-first config — no separate `tailwind.config.ts` needed).

- [ ] **Step 1: Scaffold the Vite project**

Confirm the directory only has the static HTML files/assets/docs first:

Run: `ls`

Then run: `npm create vite@latest . -- --template react-ts`
Then run: `npm install`

- [ ] **Step 2: Install additional dependencies**

Run: `npm install react-router-dom framer-motion`
Run: `npm install -D tailwindcss@latest @tailwindcss/vite`

- [ ] **Step 3: Confirm strict TypeScript is enabled**

The Vite React-TS template's generated `tsconfig.app.json` (referenced from `tsconfig.json`) already sets `"strict": true` by default — open it and confirm. If missing, add it explicitly:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This is a hard requirement (Global Constraints: no `any`, no implicit any) — every later task's TypeScript must type-check under this setting. Run `npx tsc --noEmit` at the end of every subsequent task as an implicit check, in addition to each task's explicit test/build steps.

- [ ] **Step 4: Configure the Tailwind Vite plugin**

Edit `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 5: Write `src/index.css` with the site's design tokens**

```css
@import "tailwindcss";

:root {
  --primary-navy: #051f16;
  --brand-blue: #18e299;
  --brand-blue-dark: #0c8c5e;
  --brand-accent: #f97316;
  --brand-gold: #ffd166;

  --bg-canvas: #eef2f7;
  --bg-surface: #ffffff;
  --bg-surface-alt: #f8fafc;

  --text-heading: #0f172a;
  --text-body: #334155;
  --text-muted: #64748b;

  --border-light: #e2e8f0;
  --border-strong: #cbd5e1;
}

:root.dark {
  --bg-canvas: #050505;
  --bg-surface: #0d0d0d;
  --bg-surface-alt: #171717;

  --text-heading: #fafafa;
  --text-body: #d4d4d4;
  --text-muted: #a3a3a3;

  --border-light: #262626;
  --border-strong: #404040;
}

@theme inline {
  --color-primary-navy: var(--primary-navy);
  --color-brand-blue: var(--brand-blue);
  --color-brand-blue-dark: var(--brand-blue-dark);
  --color-brand-accent: var(--brand-accent);
  --color-brand-gold: var(--brand-gold);
  --color-bg-canvas: var(--bg-canvas);
  --color-bg-surface: var(--bg-surface);
  --color-bg-surface-alt: var(--bg-surface-alt);
  --color-text-heading: var(--text-heading);
  --color-text-body: var(--text-body);
  --color-text-muted: var(--text-muted);
  --color-border-light: var(--border-light);
  --color-border-strong: var(--border-strong);
  --font-display: "Plus Jakarta Sans", "Inter", sans-serif;
}

@custom-variant dark (&:where(.dark, .dark *));

body {
  font-family: var(--font-display);
}
```

- [ ] **Step 6: Update `index.html`** with the Google Fonts link and the pre-paint theme-init inline script (fonts/meta copied verbatim from the original `index.html:6-13`; theme script mirrors `assets/js/theme-init.js` logic):

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jaymin Maheta — Senior UI Engineer | Portfolio</title>
    <meta name="description" content="Senior UI Engineer with 7+ years of experience building responsive, accessible and production-ready enterprise applications using Angular and React. With a strong foundation in UI/UX design, I specialise in transforming Figma designs into pixel-perfect interfaces while bridging the gap between design and engineering - across design systems, reusable component libraries, frontend architecture, accessibility and Angular modernisation." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <script>
      (function () {
        try {
          var stored = localStorage.getItem("theme");
          var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if (stored === "dark" || (!stored && prefersDark)) {
            document.documentElement.classList.add("dark");
          }
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write the placeholder `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>Portfolio</div>
  </StrictMode>
);
```

- [ ] **Step 8: Verify the dev server runs**

Run: `npm run dev`
Expected: server starts (typically `http://localhost:5173`); loading it shows "Portfolio" with no console errors. Stop the server after confirming.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json index.html src/main.tsx src/index.css .gitignore
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Theme System (`useTheme` + `ThemeToggle`)

**Files:**
- Create: `src/features/theme/useTheme.ts`, `src/features/theme/ThemeToggle.tsx`
- Test: `src/features/theme/useTheme.test.ts`

**Interfaces:**
- Consumes: nothing (no dependency on other tasks)
- Produces: `useTheme(): { isDark: boolean; toggle: () => void }` — hook other components (`ThemeToggle`, later `Navbar`) call. `ThemeToggle` is a self-contained `<button>` component with no required props.

- [ ] **Step 1: Install test tooling**

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`

Add to `vite.config.ts` (extends Task 1's config):

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

Add to `package.json` `scripts`: `"test": "vitest run"`

- [ ] **Step 2: Write the failing test**

Create `src/features/theme/useTheme.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light when no stored preference and no dark system preference", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("reads a stored dark preference on mount", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggle() flips isDark and persists to localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/features/theme/useTheme.test.ts`
Expected: FAIL — `useTheme` module not found.

- [ ] **Step 4: Implement `useTheme`**

Create `src/features/theme/useTheme.ts` (mirrors `assets/js/theme-init.js` + `assets/js/theme-toggle.js` logic, adapted to React state):

```ts
import { useCallback, useState } from "react";

function readInitialIsDark(): boolean {
  if (document.documentElement.classList.contains("dark")) return true;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(readInitialIsDark);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // ignore storage errors (private browsing, etc.)
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/features/theme/useTheme.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Implement `ThemeToggle`**, transcribing the exact button markup and both SVG icons from `compito.html:91-99` (identical across every page):

Create `src/features/theme/ThemeToggle.tsx`, with a small justified press affordance (communicates "this button was activated" on tap — the spec's motion-quality bar permits micro-interactions like this on interactive elements even though the original had none, as long as function/layout are unchanged):

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { toggle } = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt text-text-heading transition hover:border-brand-blue hover:text-brand-blue"
    >
      <svg className="hidden h-5 w-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
      </svg>
      <svg className="block h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </motion.button>
  );
}
```

Note: `ThemeToggle` calls `useTheme()` independently rather than taking props — since `useTheme`'s state is derived from `document.documentElement` + `localStorage` (shared mutable browser state, not React context), multiple instances stay in sync in practice because `readInitialIsDark` and the DOM class toggle are the source of truth. The Home navbar (Task 7) and case-study navbar (Task 6/3) each render their own `<ThemeToggle />`. The `whileTap` press-scale works identically on mouse click and touch tap (framer-motion normalizes both to its tap gesture), so this is one micro-interaction that needs no separate touch-vs-pointer branching, unlike `TiltCard`.

The className on the outer `<button>` in `index.html:75-83` (home navbar) omits `ml-1` — `Navbar` (Task 3) will handle that positional difference via its own wrapper, not by parameterizing `ThemeToggle`.

- [ ] **Step 7: Commit**

```bash
git add src/features/theme package.json vite.config.ts
git commit -m "feat: add theme toggle with localStorage persistence"
```

---

### Task 3: Shared Motion Primitives (`Reveal`, `RevealGroup`, `TiltCard`)

**Files:**
- Create: `src/shared/components/Reveal.tsx`, `src/shared/components/RevealGroup.tsx`, `src/shared/components/TiltCard.tsx`

**Interfaces:**
- Consumes: `framer-motion` (installed in Task 1)
- Produces:
  - `<Reveal direction="up" | "left" | "right" children>` — replaces `.reveal` / `.reveal-left` / `.reveal-right` classes + GSAP `ScrollTrigger` reveal from `assets/js/animations.js:22-50`.
  - `<RevealGroup children>` wrapping `<RevealItem>` children — replaces `.reveal-group` / `.reveal-item` staggered reveal from `assets/js/animations.js:53-64`.
  - `<TiltCard as="a" | "div" className href? children>` — replaces `.tilt-card` pointer-tilt from `assets/js/animations.js:67-87`.

These three replace GSAP+ScrollTrigger's class-driven system with framer-motion's `whileInView`. Original starting-state CSS (`assets/css/animations.css:7-32`: translateY(24px)/translateX(±28px), opacity 0) becomes framer-motion `initial`/`whileInView` variants instead of a stylesheet + JS pairing.

- [ ] **Step 1: Implement `Reveal`**

Create `src/shared/components/Reveal.tsx`:

```tsx
import { motion, useReducedMotion, type ReactNode } from "framer-motion";

const OFFSETS = {
  up: { y: 24, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
} as const;

interface RevealProps {
  direction?: keyof typeof OFFSETS;
  className?: string;
  children: ReactNode;
}

export function Reveal({ direction = "up", className, children }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Note: `amount: 0.15` approximates the original `start: "top 85%"` ScrollTrigger threshold (element considered in-view once ~15% has entered the viewport from the bottom).

- [ ] **Step 2: Implement `RevealGroup` with staggered children**

Create `src/shared/components/RevealGroup.tsx`:

```tsx
import { motion, useReducedMotion, type ReactNode } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
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
      viewport={{ once: true, amount: 0.12 }}
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
```

Note: `RevealItem` relies on inheriting `variants` from its parent `RevealGroup`'s `visible`/`hidden` state propagation (framer-motion's built-in variant propagation to children) — it does not need its own `initial`/`whileInView` props. Every place the original markup used `class="reveal-group"` containing `class="reveal-item"` children (e.g. `compito.html:132-165` metrics grid, `compito.html:280-305` contribution list) becomes `<RevealGroup>` wrapping `<RevealItem>` elements in the section components (Task 5).

- [ ] **Step 3: Implement `TiltCard`**, with a premium spring settle-back and a touch-appropriate press fallback for devices without fine pointer/hover support (per the spec's motion-quality bar — pointer-hover effects must not simply go inert on touch):

Create `src/shared/components/TiltCard.tsx`:

```tsx
import { motion, useMotionValue, useSpring, useReducedMotion, type ReactNode, type PointerEvent } from "framer-motion";
import { useState } from "react";

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
```

Note: this reimplements `assets/js/animations.js:67-87`'s `pointerenter`/`pointermove`/`pointerleave` GSAP tween using framer-motion's `useSpring` (a real spring simulation, not a tween approximation — this is the "premium, physically plausible" motion the spec's motion-quality bar calls for) driven by pointer position. `canTilt` is computed once via `useState(supportsHoverTilt)` (evaluated at mount, matching the device's actual pointer/hover capability) rather than a viewport-width breakpoint, since a large touchscreen and a small trackpad-driven window are both plausible and width alone would misclassify them. Devices that fail the `(hover: hover) and (pointer: fine)` check skip the tilt transform entirely and instead get a `whileTap` press-scale affordance, so tapping a project card still gives tactile feedback — this is the touch equivalent the spec's motion-quality bar requires, not a change to the card's function or content. Used only by `ProjectCard` (Task 7's home page project grid, originally `.tilt-card` on `compito.html`'s equivalent `index.html:157` `<a>` elements).

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, temporarily render a `<Reveal>`, `<RevealGroup>`/`<RevealItem>`, and `<TiltCard>` with placeholder content in `src/main.tsx`, scroll to trigger them, and confirm: reveal fades/slides in once when scrolled into view (not on every scroll), group children stagger, tilt card rotates following the pointer with a natural spring settle-back (no snap, no linear return) on a mouse/trackpad. Then switch devtools to touch/mobile emulation (or test on an actual touch device) and confirm the tilt transform doesn't apply and a brief press-scale plays on tap instead. Then revert `src/main.tsx` back to the Task 1 placeholder (these primitives get wired into real markup starting in Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/Reveal.tsx src/shared/components/RevealGroup.tsx src/shared/components/TiltCard.tsx
git commit -m "feat: add framer-motion reveal, stagger and tilt primitives"
```

---

### Task 4: `HeroBackground` (Canvas Replacement for three.js)

**Files:**
- Create: `src/shared/components/HeroBackground.tsx`

**Interfaces:**
- Consumes: nothing external (plain 2D canvas, no new dependency)
- Produces: `<HeroBackground />` — a self-contained component with no required props, rendered as the first child inside the hero banner `<div>` in `CaseStudyHero` (Task 5) and `HomeHero` (Task 7), replacing `<div id="hero-three-bg" class="pointer-events-none absolute inset-0 z-0" aria-hidden="true"></div>` (`compito.html:118`) plus `assets/js/hero-three-bg.js`.

This reimplements the flow-line visual (bundles of curved lines fanning from a corner, bright head → dark tail gradient, gentle undulation, primary bundle dominant + dimmer mirror bundle, pause off-screen, skip under reduced motion) using 2D canvas bezier curves instead of WebGL/three.js, per the spec's parity requirement: visually indistinguishable at normal viewing, not merely equivalent in spirit.

- [ ] **Step 1: Implement `HeroBackground`**

Create `src/shared/components/HeroBackground.tsx`, porting the math from `assets/js/hero-three-bg.js` (corner-anchored cubic-bezier bundles, per-point brightness ramp, sinusoidal sway, primary + secondary mirror bundle) to 2D canvas:

```tsx
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
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
```

- [ ] **Step 2: Manual verification against the original**

Run: `npm run dev`, temporarily render `<HeroBackground />` inside a `relative h-96 w-full bg-gradient-to-br from-primary-navy via-brand-blue-dark to-brand-blue` test container in `src/main.tsx`. Open `compito.html` directly in the browser (file:// or a static server) side by side. Compare: line density/fanning from the top-right corner, bright-head-to-dark-tail gradient direction, gentle undulation speed, left-to-right mask fade, glow. Confirm the canvas version pauses when scrolled out of view (check via browser performance/frame activity) and is empty when OS-level reduced-motion is enabled. Revert `src/main.tsx` to the Task 1 placeholder afterward.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/HeroBackground.tsx
git commit -m "feat: add canvas-based hero background replacing three.js"
```

---

### Task 5: `Icon`, `Layout`, `Navbar`, `ProjectSwitcher`, `Footer`

**Files:**
- Create: `src/shared/components/Icon.tsx`, `src/shared/components/Layout.tsx`, `src/shared/components/Navbar.tsx`, `src/shared/components/ProjectSwitcher.tsx`, `src/shared/components/Footer.tsx`

**Interfaces:**
- Consumes: `Reveal` is NOT used here — nav/hero entrance in the original is an immediate on-load stagger (`assets/js/animations.js:18-19`), not scroll-triggered, so `Navbar` gets its own mount-time `motion.div` animation, not `<Reveal>`.
- Produces:
  - `Icon`: `<Icon name={IconName} className? />` — a lookup component wrapping every distinct stroke-SVG path used across the site, so data files (Task 6) reference icons by name instead of embedding raw SVG.
  - `Layout`: `<Layout children>` — the outer rounded-card page shell (`compito.html:70` / `index.html:62`).
  - `Navbar`: `<Navbar shortName title subtitle homeHref logoHref switcher? />` — renders the logo, title block, and `ThemeToggle`; `switcher` is an optional `ReactNode` slot for `ProjectSwitcher` (present on case-study pages, absent on home).
  - `ProjectSwitcher`: `<ProjectSwitcher projects={CaseStudyMeta[]} activeSlug={string} />` — the pill nav between case studies (`compito.html:86-90`).
  - `Footer`: `<Footer />` — the simple home-page footer (`index.html:233-235`).

- [ ] **Step 1: Catalog every distinct icon and implement `Icon`**

Every SVG across all 6 pages was inspected; the complete set of distinct stroke-icon paths (by shape, not by name) is: `shield-check` (award/recognition ribbon), `mail`, `linkedin`, `download`, `map-pin`, `arrow-right` (chevron), `moon`, `sun`, `server` (database/multi-tenant), `boxes` (layers/module), `refresh-cw` (integrated/sync), `chevron-double-right` (fast/version), `layers` (blocks), `check-circle`, `alert-triangle`, `file-text` (document), `clock`, `bar-chart` (metrics/reports), `users`, `truck` (shipping), `calendar`, `warehouse`/`package` (box+flag), `flask`/`activity` (pathology, reuses `clock` path — see note), `credit-card` (billing/shopping cart icon reused from `truck`'s cart glyph — see note), `target` (circle/circle/circle — used for "My Contribution").

Rather than inventing separate names for visually-close reused shapes, `Icon` maps by the **exact path data**, one name per unique `<path>`/`<svg>` children combination actually found in the HTML. Create `src/shared/components/Icon.tsx`:

```tsx
export type IconName =
  | "shield-check"
  | "mail"
  | "linkedin"
  | "download"
  | "map-pin"
  | "arrow-right"
  | "server"
  | "layers-3d"
  | "refresh-cw"
  | "layers-flag"
  | "check-circle"
  | "alert-triangle"
  | "file-text"
  | "clock"
  | "bar-chart"
  | "users"
  | "cart"
  | "calendar"
  | "package"
  | "target";

interface IconProps {
  name: IconName;
  className?: string;
}

const PATHS: Record<IconName, string> = {
  "shield-check": '<circle cx="12" cy="8" r="6"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
  "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
  "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
  server: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  "layers-3d": '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
  "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>',
  "layers-flag": '<path d="M9 2h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"></path><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path><line x1="9" y1="12" x2="15" y2="12"></line><line x1="9" y1="16" x2="15" y2="16"></line>',
  "check-circle": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>',
  "alert-triangle": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
  "file-text": '<path d="M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18"></path><path d="M2 22h20"></path><path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M9 18h1M14 18h1"></path>',
  clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  "bar-chart": '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  cart: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  package: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
  target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
};

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
```

Note: `server`/`users` share identical path data (both were the same "team" glyph in the original markup at e.g. `bmc.html:136` and `valyxto.html:180`) — kept as two names since they're used in visually distinct contexts (multi-tenant metric vs. sales-order flow step) and a future admin panel/content author should be able to pick by semantic name, not realize two names are pixel-identical. Additional icons discovered while transcribing FarmGate/Valyxto/BMC/Rota data files (Tasks 10-13) that don't already have a name in `PATHS` must be added here in that task, not invented ad hoc in a data file — data files only ever reference `IconName` string literals.

Using `dangerouslySetInnerHTML` here is safe: all path strings are hardcoded string literals authored in this file, not user input or remote data.

- [ ] **Step 2: Implement `Layout`**, transcribing the outer shell from `compito.html:69-70` / `index.html:61-62` (identical across every page):

Create `src/shared/components/Layout.tsx`:

```tsx
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-bg-canvas px-0 py-0 font-display text-text-body antialiased transition-colors duration-300 sm:px-4 sm:py-10">
      <div className="relative w-full max-w-[1440px] overflow-hidden bg-bg-surface shadow-2xl shadow-slate-900/10 ring-1 ring-border-light transition-colors duration-300 dark:shadow-black/50 sm:rounded-3xl">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Implement `ProjectSwitcher`**, transcribing the pill nav from `compito.html:85-90`:

Create `src/shared/components/ProjectSwitcher.tsx`:

```tsx
import { Link } from "react-router-dom";
import type { CaseStudyMeta } from "../../features/case-studies/types";

interface ProjectSwitcherProps {
  projects: CaseStudyMeta[];
  activeSlug: string;
}

export function ProjectSwitcher({ projects, activeSlug }: ProjectSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {projects.map((project) =>
        project.slug === activeSlug ? (
          <span
            key={project.slug}
            className="rounded-full bg-brand-blue px-4 py-1.5 text-[13px] font-bold text-white shadow-md shadow-brand-blue/30"
          >
            {project.navLabel}
          </span>
        ) : (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-1.5 text-[13px] font-bold text-text-body transition hover:border-brand-blue hover:text-brand-blue"
          >
            {project.navLabel}
          </Link>
        )
      )}
    </div>
  );
}
```

Note: the original hardcodes exactly 5 sibling links per page, in a fixed order (Compito, FarmGate, Valyxto, BMC, Rota), always excluding the current page. This component reproduces that by mapping over the full `projects` list (from `repository.getAllCaseStudies()`, called by whoever renders `Navbar`) and rendering the active one as a `<span>` instead of a link — same visual result, but works for any project list length/order the future admin panel produces.

- [ ] **Step 4: Implement `Navbar`**, transcribing structure from `compito.html:72-101` (case-study variant, includes `ProjectSwitcher`) and `index.html:64-84` (home variant, no switcher, includes tagline text instead of a `Portfolio · ... →` link):

Create `src/shared/components/Navbar.tsx`:

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

interface NavbarProps {
  shortName: string;
  eyebrow: string;
  title: string;
  homeLink?: { href: string; label: string };
  switcher?: ReactNode;
}

export function Navbar({ shortName, eyebrow, title, homeLink, switcher }: NavbarProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col gap-5 border-b-2 border-border-light bg-bg-surface px-6 py-6 transition-colors duration-300 sm:px-10 md:flex-row md:items-center md:justify-between md:px-16 md:py-8 lg:px-20"
    >
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-base font-extrabold text-white shadow-lg shadow-brand-blue/25"
        >
          {shortName}
        </Link>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-blue">{eyebrow}</p>
          <p className="text-lg font-extrabold leading-tight text-text-heading">{title}</p>
          {homeLink && (
            <Link to={homeLink.href} className="text-[11.5px] font-semibold text-text-muted transition hover:text-brand-blue">
              {homeLink.label}
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {switcher}
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
```

Note: the home page (`index.html:75-83`) doesn't wrap its `ThemeToggle` in an extra flex container with a switcher — it's the only child. Passing `switcher={undefined}` on the home page naturally renders just `<ThemeToggle />` inside the `flex flex-wrap` div, matching `index.html`'s layout (a single button, right-aligned) without a separate variant. The home page's logo (`index.html:66-69`) is a plain `<div>` not wrapped in a `<Link>` since it's already on the home page — `Navbar` always wraps the logo in `<Link to="/">`, which is a harmless self-link on the home page and functionally identical (no visible difference, same as clicking a logo that's already "home" on most sites).

- [ ] **Step 5: Implement `Footer`**, transcribing `index.html:233-235`:

Create `src/shared/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <div className="border-t-2 border-border-light px-6 py-8 text-center text-[13px] font-semibold text-text-muted sm:px-10 md:px-16 lg:px-20">
      Jaymin Maheta &middot; Senior UI Engineer &middot; Augmented Tech Labs
    </div>
  );
}
```

- [ ] **Step 6: Manual verification**

Run: `npm run dev`, temporarily compose `<Layout><Navbar shortName="Co" eyebrow="Project Case Study" title="Compito" homeLink={{ href: "/", label: "Portfolio · Jaymin Maheta →" }} switcher={<div>switcher placeholder</div>} /><Footer /></Layout>` in `src/main.tsx` (routing isn't wired yet, so `Link` components render but navigation won't work until Task 8 — that's fine, only visual layout is being checked here). Compare against `compito.html`'s navbar/footer rendering in both light and dark mode (toggle via the `ThemeToggle` button). Revert `src/main.tsx` afterward.

- [ ] **Step 7: Commit**

```bash
git add src/shared/components/Icon.tsx src/shared/components/Layout.tsx src/shared/components/Navbar.tsx src/shared/components/ProjectSwitcher.tsx src/shared/components/Footer.tsx
git commit -m "feat: add Icon, Layout, Navbar, ProjectSwitcher and Footer shared components"
```

---

### Task 6: Case-Study Types and Repository

**Files:**
- Create: `src/features/case-studies/types.ts`, `src/features/case-studies/repository.ts`
- Test: `src/features/case-studies/repository.test.ts`

**Interfaces:**
- Consumes: `IconName` from `src/shared/components/Icon.tsx` (Task 5)
- Produces: every type Task 7 (section components) and Task 8+ (data files) depend on, plus `getAllCaseStudies(): CaseStudyMeta[]` and `getCaseStudyBySlug(slug: string): CaseStudyData | undefined` — the only functions any component may use to read case-study content.

- [ ] **Step 1: Write `types.ts`**

Create `src/features/case-studies/types.ts`:

```ts
import type { IconName } from "../../shared/components/Icon";

export interface CaseStudyMeta {
  slug: string;
  shortName: string;
  navLabel: string;
  title: string;
  accentFrom: string;
  accentTo: string;
  industry: string;
  stack: string;
  role: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface MetricCard {
  icon: IconName;
  gradientFrom: string;
  gradientTo: string;
  value: string;
  description: string;
}

export interface FlowStep {
  icon: IconName;
  iconGradientFrom: string;
  iconGradientTo: string;
  title: string;
  subtitle: string;
  connectorLabel?: string;
  connectorColor?: "blue" | "emerald";
  highlighted?: boolean;
}

export interface InfoPanel {
  icon: IconName;
  title: string;
  paragraphs: string[];
}

export interface ChallengePanel {
  icon: IconName;
  title: string;
  emphasisParagraph: string;
  paragraphs: string[];
}

export interface ContributionItem {
  text: string;
}

export interface OutcomesContent {
  challenges: string[];
  outcomesIntro: string;
  outcomes: string[];
  summary: string;
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface TechStackCard {
  badge: string;
  category: string;
  name: string;
  description: string;
  accent: "sky" | "orange" | "emerald" | "violet";
}

export interface SnapshotContent {
  fields: { label: string; value: string }[];
  capabilities: string[];
}

export interface CaseStudyData {
  meta: CaseStudyMeta;
  hero: HeroContent;
  metrics: MetricCard[];
  flowTitle: string;
  flowSubtitle: string;
  flow: FlowStep[];
  about: InfoPanel;
  challenge: ChallengePanel;
  contributionPlaceholder?: string;
  contribution: ContributionItem[];
  outcomes: OutcomesContent;
  approachIntro: string;
  approach: ApproachStep[];
  techStack: TechStackCard[];
  snapshot: SnapshotContent;
}
```

Note on `contributionPlaceholder`: the FarmGate source (`farmgate.html:269-271`) has a placeholder note instead of real contribution bullets ("This project isn't listed on the resume I was given..."). To transcribe it verbatim (required by the parity constraint) without inventing content, `CaseStudyData` supports an optional `contributionPlaceholder` string; when present, `ContributionCard` (Task 7) renders that text in the dashed-border placeholder box instead of mapping `contribution` items. FarmGate's data file (Task 10) sets `contributionPlaceholder` and leaves `contribution: []`; all other projects set `contributionPlaceholder: undefined` and populate `contribution` normally.

Note on `OutcomesContent.summary`: this is the full-width highlighted quote block below the two-column challenges/outcomes grid (e.g. `compito.html:391-393`), present identically in every case study.

- [ ] **Step 2: Write the failing repository test**

Create `src/features/case-studies/repository.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getAllCaseStudies, getCaseStudyBySlug } from "./repository";

describe("case-studies repository", () => {
  it("getAllCaseStudies returns a non-empty list of case study metadata", () => {
    const all = getAllCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toHaveProperty("slug");
    expect(all[0]).toHaveProperty("navLabel");
  });

  it("getCaseStudyBySlug returns full data for a known slug", () => {
    const all = getAllCaseStudies();
    const knownSlug = all[0].slug;
    const data = getCaseStudyBySlug(knownSlug);
    expect(data).toBeDefined();
    expect(data?.meta.slug).toBe(knownSlug);
  });

  it("getCaseStudyBySlug returns undefined for an unknown slug", () => {
    const data = getCaseStudyBySlug("not-a-real-project-slug");
    expect(data).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/features/case-studies/repository.test.ts`
Expected: FAIL — `repository` module not found (and `data/index.ts` doesn't exist yet either).

- [ ] **Step 4: Create a minimal `data/index.ts` placeholder and implement `repository.ts`**

Create `src/features/case-studies/data/index.ts` (real project entries are added in Tasks 8, 10, 11, 12, 13 — this task only needs the map to exist and be importable):

```ts
import type { CaseStudyData } from "../types";

export const caseStudies: Record<string, CaseStudyData> = {};
```

Create `src/features/case-studies/repository.ts`:

```ts
import { caseStudies } from "./data";
import type { CaseStudyData, CaseStudyMeta } from "./types";

export function getAllCaseStudies(): CaseStudyMeta[] {
  return Object.values(caseStudies).map((entry) => entry.meta);
}

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudies[slug];
}
```

This is the seam the spec calls out: today it's a synchronous in-memory lookup, but every consumer (components, `CaseStudyPage`, `ProjectGrid`) only ever imports from `repository.ts`. When a future admin panel replaces the static data with an API, only `data/index.ts` and `repository.ts` change — call sites don't.

- [ ] **Step 5: Run test to verify it fails for a different reason (empty data)**

Run: `npx vitest run src/features/case-studies/repository.test.ts`
Expected: FAIL on tests 1 and 2 — `all.length` is 0 since `caseStudies` is empty; this is expected at this point in the plan, since Task 8 is what populates the first real entry (Compito). This test file gets re-verified as PASS once Task 8 adds data.

- [ ] **Step 6: Commit**

```bash
git add src/features/case-studies/types.ts src/features/case-studies/repository.ts src/features/case-studies/repository.test.ts src/features/case-studies/data/index.ts
git commit -m "feat: add case-study types and repository seam"
```

---

### Task 7: Case-Study Section Components

**Files:**
- Create: `src/features/case-studies/components/CaseStudyHero.tsx`, `MetaBadges.tsx`, `MetricsGrid.tsx`, `FlowDiagram.tsx`, `InfoCard.tsx`, `ContributionCard.tsx`, `OutcomesSection.tsx`, `ApproachSteps.tsx`, `TechStackGrid.tsx`, `SnapshotFooter.tsx`

**Interfaces:**
- Consumes: all types from `src/features/case-studies/types.ts` (Task 6); `Icon` (Task 5); `Reveal`/`RevealGroup`/`RevealItem` (Task 3); `HeroBackground` (Task 4).
- Produces: 10 presentational components, each taking a typed slice of `CaseStudyData` as props, composed together by `CaseStudyPage` in Task 8. None of these import from `repository.ts` or `data/*.ts` directly — they only take props.

- [ ] **Step 1: `MetaBadges`**, transcribing `compito.html:103-114`:

Create `src/features/case-studies/components/MetaBadges.tsx`:

```tsx
import type { CaseStudyMeta } from "../types";

export function MetaBadges({ meta }: { meta: CaseStudyMeta }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-3 border-b border-border-light bg-bg-surface px-6 py-5 transition-colors duration-300 sm:px-10 md:px-16 lg:px-20">
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-accent"></span>Industry: {meta.industry}
      </div>
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"></span>Stack: {meta.stack}
      </div>
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>My Role: {meta.role}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: `CaseStudyHero`**, transcribing `compito.html:116-128`:

Create `src/features/case-studies/components/CaseStudyHero.tsx`:

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "../../../shared/components/HeroBackground";
import type { HeroContent } from "../types";

export function CaseStudyHero({ hero }: { hero: HeroContent }) {
  const reduceMotion = useReducedMotion();
  const heroTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-brand-blue-dark to-brand-blue px-6 pb-24 pt-12 text-white transition-colors duration-300 dark:from-black dark:via-neutral-950 dark:to-neutral-900 sm:px-10 md:px-16 md:pb-28 md:pt-16 lg:px-20 lg:pb-[110px] lg:pt-[70px]">
      <HeroBackground />
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.1 }}
        className="relative z-10 mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffd166] backdrop-blur"
      >
        {hero.eyebrow}
      </motion.span>
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.18 }}
        className="relative z-10 max-w-4xl text-[26px] font-extrabold leading-[1.2] tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]"
      >
        {hero.heading}
      </motion.h1>
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...heroTransition, delay: 0.26 }}
        className="relative z-10 mt-5 max-w-2xl text-[15px] font-medium leading-relaxed text-white/80 sm:text-base"
      >
        {hero.subheading}
      </motion.p>
    </div>
  );
}
```

Note: the original's `.hero-reveal` elements animate in immediately on load with an 0.08s stagger via GSAP (`assets/js/animations.js:19`). Here each element gets an explicit incrementing `delay` (0.1/0.18/0.26 — 0.08 apart) on mount-time `animate`, reproducing the same staggered feel without a stagger-orchestration library.

- [ ] **Step 3: `MetricsGrid`**, transcribing `compito.html:130-166` (the 4-card overlapping-hero grid):

Create `src/features/case-studies/components/MetricsGrid.tsx`:

```tsx
import { Icon } from "../../../shared/components/Icon";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { MetricCard } from "../types";

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="relative z-10 px-4 -mt-14 sm:px-8 md:-mt-16 md:px-14 lg:px-20">
      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {metrics.map((metric, i) => (
          <RevealItem
            key={i}
            className="relative overflow-hidden rounded-2xl border-2 border-border-light bg-bg-surface p-6 shadow-xl shadow-slate-900/10 dark:shadow-black/30"
          >
            <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-${metric.gradientFrom} to-${metric.gradientTo}`}></span>
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${metric.gradientFrom} to-${metric.gradientTo} text-white shadow-lg`}>
              <Icon name={metric.icon} className="h-6 w-6" />
            </div>
            <div className="mb-2 break-words text-[22px] font-extrabold leading-tight text-text-heading sm:text-[26px]">{metric.value}</div>
            <div className="text-sm font-semibold leading-relaxed text-text-muted">{metric.description}</div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
```

**Important — Tailwind dynamic class names:** `from-${metric.gradientFrom}` and `to-${metric.gradientTo}` are template-literal-constructed Tailwind classes. Tailwind's JIT compiler cannot detect classes assembled at runtime from variables — it only picks up classes it can find as complete strings in source. Since `gradientFrom`/`gradientTo` values are a small fixed set (`sky-500`/`blue-600`, `orange-500`/`amber-600`, `emerald-500`/`emerald-600`, `violet-500`/`purple-600` — the 4 recurring metric-card color pairs used across every case study), add a `src/features/case-studies/tailwind-safelist.ts` file listing every literal class string these dynamic templates can produce, and reference it from a comment so the classes aren't purged:

Create `src/features/case-studies/tailwind-safelist.ts`:

```ts
// Not imported anywhere at runtime — exists so Tailwind's content scanner
// finds these literal class strings and never purges them, since MetricsGrid,
// FlowDiagram and TechStackGrid build class names from data-driven template
// literals that the scanner can't statically resolve.
export const TAILWIND_SAFELIST = `
  from-sky-500 to-blue-600
  from-orange-500 to-amber-600
  from-emerald-500 to-emerald-600
  from-violet-500 to-purple-600
  from-slate-700 to-slate-900
  border-t-sky-500 border-t-orange-500 border-t-emerald-500 border-t-violet-500
  bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300
  bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300
  bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300
  bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300
  stroke-brand-blue stroke-emerald-500
  text-brand-blue-dark text-emerald-600 dark:text-emerald-400
`;
```

Import this file (for its side effect of existing in the source tree, not for any value it exports) from `src/main.tsx` with `import "./features/case-studies/tailwind-safelist";` so Vite includes it in the build and Tailwind's scanner sees it — this is done in Task 8 once `main.tsx` is rewritten for real.

- [ ] **Step 4: `FlowDiagram`**, transcribing `compito.html:171-234` (the 6-step architecture diagram with 5 connectors):

Create `src/features/case-studies/components/FlowDiagram.tsx`:

```tsx
import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { FlowStep } from "../types";

export function FlowDiagram({ title, subtitle, steps }: { title: string; subtitle: string; steps: FlowStep[] }) {
  return (
    <Reveal className="mb-16 rounded-3xl border-2 border-border-strong bg-bg-surface p-6 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-8 md:mb-20 md:p-12">
      <div className="mb-8 text-center md:mb-10">
        <h3 className="text-xl font-extrabold text-text-heading md:text-2xl">{title}</h3>
        <p className="mt-1.5 text-sm font-medium text-text-muted md:text-[14.5px]">{subtitle}</p>
      </div>
      <RevealGroup className="flex flex-col items-stretch gap-1 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        {steps.map((step, i) => (
          <RevealItem key={i} className={i % 2 === 0 ? undefined : "contents"}>
            {i % 2 === 1 && (
              <div className="flex shrink-0 flex-col items-center justify-center px-0 py-2 xl:px-1 xl:py-0">
                <span
                  className={`mb-1.5 whitespace-nowrap rounded-full border border-border-strong bg-bg-surface-alt px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide xl:px-1.5 xl:text-[8.5px] ${
                    step.connectorColor === "emerald" ? "text-emerald-600 dark:text-emerald-400" : "text-brand-blue-dark"
                  }`}
                >
                  {step.connectorLabel}
                </span>
                <svg
                  className={`hidden h-5 w-12 xl:block ${step.connectorColor === "emerald" ? "stroke-emerald-500" : "stroke-brand-blue"}`}
                  viewBox="0 0 100 20"
                  fill="none"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                >
                  <path d="M0 10 H90 M80 3 L95 10 L80 17"></path>
                </svg>
                <svg
                  className={`h-8 w-6 xl:hidden ${step.connectorColor === "emerald" ? "stroke-emerald-500" : "stroke-brand-blue"}`}
                  viewBox="0 0 20 40"
                  fill="none"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                >
                  <path d="M10 0 V32 M3 24 L10 37 L17 24"></path>
                </svg>
              </div>
            )}
            {i % 2 === 0 && (
              <div
                className={`relative z-10 flex flex-col items-center rounded-2xl border-2 p-4 text-center shadow-lg shadow-slate-900/10 xl:w-[138px] xl:flex-none xl:p-3.5 ${
                  step.highlighted
                    ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-950/20"
                    : "border-border-strong bg-bg-surface"
                }`}
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${step.iconGradientFrom} to-${step.iconGradientTo} text-white shadow-lg xl:h-11 xl:w-11`}
                >
                  <Icon name={step.icon} className="h-5 w-5 xl:h-[18px] xl:w-[18px]" />
                </div>
                <h5 className="mb-1 text-[14px] font-extrabold leading-snug text-text-heading xl:text-[12.5px]">{step.title}</h5>
                <span className="text-[11.5px] font-semibold leading-snug text-text-muted xl:text-[10px]">{step.subtitle}</span>
              </div>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
```

Note: the original alternates step-card / connector / step-card / connector / ... as flat siblings inside one `.reveal-group` (`compito.html:177-233`), each independently a `.reveal-item`. `FlowStep[]` in `types.ts` models one entry per **step card only** (6 entries for the 6-step flows seen in every case study), with `connectorLabel`/`connectorColor` living on the step that the connector visually follows (i.e., step `i`'s connector renders the arrow leading to step `i+1`). This component renders each `FlowStep` as a step-card `RevealItem`, and injects a connector `RevealItem` immediately after every non-last step — reproducing the original's flat alternating structure while giving each data entry one clear owner (the step it's attached to) rather than needing separate step/connector arrays kept in sync. The `i % 2` branching above is a **placeholder structure to replace**: the real implementation must render exactly one step card per `steps[i]` plus one connector after each step except the last (`i < steps.length - 1`), not literally alternate on even/odd index — rewrite this component's `RevealGroup` children as:

```tsx
      <RevealGroup className="flex flex-col items-stretch gap-1 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        {steps.map((step, i) => (
          <>
            <RevealItem
              key={`step-${i}`}
              className={`relative z-10 flex flex-col items-center rounded-2xl border-2 p-4 text-center shadow-lg shadow-slate-900/10 xl:w-[138px] xl:flex-none xl:p-3.5 ${
                step.highlighted
                  ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-950/20"
                  : "border-border-strong bg-bg-surface"
              }`}
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${step.iconGradientFrom} to-${step.iconGradientTo} text-white shadow-lg xl:h-11 xl:w-11`}>
                <Icon name={step.icon} className="h-5 w-5 xl:h-[18px] xl:w-[18px]" />
              </div>
              <h5 className="mb-1 text-[14px] font-extrabold leading-snug text-text-heading xl:text-[12.5px]">{step.title}</h5>
              <span className="text-[11.5px] font-semibold leading-snug text-text-muted xl:text-[10px]">{step.subtitle}</span>
            </RevealItem>
            {i < steps.length - 1 && step.connectorLabel && (
              <RevealItem key={`connector-${i}`} className="flex shrink-0 flex-col items-center justify-center px-0 py-2 xl:px-1 xl:py-0">
                <span
                  className={`mb-1.5 whitespace-nowrap rounded-full border border-border-strong bg-bg-surface-alt px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide xl:px-1.5 xl:text-[8.5px] ${
                    step.connectorColor === "emerald" ? "text-emerald-600 dark:text-emerald-400" : "text-brand-blue-dark"
                  }`}
                >
                  {step.connectorLabel}
                </span>
                <svg className={`hidden h-5 w-12 xl:block ${step.connectorColor === "emerald" ? "stroke-emerald-500" : "stroke-brand-blue"}`} viewBox="0 0 100 20" fill="none" strokeWidth="2.5" strokeDasharray="5 4">
                  <path d="M0 10 H90 M80 3 L95 10 L80 17"></path>
                </svg>
                <svg className={`h-8 w-6 xl:hidden ${step.connectorColor === "emerald" ? "stroke-emerald-500" : "stroke-brand-blue"}`} viewBox="0 0 20 40" fill="none" strokeWidth="2.5" strokeDasharray="5 4">
                  <path d="M10 0 V32 M3 24 L10 37 L17 24"></path>
                </svg>
              </RevealItem>
            )}
          </>
        ))}
      </RevealGroup>
```

(React requires a `key` on the outer fragment too when mapping — use `<Fragment key={i}>...</Fragment>` from `"react"` instead of the shorthand `<>` here.) Use this corrected version as the actual step-rendering block in the file; discard the `i % 2` draft above — it was shown only to establish the problem, not as code to ship.

- [ ] **Step 5: `InfoCard`**, transcribing the "About the Product" / "Challenge" pair (`compito.html:237-262`):

Create `src/features/case-studies/components/InfoCard.tsx`:

```tsx
import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import type { ChallengePanel, InfoPanel } from "../types";

export function AboutCard({ about }: { about: InfoPanel }) {
  return (
    <Reveal direction="left" className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-bg-surface p-7 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-9">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-blue"></div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/20">
          <Icon name={about.icon} className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-extrabold text-text-heading sm:text-2xl">{about.title}</h3>
      </div>
      {about.paragraphs.map((p, i) => (
        <p key={i} className="mb-4 text-[15px] leading-relaxed text-text-body last:mb-0">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

export function ChallengeCard({ challenge }: { challenge: ChallengePanel }) {
  return (
    <Reveal
      direction="right"
      className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-orange-50 to-bg-surface p-7 shadow-xl shadow-orange-900/5 transition-colors duration-300 dark:from-orange-950/20 dark:to-bg-surface sm:p-9"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-accent"></div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-orange-600 text-white shadow-lg shadow-orange-500/20">
          <Icon name={challenge.icon} className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-extrabold text-text-heading sm:text-2xl">{challenge.title}</h3>
      </div>
      <p className="mb-4 text-[15px] font-semibold leading-relaxed text-orange-900 dark:text-orange-200">{challenge.emphasisParagraph}</p>
      {challenge.paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-text-body">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

export function AboutAndChallenge({ about, challenge }: { about: InfoPanel; challenge: ChallengePanel }) {
  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:mb-20 lg:grid-cols-[2fr_1fr] lg:gap-8">
      <AboutCard about={about} />
      <ChallengeCard challenge={challenge} />
    </div>
  );
}
```

- [ ] **Step 6: `ContributionCard`**, transcribing `compito.html:264-307` (and handling the FarmGate placeholder case from `farmgate.html:269-271`):

Create `src/features/case-studies/components/ContributionCard.tsx`:

```tsx
import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { ContributionItem } from "../types";

interface ContributionCardProps {
  role: string;
  items: ContributionItem[];
  placeholder?: string;
}

export function ContributionCard({ role, items, placeholder }: ContributionCardProps) {
  return (
    <div className="mb-16 md:mb-20">
      <Reveal className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-sky-50 to-bg-surface p-7 shadow-xl shadow-sky-900/5 transition-colors duration-300 dark:from-sky-950/20 dark:to-bg-surface sm:p-9">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-blue"></div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/20">
              <Icon name="target" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">My Contribution</p>
              <h3 className="text-xl font-extrabold text-text-heading sm:text-2xl">Jaymin Maheta</h3>
            </div>
          </div>
          <span className="rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-1.5 text-[13px] font-bold text-text-body">{role}</span>
        </div>
        {placeholder ? (
          <div className="rounded-xl border-2 border-dashed border-border-strong bg-bg-surface-alt/60 p-6 text-center text-[13.5px] font-semibold leading-relaxed text-text-muted sm:col-span-2">
            {placeholder}
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <RevealItem
                key={i}
                className="relative rounded-xl border border-border-light bg-bg-surface/70 py-3 pl-9 pr-4 text-[14.5px] font-medium leading-relaxed text-text-body"
              >
                <span className="absolute left-3 top-3.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-blue text-[10px] font-black text-white">✓</span>
                {item.text}
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 7: `OutcomesSection`**, transcribing `compito.html:309-394` (challenges list, outcomes list, summary banner):

Create `src/features/case-studies/components/OutcomesSection.tsx`:

```tsx
import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { OutcomesContent } from "../types";

export function OutcomesSection({ outcomes }: { outcomes: OutcomesContent }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Impact Analysis</p>
        <h2 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Key Challenges &amp; Outcomes</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal direction="left" className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-bg-surface p-7 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-9">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-red-500"></div>
          <div className="mb-6 flex items-center gap-4 border-b-2 border-bg-surface-alt pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-red-300 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              <Icon name="alert-triangle" className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-extrabold text-text-heading sm:text-xl">Key Challenges Included</h4>
          </div>
          <RevealGroup className="space-y-4">
            {outcomes.challenges.map((text, i) => (
              <RevealItem key={i} className="relative pl-9 text-[15px] font-medium leading-relaxed text-text-body">
                <span className="absolute left-0 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-orange-50 text-base font-black text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                  &bull;
                </span>
                {text}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          direction="right"
          className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-emerald-50 to-bg-surface p-7 shadow-xl shadow-emerald-900/10 transition-colors duration-300 dark:from-emerald-950/20 dark:to-bg-surface sm:p-9"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-emerald-500"></div>
          <div className="mb-6 flex items-center gap-4 border-b-2 border-bg-surface-alt pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-emerald-300 bg-emerald-100 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              <Icon name="check-circle" className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-extrabold text-text-heading sm:text-xl">Outcomes Delivered</h4>
          </div>
          <p className="mb-4 text-[14.5px] font-semibold text-text-muted">{outcomes.outcomesIntro}</p>
          <RevealGroup className="space-y-4">
            {outcomes.outcomes.map((text, i) => (
              <RevealItem key={i} className="relative pl-9 text-[15px] font-medium leading-relaxed text-text-body">
                <span className="absolute left-0 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                  ✓
                </span>
                {text}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>

      <Reveal className="mt-8 rounded-r-2xl border-y-[1.5px] border-r-[1.5px] border-l-[6px] border-border-strong border-l-brand-blue bg-gradient-to-br from-sky-50 to-blue-50 p-6 text-[15px] font-semibold leading-relaxed text-text-heading shadow-lg shadow-sky-900/5 transition-colors duration-300 dark:from-sky-950/30 dark:to-blue-950/20 sm:p-8 sm:text-base">
        {outcomes.summary}
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 8: `ApproachSteps`**, transcribing `compito.html:396-430` (5-step numbered methodology):

Create `src/features/case-studies/components/ApproachSteps.tsx`:

```tsx
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { ApproachStep } from "../types";

export function ApproachSteps({ intro, steps }: { intro: string; steps: ApproachStep[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Methodology</p>
        <h2 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Our Approach</h2>
      </div>
      <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-text-muted sm:text-base md:mb-10">{intro}</p>
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <RevealItem
            key={i}
            className="flex flex-col rounded-2xl border-2 border-border-strong border-t-[5px] border-t-brand-blue bg-bg-surface p-6 shadow-xl shadow-slate-900/5"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-lg font-extrabold text-white shadow-lg shadow-brand-blue/30">
              {i + 1}
            </div>
            <h5 className="mb-3 text-[15px] font-extrabold leading-snug text-text-heading">{step.title}</h5>
            <p className="text-[13.5px] leading-relaxed text-text-body">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
```

- [ ] **Step 9: `TechStackGrid`**, transcribing `compito.html:432-472`:

Create `src/features/case-studies/components/TechStackGrid.tsx`:

```tsx
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { TechStackCard } from "../types";

const ACCENT_CLASSES: Record<TechStackCard["accent"], { border: string; gradient: string; badgeBg: string }> = {
  sky: { border: "border-t-sky-500", gradient: "from-sky-500 to-blue-600", badgeBg: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  orange: { border: "border-t-orange-500", gradient: "from-orange-500 to-amber-600", badgeBg: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  emerald: { border: "border-t-emerald-500", gradient: "from-emerald-500 to-teal-600", badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  violet: { border: "border-t-violet-500", gradient: "from-violet-500 to-purple-600", badgeBg: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
};

export function TechStackGrid({ items }: { items: TechStackCard[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Core Infrastructure</p>
        <h2 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Technology Stack</h2>
      </div>
      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const accent = ACCENT_CLASSES[item.accent];
          return (
            <RevealItem
              key={i}
              className={`relative flex flex-col items-center rounded-[20px] border-2 border-border-strong ${accent.border} border-t-[6px] bg-bg-surface px-6 pb-7 pt-11 text-center shadow-xl shadow-slate-900/5`}
            >
              <div className={`absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-lg font-extrabold text-white shadow-lg ring-4 ring-bg-surface`}>
                {item.badge}
              </div>
              <span className={`mb-3 mt-2 inline-block rounded-full ${accent.badgeBg} px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wide`}>{item.category}</span>
              <h5 className="mb-3 text-lg font-extrabold text-text-heading">{item.name}</h5>
              <p className="text-[13.5px] leading-relaxed text-text-body">{item.description}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
```

Note: `TechStackGrid` uses a fixed `ACCENT_CLASSES` lookup (not a raw template literal like `MetricsGrid`/`FlowDiagram`) because the border/gradient/badge combination per accent is a 3-part fixed bundle — this keeps every literal Tailwind class string directly in source for the JIT scanner to find, no safelist entry needed for this component specifically (though the classes overlap with ones already in the Task 7 Step 3 safelist, which is harmless).

- [ ] **Step 10: `SnapshotFooter`**, transcribing `compito.html:474-526`:

Create `src/features/case-studies/components/SnapshotFooter.tsx`:

```tsx
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { SnapshotContent } from "../types";

export function SnapshotFooter({ snapshot }: { snapshot: SnapshotContent }) {
  return (
    <Reveal className="grid grid-cols-1 gap-8 rounded-[20px] bg-gradient-to-br from-primary-navy to-slate-800 p-7 text-white sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:p-12">
      <div>
        <h4 className="mb-6 text-[15px] font-extrabold uppercase tracking-wider text-[#ffd166] sm:text-base">Project Snapshot</h4>
        <RevealGroup className="flex flex-col gap-4">
          {snapshot.fields.map((field, i) => (
            <RevealItem key={i} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{field.label}</span>
              <span className="text-[14.5px] font-semibold text-slate-50">{field.value}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <div>
        <h4 className="mb-6 text-[15px] font-extrabold uppercase tracking-wider text-[#ffd166] sm:text-base">Capabilities Delivered</h4>
        <RevealGroup className="flex flex-wrap gap-3">
          {snapshot.capabilities.map((cap, i) => (
            <RevealItem key={i} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13.5px] font-semibold text-slate-100">
              <span className="font-extrabold text-brand-accent">✓</span>
              {cap}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 11: Commit**

```bash
git add src/features/case-studies/components src/features/case-studies/tailwind-safelist.ts
git commit -m "feat: add case-study section components"
```

---

### Task 8: Compito Data File, `CaseStudyPage`, and Routing

**Files:**
- Create: `src/features/case-studies/data/compito.ts`, `src/features/case-studies/pages/CaseStudyPage.tsx`, `src/features/case-studies/pages/NotFoundPage.tsx`, `src/app/routes.tsx`, `src/app/App.tsx`
- Modify: `src/features/case-studies/data/index.ts` (add the Compito entry), `src/main.tsx` (real render tree replaces the Task 1 placeholder), `src/shared/components/Icon.tsx` (add any icon discovered while transcribing that Task 5's inventory missed)

**Interfaces:**
- Consumes: `CaseStudyData` (Task 6), all section components (Task 7), `Layout`/`Navbar`/`ProjectSwitcher`/`Footer` (Task 5), `getAllCaseStudies`/`getCaseStudyBySlug` (Task 6)
- Produces: the first fully working page in the app, proving the whole pattern end to end — every subsequent case-study task (10-13) only adds a data file, no new components or wiring.

- [ ] **Step 1: Transcribe Compito into `data/compito.ts`**, reading every field from `compito.html` (already fully read earlier in this session — lines cited below):

Create `src/features/case-studies/data/compito.ts`:

```ts
import type { CaseStudyData } from "../types";

export const compito: CaseStudyData = {
  meta: {
    slug: "compito",
    shortName: "Co",
    navLabel: "Compito",
    title: "Compito",
    accentFrom: "sky-500",
    accentTo: "blue-600",
    industry: "Professional Services / Accounting",
    stack: "Angular · PrimeNG · SignalR",
    role: "Senior UI Engineer · Augmented Tech Labs",
  },
  hero: {
    eyebrow: "Project Case Study",
    heading: "A Multi-Tenant Practice Management Platform Built for Modern Accounting Firms",
    subheading:
      "From client onboarding to time tracking, documents and reporting — Compito replaces spreadsheets and email with a single operational system for accounting practices.",
  },
  metrics: [
    {
      icon: "server",
      gradientFrom: "sky-500",
      gradientTo: "blue-600",
      value: "Multi-Tenant",
      description: "Practice-scoped settings, branding, permissions and feature flags for every firm on the platform",
    },
    {
      icon: "layers-3d",
      gradientFrom: "orange-500",
      gradientTo: "amber-600",
      value: "6 Modules",
      description: "Clients, projects, tasks, time tracking, documents and templates in one workspace",
    },
    {
      icon: "refresh-cw",
      gradientFrom: "emerald-500",
      gradientTo: "emerald-600",
      value: "Integrated",
      description: "3 native integrations — QuickBooks Online, Companies House and Power BI — in daily workflows",
    },
    {
      icon: "layers-flag",
      gradientFrom: "violet-500",
      gradientTo: "purple-600",
      value: "Angular 22",
      description: "Standalone components, signals and a lazy-loaded, permission-aware feature architecture",
    },
  ],
  flowTitle: "Practice Operations Architecture",
  flowSubtitle: "How work moves from a new client through delivery, time tracking and reporting",
  flow: [
    { icon: "server", iconGradientFrom: "slate-700", iconGradientTo: "slate-900", title: "Practice Onboarding", subtitle: "Signup & activation", connectorLabel: "Activate", connectorColor: "blue" },
    { icon: "users", iconGradientFrom: "sky-500", iconGradientTo: "blue-600", title: "Client Management", subtitle: "Master data & QBO import", connectorLabel: "Engage", connectorColor: "blue" },
    { icon: "layers-flag", iconGradientFrom: "orange-500", iconGradientTo: "amber-600", title: "Projects & Tasks", subtitle: "Engagement delivery", connectorLabel: "Deliver", connectorColor: "blue" },
    { icon: "clock", iconGradientFrom: "violet-500", iconGradientTo: "purple-600", title: "Time Tracking", subtitle: "Timesheets & approval", connectorLabel: "Approve", connectorColor: "emerald" },
    { icon: "bar-chart", iconGradientFrom: "emerald-500", iconGradientTo: "emerald-600", title: "Reports & Insights", subtitle: "Power BI & exports", highlighted: true },
  ],
  about: {
    icon: "file-text",
    title: "About the Product",
    paragraphs: [
      "Compito is a practice management platform for accounting firms — it runs the day-to-day operational lifecycle of a practice, from client onboarding and engagement setup through project and task delivery, time logging, document handling and team administration. It sits beside accounting systems such as QuickBooks Online rather than replacing them.",
      "Every account is a Practice — the tenant boundary for settings, branding, feature flags and permissions — so each firm gets an isolated, configurable workspace built around the same core hierarchy: Client → Project → Task → Time.",
      "The result is a single system of record for client relationships, engagement delivery and billable time, instead of the mix of spreadsheets, inboxes and shared drives that most practices start with.",
    ],
  },
  challenge: {
    icon: "alert-triangle",
    title: "The Challenge",
    emphasisParagraph:
      "Accounting practices run client work across email, spreadsheets and disconnected tools — creating duplicate data, weak ownership and no reliable audit trail for billing.",
    paragraphs: [
      "The practice needed client → project → task ownership, mandatory time tracking with timesheet approval, role-based feature access, and low-friction onboarding for large existing client books via CSV and QuickBooks import.",
    ],
  },
  contribution: [
    { text: "Designed end-to-end UI/UX in Figma for 6 modules — Client Portal, Document Library, Time Tracking Report, User Management, Template Library and Global Search — translating business requirements into intuitive, scalable experiences." },
    { text: "Led the Angular 16 → 21 upgrade, adopting standalone components, the new control flow syntax, barrel files and OnPush change detection throughout." },
    { text: "Migrated UI components from Angular Material to PrimeNG and configured PrimeUIX themes to keep the design system consistent." },
    { text: "Rebuilt the stylesheet on a scalable 7-1 SCSS architecture, removing redundant styles and eliminating ::ng-deep." },
    { text: "Built a light/dark mode toggle service backed by Local Storage for a consistent theming experience." },
    { text: "Built the global search feature on existing listing APIs, adding session-based search history and full keyboard navigation." },
  ],
  outcomes: {
    challenges: [
      "Duplicate client and engagement data spread across spreadsheets, email and shared drives",
      "Weak task ownership and limited visibility into deadlines and workload",
      "No reliable time or timesheet trail for accurate billing and capacity planning",
      "Hard-to-audit changes on client, project and task records",
      "Manual re-entry when bringing existing client books across from QuickBooks",
      "Inconsistent engagement setup with no reusable templates for recurring work",
    ],
    outcomesIntro: "The platform delivered measurable improvements to how practices run client work, including:",
    outcomes: [
      "A single operational system for client, project, task and time delivery across the practice",
      "Reduced re-entry through CSV and QuickBooks Online client import",
      "Clear ownership via account managers, project managers, assignees and watchers on every record",
      "Mandatory time tracking with Me/Team timesheet views and a full approval workflow",
      "Faster setup through a reusable library of project, task and checklist templates",
      "Practice-scoped roles and permissions giving firms real control over who can see and do what",
    ],
    summary:
      "Compito gives accounting practices one operational home for client work — replacing scattered spreadsheets and inboxes with a permission-aware system that tracks every client, engagement, task and billable hour from first contact through to reporting.",
  },
  approachIntro:
    "We built Compito as an Angular multi-project workspace, moving incrementally from Material to PrimeNG without a big-bang rewrite, so the practice could keep working while the platform matured underneath them.",
  approach: [
    { title: "Discovery & Practice Research", description: "Stakeholder interviews with practice owners, managers and staff accountants, plus observation of real client → project → task → timesheet workflows, shaped the core data model and permission structure." },
    { title: "Client & Engagement Foundations", description: "We built the practice-scoped client hierarchy — tax ID, entity type, industry, billing cycle and account managers — with CSV and QuickBooks Online import to remove re-entry for existing client books." },
    { title: "Project & Task Delivery", description: "Projects, tasks and subtasks got estimates, time logs, priorities, checklists, comments and file attachments, backed by an audit trail on every record." },
    { title: "Time Tracking & Approval", description: "A dedicated timesheet workflow with Me/Team views and manager approval turned logged hours into a trustworthy source for billing and capacity planning." },
    { title: "Reporting, Templates & Rollout", description: "Reusable project, task and checklist templates, Power BI–embedded reporting and an environment-based build pipeline (dev/qa/uat/prod) rounded out the platform for firm-wide rollout." },
  ],
  techStack: [
    { badge: "Ng", category: "Frontend Framework", name: "Angular 22", description: "Standalone components, Angular Signals and Reactive Forms power a lazy-loaded, multi-project workspace shared between the main product and the onboarding app.", accent: "sky" },
    { badge: "Pn", category: "UI System", name: "PrimeNG & Material", description: "An incremental migration from Angular Material to PrimeNG (Aura) is underway across the workspace, modernising screens without a disruptive rewrite.", accent: "orange" },
    { badge: "Qb", category: "Accounting Integration", name: "QuickBooks Online", description: "Native OAuth integration imports existing clients directly from QuickBooks, removing manual re-entry when a practice onboards onto Compito.", accent: "emerald" },
    { badge: "Rt", category: "Real-Time & Reporting", name: "SignalR & Power BI", description: "SignalR delivers real-time updates across the workspace, while embedded Power BI reporting and Companies House lookups extend the platform beyond core practice data.", accent: "violet" },
  ],
  snapshot: {
    fields: [
      { label: "Industry", value: "Professional Services (Accounting)" },
      { label: "Product Type", value: "Multi-Tenant SaaS" },
      { label: "Core Stack", value: "Angular · PrimeNG · RxJS · SignalR" },
      { label: "Key Integrations", value: "QuickBooks Online · Companies House · Power BI" },
    ],
    capabilities: [
      "Practice Management Platform",
      "Multi-Tenant Architecture",
      "Client & Engagement Management",
      "Time Tracking & Approval",
      "Document & Template Library",
      "QuickBooks Online Import",
      "Power BI Reporting",
      "Role-Based Permissions",
    ],
  },
};
```

Note: the flow's 6th step ("Reports & Insights") has no `connectorLabel`/`connectorColor` since it's the last step and `FlowDiagram` (Task 7) only renders a connector for `i < steps.length - 1`.

- [ ] **Step 2: Register Compito in `data/index.ts`**

Modify `src/features/case-studies/data/index.ts`:

```ts
import type { CaseStudyData } from "../types";
import { compito } from "./compito";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
};
```

- [ ] **Step 3: Run the repository test to verify it now passes**

Run: `npx vitest run src/features/case-studies/repository.test.ts`
Expected: PASS (3 tests) — `caseStudies` now has one entry.

- [ ] **Step 4: Implement `CaseStudyPage`**, composing every Task 7 component in the original's section order (`compito.html:72-526`):

Create `src/features/case-studies/pages/CaseStudyPage.tsx`:

```tsx
import { useParams } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { ProjectSwitcher } from "../../../shared/components/ProjectSwitcher";
import { getAllCaseStudies, getCaseStudyBySlug } from "../repository";
import { MetaBadges } from "../components/MetaBadges";
import { CaseStudyHero } from "../components/CaseStudyHero";
import { MetricsGrid } from "../components/MetricsGrid";
import { FlowDiagram } from "../components/FlowDiagram";
import { AboutAndChallenge } from "../components/InfoCard";
import { ContributionCard } from "../components/ContributionCard";
import { OutcomesSection } from "../components/OutcomesSection";
import { ApproachSteps } from "../components/ApproachSteps";
import { TechStackGrid } from "../components/TechStackGrid";
import { SnapshotFooter } from "../components/SnapshotFooter";
import { NotFoundPage } from "./NotFoundPage";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!data) {
    return <NotFoundPage />;
  }

  const allProjects = getAllCaseStudies();

  return (
    <Layout>
      <Navbar
        shortName={data.meta.shortName}
        eyebrow="Project Case Study"
        title={data.meta.title}
        homeLink={{ href: "/", label: "Portfolio · Jaymin Maheta →" }}
        switcher={<ProjectSwitcher projects={allProjects} activeSlug={data.meta.slug} />}
      />
      <MetaBadges meta={data.meta} />
      <CaseStudyHero hero={data.hero} />
      <MetricsGrid metrics={data.metrics} />
      <div className="relative z-10 px-6 pb-16 pt-16 sm:px-10 md:px-16 md:pb-20 md:pt-20 lg:px-20">
        <FlowDiagram title={data.flowTitle} subtitle={data.flowSubtitle} steps={data.flow} />
        <AboutAndChallenge about={data.about} challenge={data.challenge} />
        <ContributionCard role={data.meta.role} items={data.contribution} placeholder={data.contributionPlaceholder} />
        <OutcomesSection outcomes={data.outcomes} />
        <ApproachSteps intro={data.approachIntro} steps={data.approach} />
        <TechStackGrid items={data.techStack} />
        <SnapshotFooter snapshot={data.snapshot} />
      </div>
    </Layout>
  );
}
```

- [ ] **Step 5: Implement `NotFoundPage`**

Create `src/features/case-studies/pages/NotFoundPage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";

export function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-32 text-center">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">404</p>
        <h1 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Project not found</h1>
        <p className="max-w-md text-[15px] leading-relaxed text-text-muted">This case study doesn't exist or may have moved.</p>
        <Link to="/" className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-[13.5px] font-bold text-white shadow-lg transition hover:bg-brand-blue-dark">
          Back to portfolio
        </Link>
      </div>
    </Layout>
  );
}
```

- [ ] **Step 6: Wire up routing**

Create `src/app/routes.tsx` (references `HomePage`, built in Task 9 — this file is finalized in Task 9's Step, but the `/:slug` route can be wired now):

```tsx
import { createBrowserRouter } from "react-router-dom";
import { CaseStudyPage } from "../features/case-studies/pages/CaseStudyPage";
import { NotFoundPage } from "../features/case-studies/pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/:slug", element: <CaseStudyPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
```

Create `src/app/App.tsx`:

```tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return <RouterProvider router={router} />;
}
```

Rewrite `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css";
import "./features/case-studies/tailwind-safelist";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Note: the home route (`/`) is added to `routes.tsx` in Task 9 once `HomePage` exists; until then, visiting `/` will hit the `*` catch-all and show `NotFoundPage`, which is expected and corrected in the next task.

- [ ] **Step 7: Manual visual-parity check against `compito.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/compito`. Open `compito.html` directly in a second browser tab/window. Compare side by side, section by section (navbar, meta badges, hero, metrics, flow diagram, about/challenge, contribution, outcomes, approach, tech stack, snapshot footer) in both light and dark mode, and at mobile (~375px), tablet (~768px) and desktop (~1440px) widths using devtools responsive mode. Confirm: identical copy, colors, spacing, icons; reveal-on-scroll animations fire once per section as you scroll; theme toggle persists across a page reload; connectors between flow steps show the right label/color/orientation at each breakpoint (horizontal arrows ≥ xl, vertical arrows below). Fix any drift found before proceeding — this is the pattern every other case study (Tasks 10-13) will replicate, so any structural bug here propagates everywhere if not caught now.

- [ ] **Step 8: Run the full test suite**

Run: `npx vitest run`
Expected: all tests PASS (`useTheme.test.ts`, `repository.test.ts`).

- [ ] **Step 9: Commit**

```bash
git add src/features/case-studies/data/compito.ts src/features/case-studies/data/index.ts src/features/case-studies/pages src/app src/main.tsx
git commit -m "feat: add Compito case study data, CaseStudyPage, and routing"
```

---

### Task 9: Home Page

**Files:**
- Create: `src/features/home/components/HomeHero.tsx`, `RecognitionStrip.tsx`, `ProjectGrid.tsx`, `ProjectCard.tsx`, `src/features/home/pages/HomePage.tsx`
- Modify: `src/app/routes.tsx` (add the `/` route)

**Interfaces:**
- Consumes: `Layout`, `Navbar`, `Footer`, `HeroBackground`, `Reveal`, `RevealGroup`/`RevealItem`, `TiltCard` (all shared, Tasks 3-5); `getAllCaseStudies` (Task 6, now returns real data since Compito exists — full parity requires all 5 projects, so this task's manual check will show only Compito populated until Tasks 10-13 land; that's expected and consistent with the plan's incremental build order)
- Produces: the `/` route, completing site navigation.

- [ ] **Step 1: Implement `HomeHero`**, transcribing `index.html:86-119`:

Create `src/features/home/components/HomeHero.tsx`:

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "../../../shared/components/HeroBackground";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const heroTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };
  const heroInitial = reduceMotion ? false : { opacity: 0, y: 24 };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-brand-blue-dark to-brand-blue px-6 py-14 text-white transition-colors duration-300 dark:from-black dark:via-neutral-950 dark:to-neutral-900 sm:px-10 md:px-16 md:py-20 lg:px-20">
      <HeroBackground />
      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={heroInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[28px] border-4 border-white/20 bg-gradient-to-br from-white/25 to-white/5 text-4xl font-extrabold text-white shadow-2xl backdrop-blur sm:h-32 sm:w-32"
        >
          JM
        </motion.div>
        <div>
          <motion.span
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.08 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffd166] backdrop-blur"
          >
            Available for opportunities
          </motion.span>
          <motion.h1
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.16 }}
            className="text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-[44px]"
          >
            Jaymin Maheta
          </motion.h1>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.24 }}
            className="mt-2 text-lg font-bold text-sky-100 sm:text-xl"
          >
            Senior UI/UX Designer &amp; Senior UI Engineer
          </motion.p>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.32 }}
            className="mt-1 text-sm font-semibold text-white/70"
          >
            Angular &amp; React &middot; Design Systems &middot; Frontend Architecture
          </motion.p>
          <motion.p
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.4 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base"
          >
            Senior UI Engineer with 7+ years of experience building responsive, accessible and production-ready enterprise applications using Angular and React. With a strong foundation in UI/UX design, I specialise in transforming Figma designs into pixel-perfect interfaces while bridging the gap between design and engineering — across design systems, reusable component libraries, frontend architecture, accessibility and Angular modernisation.
          </motion.p>

          <motion.div
            initial={heroInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.48 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a href="mailto:hello.jaymin.maheta@gmail.com" className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-bold text-primary-navy shadow-lg transition hover:bg-sky-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                <polyline points="22 6 12 13 2 6"></polyline>
              </svg>{" "}
              hello.jaymin.maheta@gmail.com
            </a>
            <a href="https://linkedin.com/in/jaymin-maheta" target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[13.5px] font-bold text-white backdrop-blur transition hover:bg-white/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>{" "}
              linkedin.com/in/jaymin-maheta
            </a>
            <a href="/assets/docs/jaymin-maheta-resume.pdf" download className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[13.5px] font-bold text-white backdrop-blur transition hover:bg-white/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>{" "}
              Download Resume
            </a>
            <span className="flex items-center gap-1.5 px-1 text-[13px] font-semibold text-white/70">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>{" "}
              Ahmedabad, Gujarat, India
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

Note: `assets/docs/jaymin-maheta-resume.pdf` must be copied into Vite's `public/` directory (as `public/assets/docs/jaymin-maheta-resume.pdf`) so the `/assets/docs/...` href resolves — this is handled in Step 5 below.

- [ ] **Step 2: Implement `RecognitionStrip`**, transcribing `index.html:124-144`:

Create `src/features/home/components/RecognitionStrip.tsx`:

```tsx
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";

const RECOGNITIONS = [
  "Spotlight Award (Dec 2024) — outstanding project contributions",
  "HDFC Gift Voucher (Jul 2024) — outstanding project contributions",
  "Spotlight Award (Apr 2024) — Amazon Gift Voucher for project contributions",
  "Client Appreciation — successful production delivery and teamwork",
  "Tech Titans Recognition — UI design, prototyping and frontend delivery",
];

export function RecognitionStrip() {
  return (
    <div className="mb-14 md:mb-16">
      <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Recognition</p>
      <RevealGroup className="flex flex-wrap gap-3">
        {RECOGNITIONS.map((text, i) => (
          <RevealItem
            key={i}
            className="flex items-center gap-2.5 rounded-full border-[1.5px] border-amber-200 bg-amber-50 px-4 py-2 text-[13px] font-bold text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            {text}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
```

Note: recognition entries are kept as a local constant here rather than added to `CaseStudyData`/repository types, since they describe the person (Jaymin), not a project — out of scope for the case-studies data model. If the future admin panel needs to edit these, that's a separate `features/home` data seam, not covered by this plan.

- [ ] **Step 3: Implement `ProjectCard` and `ProjectGrid`**, transcribing `index.html:156-226` (5 tilt cards):

Create `src/features/home/components/ProjectCard.tsx`:

```tsx
import { TiltCard } from "../../../shared/components/TiltCard";
import type { CaseStudyMeta } from "../../case-studies/types";

interface ProjectCardProps {
  project: CaseStudyMeta;
  index: number;
  description: string;
  tags: string[];
}

export function ProjectCard({ project, index, description, tags }: ProjectCardProps) {
  return (
    <TiltCard
      href={`/${project.slug}`}
      className="flex flex-col overflow-hidden rounded-2xl border-2 border-border-strong bg-bg-surface shadow-xl shadow-slate-900/5 transition hover:border-brand-blue hover:shadow-2xl"
    >
      <span className={`block h-1.5 bg-gradient-to-r from-${project.accentFrom} to-${project.accentTo}`}></span>
      <div className="flex flex-1 flex-col p-6">
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-${project.accentFrom} to-${project.accentTo} text-sm font-extrabold text-white shadow-lg`}>
          {index + 1}
        </div>
        <h3 className="mb-2 text-lg font-extrabold text-text-heading transition group-hover:text-brand-blue">{project.title}</h3>
        <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-text-muted">{description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-bg-surface-alt px-2.5 py-1 text-[11px] font-bold text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-brand-blue">
          View case study
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </TiltCard>
  );
}
```

Note: `group-hover:text-brand-blue` on the `<h3>` relies on a `group` class on the hover-triggering ancestor — the original has `class="... group ..."` on the `<a>` (`index.html:157`). `TiltCard`'s `className` prop (Task 3) is spread directly onto the `motion.a`, so `ProjectCard` must include `group` in the className string passed to `TiltCard` for this to work. Correct the `className` above to prepend `group `:

```tsx
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border-strong bg-bg-surface shadow-xl shadow-slate-900/5 transition hover:border-brand-blue hover:shadow-2xl"
```

Create `src/features/home/components/ProjectGrid.tsx`, hardcoding the 5 descriptions/tag-lists exactly as in `index.html:157-226` (these are home-page-specific summary blurbs distinct from each case study's full hero copy, so they live here rather than being derived from `CaseStudyData`):

```tsx
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { ProjectCard } from "./ProjectCard";
import type { CaseStudyMeta } from "../../case-studies/types";

const SUMMARIES: Record<string, { description: string; tags: string[] }> = {
  compito: { description: "Multi-tenant practice management platform for accounting firms.", tags: ["Angular", "PrimeNG", "SignalR"] },
  farmgate: { description: "Full-traceability inventory, formulation and sales ERP for a UK feed business.", tags: ["React", "NestJS", "MySQL"] },
  valyxto: { description: "Multi-warehouse distribution ERP for order-to-cash and procure-to-pay.", tags: ["Angular", "PrimeNG", "Chart.js"] },
  bmc: { description: "Full-lifecycle hospital management system for a 200+ staff government platform.", tags: ["Angular", "PrimeNG", "FullCalendar"] },
  rota: { description: "Staff rostering, time & attendance and payroll for UK care homes.", tags: ["Angular", "PrimeNG", "FullCalendar"] },
};

export function ProjectGrid({ projects }: { projects: CaseStudyMeta[] }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Selected Work</p>
      <h2 className="mb-3 text-2xl font-extrabold text-text-heading sm:text-3xl">Project Case Studies</h2>
      <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
        Five enterprise applications spanning practice management, distribution ERP, hospital operations, feed manufacturing and workforce rostering — each page covers the product, the architecture and exactly what I personally built.
      </p>
      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const summary = SUMMARIES[project.slug];
          return (
            <RevealItem key={project.slug} className="contents">
              <ProjectCard project={project} index={i} description={summary?.description ?? ""} tags={summary?.tags ?? []} />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
```

Note on `RevealItem className="contents"`: `RevealItem` (Task 3) is a `motion.div`, but the original's `.reveal-item` class sits directly on the `<a class="tilt-card ...">` element itself (`index.html:157`), not on a wrapper — wrapping `ProjectCard`'s `<TiltCard>` (which renders a `motion.a`) inside another `motion.div` would add an extra box in the grid layout. Using Tailwind's `contents` display value on the wrapper makes it not participate in the CSS grid/box model, so `RevealItem`'s stagger animation still applies (framer-motion variants still propagate to the child regardless of `display`) while `ProjectCard`'s own `<TiltCard>` element is what visually occupies the grid cell. Verify this rendering approach in Step 6's manual check — if `display: contents` causes any framer-motion animation glitch in practice, the fallback is to drop `RevealItem` here and instead pass the stagger variants directly as props on `TiltCard`/`ProjectCard` (a follow-up adjustment, not blocking this task).

- [ ] **Step 4: Implement `HomePage`**, composing everything in `index.html`'s order:

Create `src/features/home/pages/HomePage.tsx`:

```tsx
import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { getAllCaseStudies } from "../../case-studies/repository";
import { HomeHero } from "../components/HomeHero";
import { RecognitionStrip } from "../components/RecognitionStrip";
import { ProjectGrid } from "../components/ProjectGrid";

export function HomePage() {
  const projects = getAllCaseStudies();

  return (
    <Layout>
      <Navbar shortName="JM" eyebrow="Portfolio" title="Jaymin Maheta" />
      <HomeHero />
      <div className="relative z-10 px-6 py-14 sm:px-10 md:px-16 md:py-16 lg:px-20">
        <RecognitionStrip />
        <ProjectGrid projects={projects} />
      </div>
      <Footer />
    </Layout>
  );
}
```

- [ ] **Step 5: Copy the resume PDF into `public/`**

Run: `mkdir -p public/assets/docs` then copy `assets/docs/jaymin-maheta-resume.pdf` to `public/assets/docs/jaymin-maheta-resume.pdf` (Vite serves everything under `public/` from the site root, so `/assets/docs/jaymin-maheta-resume.pdf` resolves correctly — this mirrors the original's relative `assets/docs/jaymin-maheta-resume.pdf` link).

- [ ] **Step 6: Wire the `/` route**

Modify `src/app/routes.tsx`:

```tsx
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import { CaseStudyPage } from "../features/case-studies/pages/CaseStudyPage";
import { NotFoundPage } from "../features/case-studies/pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/:slug", element: <CaseStudyPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
```

- [ ] **Step 7: Manual visual-parity check against `index.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/`. Open `index.html` directly in a second tab. Compare: navbar (no switcher, tagline-free — just logo + theme toggle), hero (avatar, badge, heading, subheading, 3 CTA buttons + location), recognition strip (5 badges), project grid. Since only Compito exists as real data at this point, its card should match `index.html`'s Compito card exactly (color, description, tags, number badge "1"); the other 4 cards won't render yet (`getAllCaseStudies()` only returns Compito) — that's expected until Tasks 10-13 land, and is not a parity bug to chase in this task. Confirm in both light/dark mode and at mobile/tablet/desktop widths: tilt-card pointer effect on the Compito card, theme toggle, resume download link resolves.

- [ ] **Step 8: Commit**

```bash
git add src/features/home src/app/routes.tsx public/assets/docs
git commit -m "feat: add home page with hero, recognition strip and project grid"
```

---

### Task 10: FarmGate Data File

**Files:**
- Create: `src/features/case-studies/data/farmgate.ts`
- Modify: `src/features/case-studies/data/index.ts` (register), `src/shared/components/Icon.tsx` (add `warehouse` icon — the truck/box glyph at `farmgate.html:180` reused from `package`, and `flask`/`activity`-style icons if any path in FarmGate isn't already in the Task 5 `PATHS` map — check `farmgate.html:136,144,152,160,180,192,204,216` against `PATHS` before adding a new key; all of FarmGate's flow/metric icons are `package` (metrics icon 1, `farmgate.html:136`, and flow step 1 `farmgate.html:180` reuses the same path), `refresh-cw` (metric 2, `farmgate.html:144`), `layers-3d` (metric 3, `farmgate.html:152`, and flow step 2 `farmgate.html:192`), `bar-chart` (metric 4/flow step 5, `farmgate.html:160`/`218`), `cart` (flow step 3, `farmgate.html:204`) — all already present in `PATHS`, so no new `Icon.tsx` changes are actually needed for FarmGate; the file modify entry above is conditional on that check confirming otherwise)

**Interfaces:**
- Consumes: `CaseStudyData` (Task 6); registers into `repository.ts` (Task 6) via `data/index.ts`
- Produces: `farmgate` export consumed only by `data/index.ts`

- [ ] **Step 1: Transcribe FarmGate into `data/farmgate.ts`**, reading every field from `farmgate.html` (already read in full earlier in this session):

Create `src/features/case-studies/data/farmgate.ts`:

```ts
import type { CaseStudyData } from "../types";

export const farmgate: CaseStudyData = {
  meta: {
    slug: "farmgate",
    shortName: "FG",
    navLabel: "FarmGate",
    title: "FarmGate Nutrition",
    accentFrom: "orange-500",
    accentTo: "amber-600",
    industry: "Agriculture / Animal Feed Manufacturing",
    stack: "React · NestJS · MySQL",
    role: "Senior UI Engineer · Augmented Tech Labs",
  },
  hero: {
    eyebrow: "Project Case Study",
    heading: "Full-Traceability Inventory, Formulation & Sales for a UK Animal Feed Business",
    subheading:
      "FarmGate Nutrition tracks every batch from lorry to blend to sale — with FEFO rotation, nested recipes and a change log on every record.",
  },
  metrics: [
    { icon: "package", gradientFrom: "sky-500", gradientTo: "blue-600", value: "Traceable", description: "UFAS number, haulier, vehicle registration and delivery note captured on every batch" },
    { icon: "refresh-cw", gradientFrom: "orange-500", gradientTo: "amber-600", value: "Auto-FEFO", description: "Batches are automatically offered for use in expiry-date order across every recipe" },
    { icon: "layers-3d", gradientFrom: "emerald-500", gradientTo: "emerald-600", value: "Nested Recipes", description: "An ingredient can be a raw batch or another recipe, with live cost roll-up in £/Kg and £/Tonne" },
    { icon: "bar-chart", gradientFrom: "violet-500", gradientTo: "purple-600", value: "Transactional", description: "Every multi-step inventory change runs inside a database transaction with full rollback" },
  ],
  flowTitle: "Feed Manufacturing Flow",
  flowSubtitle: "From raw material delivery through blending to sale and reporting",
  flow: [
    { icon: "package", iconGradientFrom: "slate-700", iconGradientTo: "slate-900", title: "Purchase", subtitle: "Raw material batch", connectorLabel: "Consume", connectorColor: "blue" },
    { icon: "layers-3d", iconGradientFrom: "sky-500", iconGradientTo: "blue-600", title: "Recipe", subtitle: "Blending & formulation", connectorLabel: "Sell", connectorColor: "blue" },
    { icon: "cart", iconGradientFrom: "orange-500", iconGradientTo: "amber-600", title: "Sold", subtitle: "Product or recipe sale", connectorLabel: "Analyse", connectorColor: "emerald" },
    { icon: "bar-chart", iconGradientFrom: "violet-500", iconGradientTo: "purple-600", title: "Dashboard & Reports", subtitle: "Valuation & analytics", highlighted: true },
  ],
  about: {
    icon: "file-text",
    title: "About the Product",
    paragraphs: [
      "FarmGate Nutrition is an inventory, formulation and sales management system built for a UK-based animal feed business. It tracks raw material from the moment it arrives on a lorry, through blending into feed recipes, to the sale of the finished product.",
      "Every batch carries the traceability fields the feed-assurance scheme requires — UFAS number, haulier, vehicle registration, bay number and delivery note — alongside expiry dates and minimum stock thresholds, with FEFO batch selection built into the formulation module.",
      "A recipe can be built from raw purchased batches or from other recipes, so multi-stage blends stay traceable back to source material, with cost and stock levels recalculated automatically at every level.",
    ],
  },
  challenge: {
    icon: "alert-triangle",
    title: "The Challenge",
    emphasisParagraph:
      "Feed formulation isn't a flat bill of materials — recipes can be built from other recipes, and every gram sold has to trace back to a specific batch, haulier and delivery note.",
    paragraphs: [
      "The system needed to deduct stock safely across purchases, nested recipes and sales in a single transaction, enforce FEFO rotation automatically, and keep a full audit trail without slowing down daily goods-in and goods-out.",
    ],
  },
  contributionPlaceholder:
    "This project isn't listed on the resume I was given, so I've left it blank rather than guess. Add 3–4 bullets on what you personally built or led here, and I'll drop them in.",
  contribution: [],
  outcomes: {
    challenges: [
      "Tracking raw material batches with full feed-assurance traceability (UFAS, haulier, vehicle, delivery note)",
      "Supporting recipes built from other recipes, not just raw purchased batches",
      "Automatically offering the correct batch for use in expiry-date order (FEFO)",
      "Keeping stock deductions consistent across purchases, recipes and sales in real time",
      "Preventing quantity edits that would drop stock below what's already been consumed",
      "Producing exportable reports and dashboards without slowing down daily operations",
    ],
    outcomesIntro: "The platform delivered measurable improvements to how the business runs inventory and sales, including:",
    outcomes: [
      "Full batch-level traceability from goods-in through to finished product sale",
      "Automatic FEFO batch rotation across every recipe, reducing waste from expired stock",
      "Safe, transactional stock deduction across nested recipes and combined product/recipe sales",
      "A live dashboard with stock valuation, low-stock alerts and top-selling product/recipe charts",
      "Date-range Excel reporting delivered securely via S3, with a full change-log audit trail",
      "A cascading history model — renaming a product updates the audit trail on every related batch",
    ],
    summary:
      "FarmGate Nutrition gives the business one system that tracks raw material from delivery through blending to sale — with FEFO rotation, nested-recipe cost roll-up and a transactional core that keeps every stock movement accurate and auditable.",
  },
  approachIntro:
    "We built the platform as a React + NestJS application, with every multi-step inventory change wrapped in a database transaction from day one — non-negotiable once stock deduction touches purchases, recipes and sales at the same time.",
  approach: [
    { title: "Domain & Traceability Design", description: "We modelled the UK feed-assurance fields — UFAS number, haulier, vehicle registration, delivery note — directly into the purchase batch, alongside expiry dates and minimum order quantities." },
    { title: "Purchase & Inventory Engine", description: "Goods-in creates or tops up a batch, with business rules enforcing unique delivery notes, cost consistency and safe quantity edits that respect stock already consumed." },
    { title: "Recipe & Formulation Engine", description: "Recipes blend purchased batches or other recipes, deduct available quantity automatically and roll up live cost per Kg and per Tonne, with FEFO-ordered batch selection." },
    { title: "Sales & Reporting", description: "A combined product/recipe sales flow, KPI dashboard and date-range Excel export (via ExcelJS and S3) gave the business real-time and historical visibility." },
    { title: "Audit & Deployment", description: "Every create, edit and ingredient change writes to a dedicated history table, and the app deploys to AWS EC2 behind PM2 for a straightforward, repeatable release process." },
  ],
  techStack: [
    { badge: "Re", category: "Frontend", name: "React + Vite", description: "A React/TypeScript SPA built on Vite, with PrimeReact for tables, dialogs and forms, and Redux Toolkit managing authentication state.", accent: "sky" },
    { badge: "Ns", category: "Backend Framework", name: "NestJS", description: "A NestJS API structures purchase, recipe and sales logic behind a consistent response envelope, with class-validator DTOs on every write.", accent: "orange" },
    { badge: "My", category: "Database", name: "MySQL + Sequelize", description: "Sequelize-TypeScript models every batch, recipe and sale with soft deletes and timestamps, and every multi-step write runs inside a database transaction.", accent: "emerald" },
    { badge: "Aws", category: "Infrastructure", name: "AWS EC2 & S3", description: "The API runs on EC2 under PM2, with Excel exports built server-side and delivered securely through S3.", accent: "violet" },
  ],
  snapshot: {
    fields: [
      { label: "Industry", value: "Agriculture / Animal Feed Manufacturing" },
      { label: "Product Type", value: "Inventory, Formulation & Sales ERP" },
      { label: "Core Stack", value: "React · NestJS · MySQL · AWS" },
      { label: "Regulatory Focus", value: "UK Feed-Assurance (UFAS) Traceability" },
    ],
    capabilities: [
      "Batch & Lot Traceability",
      "FEFO Inventory Rotation",
      "Nested Recipe Formulation",
      "Sales & Dashboard Reporting",
      "Excel Export via S3",
      "Change-Log Audit Trail",
      "Transactional Data Integrity",
      "Low-Stock Alerting",
    ],
  },
};
```

- [ ] **Step 2: Register FarmGate in `data/index.ts`**

Modify `src/features/case-studies/data/index.ts`:

```ts
import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
};
```

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: all tests PASS.

- [ ] **Step 4: Manual visual-parity check against `farmgate.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/farmgate`. Open `farmgate.html` in a second tab. Compare every section in light/dark mode at mobile/tablet/desktop widths, exactly as in Task 8 Step 7. Specifically confirm the placeholder contribution box renders identically to `farmgate.html:269-271` (dashed border, centered muted text, exact placeholder copy) rather than an empty grid. Also revisit `/` (home) and confirm the FarmGate card now appears in the project grid with the orange accent gradient, correct description/tags, and number badge "2", and that the navbar's `ProjectSwitcher` on both Compito and FarmGate pages now shows both projects as pills.

- [ ] **Step 5: Commit**

```bash
git add src/features/case-studies/data/farmgate.ts src/features/case-studies/data/index.ts
git commit -m "feat: add FarmGate case study data"
```

---

### Task 11: Valyxto Data File

**Files:**
- Create: `src/features/case-studies/data/valyxto.ts`
- Modify: `src/features/case-studies/data/index.ts` (register), `src/shared/components/Icon.tsx` (add `truck-shipment` icon)

**Interfaces:**
- Consumes: `CaseStudyData` (Task 6)
- Produces: `valyxto` export

- [ ] **Step 1: Add the one new icon Valyxto introduces**

`valyxto.html:216` (flow step "Fulfilment & Invoicing") uses a box+truck shipping glyph not already in the Task 5 `PATHS` map (`<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>`) — this is actually identical to the `package` icon already defined in Task 5 (same path used for BMC/FarmGate's warehouse icon at `bmc.html:...`/`farmgate.html:180`). Reuse `package` for this step; no `Icon.tsx` change is needed for Valyxto. (This step exists to document that the check was done, not to add code.)

- [ ] **Step 2: Transcribe Valyxto into `data/valyxto.ts`**, reading every field from `valyxto.html` (already read in full earlier in this session):

Create `src/features/case-studies/data/valyxto.ts`:

```ts
import type { CaseStudyData } from "../types";

export const valyxto: CaseStudyData = {
  meta: {
    slug: "valyxto",
    shortName: "Va",
    navLabel: "Valyxto",
    title: "Valyxto",
    accentFrom: "emerald-500",
    accentTo: "emerald-600",
    industry: "Wholesale Distribution",
    stack: "Angular · PrimeNG · Chart.js",
    role: "Senior UI Engineer · Augmented Tech Labs",
  },
  hero: {
    eyebrow: "Project Case Study",
    heading: "A Multi-Warehouse Inventory & Distribution ERP for Order-to-Cash and Procure-to-Pay",
    subheading:
      "Valyxto runs the full sales and purchasing lifecycle — from CRM opportunity through fulfilment, invoicing and landed cost — with lot/bin traceability and a configurable BI dashboard.",
  },
  metrics: [
    { icon: "cart", gradientFrom: "sky-500", gradientTo: "blue-600", value: "Order-to-Cash", description: "Full sales and procure-to-pay cycles — quote, order, fulfilment, invoice and payment — in one system" },
    { icon: "refresh-cw", gradientFrom: "orange-500", gradientTo: "amber-600", value: "Multi-Currency", description: "Live exchange-rate integration recalculates every money-bearing document automatically" },
    { icon: "layers-3d", gradientFrom: "emerald-500", gradientTo: "emerald-600", value: "Lot & Bin", description: "Barcode and QR label generation across CODE128, EAN, UPC, CODE39, MSI and QR formats" },
    { icon: "bar-chart", gradientFrom: "violet-500", gradientTo: "purple-600", value: "BI Dashboards", description: "A dynamic report builder feeds configurable, Gridster-based Chart.js dashboard widgets" },
  ],
  flowTitle: "Order-to-Cash & Procure-to-Pay Flow",
  flowSubtitle: "From CRM opportunity through inventory, fulfilment and invoicing to reporting",
  flow: [
    { icon: "server", iconGradientFrom: "slate-700", iconGradientTo: "slate-900", title: "Opportunity", subtitle: "CRM pipeline", connectorLabel: "Convert", connectorColor: "blue" },
    { icon: "layers-flag", iconGradientFrom: "sky-500", iconGradientTo: "blue-600", title: "Sales & Purchase Orders", subtitle: "Quote to order", connectorLabel: "Allocate", connectorColor: "blue" },
    { icon: "layers-3d", iconGradientFrom: "orange-500", iconGradientTo: "amber-600", title: "Inventory & Warehouse", subtitle: "Multi-site stock core", connectorLabel: "Fulfil", connectorColor: "blue" },
    { icon: "package", iconGradientFrom: "violet-500", iconGradientTo: "purple-600", title: "Fulfilment & Invoicing", subtitle: "Receipt, ship, bill", connectorLabel: "Visualise", connectorColor: "emerald" },
    { icon: "bar-chart", iconGradientFrom: "emerald-500", iconGradientTo: "emerald-600", title: "Reporting & BI", subtitle: "Dynamic dashboards", highlighted: true },
  ],
  about: {
    icon: "file-text",
    title: "About the Product",
    paragraphs: [
      "Valyxto is the customer-facing web client for a multi-warehouse inventory, order-management and distribution ERP — running the full order-to-cash and procure-to-pay cycles, internal stock transfers, inventory cycle counts, CRM-style opportunity tracking and a configurable report builder.",
      "Every money-bearing entity — customers, vendors, opportunities, items and documents — is multi-currency aware, with live exchange rates recalculated automatically as currency changes. Items carry per-warehouse stock and bin/lot-level tracking for regulated, batch-tracked inventory.",
      "An opportunity converts to a sales order automatically the moment it's marked 'Closed Won' — one of several places where the system encodes real distribution-business workflow rather than generic CRUD screens.",
    ],
  },
  challenge: {
    icon: "alert-triangle",
    title: "The Challenge",
    emphasisParagraph:
      "Distribution businesses run two parallel financial cycles — selling and buying — across multiple warehouses, currencies and regulatory reporting periods, and they all have to reconcile.",
    paragraphs: [
      "The platform needed multi-warehouse stock visibility down to the bin and lot, landed-cost apportionment across receipts and returns, AR/AP aging by fiscal period, and a reporting layer flexible enough to answer questions the team hadn't anticipated when the schema was designed.",
    ],
  },
  contribution: [
    { text: "Refreshed the application's visual theme in PrimeNG without touching existing functionality." },
    { text: "Implemented the interactive dashboard charts using Chart.js." },
    { text: "Led R&D on Gridster2 for dashboard customisation — drag-and-drop layout management and resizable widgets — and helped developers persist dashboard layouts through existing APIs." },
    { text: "Delivered responsive layouts optimised for multiple screen sizes." },
  ],
  outcomes: {
    challenges: [
      "Tracking stock accurately across multiple warehouses down to bin and lot level",
      "Apportioning landed costs (freight, duty, etc.) across purchase receipts, sales returns and transfers",
      "Keeping every money-bearing document accurate as currencies and exchange rates change",
      "Modelling accounts-receivable and accounts-payable aging in real 30/60/90/120-day buckets",
      "Generating physical warehouse labels (barcode and QR) precise enough for bin and lot use",
      "Giving the business a reporting layer that isn't limited to a fixed set of canned reports",
    ],
    outcomesIntro: "The platform delivered measurable improvements to how the business runs sales, purchasing and inventory, including:",
    outcomes: [
      "One system covering the full order-to-cash and procure-to-pay cycle, end to end",
      "Automatic opportunity-to-sales-order conversion the moment a deal is marked Closed Won",
      "Warehouse-and-bin-level stock visibility with lot traceability across every transaction type",
      "Landed-cost apportionment integrated directly into receipts, fulfilments and returns",
      "A genuine dynamic report builder — entities, joins, filters — feeding live Gridster BI dashboards",
      "Role- and permission-gated sub-modules giving real internal segmentation across the business",
    ],
    summary:
      "Valyxto gives the distribution business one system for selling, buying and tracking stock across every warehouse — with multi-currency, landed cost and lot traceability built in, and a report builder that turns any slice of that data into a live dashboard.",
  },
  approachIntro:
    "We built Valyxto as an Angular single-page application consuming a separate REST API, structuring every major workflow around the same server-side lazy-loaded table and filter pattern for consistency across dozens of transactional screens.",
  approach: [
    { title: "Multi-Entity Domain Modeling", description: "Customers, vendors, opportunities and items were modelled with currency, GL-account tagging and fiscal-period reporting vocabulary from the start." },
    { title: "Warehouse & Inventory Core", description: "Per-warehouse stock, bin/lot tracking and cycle counts gave the business a single accurate view of inventory across every location." },
    { title: "Order-to-Cash & Procure-to-Pay", description: "Opportunity-to-order automation, purchase and sales fulfilment, and invoicing were built as one connected pipeline rather than isolated modules." },
    { title: "Landed Cost & Barcode Labelling", description: "Landed-cost apportionment and cm-precise barcode/QR label generation extended the system into real warehouse operations." },
    { title: "Report Builder & BI Dashboards", description: "A dynamic entity/join/filter report builder feeds a Gridster-based dashboard, so any saved report can become a live Chart.js widget." },
  ],
  techStack: [
    { badge: "Ng", category: "Frontend Framework", name: "Angular 19", description: "A lazy-loaded, permission-gated single-page application with Angular Signals adopted incrementally alongside RxJS across the codebase.", accent: "sky" },
    { badge: "Pn", category: "UI System", name: "PrimeNG", description: "PrimeNG tables, dialogs and forms drive every transactional list screen, layered with Tailwind CSS utilities for custom layout.", accent: "orange" },
    { badge: "Cj", category: "BI & Dashboards", name: "Chart.js & Gridster", description: "A gridster-based widget grid renders metric, bar, donut, line and gauge visualisations, each backed by a previously saved report.", accent: "emerald" },
    { badge: "Rt", category: "Real-Time", name: "SignalR", description: "A SignalR notification hub delivers live purchase-approval alerts to the roles responsible for approving them.", accent: "violet" },
  ],
  snapshot: {
    fields: [
      { label: "Industry", value: "Wholesale Distribution / ERP" },
      { label: "Product Type", value: "Multi-Warehouse Inventory & Order Management" },
      { label: "Core Stack", value: "Angular · PrimeNG · Chart.js · SignalR" },
      { label: "Key Capability", value: "Order-to-Cash & Procure-to-Pay" },
    ],
    capabilities: [
      "Multi-Warehouse Inventory",
      "Order-to-Cash Workflow",
      "Procure-to-Pay Workflow",
      "Lot & Bin Traceability",
      "Barcode & QR Labelling",
      "Landed Cost Tracking",
      "Dynamic Report Builder",
      "BI Dashboard Widgets",
    ],
  },
};
```

- [ ] **Step 3: Register Valyxto in `data/index.ts`**

Modify `src/features/case-studies/data/index.ts`:

```ts
import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";
import { valyxto } from "./valyxto";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
  valyxto,
};
```

- [ ] **Step 4: Run the full test suite**

Run: `npx vitest run`
Expected: all tests PASS.

- [ ] **Step 5: Manual visual-parity check against `valyxto.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/valyxto`, compare against `valyxto.html` exactly as in prior tasks — light/dark mode, mobile/tablet/desktop. Pay particular attention to the 5-step flow diagram (Opportunity → Sales & Purchase Orders → Inventory & Warehouse → Fulfilment & Invoicing → Reporting & BI) since this is the first case study with a 5-card/4-connector flow rather than Compito's 5-card layout with different icons — confirm connector labels ("Convert", "Allocate", "Fulfil", "Visualise") and colors (blue for first three, emerald for the last) match `valyxto.html:185-232` exactly. Revisit `/` and confirm the Valyxto card (emerald accent, badge "3") now appears.

- [ ] **Step 6: Commit**

```bash
git add src/features/case-studies/data/valyxto.ts src/features/case-studies/data/index.ts
git commit -m "feat: add Valyxto case study data"
```

---

### Task 12: BMC Data File

**Files:**
- Create: `src/features/case-studies/data/bmc.ts`
- Modify: `src/features/case-studies/data/index.ts` (register), `src/shared/components/Icon.tsx` (add `pill-bottle` icon)

**Interfaces:**
- Consumes: `CaseStudyData` (Task 6)
- Produces: `bmc` export

- [ ] **Step 1: Add the one new icon BMC introduces**

`bmc.html:216` (flow step "Pathology · Pharmacy · Billing") uses an ellipse/cylinder "pill bottle" glyph not already in `PATHS`: `<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>`.

Modify `src/shared/components/Icon.tsx`: add `"pill-bottle"` to the `IconName` union and add its entry to `PATHS`:

```ts
  "pill-bottle": '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
```

- [ ] **Step 2: Transcribe BMC into `data/bmc.ts`**, reading every field from `bmc.html` (already read in full earlier in this session):

Create `src/features/case-studies/data/bmc.ts`:

```ts
import type { CaseStudyData } from "../types";

export const bmc: CaseStudyData = {
  meta: {
    slug: "bmc",
    shortName: "BMC",
    navLabel: "BMC",
    title: "BMC",
    accentFrom: "violet-500",
    accentTo: "purple-600",
    industry: "Healthcare Provider Operations",
    stack: "Angular · PrimeNG · FullCalendar",
    role: "Senior UI Engineer · Augmented Tech Labs",
  },
  hero: {
    eyebrow: "Project Case Study",
    heading: "A Full-Lifecycle Hospital Management System for Front Desk, Clinical and Financial Operations",
    subheading:
      "BMC covers patient registration, OPD/IPD episodes, pathology, pharmacy, inventory and billing — backed by a library of 40+ MIS reports.",
  },
  metrics: [
    { icon: "users", gradientFrom: "sky-500", gradientTo: "blue-600", value: "Full Lifecycle", description: "Registration through OPD/IPD episodes, encounters and ordered clinical services" },
    { icon: "layers-3d", gradientFrom: "orange-500", gradientTo: "amber-600", value: "Lab + Pharmacy", description: "Pathology sample workflow and drug dispensing/inventory managed on the same platform" },
    { icon: "bar-chart", gradientFrom: "emerald-500", gradientTo: "emerald-600", value: "40+ MIS Reports", description: "Financial, operational and clinical reporting screens covering the whole hospital" },
    { icon: "server", gradientFrom: "violet-500", gradientTo: "purple-600", value: "India-Ready", description: "GST, Aadhaar and PAN fields built directly into the core patient and billing model" },
  ],
  flowTitle: "Patient-to-Report Clinical Flow",
  flowSubtitle: "From registration through clinical service delivery to hospital-wide reporting",
  flow: [
    { icon: "users", iconGradientFrom: "slate-700", iconGradientTo: "slate-900", title: "Patient Registration", subtitle: "Citizen & profile data", connectorLabel: "Admit", connectorColor: "blue" },
    { icon: "calendar", iconGradientFrom: "sky-500", iconGradientTo: "blue-600", title: "Episode (OPD/IPD)", subtitle: "Visit & appointment", connectorLabel: "Order", connectorColor: "blue" },
    { icon: "layers-flag", iconGradientFrom: "orange-500", iconGradientTo: "amber-600", title: "Encounter & Services", subtitle: "Ordered clinical services", connectorLabel: "Deliver", connectorColor: "blue" },
    { icon: "pill-bottle", iconGradientFrom: "violet-500", iconGradientTo: "purple-600", title: "Pathology · Pharmacy · Billing", subtitle: "Delivery & dispensing", connectorLabel: "Report", connectorColor: "emerald" },
    { icon: "bar-chart", iconGradientFrom: "emerald-500", iconGradientTo: "emerald-600", title: "MIS Reports", subtitle: "40+ report screens", highlighted: true },
  ],
  about: {
    icon: "file-text",
    title: "About the Product",
    paragraphs: [
      "BMC is the frontend of a hospital/clinic management system covering front-desk patient registration, OPD/IPD episodes, appointments, pathology and lab workflows, pharmacy, inventory, HR and staff scheduling, financial billing, and a large library of MIS reports.",
      "The data model is built around a real clinical encounter — Episode, Encounter, Care Professional, Care Provider, Facility, Order Set — not a generic CRM, with India-specific regulatory fields (GST code, Aadhaar number, PAN) woven directly into patient and billing records.",
      "Pricing varies by payer class — cash, insurance, corporate — and every ordered clinical service traces back through pathology, pharmacy or billing to the underlying encounter it came from.",
    ],
  },
  challenge: {
    icon: "alert-triangle",
    title: "The Challenge",
    emphasisParagraph:
      "A hospital runs dozens of parallel workflows — registration, lab orders, dispensing, billing — that all have to stay connected to the same patient encounter without slowing staff down.",
    paragraphs: [
      "The system needed a single episode/encounter model that pathology, pharmacy, HR and finance could all hang off, payer-class-aware pricing, and a reporting layer deep enough to cover financial, operational and clinical needs across the hospital.",
    ],
  },
  contribution: [
    { text: "Contributed to this enterprise healthcare platform, used by 200+ government hospital staff." },
    { text: "Reviewed code for 5 frontend developers and design work for 5 UI/UX designers to keep quality and consistency high across the team." },
    { text: "Improved accessibility with keyboard navigation, visible focus states and stronger colour contrast." },
    { text: "Rebuilt the stylesheet on a scalable 7-1 SCSS architecture with customisable PrimeNG theme variables." },
    { text: "Built HTML-to-PDF report generation for printable application reports." },
    { text: "Delivered responsive layouts optimised for small-to-large laptop screens." },
  ],
  outcomes: {
    challenges: [
      "Modelling a real clinical encounter (Episode, Encounter, Ordered Services) rather than a generic record",
      "Connecting pathology sample workflows and pharmacy dispensing back to the same patient visit",
      "Supporting payer-class-specific pricing across cash, insurance and corporate patients",
      "Managing multi-godown (warehouse) inventory and batch-level drug stock across the pharmacy",
      "Building India-specific regulatory fields (GST, Aadhaar, PAN) directly into core data entry",
      "Covering financial, operational and clinical reporting needs in one consistent report library",
    ],
    outcomesIntro: "The platform delivered measurable improvements to how the hospital runs day-to-day operations, including:",
    outcomes: [
      "A single episode/encounter model connecting registration, pathology, pharmacy and billing",
      "Full OPD/IPD visit tracking with treating, co-treating and referring doctor assignment",
      "Payer-class-aware pricing across cash, insurance and corporate billing in one price-list model",
      "Multi-godown pharmacy and inventory tracking down to item, batch and sales rate",
      "A 40+ screen MIS reporting suite spanning financial, operational and clinical needs",
      "India-specific regulatory fields (GST, Aadhaar, PAN) captured natively, not bolted on",
    ],
    summary:
      "BMC gives the hospital one connected system from patient registration through clinical service delivery, pathology, pharmacy and billing — with a 40+ report MIS suite giving staff and management a full operational view.",
  },
  approachIntro:
    "We built BMC as an Angular application structured around a real clinical-encounter data model, with lazily-loaded modules for each hospital department sharing a common table, permission and lookup-caching pattern.",
  approach: [
    { title: "Clinical Data Model & Registration", description: "Patient/citizen records, OPD/IPD episodes and encounters were modelled first, since every other module hangs off this core structure." },
    { title: "Front Desk & Scheduling", description: "Quick registration, multi-field patient search, and appointment/facility booking gave staff a fast, low-friction front-desk workflow." },
    { title: "Pathology & Pharmacy Workflows", description: "Lab sample ordering and collection, plus drug dispensing, GRN and purchasing, connected clinical service delivery back to the patient encounter." },
    { title: "Financial & Billing Engine", description: "Payer-class pricing, voucher categories, ledger mapping and trial-balance reporting gave finance a consistent billing model across patient types." },
    { title: "MIS Reporting Suite", description: "40+ report screens across financial, operational and clinical domains gave every department its own operational view of the hospital." },
  ],
  techStack: [
    { badge: "Ng", category: "Frontend Framework", name: "Angular 17", description: "A PrimeNG-based (Lara Light theme) Angular SPA with lazily-loaded department modules and a shared TableComponent DSL for every list screen.", accent: "sky" },
    { badge: "Fc", category: "Scheduling UI", name: "FullCalendar", description: "FullCalendar drives appointment and resource booking across the front desk, with day/week/timeline views for clinical scheduling.", accent: "orange" },
    { badge: "40+", category: "Reporting", name: "MIS Report Suite", description: "A dedicated reporting module renders financial, operational and clinical report screens, server-generated and streamed back as export-ready files.", accent: "emerald" },
    { badge: "Cj", category: "Charts", name: "Chart.js", description: "Chart.js drives periodic dashboard visuals across financial and operational summaries, alongside Quill for rich-text clinical notes.", accent: "violet" },
  ],
  snapshot: {
    fields: [
      { label: "Industry", value: "Healthcare Provider Operations (India)" },
      { label: "Product Type", value: "Hospital / Clinic Management System" },
      { label: "Core Stack", value: "Angular · PrimeNG · FullCalendar · Chart.js" },
      { label: "Regulatory Focus", value: "GST · Aadhaar · PAN" },
    ],
    capabilities: [
      "Front Desk & Registration",
      "OPD/IPD Episode Management",
      "Pathology & Lab Workflow",
      "Pharmacy & Dispensing",
      "Multi-Godown Inventory",
      "Payer-Class Billing",
      "40+ MIS Reports",
      "HR & Shift Scheduling",
    ],
  },
};
```

- [ ] **Step 3: Register BMC in `data/index.ts`**

Modify `src/features/case-studies/data/index.ts`:

```ts
import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";
import { valyxto } from "./valyxto";
import { bmc } from "./bmc";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
  valyxto,
  bmc,
};
```

- [ ] **Step 4: Run the full test suite**

Run: `npx vitest run`
Expected: all tests PASS.

- [ ] **Step 5: Manual visual-parity check against `bmc.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/bmc`, compare against `bmc.html` exactly as in prior tasks. Confirm the new `pill-bottle` icon renders correctly in both the flow diagram step and matches the original ellipse-based glyph shape. Revisit `/` and confirm the BMC card (violet accent, badge "4") now appears.

- [ ] **Step 6: Commit**

```bash
git add src/features/case-studies/data/bmc.ts src/features/case-studies/data/index.ts src/shared/components/Icon.tsx
git commit -m "feat: add BMC case study data"
```

---

### Task 13: Rota Data File

**Files:**
- Create: `src/features/case-studies/data/rota.ts`
- Modify: `src/features/case-studies/data/index.ts` (register)

**Interfaces:**
- Consumes: `CaseStudyData` (Task 6)
- Produces: `rota` export. This is the last case study — every icon Rota uses (`layers-3d`, `calendar`, `layers-flag`, `users`, `clock`, `bar-chart`) already exists in `PATHS` from prior tasks, so no `Icon.tsx` changes are needed here.

- [ ] **Step 1: Transcribe Rota into `data/rota.ts`**, reading every field from `rota.html` (already read in full earlier in this session):

Create `src/features/case-studies/data/rota.ts`:

```ts
import type { CaseStudyData } from "../types";

export const rota: CaseStudyData = {
  meta: {
    slug: "rota",
    shortName: "Ro",
    navLabel: "Rota",
    title: "rota_web",
    accentFrom: "sky-500",
    accentTo: "blue-600",
    industry: "Workforce Management / UK Care Homes",
    stack: "Angular · PrimeNG · FullCalendar",
    role: "Senior UI Engineer · Augmented Tech Labs",
  },
  hero: {
    eyebrow: "Project Case Study",
    heading: "Staff Rostering, Time & Attendance and Payroll for UK Residential Care Homes",
    subheading:
      "rota_web covers employee records, drag-and-drop shift rostering, time logging and UK-statutory payroll reporting across every Home, Unit and Department.",
  },
  metrics: [
    { icon: "layers-3d", gradientFrom: "sky-500", gradientTo: "blue-600", value: "3-Tier Hierarchy", description: "Home → Unit → Department structure spans every care home site the business operates" },
    { icon: "calendar", gradientFrom: "orange-500", gradientTo: "amber-600", value: "Drag & Drop", description: "FullCalendar-powered shift allocation, auto-allocation and shift swaps" },
    { icon: "layers-flag", gradientFrom: "emerald-500", gradientTo: "emerald-600", value: "UK Payroll", description: "NI numbers, holiday accrual and 4-weekly payroll periods built into the core model" },
    { icon: "server", gradientFrom: "violet-500", gradientTo: "purple-600", value: "Live Coverage", description: "'Who's On' and 'Who's Not Arrived' give safety-critical, real-time shift visibility" },
  ],
  flowTitle: "Employee-to-Payroll Rostering Flow",
  flowSubtitle: "From employee record through shift rostering and time logging to payroll and reporting",
  flow: [
    { icon: "users", iconGradientFrom: "slate-700", iconGradientTo: "slate-900", title: "Employee", subtitle: "HR record per Home", connectorLabel: "Assign", connectorColor: "blue" },
    { icon: "layers-flag", iconGradientFrom: "sky-500", iconGradientTo: "blue-600", title: "Department", subtitle: "Shift requirement", connectorLabel: "Allocate", connectorColor: "blue" },
    { icon: "calendar", iconGradientFrom: "orange-500", iconGradientTo: "amber-600", title: "Roster & Schedule", subtitle: "Drag-drop allocation", connectorLabel: "Clock In", connectorColor: "blue" },
    { icon: "clock", iconGradientFrom: "violet-500", iconGradientTo: "purple-600", title: "Time Log", subtitle: "Clock in / out", connectorLabel: "Calculate", connectorColor: "emerald" },
    { icon: "bar-chart", iconGradientFrom: "emerald-500", iconGradientTo: "emerald-600", title: "Payroll & Reports", subtitle: "Pay periods & hours", highlighted: true },
  ],
  about: {
    icon: "file-text",
    title: "About the Product",
    paragraphs: [
      "rota_web is a workforce-management and staff-scheduling system built for the residential and domiciliary care home sector in the UK — covering employee records, shift rostering, time and attendance, holiday tracking, payroll-hours reporting and role-based user administration.",
      "The organisational hierarchy runs Home → Unit → Department → Job Role → Employee, and the data model carries real UK statutory fields — National Insurance number, Equality Act monitoring data, statutory holiday accrual — alongside care-specific fields like medical conditions and emergency contacts.",
      "Because care staffing is safety-critical, live shift-coverage reports — 'Who's On' and 'Who's Not Arrived' — sit alongside the payroll and reporting suite as first-class report types, not an afterthought.",
    ],
  },
  challenge: {
    icon: "alert-triangle",
    title: "The Challenge",
    emphasisParagraph:
      "Care homes need to know who's actually on shift right now, not just who was scheduled — and every hour logged has to reconcile against UK statutory payroll rules.",
    paragraphs: [
      "The system needed drag-and-drop shift allocation across multiple Homes and Departments, a feature × permission × role matrix fine-grained enough for real operational control, and payroll reporting that matched UK 4-weekly pay periods with regular, overtime and holiday hour breakdowns.",
    ],
  },
  contribution: [
    { text: "Researched and evaluated the FullCalendar library for roster view customisation, theming, multiple view options and print support." },
    { text: "Implemented the interactive dashboard charts using Chart.js." },
  ],
  outcomes: {
    challenges: [
      "Rostering shifts across a Home → Unit → Department hierarchy with department-specific staffing needs",
      "Giving managers live visibility into who's actually on shift versus who was scheduled",
      "Reconciling clocked time against scheduled shifts, with approval and regularisation requests",
      "Modelling UK-statutory payroll correctly — NI numbers, holiday accrual, 4-weekly pay periods",
      "Enforcing fine-grained, feature-level permissions across add/edit/delete/publish/commit actions",
      "Keeping shift-swap, auto-allocation and roster-publish actions safe and auditable",
    ],
    outcomesIntro: "The platform delivered measurable improvements to how care homes manage staffing, including:",
    outcomes: [
      "Drag-and-drop shift rostering across every Home, Unit and Department from one calendar view",
      "Real-time 'Who's On' and 'Who's Not Arrived' coverage reporting for safety-critical staffing",
      "Time & attendance logging with approval and regularisation requests tied to scheduled shifts",
      "UK-statutory payroll reporting — regular, overtime and holiday hours by current vs prior period",
      "A granular feature × permission × role matrix covering 18 distinct rostering actions",
      "Holiday accrual tracking (Accrual vs Fixed, Days vs Hours) matching UK entitlement rules",
    ],
    summary:
      "rota_web gives care home operators one system for staffing every Home — from employee records and drag-and-drop rostering through time logging to UK-statutory payroll, with live coverage reporting that keeps safety-critical staffing visible in real time.",
  },
  approachIntro:
    "We built rota_web as a standalone-component Angular application on PrimeNG and Tailwind, centring the roster module on FullCalendar's resource-timeline view for the drag-and-drop scheduling experience care coordinators needed.",
  approach: [
    { title: "Care-Home Domain & Employee Records", description: "The Home → Unit → Department → Job Role hierarchy and UK-statutory employee fields (NI number, Equality Act data) were modelled first as the foundation for every other module." },
    { title: "Department & Shift Templates", description: "Departments define shift requirements — quantity needed per day, pay rate, job role — that the roster module allocates employees against." },
    { title: "Drag-and-Drop Rostering", description: "A FullCalendar resource-timeline view handles shift allocation, auto-allocation and swaps, with roster publish/commit/clone actions for coordinators." },
    { title: "Time & Attendance, Payroll", description: "Clock in/out, regularisation requests and current-vs-prior-period payroll reporting connect logged hours back to UK statutory pay rules." },
    { title: "Coverage Reporting & Permissions", description: "'Who's On'/'Who's Not Arrived' live reports and an 18-flag feature × permission × role matrix rounded out safety-critical visibility and access control." },
  ],
  techStack: [
    { badge: "Ng", category: "Frontend Framework", name: "Angular 19", description: "Standalone components and Angular Signals throughout, with a custom PrimeNG Aura theme built for the care-home brand.", accent: "sky" },
    { badge: "Tw", category: "CSS Framework", name: "Tailwind CSS v4", description: "Tailwind v4's CSS-first configuration bridges directly with PrimeNG via tailwindcss-primeui, keeping utilities and component theming in sync.", accent: "orange" },
    { badge: "Fc", category: "Scheduling UI", name: "FullCalendar", description: "A resource-timeline FullCalendar view powers the roster module — the largest single component in the app — handling drag-and-drop allocation and shift swaps.", accent: "emerald" },
    { badge: "So", category: "Real-Time", name: "Socket.IO", description: "A Socket.IO channel detects permission changes and forces a re-login for affected users, keeping access control accurate the moment roles change.", accent: "violet" },
  ],
  snapshot: {
    fields: [
      { label: "Industry", value: "Workforce Management / UK Care Homes" },
      { label: "Product Type", value: "Staff Rostering & Payroll System" },
      { label: "Core Stack", value: "Angular · PrimeNG · FullCalendar · Tailwind v4" },
      { label: "Regulatory Focus", value: "UK NI, Equality Act & Holiday Entitlement" },
    ],
    capabilities: [
      "Multi-Home Rostering",
      "Drag-and-Drop Shift Allocation",
      "Time & Attendance Tracking",
      "UK-Statutory Payroll",
      "Holiday & Unavailability Tracking",
      "Who's On Coverage Reporting",
      "Feature-Level Permission Matrix",
      "Employee HR Records",
    ],
  },
};
```

- [ ] **Step 2: Register Rota in `data/index.ts`** (final version of this file):

Modify `src/features/case-studies/data/index.ts`:

```ts
import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";
import { valyxto } from "./valyxto";
import { bmc } from "./bmc";
import { rota } from "./rota";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
  valyxto,
  bmc,
  rota,
};
```

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: all tests PASS.

- [ ] **Step 4: Manual visual-parity check against `rota.html`**

Run: `npm run dev`, navigate to `http://localhost:5173/rota`, compare against `rota.html` exactly as in prior tasks.

- [ ] **Step 5: Full-site final parity pass**

With all 5 case studies now registered, this is the complete parity pass called for by the spec's testing section. For each of the 6 pages (`/`, `/compito`, `/farmgate`, `/valyxto`, `/bmc`, `/rota`):

1. Open the React version and the corresponding original static HTML file side by side.
2. Toggle light and dark mode on the React version; confirm colors, borders and shadows match the original in both modes.
3. Resize to mobile (~375px), tablet (~768px) and desktop (~1440px); confirm layout, spacing and breakpoint behavior match.
4. Confirm every `ProjectSwitcher` pill set now shows all 5 projects, with the current page correctly highlighted and all navigation links working.
5. Confirm the home page's `ProjectGrid` shows all 5 cards in the original order (Compito, FarmGate, Valyxto, BMC, Rota) with correct number badges (1-5), accent colors, descriptions and tags.
6. Confirm the theme choice persists across a full page reload and across navigating between pages (no flash of wrong theme).
7. Confirm scroll-reveal animations, the tilt effect on home page project cards, and the hero background render and behave equivalently to the original on every page.
8. Switch devtools to touch/mobile emulation (or use an actual touch device): confirm project-card tilt is replaced by tap press-feedback, the theme toggle's press-scale still fires, every tap target (nav pills, buttons, links, theme toggle) is comfortably sized for touch, and nothing on the site depends on hover to be reachable or usable.
9. On a mouse/trackpad, confirm every animation and micro-interaction (reveals, tilt spring-back, theme-toggle press, button/link hover states) feels premium — decelerating/spring motion, no linear or snap transitions, no gratuitous or unexplained movement. Enable OS-level "reduce motion" and confirm every animation, including micro-interactions, is replaced by an instant state change.

Fix any drift found. Only once every page passes this full check — parity plus the motion/interaction quality bar — is the migration complete per the spec.

- [ ] **Step 6: Commit**

```bash
git add src/features/case-studies/data/rota.ts src/features/case-studies/data/index.ts
git commit -m "feat: add Rota case study data, completing all 5 case studies"
```

---
