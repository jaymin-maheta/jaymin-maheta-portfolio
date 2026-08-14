import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { DesignProcessStep } from "../types";

export function DesignProcessDiagram({ steps }: { steps: DesignProcessStep[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">
          How I Work
        </p>
        <h2 className="font-display text-2xl font-semibold text-text-heading sm:text-3xl">
          From Figma to Production, on This Project
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
          The same five-stage process on every project — design, system mapping,
          implementation, accessibility QA and shipping — applied here specifically.
        </p>
      </div>

      <Reveal className="rounded-3xl border-2 border-border-strong bg-bg-surface p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:p-10">
        <RevealGroup className="relative space-y-3">
          {steps.map((step, i) => (
            <RevealItem
              key={step.stage}
              className="theme-transition relative flex gap-4 rounded-xl border border-border-light bg-bg-surface-alt p-4 sm:p-5"
            >
              <div className="flex shrink-0 flex-col items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-[13px] font-bold text-white shadow-md">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-1 h-full w-px flex-1 bg-border-strong" aria-hidden="true" />
                )}
              </div>
              <div className="pb-1">
                <p className="text-[15px] font-bold text-text-heading">{step.stage}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-muted">
                  {step.description}
                </p>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-text-body">
                  <span className="font-bold text-accent-600 dark:text-accent-300">
                    On this project:{" "}
                  </span>
                  {step.projectDetail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>
    </div>
  );
}
