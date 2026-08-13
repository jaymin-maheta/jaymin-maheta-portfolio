import { Icon } from "../../../shared/components/Icon";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { MetricCard } from "../types";

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="relative z-10 px-4 -mt-14 sm:px-8 md:-mt-16 md:px-14 lg:px-20">
      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {metrics.map((metric, i) => (
          <RevealItem
            key={i}
            className="relative overflow-hidden rounded-2xl border-2 border-border-light bg-bg-surface p-6 shadow-xl shadow-slate-900/10 dark:shadow-black/30"
          >
            <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-${metric.gradientFrom} to-${metric.gradientTo}`}></span>
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${metric.gradientFrom} to-${metric.gradientTo} text-white shadow-lg`}>
              <Icon name={metric.icon} className="h-6 w-6" />
            </div>
            <div className="mb-2 break-words text-[22px] font-extrabold leading-tight text-text-heading sm:text-[26px]">{metric.value}</div>
            <div className="text-sm font-semibold leading-relaxed text-text-muted">{metric.description}</div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
