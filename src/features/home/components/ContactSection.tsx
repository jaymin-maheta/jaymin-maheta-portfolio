import { MagneticLink } from "../../../shared/components/MagneticLink";
import { RibbonBackground } from "../../../shared/components/RibbonBackground";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { SplitText } from "../../../shared/components/SplitText";

const TRUST_POINTS = [
  { label: "Based in", value: "Ahmedabad, India (IST)" },
  { label: "Typical response", value: "Within 1 business day" },
  { label: "Open to", value: "Full-time · Contract · Consulting" },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="theme-transition relative scroll-mt-20 overflow-hidden bg-bg-canvas px-5 py-14 text-text-heading sm:px-8 sm:py-16 md:px-12 lg:px-16"
    >
      <RibbonBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface-alt px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-600 dark:border-white/15 dark:bg-white/6 dark:text-accent-200">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_2px_rgba(24,226,153,0.55)]" aria-hidden="true" />
              Available for remote senior roles &amp; consulting
            </span>
          </Reveal>

          <SplitText
            as="h2"
            id="contact-heading"
            className="block text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2.25rem]"
          >
            Have a role or project in mind? Let's talk.
          </SplitText>
          <Reveal>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-text-body">
              I&rsquo;m open to senior/lead engineering roles, frontend architecture engagements, and
              design-to-code consulting. Reach out directly or grab time on my calendar.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RevealItem>
              <MagneticLink
                href="mailto:hello.jaymin.maheta@gmail.com"
                cursorLabel="Email"
                className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-colors hover:bg-primary-800 focus-visible:outline-offset-2 dark:bg-white dark:text-primary-950 dark:hover:bg-accent-50"
              >
                Email Me
              </MagneticLink>
            </RevealItem>
            <RevealItem>
              <a
                href="https://linkedin.com/in/jaymin-maheta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-surface-alt px-5 py-2.5 text-[13px] font-semibold text-text-heading transition hover:-translate-y-0.5 hover:bg-bg-muted focus-visible:outline-offset-2 dark:border-white/20 dark:bg-white/4 dark:text-white dark:hover:bg-white/10"
              >
                Connect on LinkedIn
              </a>
            </RevealItem>
            <RevealItem>
              <a
                href={`${import.meta.env.BASE_URL}assets/docs/jaymin-maheta-resume.pdf`}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-[13px] font-semibold text-text-body transition hover:-translate-y-0.5 hover:border-border-focus hover:text-text-heading focus-visible:outline-offset-2 dark:border-white/15 dark:text-white/85 dark:hover:border-white/30 dark:hover:text-white"
              >
                Download Resume
              </a>
            </RevealItem>
          </RevealGroup>

          <dl className="mx-auto mt-10 grid grid-cols-1 gap-4 border-t border-border-light pt-8 text-left sm:grid-cols-3 sm:text-center dark:border-white/10">
            {TRUST_POINTS.map((point) => (
              <Reveal key={point.label}>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-subtle dark:text-white/45">
                    {point.label}
                  </dt>
                  <dd className="mt-1 text-[13.5px] font-medium text-text-body dark:text-white/85">{point.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
