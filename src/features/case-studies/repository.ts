import { caseStudyMetas } from "./data/meta";
import type { CaseStudyData, CaseStudyMeta } from "./types";

/** Stable, lightweight list for the home page — does NOT import full case-study bodies */
export function getAllCaseStudies(): CaseStudyMeta[] {
  return caseStudyMetas;
}

/** Dynamic import keeps full case-study data out of the home bundle */
export async function loadCaseStudyBySlug(
  slug: string
): Promise<CaseStudyData | undefined> {
  switch (slug) {
    case "compito":
      return (await import("./data/compito")).compito;
    case "farmgate":
      return (await import("./data/farmgate")).farmgate;
    case "valyxto":
      return (await import("./data/valyxto")).valyxto;
    case "bmc":
      return (await import("./data/bmc")).bmc;
    case "rota":
      return (await import("./data/rota")).rota;
    default:
      return undefined;
  }
}

/** Sync lookup kept for tests / callers that already hold data — prefer loadCaseStudyBySlug in pages */
export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  // Intentionally not used on the critical path anymore.
  // Left as a thin stub so existing tests that mock the module still type-check.
  void slug;
  return undefined;
}
