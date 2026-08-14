import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { RibbonBackground } from "../../../shared/components/RibbonBackground";
import type { SnapshotContent } from "../types";

export function SnapshotFooter({ snapshot }: { snapshot: SnapshotContent }) {
  return (
    <Reveal className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-[20px] bg-primary-950 p-7 text-white sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:p-12">
      <RibbonBackground />
      <div className="relative z-10">
        <h2 className="mb-6 text-[15px] font-extrabold uppercase tracking-wider text-brand-gold sm:text-base">Project Snapshot</h2>
        <RevealGroup className="flex flex-col gap-4">
          {snapshot.fields.map((field, i) => (
            <RevealItem key={i} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{field.label}</span>
              <span className="text-[14.5px] font-semibold text-slate-50">{field.value}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <div className="relative z-10">
        <h2 className="mb-6 text-[15px] font-extrabold uppercase tracking-wider text-brand-gold sm:text-base">Capabilities Delivered</h2>
        <RevealGroup className="flex flex-wrap gap-3">
          {snapshot.capabilities.map((cap, i) => (
            <RevealItem key={i} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13.5px] font-semibold text-slate-100">
              <span className="font-extrabold text-brand-accent">✓</span>
              {cap}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
}
