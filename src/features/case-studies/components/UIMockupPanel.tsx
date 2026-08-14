import { Reveal } from "../../../shared/components/Reveal";
import type { MockupPanel } from "../types";

/** Deterministic pseudo-random widths so bars look organic but never shift on re-render */
function barWidth(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 999) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

export function UIMockupPanel({ mockup }: { mockup: MockupPanel }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3 md:mb-10">
        <div>
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">
            Interface Preview
          </p>
          <h2 className="font-display text-2xl font-semibold text-text-heading sm:text-3xl">
            {mockup.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            {mockup.description}
          </p>
        </div>
        <span className="rounded-full border border-dashed border-border-strong bg-bg-surface-alt px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
          Illustrative layout — not a live screenshot
        </span>
      </div>

      <Reveal className="overflow-hidden rounded-2xl border-2 border-border-strong bg-bg-surface shadow-xl shadow-slate-900/5">
        {/* Fake browser chrome to make the "not a screenshot" framing obvious */}
        <div className="flex items-center gap-2 border-b border-border-light bg-bg-surface-alt px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>

        <div className="flex min-h-[360px] flex-col sm:flex-row">
          {/* Illustrative sidebar */}
          <div className="flex shrink-0 flex-col gap-1.5 border-b border-border-light bg-bg-surface-alt p-4 sm:w-48 sm:border-b-0 sm:border-r">
            {mockup.navItems.map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-semibold ${
                  i === 0
                    ? "bg-primary-950 text-white dark:bg-accent-500 dark:text-primary-950"
                    : "text-text-muted"
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                {item}
              </div>
            ))}
          </div>

          {/* Illustrative content area */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {mockup.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border-light bg-bg-surface-alt p-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-text-subtle">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-text-heading">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-lg border border-border-light">
              <div className="grid grid-cols-4 gap-2 border-b border-border-light bg-bg-surface-alt px-3 py-2">
                {mockup.columns.map((col) => (
                  <span
                    key={col}
                    className="truncate text-[10.5px] font-bold uppercase tracking-wide text-text-subtle"
                  >
                    {col}
                  </span>
                ))}
              </div>
              {Array.from({ length: mockup.rowCount }).map((_, row) => (
                <div
                  key={row}
                  className="grid grid-cols-4 gap-2 border-b border-border-light px-3 py-2.5 last:border-b-0"
                >
                  {mockup.columns.map((col, colIdx) => (
                    <span
                      key={col}
                      className="h-2 rounded-full bg-bg-surface-alt"
                      style={{ width: `${barWidth(row * 4 + colIdx, 40, 90)}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
