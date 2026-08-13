# Portfolio Site: Static HTML → React + TypeScript + Vite Migration

**Date:** 2026-08-13
**Status:** Draft for review

## Context

The current site is 6 static, hand-authored HTML files (`index.html` +
`compito.html`, `farmgate.html`, `valyxto.html`, `bmc.html`, `rota.html`),
~2,900 lines total, using Tailwind v4 via browser CDN, GSAP + ScrollTrigger
for scroll reveals, three.js for an animated hero background, and small
vanilla-JS files for dark-mode theming.

All 5 case-study pages share an **identical section skeleton** — navbar,
project-switcher pills, meta badges, hero, metrics grid, architecture flow
diagram, about/challenge panels, contribution checklist, challenges/outcomes,
approach steps, tech stack grid, footer snapshot — differing only in text,
icon choice, counts (e.g. number of flow steps), and accent colors. This is
pure copy-paste duplication and the primary motivation for the migration.

**Goal:** rebuild as a Vite + React + TypeScript app that is easy to extend
(new case study = new data file, not new markup) and sets up cleanly for a
**future admin panel** that will let content be edited without a redeploy —
today's static data files must sit behind a seam that a later API-backed
implementation can slot into without touching any component.

## Hard constraint: 100% visual and behavioral parity, EXCEPT animation/interaction quality

Nothing about what the visitor sees or experiences may change, with one
deliberate exception carved out below for motion and micro-interaction
quality. Every page must look and behave identically to the current
static HTML — same layout, spacing, colors, copy, icons, gradients,
light/dark theming, responsive breakpoints, and interactive behavior
(theme toggle, link targets, *what* triggers *when*). This migration
changes *how the markup is produced and maintained* (React components +
typed data instead of duplicated HTML), not what is rendered. Any place
where an exact 1:1 translation isn't possible (e.g. canvas hero vs.
three.js hero) must be implemented to be visually indistinguishable at
normal viewing — not merely "close" or "equivalent in spirit." The
migration is not complete until each of the 6 pages has been diffed
side-by-side against the current static HTML, in both light and dark
mode, at mobile/tablet/desktop widths, with no observable difference
**except** the deliberate motion/interaction upgrades described below.

## Motion & interaction quality bar (the one deliberate exception to parity)

Every animation and micro-interaction must exist for a reason and must
read as premium — the standard is Apple-caliber product-site motion:
confident, restrained, physically plausible, never gratuitous. This is
an explicit, scoped exception to the parity constraint above — it is the
one place this migration is allowed to exceed rather than only match the
original.

- **Purposeful, not decorative.** Every transition should communicate
  something — state change, hierarchy, causality, spatial relationship —
  not just "move because it can." If a motion doesn't clarify something
  for the user, cut it.
- **Premium easing and timing.** Favor spring-based or custom cubic-bezier
  curves that decelerate naturally (no linear motion, no default
  ease-in-out on anything user-facing) — the same class of curve Apple
  uses on product pages: quick to start, settled arrival, no bounce
  unless the interaction specifically calls for a springy, tactile
  response (e.g. a button press). Durations stay short (150–400ms for
  most UI feedback; scroll-reveals can run slightly longer) — premium
  motion is felt, not watched.
- **This may exceed the original's animation set.** The current static
  site's reveal/tilt/hero-background motion is the *floor*, not the
  ceiling — where a genuinely small, purposeful micro-interaction would
  make an interactive element (buttons, links, toggles, cards, nav
  pills) feel more premium without changing layout, content, or the
  element's function, it may be added even though the original didn't
  have it. This does not license broad decorative additions — each new
  micro-interaction must be justifiable in one sentence (what state or
  affordance it communicates).
- **Fully interactive on every device, adapted per input type.** Pointer-
  hover-driven effects (the project-card tilt, hover states) must have a
  touch-appropriate equivalent on touch devices rather than simply going
  inert — e.g. tap/press feedback (a brief scale or elevation change on
  `pointerdown`/`pointerup`) standing in for the hover tilt, detected via
  `(hover: hover) and (pointer: fine)` media query or a pointer-type
  check, not by assuming device width. Scroll-driven reveals already work
  identically across input types and need no adaptation.
- **`prefers-reduced-motion` still governs everything**, including any
  new micro-interactions added under this exception — reduced-motion
  users get instant state changes, never a stripped-down version of the
  animation.
- **Fully responsive** at every breakpoint the original supports
  (mobile/tablet/desktop) and interactive (tap targets sized for touch,
  no hover-only affordances that leave a function unreachable on
  touch-only devices).

## Requirements

- Single dynamic route (`/:slug`) renders any case study from typed data —
  no per-project page components.
- Feature-based folder structure: group by domain (`case-studies`, `home`,
  `theme`), not by technical layer.
- Strict TypeScript throughout; case-study content is validated by the type
  system, not runtime checks.
- React Router for navigation (`/`, `/:slug`, 404 fallback).
- Data access goes through a repository seam (`getAllCaseStudies()` /
  `getCaseStudyBySlug()`) so the future admin panel can replace the static
  data source with an API client behind the same interface.
