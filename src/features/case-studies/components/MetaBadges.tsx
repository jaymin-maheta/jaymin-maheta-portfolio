import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { CaseStudyMeta } from "../types";

export function MetaBadges({ meta }: { meta: CaseStudyMeta }) {
  return (
    <div className="theme-transition relative z-10 border-b border-border-light bg-bg-surface px-5 py-4 sm:px-8 md:px-12 lg:px-16">
      <RevealGroup className="mx-auto flex max-w-7xl flex-wrap gap-2.5">
        <RevealItem className="inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface-alt px-3.5 py-1.5 text-[12.5px] font-medium text-text-heading">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
          Industry: {meta.industry}
        </RevealItem>
        <RevealItem className="inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface-alt px-3.5 py-1.5 text-[12.5px] font-medium text-text-heading">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
          Stack: {meta.stack}
        </RevealItem>
        <RevealItem className="inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface-alt px-3.5 py-1.5 text-[12.5px] font-medium text-text-heading">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
          My Role: {meta.role}
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
