import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { ApproachStep } from "../types";

export function ApproachSteps({ intro, steps }: { intro: string; steps: ApproachStep[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Methodology</p>
        <h2 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Our Approach</h2>
      </div>
      <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-text-muted sm:text-base md:mb-10">{intro}</p>
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <RevealItem
            key={i}
            className="flex flex-col rounded-2xl border-2 border-border-strong border-t-[5px] border-t-brand-blue bg-bg-surface p-6 shadow-xl shadow-slate-900/5"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-lg font-extrabold text-white shadow-lg shadow-brand-blue/30">
              {i + 1}
            </div>
            <h5 className="mb-3 text-[15px] font-extrabold leading-snug text-text-heading">{step.title}</h5>
            <p className="text-[13.5px] leading-relaxed text-text-body">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
