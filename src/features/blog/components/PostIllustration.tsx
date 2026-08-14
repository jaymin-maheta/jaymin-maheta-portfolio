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

function DenseTableIllustration() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <div className="mx-auto flex max-w-md flex-col overflow-hidden rounded-xl border border-border-light">
      <div className="flex bg-bg-surface-alt">
        {["Patient", "Episode", "Doctor", "Status"].map((h) => (
          <span
            key={h}
            className="flex-1 border-b border-border-light px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-text-muted"
          >
            {h}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r} className="theme-transition flex items-center">
          {[0, 1, 2].map((c) => (
            <span
              key={c}
              className="flex-1 border-b border-border-light/70 px-3 py-2 text-[11px] font-medium text-text-heading"
            >
              <span
                className="inline-block h-2 rounded-full bg-text-muted/25"
                style={{ width: `${40 + ((r * 7 + c * 13) % 40)}%` }}
              />
            </span>
          ))}
          <span className="flex-1 border-b border-border-light/70 px-3 py-2">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                r % 2 === 0
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-accent-100 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300"
              }`}
            >
              {r % 2 === 0 ? "Active" : "Pending"}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function ThemeTokensIllustration() {
  const tokens = [
    { name: "--bg-surface", light: "bg-white", dark: "bg-slate-900" },
    { name: "--text-heading", light: "bg-slate-800", dark: "bg-slate-100" },
    { name: "--accent-500", light: "bg-accent-500", dark: "bg-accent-400" },
    { name: "--border-strong", light: "bg-slate-300", dark: "bg-slate-600" },
  ];
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      {tokens.map((t) => (
        <div
          key={t.name}
          className="theme-transition flex items-center gap-3 rounded-xl border border-border-light bg-bg-surface-alt px-4 py-2.5"
        >
          <span className={`h-5 w-5 shrink-0 rounded-full border border-black/10 ${t.light}`} />
          <span className={`h-5 w-5 shrink-0 rounded-full border border-white/10 ${t.dark}`} />
          <span className="font-mono text-[12px] font-semibold text-text-heading">{t.name}</span>
        </div>
      ))}
    </div>
  );
}

function StateVariantsIllustration() {
  const states = [
    { label: "Loading", tone: "border-border-light bg-bg-surface-alt" },
    { label: "Empty", tone: "border-border-light bg-bg-surface-alt" },
    { label: "Error", tone: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30" },
  ];
  return (
    <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      {states.map((s) => (
        <div
          key={s.label}
          className={`theme-transition flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 ${s.tone}`}
        >
          <span
            className={`h-8 w-8 rounded-lg ${
              s.label === "Error"
                ? "bg-red-400"
                : s.label === "Loading"
                  ? "animate-pulse bg-text-muted/30"
                  : "bg-text-muted/20"
            }`}
          />
          <span className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function TypographyScaleIllustration() {
  const scale = [
    { label: "Heading", size: "text-xl", weight: "font-extrabold" },
    { label: "Body", size: "text-sm", weight: "font-medium" },
    { label: "Numeric ID", size: "text-sm", weight: "font-mono font-semibold" },
    { label: "Caption", size: "text-[11px]", weight: "font-semibold uppercase tracking-wide" },
  ];
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-3">
      {scale.map((s) => (
        <div key={s.label} className="flex items-baseline justify-between gap-4">
          <span className={`${s.size} ${s.weight} text-text-heading`}>Aa 123</span>
          <span className="text-[11px] font-semibold text-text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function DarkModeToggleIllustration() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border-strong bg-white px-6 py-6 shadow-md">
        <svg
          className="h-8 w-8 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <span className="text-[12px] font-semibold text-slate-600">Light tokens</span>
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
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-slate-700 bg-slate-900 px-6 py-6 shadow-md">
        <svg
          className="h-8 w-8 text-accent-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <span className="text-[12px] font-semibold text-slate-300">Dark tokens</span>
      </div>
    </div>
  );
}

function DashboardWidgetsIllustration() {
  return (
    <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
      <div className="theme-transition col-span-2 flex flex-col justify-between rounded-xl border border-border-light bg-bg-surface-alt p-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-text-muted">
          Open Orders
        </span>
        <div className="flex h-10 items-end gap-1">
          {[6, 9, 5, 11, 8, 13, 7].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-500 to-accent-300"
              style={{ height: `${h * 6}%` }}
            />
          ))}
        </div>
      </div>
      <div className="theme-transition flex flex-col items-center justify-center gap-1 rounded-xl border border-border-light bg-bg-surface-alt p-3">
        <span className="text-lg font-extrabold text-text-heading">214</span>
        <span className="text-center text-[10px] font-bold uppercase tracking-wide text-text-muted">
          Orders
        </span>
      </div>
      <div className="theme-transition flex flex-col items-center justify-center gap-1 rounded-xl border border-border-light bg-bg-surface-alt p-3">
        <svg viewBox="0 0 32 32" className="h-10 w-10" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentColor"
            className="text-accent-500"
            strokeWidth="4"
            strokeDasharray="62 88"
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
          />
        </svg>
      </div>
      <div className="theme-transition col-span-2 flex items-center gap-1 rounded-xl border border-border-light bg-bg-surface-alt p-3">
        {[3, 6, 4, 8, 6, 9, 5, 7].map((h, i) => (
          <span
            key={i}
            className="h-6 flex-1 rounded-sm bg-gradient-to-t from-emerald-500 to-emerald-300"
            style={{ height: `${h * 4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "angular-material-to-primeng": MigrationIllustration,
  "scss-architecture-that-survives-teams": ScssLayersIllustration,
  "design-then-build": DesignToCodeIllustration,
  "designing-dense-data-tables": DenseTableIllustration,
  "multi-brand-theming-system": ThemeTokensIllustration,
  "designing-states-people-trust": StateVariantsIllustration,
  "typography-for-dense-dashboards": TypographyScaleIllustration,
  "dark-mode-as-design-system": DarkModeToggleIllustration,
  "designing-bi-dashboard-widgets": DashboardWidgetsIllustration,
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
