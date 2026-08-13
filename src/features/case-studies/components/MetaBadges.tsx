import type { CaseStudyMeta } from "../types";

export function MetaBadges({ meta }: { meta: CaseStudyMeta }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-3 border-b border-border-light bg-bg-surface px-6 py-5 transition-colors duration-300 sm:px-10 md:px-16 lg:px-20">
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-accent"></span>Industry: {meta.industry}
      </div>
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"></span>Stack: {meta.stack}
      </div>
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-2 text-[13px] font-bold text-text-heading">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>My Role: {meta.role}
      </div>
    </div>
  );
}
