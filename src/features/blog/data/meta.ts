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
];
