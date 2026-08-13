import { memo } from "react";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { ProjectCard } from "./ProjectCard";
import type { CaseStudyMeta } from "../../case-studies/types";

const SUMMARIES: Record<string, { description: string; tags: string[] }> = {
  compito: {
    description: "Multi-tenant practice management platform for accounting firms.",
    tags: ["Angular", "PrimeNG", "SignalR"],
  },
  farmgate: {
    description: "Full-traceability inventory, formulation and sales ERP for a UK feed business.",
    tags: ["React", "NestJS", "MySQL"],
  },
  valyxto: {
    description: "Multi-warehouse distribution ERP for order-to-cash and procure-to-pay.",
    tags: ["Angular", "PrimeNG", "Chart.js"],
  },
  bmc: {
    description: "Full-lifecycle hospital management system for a 200+ staff government platform.",
    tags: ["Angular", "PrimeNG", "FullCalendar"],
  },
  rota: {
    description: "Staff rostering, time & attendance and payroll for UK care homes.",
    tags: ["Angular", "PrimeNG", "FullCalendar"],
  },
};

// Warm the case-study chunk when the user shows intent to navigate
function prefetchCaseStudy() {
  void import("../../case-studies/pages/CaseStudyPage");
}

function ProjectGridComponent({ projects }: { projects: CaseStudyMeta[] }) {
  return (
    <section aria-labelledby="projects-heading" onMouseEnter={prefetchCaseStudy} onFocus={prefetchCaseStudy}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Selected Work
      </p>
      <h2
        id="projects-heading"
        className="mb-3 text-2xl font-extrabold tracking-tight text-text-heading sm:text-3xl"
      >
        Project Case Studies
      </h2>
      <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
        Five enterprise applications spanning practice management, distribution ERP, hospital operations, feed manufacturing and workforce rostering — each page covers the product, the architecture and exactly what I personally built.
      </p>
      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const summary = SUMMARIES[project.slug];
          return (
            <RevealItem key={project.slug} className="contents">
              <ProjectCard
                project={project}
                index={i}
                description={summary?.description ?? ""}
                tags={summary?.tags ?? []}
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}

export const ProjectGrid = memo(ProjectGridComponent);