- Preserve current visual behavior: scroll reveals with stagger, pointer
  tilt on project cards, animated hero background, light/dark theme
  persisted to `localStorage` with no flash-of-wrong-theme on load,
  `prefers-reduced-motion` respected — reimplemented at the premium
  motion-quality bar defined above, not merely ported as-is.
- Drop GSAP, ScrollTrigger, and three.js. Replace with **framer-motion**
  for reveals/stagger/tilt, and a **hand-rolled canvas/CSS** hero
  background (no three.js dependency).
- Touch-appropriate equivalents for every pointer-hover-only interaction
  (see Motion & interaction quality bar above).
- Tailwind stays, but as a proper build-time dependency (not the browser
  CDN JIT build) — config translated from the current `theme-variables.css`
  tokens.

## Non-goals (this pass)

- The admin panel itself — only the data-access seam that will let it be
  added later without touching feature components.
- Content changes — text/copy carries over as-is from the existing HTML.
- Backend/API — data stays static TypeScript for now.

## Architecture

### Folder structure

```
src/
  app/
    App.tsx                  — providers (theme) + <RouterProvider>
    routes.tsx                — route table
  features/
    case-studies/
      types.ts                — CaseStudyData and all sub-shapes (strict)
      data/
        compito.ts
        farmgate.ts
        valyxto.ts
        bmc.ts
        rota.ts
        index.ts               — assembles the slug → CaseStudyData map
      repository.ts            — getAllCaseStudies(), getCaseStudyBySlug()
                                  (the seam the future admin/API swaps in)
      components/
        CaseStudyHero.tsx
        MetaBadges.tsx
        MetricsGrid.tsx
        FlowDiagram.tsx
        InfoCard.tsx            — generic bordered icon+title+body card
        ContributionCard.tsx
        OutcomesSection.tsx     — challenges list + outcomes list + summary
        ApproachSteps.tsx
        TechStackGrid.tsx
        SnapshotFooter.tsx
      pages/
        CaseStudyPage.tsx       — single dynamic route target
    home/
      components/
        HomeHero.tsx
        RecognitionStrip.tsx
        ProjectGrid.tsx
        ProjectCard.tsx
      pages/
        HomePage.tsx
    theme/
      ThemeToggle.tsx
      useTheme.ts               — reads/writes localStorage + <html>.dark
  shared/
    components/
      Layout.tsx                 — outer rounded-card shell
      Navbar.tsx                 — logo/title + ThemeToggle; case-study
                                    pages pass project-switcher pills as
                                    children/prop
      ProjectSwitcher.tsx         — pill nav between case studies
      Footer.tsx                  — simple index-page footer
      Reveal.tsx                  — framer-motion whileInView wrapper
                                    (variants: up / left / right)
      RevealGroup.tsx             — staggered children wrapper
      TiltCard.tsx                — framer-motion pointer-tilt wrapper
      HeroBackground.tsx          — canvas/CSS animated hero backdrop
    lib/
      reducedMotion.ts            — prefers-reduced-motion helper
  main.tsx
  index.css                       — Tailwind entry + design tokens
index.html
vite.config.ts
tailwind.config.ts
tsconfig.json
```

### Data model (`features/case-studies/types.ts`)

Strict types mirror every distinct content shape found across the 5 pages:

```ts
export interface CaseStudyMeta {
  slug: string;
  shortName: string;       // navbar initials, e.g. "Co"
  title: string;           // "Compito"
  navLabel: string;        // pill label, e.g. "FarmGate"
  accentFrom: string;      // tailwind gradient stop, e.g. "sky-500"
  accentTo: string;
  industry: string;
  stack: string;           // display string for meta badge
  role: string;
}

export interface HeroContent {
  eyebrow: string;          // "Project Case Study"
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
  title: string;
  subtitle: string;
  connectorLabel?: string;   // omitted on the last step
  highlighted?: boolean;     // e.g. the emerald "Reports" terminal step
}

export interface InfoPanel {
  icon: IconName;
  title: string;
  paragraphs: string[];
}

export interface ContributionItem {
  text: string;
}

export interface OutcomesContent {
  challenges: string[];
  outcomesIntro?: string;
  outcomes: string[];
  summary: string;
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface TechStackCard {
  badge: string;             // "Ng", "Pn", "Qb", "Rt"
  category: string;          // "Frontend Framework"
  name: string;               // "Angular 22"
  description: string;
  accent: string;             // color family for badge + border-top
}

export interface SnapshotContent {
  industry: string;
  productType: string;
  coreStack: string;
  keyIntegrations: string;
  capabilities: string[];
}

export interface CaseStudyData {
  meta: CaseStudyMeta;
  hero: HeroContent;
  metrics: MetricCard[];        // always 4 today, typed as array (not tuple)
  flow: FlowStep[];
  about: InfoPanel;
  challenge: { intro: string; paragraphs: string[] };
  contribution: ContributionItem[];
  outcomes: OutcomesContent;
  approach: { intro: string; steps: ApproachStep[] };
  techStack: TechStackCard[];
  snapshot: SnapshotContent;
}
```

