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
    impact: "One traceable system from raw-material delivery to sale, with FEFO rotation and live recipe cost roll-up.",
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
  designProcess: [
    {
      stage: "Design in Figma",
      description: "Every module starts as a high-fidelity Figma file — real states, real edge cases, not just the happy path.",
      projectDetail: "Interface design covered the goods-in, formulation and sales screens — dense data-entry flows built around the UK feed-assurance fields the business is legally required to capture.",
    },
    {
      stage: "Map to the Design System",
      description: "Every Figma component maps one-to-one to a real, typed UI component — no variant exists in the design file that doesn't exist in code.",
      projectDetail: "PrimeReact tables, dialogs and forms were the target component set, chosen for the density these goods-in and formulation screens needed.",
    },
    {
      stage: "Build & Implement",
      description: "React and NestJS, with every multi-step inventory change wrapped in a database transaction from day one — non-negotiable once stock deduction touches purchases, recipes and sales at once.",
      projectDetail: "The purchase, recipe and sales engines were built as one connected pipeline, with FEFO-ordered batch selection and live cost roll-up recalculated at every level.",
    },
    {
      stage: "Accessibility & Responsive QA",
      description: "Keyboard navigation, focus order and contrast get verified against the real component, not just checked in the design file.",
      projectDetail: "Dense data-entry screens were tested for keyboard-driven goods-in workflows, since warehouse staff often work off keyboard shortcuts rather than a mouse.",
    },
    {
      stage: "Ship to Production",
      description: "A repeatable release process so new inventory rules reach the warehouse floor without disrupting daily goods-in and goods-out.",
      projectDetail: "The app deploys to AWS EC2 behind PM2, with every create, edit and ingredient change written to a dedicated history table for full auditability.",
    },
  ],
  mockup: {
    title: "Inventory Dashboard — Batch Overview",
    description:
      "An illustrative layout of the goods-in dashboard: batch traceability fields and stock valuation at a glance, FEFO order enforced automatically.",
    navItems: ["Purchases", "Recipes", "Sales", "Dashboard", "Reports"],
    columns: ["Batch", "UFAS No.", "Expiry", "Stock"],
    rowCount: 6,
    stats: [
      { label: "Active Batches", value: "86" },
      { label: "Low Stock Alerts", value: "4" },
      { label: "Recipes Live", value: "23" },
      { label: "This Month Sold", value: "£142k" },
    ],
  },
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
