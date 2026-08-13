import type { CaseStudyData } from "../types";
import { compito } from "./compito";
import { farmgate } from "./farmgate";
import { valyxto } from "./valyxto";
import { bmc } from "./bmc";
import { rota } from "./rota";

export const caseStudies: Record<string, CaseStudyData> = {
  compito,
  farmgate,
  valyxto,
  bmc,
  rota,
};