`IconName` is a string-literal union of the small set of stroke icons
reused across pages (shield, users, layers, clock, etc.), rendered by one
shared `<Icon name="..." />` component — avoids inlining raw SVG paths in
every data file.

### Repository seam (`features/case-studies/repository.ts`)

```ts
export function getAllCaseStudies(): CaseStudyMeta[]  // for ProjectGrid/nav
export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined
```

Today these read from the static `data/index.ts` map synchronously. Pages
and components only ever import from `repository.ts`, never from
`data/*.ts` directly — when the admin panel arrives, this file becomes an
async API client (`Promise`-returning) and callers change in one place
(likely via React Router loaders at that point).

### Routing

- `/` → `HomePage`
- `/:slug` → `CaseStudyPage`, looks up via `getCaseStudyBySlug`; unknown
  slug renders a not-found state (simple message + link home) rather than
  crashing, since slugs may later be admin-managed and not fixed at build
  time.

### Animation approach

- **Reveal/stagger:** `Reveal` and `RevealGroup` wrap framer-motion's
  `motion.div` with `whileInView` + `viewport={{ once: true }}`, replacing
  the `.reveal`/`.reveal-left`/`.reveal-right`/`.reveal-item` GSAP classes
  and `ScrollTrigger` calls. Nav/hero entrance (currently immediate,
  staggered on load) becomes a mount-time `animate` stagger instead of
  scroll-triggered.
- **Tilt cards:** `TiltCard` uses framer-motion `useMotionValue` +
  `useTransform` driven by `onPointerMove`, replacing the manual GSAP
  pointer-tilt logic in `animations.js`, with spring-based settle-back
  (not linear) for a physically plausible feel.
- **Touch equivalent for tilt:** `TiltCard` detects `(hover: hover) and
  (pointer: fine)`; on devices that fail that check, pointer-move tilt is
  skipped and a `whileTap` press affordance (subtle scale/elevation
  change) takes its place instead, so the card still gives interactive
  feedback on tap.
- **Easing:** all framer-motion `transition`s use an explicit
  Apple-style decelerating curve (e.g. `[0.16, 1, 0.3, 1]`) or a spring
  config, never the library default or a linear/ease-in-out fallback.
- **Reduced motion:** a `useReducedMotion` check (framer-motion ships this
  hook) disables reveal/tilt/micro-interaction motion for every
  animation defined in this spec, including any added under the
  motion-quality exception — reduced-motion users always get an instant
  state change.
- **Hero background:** `HeroBackground` is a `<canvas>`-based component
  reimplementing the flowing gradient-line look with plain 2D canvas
  drawing (bezier curves, per-frame `requestAnimationFrame`, pause via
  `IntersectionObserver` when off-screen) — no WebGL/three.js dependency.
  Same degrade-silently behavior: skip entirely under reduced motion or if
  canvas 2D context is unavailable.

### Theming

`useTheme` hook: on mount, reconciles `localStorage['theme']` and
`prefers-color-scheme`, applies/removes `.dark` on `<html>`. To avoid a
flash of wrong theme before React hydrates, a small inline script stays in
`index.html`'s `<head>` (same approach as today's `theme-init.js`, just
kept as raw inline JS since it must run pre-paint, before any bundle
loads).

### Design tokens

`theme-variables.css` values move into `tailwind.config.ts` as `theme.extend.colors`
(referencing CSS custom properties defined in `index.css` under `:root`
and `:root.dark`), preserving the same token names
(`bg-canvas`, `text-heading`, `brand-blue`, etc.) so existing Tailwind
utility classes in the migrated JSX need no renaming.

## Testing

- Component-level: no test framework currently exists in this static
  project; introduce Vitest + React Testing Library for the shared
  components most worth covering (`useTheme` persistence/no-flash logic,
  `CaseStudyPage` renders all sections given a `CaseStudyData` fixture,
  `repository.ts` lookup behavior including the unknown-slug case).
- Visual parity (required, not optional): before any case study is
  considered done, its migrated page is opened side-by-side with the
  original static HTML file for that project — same viewport, same theme
  — and checked section-by-section for pixel-level layout, color, spacing,
  copy, and icon differences. Repeat for light mode, dark mode, and at
  minimum mobile/tablet/desktop breakpoints. Any drift is a bug to fix,
  not an acceptable side effect of the rewrite. This applies to all 6
  pages (home + 5 case studies) before the migration is considered
  complete.

## Migration approach

Content transcription (turning ~500 lines of HTML per case study into a
typed data object) is mechanical but sizable — 5 data files. The plan
step (next, via writing-plans) should sequence this as: scaffold app +
shared components + repository seam first, prove the pattern end-to-end
with one case study (Compito), then transcribe the remaining 4 data files
once the template is validated.
