import type { BlogPostMeta } from "../types";

/** Lightweight meta only — safe for the home page bundle (no full post bodies) */
export const blogPostMetas: BlogPostMeta[] = [
  {
    slug: "angular-material-to-primeng",
    title: "Migrating a Large Angular App from Material to PrimeNG (Without a Big-Bang Rewrite)",
    excerpt:
      "How we moved a multi-module Angular workspace off Angular Material and onto PrimeNG one screen at a time, while the product kept shipping.",
    tag: "Angular",
    readTime: "7 min",
    publishedLabel: "Field notes",
    seoTitle: "Migrating Angular Material to PrimeNG Without a Rewrite",
    seoDescription:
      "How a multi-module Angular workspace moved off Material onto PrimeNG one screen at a time, while the product kept shipping.",
    seoKeywords: "angular material to primeng migration, angular ui library migration, primeng theming",
  },
  {
    slug: "scss-architecture-that-survives-teams",
    title: "A 7-1 SCSS Architecture That Survives Multiple Teams and Multiple Years",
    excerpt:
      "Folders were never the architecture. Scope, ownership, dependency direction and blast radius are — here's the model I've rebuilt on three enterprise apps now.",
    tag: "Architecture",
    readTime: "9 min",
    publishedLabel: "Field notes",
    seoTitle: "A 7-1 SCSS Architecture That Survives Multiple Teams",
    seoDescription:
      "Scope, ownership and dependency direction — the SCSS model rebuilt across three enterprise apps, and why folders alone aren't architecture.",
    seoKeywords: "scss 7-1 architecture enterprise, scalable scss architecture, frontend css architecture",
  },
  {
    slug: "design-then-build",
    title: "What Changes When You Design the Component, Then Build It Yourself",
    excerpt:
      "Six years ago I was purely a UI/UX designer handing files to developers. Here's what I learned once I started shipping the code myself.",
    tag: "Design Systems",
    readTime: "5 min",
    publishedLabel: "Field notes",
    seoTitle: "What Changes When You Design the Component, Then Build It",
    seoDescription:
      "Six years as a UI/UX designer handing off Figma files, then shipping the code myself — what actually changes.",
    seoKeywords: "ui/ux designer to frontend developer, figma to code developer, design engineer career",
  },
  {
    slug: "designing-dense-data-tables",
    title: "Designing Data Tables That Don't Overwhelm the People Using Them",
    excerpt:
      "Across a hospital MIS, a care-home roster and a distribution ERP, the table is the product. Here's how I design one that stays usable at 40+ columns.",
    tag: "UI/UX Design",
    readTime: "7 min",
    publishedLabel: "Field notes",
    seoTitle: "Designing Data Tables That Don't Overwhelm Users",
    seoDescription:
      "How to keep a 40+ column table usable, from a hospital MIS, a care-home roster and a distribution ERP.",
    seoKeywords: "designing dense data tables ux, enterprise data table design, ux for complex dashboards",
  },
  {
    slug: "multi-brand-theming-system",
    title: "Building a Theming System That Survives Multiple Brands and Multiple Products",
    excerpt:
      "Rota needed a bespoke care-home brand. Valyxto needed a visual refresh without touching a single working screen. Same token system, two very different jobs.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
    seoTitle: "A Theming System That Survives Multiple Brands",
    seoDescription:
      "One token system, two jobs: a bespoke care-home brand and a visual refresh that touched zero working screens.",
    seoKeywords: "design token theming system multi-brand, design system theming, multi-brand design tokens",
  },
  {
    slug: "designing-states-people-trust",
    title: "Designing Empty, Loading and Error States People Actually Trust",
    excerpt:
      "A blank screen and a broken screen look identical to most users. On safety-critical and financial products, that ambiguity is the actual design bug.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
    seoTitle: "Designing Empty, Loading and Error States People Trust",
    seoDescription:
      "A blank screen and a broken screen look identical to users — why that ambiguity is a real design bug, not an edge case.",
    seoKeywords: "ux empty states loading error design, error state design, ux trust design patterns",
  },
  {
    slug: "typography-for-dense-dashboards",
    title: "Typography Choices for Screens Nobody Reads for Pleasure",
    excerpt:
      "A hospital MIS report and a landing page need opposite typography decisions. Here's how I choose type for interfaces built for speed, not delight.",
    tag: "UI/UX Design",
    readTime: "5 min",
    publishedLabel: "Field notes",
    seoTitle: "Typography Choices for Screens Nobody Reads for Pleasure",
    seoDescription:
      "How type decisions for a hospital MIS report differ from a landing page — designing for speed, not delight.",
    seoKeywords: "typography for dense dashboards ui, enterprise ui typography, dashboard readability design",
  },
  {
    slug: "dark-mode-as-design-system",
    title: "Dark Mode Is a Design System, Not a CSS Toggle",
    excerpt:
      "Every product I've shipped a light/dark toggle for has taught me the same lesson: it's a semantic-token design problem, and it's decided before anyone writes CSS.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
    seoTitle: "Dark Mode Is a Design System, Not a CSS Toggle",
    seoDescription:
      "Why every dark/light toggle I've shipped comes down to semantic tokens decided before anyone writes CSS.",
    seoKeywords: "dark mode design system tokens, semantic color tokens, dark mode ux design",
  },
  {
    slug: "designing-bi-dashboard-widgets",
    title: "Designing BI Dashboard Widgets People Can Actually Read at a Glance",
    excerpt:
      "Valyxto's dashboard turns any saved report into a drag-and-drop chart widget. Designing a chart that has to work for data nobody has seen yet is a different problem.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
    seoTitle: "Designing BI Dashboard Widgets People Can Read at a Glance",
    seoDescription:
      "Turning any saved report into a drag-and-drop chart widget — designing for data nobody has seen yet.",
    seoKeywords: "bi dashboard widget design chart.js, dashboard widget ux, data visualization design",
  },
];
