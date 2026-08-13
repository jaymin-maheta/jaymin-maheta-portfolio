import { caseStudies } from "./data";
import type { CaseStudyData, CaseStudyMeta } from "./types";

export function getAllCaseStudies(): CaseStudyMeta[] {
  return Object.values(caseStudies).map((entry) => entry.meta);
}

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudies[slug];
}
