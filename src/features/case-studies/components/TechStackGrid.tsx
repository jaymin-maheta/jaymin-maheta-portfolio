import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { TechStackCard } from "../types";

export function TechStackGrid({ items }: { items: TechStackCard[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Core Infrastructure</p>
        <h2 className="font-display text-2xl font-semibold text-text-heading sm:text-3xl">Technology Stack</h2>
      </div>
      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <RevealItem
            key={i}
            className="relative flex flex-col items-center rounded-[20px] border-2 border-border-strong border-t-[6px] border-t-accent-500 bg-bg-surface px-6 pb-7 pt-11 text-center shadow-xl shadow-slate-900/5"
          >
            <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 text-lg font-extrabold text-white shadow-lg ring-4 ring-bg-surface">
              {item.badge}
            </div>
            <span className="mb-3 mt-2 inline-block rounded-full bg-accent-100 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wide text-accent-700 dark:bg-accent-950 dark:text-accent-300">
              {item.category}
            </span>
            <h3 className="mb-3 text-lg font-extrabold text-text-heading">{item.name}</h3>
            <p className="text-[13.5px] leading-relaxed text-text-body">{item.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
