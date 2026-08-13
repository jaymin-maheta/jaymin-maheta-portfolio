import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { OutcomesContent } from "../types";

export function OutcomesSection({ outcomes }: { outcomes: OutcomesContent }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Impact Analysis</p>
        <h2 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Key Challenges &amp; Outcomes</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal direction="left" className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-bg-surface p-7 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-9">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-red-500"></div>
          <div className="mb-6 flex items-center gap-4 border-b-2 border-bg-surface-alt pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-red-300 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              <Icon name="alert-triangle" className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-extrabold text-text-heading sm:text-xl">Key Challenges Included</h4>
          </div>
          <RevealGroup className="space-y-4">
            {outcomes.challenges.map((text, i) => (
              <RevealItem key={i} className="relative pl-9 text-[15px] font-medium leading-relaxed text-text-body">
                <span className="absolute left-0 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-orange-50 text-base font-black text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                  &bull;
                </span>
                {text}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          direction="right"
          className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-emerald-50 to-bg-surface p-7 shadow-xl shadow-emerald-900/10 transition-colors duration-300 dark:from-emerald-950/20 dark:to-bg-surface sm:p-9"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-emerald-500"></div>
          <div className="mb-6 flex items-center gap-4 border-b-2 border-bg-surface-alt pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-emerald-300 bg-emerald-100 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              <Icon name="check-circle" className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-extrabold text-text-heading sm:text-xl">Outcomes Delivered</h4>
          </div>
          <p className="mb-4 text-[14.5px] font-semibold text-text-muted">{outcomes.outcomesIntro}</p>
          <RevealGroup className="space-y-4">
            {outcomes.outcomes.map((text, i) => (
              <RevealItem key={i} className="relative pl-9 text-[15px] font-medium leading-relaxed text-text-body">
                <span className="absolute left-0 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                  ✓
                </span>
                {text}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>

      <Reveal className="mt-8 rounded-r-2xl border-y-[1.5px] border-r-[1.5px] border-l-[6px] border-border-strong border-l-brand-blue bg-gradient-to-br from-sky-50 to-blue-50 p-6 text-[15px] font-semibold leading-relaxed text-text-heading shadow-lg shadow-sky-900/5 transition-colors duration-300 dark:from-sky-950/30 dark:to-blue-950/20 sm:p-8 sm:text-base">
        {outcomes.summary}
      </Reveal>
    </div>
  );
}
