import { Fragment } from "react";
import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { FlowStep } from "../types";

export function FlowDiagram({ title, subtitle, steps }: { title: string; subtitle: string; steps: FlowStep[] }) {
  return (
    <Reveal className="mb-16 rounded-3xl border-2 border-border-strong bg-bg-surface p-6 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-8 md:mb-20 md:p-12">
      <div className="mb-8 text-center md:mb-10">
        <h2 className="font-display text-xl font-semibold text-text-heading md:text-2xl">{title}</h2>
        <p className="mt-1.5 text-sm font-medium text-text-muted md:text-[14.5px]">{subtitle}</p>
      </div>
      <RevealGroup className="flex flex-col items-stretch gap-1 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <RevealItem
              key={`step-${i}`}
              className={`relative z-10 flex flex-col items-center rounded-2xl border-2 p-4 text-center shadow-lg shadow-slate-900/10 xl:w-[138px] xl:flex-none xl:p-3.5 ${
                step.highlighted
                  ? "border-accent-300 bg-accent-50/60 dark:border-accent-800 dark:bg-accent-950/20"
                  : "border-border-strong bg-bg-surface"
              }`}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 text-white shadow-lg xl:h-11 xl:w-11">
                <Icon name={step.icon} className="h-5 w-5 xl:h-[18px] xl:w-[18px]" />
              </div>
              <h3 className="mb-1 text-[14px] font-extrabold leading-snug text-text-heading xl:text-[12.5px]">{step.title}</h3>
              <span className="text-[11.5px] font-semibold leading-snug text-text-muted xl:text-[10px]">{step.subtitle}</span>
            </RevealItem>
            {i < steps.length - 1 && step.connectorLabel && (
              <RevealItem key={`connector-${i}`} className="flex shrink-0 flex-col items-center justify-center px-0 py-2 xl:px-1 xl:py-0">
                <span className="mb-1.5 whitespace-nowrap rounded-full border border-border-strong bg-bg-surface-alt px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-accent-600 dark:text-accent-300 xl:px-1.5 xl:text-[8.5px]">
                  {step.connectorLabel}
                </span>
                <svg className="hidden h-5 w-12 stroke-accent-500 xl:block" viewBox="0 0 100 20" fill="none" strokeWidth="2.5" strokeDasharray="5 4">
                  <path d="M0 10 H90 M80 3 L95 10 L80 17"></path>
                </svg>
                <svg className="h-8 w-6 stroke-accent-500 xl:hidden" viewBox="0 0 20 40" fill="none" strokeWidth="2.5" strokeDasharray="5 4">
                  <path d="M10 0 V32 M3 24 L10 37 L17 24"></path>
                </svg>
              </RevealItem>
            )}
          </Fragment>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
