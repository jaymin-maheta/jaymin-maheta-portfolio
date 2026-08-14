import { blogPostMetas } from "./data/meta";
import type { BlogPost, BlogPostMeta } from "./types";

/** Stable, lightweight list for the home page — does NOT import full post bodies */
export function getAllBlogPosts(): BlogPostMeta[] {
  return blogPostMetas;
}

/** Dynamic import keeps full post bodies out of the home bundle */
export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  switch (slug) {
    case "angular-material-to-primeng":
      return (await import("./data/angular-material-to-primeng")).angularMaterialToPrimeng;
    case "scss-architecture-that-survives-teams":
      return (await import("./data/scss-architecture-that-survives-teams"))
        .scssArchitectureThatSurvivesTeams;
    case "design-then-build":
      return (await import("./data/design-then-build")).designThenBuild;
    case "designing-dense-data-tables":
      return (await import("./data/designing-dense-data-tables")).designingDenseDataTables;
    case "multi-brand-theming-system":
      return (await import("./data/multi-brand-theming-system")).multiBrandThemingSystem;
    case "designing-states-people-trust":
      return (await import("./data/designing-states-people-trust")).designingStatesPeopleTrust;
    case "typography-for-dense-dashboards":
      return (await import("./data/typography-for-dense-dashboards")).typographyForDenseDashboards;
    case "dark-mode-as-design-system":
      return (await import("./data/dark-mode-as-design-system")).darkModeAsDesignSystem;
    case "designing-bi-dashboard-widgets":
      return (await import("./data/designing-bi-dashboard-widgets")).designingBiDashboardWidgets;
    default:
      return undefined;
  }
}
