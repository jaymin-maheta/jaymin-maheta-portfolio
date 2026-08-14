import type { ReactElement } from "react";

function MigrationIllustration() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border-strong bg-bg-surface-alt px-5 py-6 sm:px-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-950 text-sm font-extrabold text-white shadow-md">
          Mat
        </div>
        <span className="text-[12px] font-semibold text-text-muted">Angular Material</span>
      </div>
      <svg
        className="h-6 w-10 shrink-0 stroke-accent-500 sm:h-7 sm:w-16"
        viewBox="0 0 100 24"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 6"
        aria-hidden="true"
      >
        <path d="M0 12 H84 M74 4 L92 12 L74 20" />
      </svg>
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-accent-300 bg-accent-50 px-5 py-6 dark:border-accent-700 dark:bg-accent-950/30 sm:px-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-sm font-extrabold text-white shadow-md">
          Pn
        </div>
        <span className="text-[12px] font-semibold text-text-heading">PrimeNG</span>
      </div>
    </div>
  );
}

function ScssLayersIllustration() {
  const layers = ["abstracts", "vendors", "components", "themes"];
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      {layers.map((layer, i) => (
        <div
          key={layer}
          className="theme-transition flex items-center gap-3 rounded-xl border border-border-light bg-bg-surface-alt px-4 py-3"
          style={{ marginLeft: `${i * 12}px` }}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent-500 to-accent-700 text-[11px] font-bold text-white">
            {i + 1}
          </span>
          <span className="font-mono text-[13px] font-semibold text-text-heading">{layer}/</span>
        </div>
      ))}
    </div>
  );
}

function DesignToCodeIllustration() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border-strong bg-bg-surface-alt px-5 py-6 sm:px-8">
        <svg
          className="h-10 w-10 text-text-heading"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
        <span className="text-[12px] font-semibold text-text-muted">Design File</span>
      </div>
      <svg
        className="h-6 w-10 shrink-0 stroke-accent-500 sm:h-7 sm:w-16"
        viewBox="0 0 100 24"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 6"
        aria-hidden="true"
      >
        <path d="M0 12 H84 M74 4 L92 12 L74 20" />
      </svg>
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-accent-300 bg-accent-50 px-5 py-6 dark:border-accent-700 dark:bg-accent-950/30 sm:px-8">
        <svg
          className="h-10 w-10 text-accent-600 dark:text-accent-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span className="text-[12px] font-semibold text-text-heading">Component</span>
      </div>
    </div>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "angular-material-to-primeng": MigrationIllustration,
  "scss-architecture-that-survives-teams": ScssLayersIllustration,
  "design-then-build": DesignToCodeIllustration,
};

export function PostIllustration({ slug }: { slug: string }) {
  const Illustration = ILLUSTRATIONS[slug];
  if (!Illustration) return null;

  return (
    <div className="theme-transition rounded-3xl border-2 border-border-strong bg-bg-surface p-10 shadow-xl shadow-slate-900/5 sm:p-14">
      <Illustration />
    </div>
  );
}
