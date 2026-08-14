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
  },
  {
    slug: "scss-architecture-that-survives-teams",
    title: "A 7-1 SCSS Architecture That Survives Multiple Teams and Multiple Years",
    excerpt:
      "The stylesheet structure I've rebuilt on three separate enterprise apps now, and why the boring, disciplined version wins over the clever one every time.",
    tag: "Architecture",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "design-then-build",
    title: "What Changes When You Design the Component, Then Build It Yourself",
    excerpt:
      "Six years ago I was purely a UI/UX designer handing files to developers. Here's what I learned once I started shipping the code myself.",
    tag: "Design Systems",
    readTime: "5 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "designing-dense-data-tables",
    title: "Designing Data Tables That Don't Overwhelm the People Using Them",
    excerpt:
      "Across a hospital MIS, a care-home roster and a distribution ERP, the table is the product. Here's how I design one that stays usable at 40+ columns.",
    tag: "UI/UX Design",
    readTime: "7 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "multi-brand-theming-system",
    title: "Building a Theming System That Survives Multiple Brands and Multiple Products",
    excerpt:
      "Rota needed a bespoke care-home brand. Valyxto needed a visual refresh without touching a single working screen. Same token system, two very different jobs.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "designing-states-people-trust",
    title: "Designing Empty, Loading and Error States People Actually Trust",
    excerpt:
      "A blank screen and a broken screen look identical to most users. On safety-critical and financial products, that ambiguity is the actual design bug.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "typography-for-dense-dashboards",
    title: "Typography Choices for Screens Nobody Reads for Pleasure",
    excerpt:
      "A hospital MIS report and a landing page need opposite typography decisions. Here's how I choose type for interfaces built for speed, not delight.",
    tag: "UI/UX Design",
    readTime: "5 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "dark-mode-as-design-system",
    title: "Dark Mode Is a Design System, Not a CSS Toggle",
    excerpt:
      "Every product I've shipped a light/dark toggle for has taught me the same lesson: it's a semantic-token design problem, and it's decided before anyone writes CSS.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  {
    slug: "designing-bi-dashboard-widgets",
    title: "Designing BI Dashboard Widgets People Can Actually Read at a Glance",
    excerpt:
      "Valyxto's dashboard turns any saved report into a drag-and-drop chart widget. Designing a chart that has to work for data nobody has seen yet is a different problem.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
];
