import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { TiltCard } from "../../../shared/components/TiltCard";
import type { CaseStudyMeta } from "../../case-studies/types";

interface ProjectCardProps {
  project: CaseStudyMeta;
  index: number;
  description: string;
  tags: string[];
}

function ProjectCardComponent({ project, index, description, tags }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <TiltCard
      to={`/${project.slug}`}
      className="group theme-transition relative flex flex-col overflow-hidden rounded-2xl border border-border-light bg-bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[var(--shadow-xl)]"
    >
      <span
        className="block h-1 bg-gradient-to-r from-accent-500 to-accent-300"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-800 to-primary-950 text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <h3 className="mb-2 font-display text-[17px] font-semibold leading-snug text-text-heading transition group-hover:text-brand-blue">
          {project.title}
        </h3>

        <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-text-muted">{description}</p>

        {/* Impact reveal — hidden until hover/focus, expands smoothly */}
        <div
          className={
            reduceMotion
              ? "mb-3 overflow-hidden"
              : "mb-0 grid grid-rows-[0fr] overflow-hidden opacity-0 transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-out group-hover:mb-3 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mb-3 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"
          }
        >
          <p className="min-h-0 rounded-lg border border-border-light bg-bg-surface-alt px-3 py-2.5 text-[12.5px] font-medium leading-relaxed text-text-body">
            {project.impact}
          </p>
        </div>

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
