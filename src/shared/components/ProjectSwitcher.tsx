import { Link } from "react-router-dom";
import type { CaseStudyMeta } from "../../features/case-studies/types";

interface ProjectSwitcherProps {
  projects: CaseStudyMeta[];
  activeSlug: string;
}

export function ProjectSwitcher({ projects, activeSlug }: ProjectSwitcherProps) {
  return (
    <nav aria-label="Project switcher" className="flex flex-wrap items-center gap-1.5">
      {projects.map((project) =>
        project.slug === activeSlug ? (
          <span
            key={project.slug}
            aria-current="page"
            className="rounded-full bg-brand-blue px-3.5 py-1.5 text-[12.5px] font-semibold text-white shadow-sm shadow-brand-blue/25"
          >
            {project.navLabel}
          </span>
        ) : (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="theme-transition rounded-full border border-border-strong bg-bg-surface-alt px-3.5 py-1.5 text-[12.5px] font-medium text-text-body transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2"
          >
            {project.navLabel}
          </Link>
        )
      )}
    </nav>
  );
}
