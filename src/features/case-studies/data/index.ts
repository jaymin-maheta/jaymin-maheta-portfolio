import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";
import { valyxto } from "./valyxto";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
  valyxto,
};
