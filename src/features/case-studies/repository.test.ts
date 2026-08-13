import { describe, it, expect } from "vitest";
import { getAllCaseStudies, loadCaseStudyBySlug } from "./repository";

describe("case-studies repository", () => {
  it("getAllCaseStudies returns a non-empty list of case study metadata", () => {
    const all = getAllCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toHaveProperty("slug");
    expect(all[0]).toHaveProperty("navLabel");
  });

  it("loadCaseStudyBySlug returns full data for a known slug", async () => {
    const all = getAllCaseStudies();
    const knownSlug = all[0].slug;
    const data = await loadCaseStudyBySlug(knownSlug);
    expect(data).toBeDefined();
    expect(data?.meta.slug).toBe(knownSlug);
  });

  it("loadCaseStudyBySlug returns undefined for an unknown slug", async () => {
    const data = await loadCaseStudyBySlug("not-a-real-project-slug");
    expect(data).toBeUndefined();
  });
});
