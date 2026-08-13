import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { ContributionItem } from "../types";

interface ContributionCardProps {
  role: string;
  items: ContributionItem[];
  placeholder?: string;
}

export function ContributionCard({ role, items, placeholder }: ContributionCardProps) {
  return (
    <div className="mb-16 md:mb-20">
      <Reveal className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-sky-50 to-bg-surface p-7 shadow-xl shadow-sky-900/5 transition-colors duration-300 dark:from-sky-950/20 dark:to-bg-surface sm:p-9">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-blue"></div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/20">
              <Icon name="target" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">My Contribution</p>
              <h3 className="text-xl font-extrabold text-text-heading sm:text-2xl">Jaymin Maheta</h3>
            </div>
          </div>
          <span className="rounded-full border-[1.5px] border-border-strong bg-bg-surface-alt px-4 py-1.5 text-[13px] font-bold text-text-body">{role}</span>
        </div>
        {placeholder ? (
          <div className="rounded-xl border-2 border-dashed border-border-strong bg-bg-surface-alt/60 p-6 text-center text-[13.5px] font-semibold leading-relaxed text-text-muted sm:col-span-2">
            {placeholder}
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <RevealItem
                key={i}
                className="relative rounded-xl border border-border-light bg-bg-surface/70 py-3 pl-9 pr-4 text-[14.5px] font-medium leading-relaxed text-text-body"
              >
                <span className="absolute left-3 top-3.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-blue text-[10px] font-black text-white">✓</span>
                {item.text}
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Reveal>
    </div>
  );
}
