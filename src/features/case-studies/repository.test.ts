import { describe, it, expect } from "vitest";
import { getAllCaseStudies, getCaseStudyBySlug } from "./repository";

describe("case-studies repository", () => {
  it("getAllCaseStudies returns a non-empty list of case study metadata", () => {
    const all = getAllCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toHaveProperty("slug");
    expect(all[0]).toHaveProperty("navLabel");
  });

  it("getCaseStudyBySlug returns full data for a known slug", () => {
    const all = getAllCaseStudies();
    const knownSlug = all[0].slug;
    const data = getCaseStudyBySlug(knownSlug);
    expect(data).toBeDefined();
    expect(data?.meta.slug).toBe(knownSlug);
  });

  it("getCaseStudyBySlug returns undefined for an unknown slug", () => {
    const data = getCaseStudyBySlug("not-a-real-project-slug");
    expect(data).toBeUndefined();
  });
});
