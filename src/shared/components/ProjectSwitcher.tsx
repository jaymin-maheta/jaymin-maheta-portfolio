import { Link } from "react-router-dom";
import type { CaseStudyMeta } from "../../features/case-studies/types";

interface ProjectSwitcherProps {
  projects: CaseStudyMeta[];
  activeSlug: string;
}

export function ProjectSwitcher({ projects, activeSlug }: ProjectSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {projects.map((project) =>
        project.slug === activeSlug ? (
          <span
            key={project.slug}
            className="rounded-full bg-brand-blue px-4 py-1.5 text-[13px] font-bold text-white shadow-md shadow-brand-blue/30"
          >
            {project.navLabel}
          </span>
        ) : (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-1.5 text-[13px] font-bold text-text-body transition hover:border-brand-blue hover:text-brand-blue"
          >
            {project.navLabel}
          </Link>
        )
      )}
    </div>
  );
}
