import { Icon } from "../../../shared/components/Icon";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import type { MetricCard } from "../types";

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="relative z-10 -mt-12 px-5 sm:-mt-14 sm:px-8 md:px-12 lg:px-16">
      <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {metrics.map((metric, i) => (
          <RevealItem
            key={i}
            className="theme-transition relative overflow-hidden rounded-2xl border border-border-light bg-bg-surface p-5 shadow-[var(--shadow-md)] sm:p-6"
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-${metric.gradientFrom} to-${metric.gradientTo}`}
              aria-hidden="true"
            />
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-${metric.gradientFrom} to-${metric.gradientTo} text-white shadow-md`}
            >
              <Icon name={metric.icon} className="h-5 w-5" />
            </div>
            <div className="mb-1.5 break-words text-xl font-extrabold leading-tight tracking-tight text-text-heading sm:text-2xl">
              {metric.value}
            </div>
            <div className="text-[13px] font-medium leading-relaxed text-text-muted">
              {metric.description}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
