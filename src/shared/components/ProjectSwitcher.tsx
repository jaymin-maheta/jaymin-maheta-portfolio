import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyMeta } from "../../features/case-studies/types";

interface ProjectSwitcherProps {
  projects: CaseStudyMeta[];
  activeSlug: string;
}

export function ProjectSwitcher({ projects, activeSlug }: ProjectSwitcherProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Project switcher" className="flex flex-wrap items-center gap-1.5">
      {projects.map((project) =>
        project.slug === activeSlug ? (
          <span
            key={project.slug}
            aria-current="page"
            className="relative rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-white"
          >
            <motion.span
              layoutId="project-switcher-active"
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full bg-brand-blue shadow-sm shadow-brand-blue/25"
            />
            <span className="relative z-10">{project.navLabel}</span>
          </span>
        ) : (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="theme-transition rounded-full border border-border-strong bg-bg-surface-alt px-3.5 py-1.5 text-[12.5px] font-medium text-text-body transition hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2"
          >
            {project.navLabel}
          </Link>
        )
      )}
    </nav>
  );
}
