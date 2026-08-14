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
    default:
      return undefined;
  }
}
