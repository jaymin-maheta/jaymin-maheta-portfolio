import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { TechStackCard } from "../types";

const ACCENT_CLASSES: Record<TechStackCard["accent"], { border: string; gradient: string; badgeBg: string }> = {
  sky: { border: "border-t-sky-500", gradient: "from-sky-500 to-blue-600", badgeBg: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  orange: { border: "border-t-orange-500", gradient: "from-orange-500 to-amber-600", badgeBg: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  emerald: { border: "border-t-emerald-500", gradient: "from-emerald-500 to-teal-600", badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  violet: { border: "border-t-violet-500", gradient: "from-violet-500 to-purple-600", badgeBg: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
};

export function TechStackGrid({ items }: { items: TechStackCard[] }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">Core Infrastructure</p>
        <h2 className="font-display text-2xl font-semibold text-text-heading sm:text-3xl">Technology Stack</h2>
      </div>
      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const accent = ACCENT_CLASSES[item.accent];
          return (
            <RevealItem
              key={i}
              className={`relative flex flex-col items-center rounded-[20px] border-2 border-border-strong ${accent.border} border-t-[6px] bg-bg-surface px-6 pb-7 pt-11 text-center shadow-xl shadow-slate-900/5`}
            >
              <div className={`absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-lg font-extrabold text-white shadow-lg ring-4 ring-bg-surface`}>
                {item.badge}
              </div>
              <span className={`mb-3 mt-2 inline-block rounded-full ${accent.badgeBg} px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wide`}>{item.category}</span>
              <h3 className="mb-3 text-lg font-extrabold text-text-heading">{item.name}</h3>
              <p className="text-[13.5px] leading-relaxed text-text-body">{item.description}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
