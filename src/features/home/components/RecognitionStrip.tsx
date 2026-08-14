import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";

const RECOGNITIONS = [
  {
    title: "Spotlight Award",
    detail: "Outstanding project contributions",
    date: "Dec 2024",
  },
  {
    title: "HDFC Gift Voucher",
    detail: "Outstanding project contributions",
    date: "Jul 2024",
  },
  {
    title: "Spotlight Award",
    detail: "Amazon Gift Voucher for project contributions",
    date: "Apr 2024",
  },
  {
    title: "Client Appreciation",
    detail: "Successful production delivery and teamwork",
    date: null,
  },
  {
    title: "Tech Titans Recognition",
    detail: "UI design, prototyping and frontend delivery",
    date: null,
  },
];

export function RecognitionStrip() {
  return (
    <section aria-label="Recognition" className="mb-12 md:mb-16">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
          Recognition
        </p>
        <p className="text-[12px] font-medium text-text-subtle">{RECOGNITIONS.length} awards &amp; mentions</p>
      </div>

      <RevealGroup className="theme-transition overflow-hidden rounded-2xl border border-accent-300/50 bg-accent-50/60 dark:border-accent-700/40 dark:bg-accent-500/6">
        {RECOGNITIONS.map((item, i) => (
          <RevealItem
            key={item.title + i}
            className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent-100/50 dark:hover:bg-accent-500/9 sm:px-6 ${
              i !== RECOGNITIONS.length - 1 ? "border-b border-accent-300/40 dark:border-accent-700/30" : ""
            }`}
          >
            <svg
              className="h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="6" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>

            <div className="min-w-0 flex-1">
              <p className="font-display text-[14.5px] font-semibold leading-snug text-text-heading sm:text-[15px]">
                {item.title}
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-text-muted">{item.detail}</p>
            </div>

            {item.date && (
              <span className="shrink-0 text-[12px] font-medium tabular-nums text-text-subtle">
                {item.date}
              </span>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
