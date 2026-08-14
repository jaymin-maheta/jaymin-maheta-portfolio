import { Icon } from "../../../shared/components/Icon";
import { Reveal } from "../../../shared/components/Reveal";
import type { ChallengePanel, InfoPanel } from "../types";

export function AboutCard({ about }: { about: InfoPanel }) {
  return (
    <Reveal direction="left" className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-bg-surface p-7 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:p-9">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-blue"></div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-lg shadow-brand-blue/20">
          <Icon name={about.icon} className="h-6 w-6" />
        </div>
        <h2 className="font-display text-xl font-semibold text-text-heading sm:text-2xl">{about.title}</h2>
      </div>
      {about.paragraphs.map((p, i) => (
        <p key={i} className="mb-4 text-[15px] leading-relaxed text-text-body last:mb-0">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

export function ChallengeCard({ challenge }: { challenge: ChallengePanel }) {
  return (
    <Reveal
      direction="right"
      className="relative overflow-hidden rounded-[20px] border-2 border-border-strong bg-gradient-to-br from-accent-50 to-bg-surface p-7 shadow-xl shadow-accent-900/5 transition-colors duration-300 dark:from-accent-950/20 dark:to-bg-surface sm:p-9"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-accent"></div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-accent-600 text-white shadow-lg shadow-accent-500/20">
          <Icon name={challenge.icon} className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-extrabold text-text-heading sm:text-2xl">{challenge.title}</h2>
      </div>
      <p className="mb-4 text-[15px] font-semibold leading-relaxed text-accent-900 dark:text-accent-200">{challenge.emphasisParagraph}</p>
      {challenge.paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-text-body">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

export function AboutAndChallenge({ about, challenge }: { about: InfoPanel; challenge: ChallengePanel }) {
  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:mb-20 lg:grid-cols-[2fr_1fr] lg:gap-8">
      <AboutCard about={about} />
      <ChallengeCard challenge={challenge} />
    </div>
  );
}
