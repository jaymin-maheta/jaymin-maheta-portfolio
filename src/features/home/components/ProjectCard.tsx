import { TiltCard } from "../../../shared/components/TiltCard";
import type { CaseStudyMeta } from "../../case-studies/types";

interface ProjectCardProps {
  project: CaseStudyMeta;
  index: number;
  description: string;
  tags: string[];
}

export function ProjectCard({ project, index, description, tags }: ProjectCardProps) {
  return (
    <TiltCard
      href={`/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border-strong bg-bg-surface shadow-xl shadow-slate-900/5 transition hover:border-brand-blue hover:shadow-2xl"
    >
      <span className={`block h-1.5 bg-gradient-to-r from-${project.accentFrom} to-${project.accentTo}`}></span>
      <div className="flex flex-1 flex-col p-6">
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-${project.accentFrom} to-${project.accentTo} text-sm font-extrabold text-white shadow-lg`}>
          {index + 1}
        </div>
        <h3 className="mb-2 text-lg font-extrabold text-text-heading transition group-hover:text-brand-blue">{project.title}</h3>
        <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-text-muted">{description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-bg-surface-alt px-2.5 py-1 text-[11px] font-bold text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-brand-blue">
          View case study
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </TiltCard>
  );
}
