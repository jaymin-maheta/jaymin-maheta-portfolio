import { memo } from "react";
import { TiltCard } from "../../../shared/components/TiltCard";
import type { CaseStudyMeta } from "../../case-studies/types";

interface ProjectCardProps {
  project: CaseStudyMeta;
  index: number;
  description: string;
  tags: string[];
}

function ProjectCardComponent({ project, index, description, tags }: ProjectCardProps) {
  return (
    <TiltCard
      to={`/${project.slug}`}
      className="group theme-transition flex flex-col overflow-hidden rounded-2xl border border-border-light bg-bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:border-brand-blue/40 hover:shadow-[var(--shadow-lg)]"
    >
      <span
        className={`block h-1 bg-gradient-to-r from-${project.accentFrom} to-${project.accentTo}`}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-${project.accentFrom} to-${project.accentTo} text-sm font-bold text-white shadow-md`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <h3 className="mb-2 text-[17px] font-bold leading-snug text-text-heading transition group-hover:text-brand-blue">
          {project.title}
        </h3>

        <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-text-muted">
          {description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-bg-surface-alt px-2 py-0.5 text-[11px] font-medium text-text-muted ring-1 ring-border-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue transition group-hover:gap-2.5">
          View case study
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </TiltCard>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
