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
    <div className="mb-14 md:mb-16">
      <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Recognition</p>
      <RevealGroup className="flex flex-wrap gap-3">
        {RECOGNITIONS.map((text, i) => (
          <RevealItem
            key={i}
            className="flex items-center gap-2.5 rounded-full border-[1.5px] border-amber-200 bg-amber-50 px-4 py-2 text-[13px] font-bold text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            {text}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
