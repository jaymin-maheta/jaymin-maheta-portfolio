import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";

const RECOGNITIONS = [
  "Spotlight Award (Dec 2024) — outstanding project contributions",
  "HDFC Gift Voucher (Jul 2024) — outstanding project contributions",
  "Spotlight Award (Apr 2024) — Amazon Gift Voucher for project contributions",
  "Client Appreciation — successful production delivery and teamwork",
  "Tech Titans Recognition — UI design, prototyping and frontend delivery",
];

export function RecognitionStrip() {
  return (
    <section aria-label="Recognition" className="mb-12 md:mb-16">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Recognition
      </p>
      <RevealGroup className="flex flex-wrap gap-2.5">
        {RECOGNITIONS.map((text, i) => (
          <RevealItem
            key={i}
            className="theme-transition inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/90 px-3.5 py-1.5 text-[12.5px] font-medium text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-200"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400"
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
            {text}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
