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
    impact: "Replaced spreadsheets and inboxes with one system of record for client, project and billable-hour tracking.",
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
  designProcess: [
    {
      stage: "Design in Figma",
      description: "Every module starts as a high-fidelity Figma file — real states, real edge cases, not just the happy path.",
      projectDetail: "Designed end-to-end UI/UX for 6 modules — Client Portal, Document Library, Time Tracking Report, User Management, Template Library and Global Search — before a line of Angular code was written.",
    },
    {
      stage: "Map to the Design System",
      description: "Every Figma component maps one-to-one to a real, typed UI component — no variant exists in the design file that doesn't exist in code.",
      projectDetail: "Configured PrimeUIX theme presets so PrimeNG components picked up the same design tokens Material screens were still using, keeping the system consistent mid-migration.",
    },
    {
      stage: "Build & Implement",
      description: "Standalone components, typed inputs, and a lazy-loaded module structure — engineering discipline that matches the design discipline.",
      projectDetail: "Led the Angular 16 → 22 upgrade, adopting standalone components, the new control flow syntax and OnPush change detection throughout the workspace.",
    },
    {
      stage: "Accessibility & Responsive QA",
      description: "Keyboard navigation, focus order and contrast get verified against the real component, not just checked in the design file.",
      projectDetail: "Built the global search feature with full keyboard navigation and session-based search history, and rebuilt the stylesheet on a 7-1 SCSS architecture to keep theming consistent and accessible.",
    },
    {
      stage: "Ship to Production",
      description: "An environment-based build pipeline and staged rollout, so new modules reach real practices without disruption.",
      projectDetail: "Shipped through dev/qa/uat/prod environments as part of firm-wide rollout, with a light/dark mode toggle service backed by Local Storage for a consistent theming experience.",
    },
  ],
  mockup: {
    title: "Client Portal — Practice Workspace",
    description:
      "An illustrative layout of the client-facing workspace: practice navigation on the left, engagement KPIs and a live client list on the right.",
    navItems: ["Clients", "Projects", "Time Tracking", "Documents", "Templates", "Reports"],
    columns: ["Client", "Engagement", "Owner", "Status"],
    rowCount: 6,
    stats: [
      { label: "Active Clients", value: "128" },
      { label: "Open Projects", value: "342" },
      { label: "Hours Logged", value: "1.2k" },
      { label: "Pending Approval", value: "18" },
    ],
  },
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
