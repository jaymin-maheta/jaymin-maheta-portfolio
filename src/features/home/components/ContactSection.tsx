import { MagneticLink } from "../../../shared/components/MagneticLink";
import { SpotlightLayer } from "../../../shared/components/SpotlightLayer";
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
      className="theme-transition relative scroll-mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-6 py-14 text-white sm:px-10 sm:py-16 md:px-14"
    >
      <SpotlightLayer />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-200">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_2px_rgba(253,157,39,0.55)]" aria-hidden="true" />
            Available for senior roles &amp; consulting
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
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
            I&rsquo;m open to senior/lead engineering roles, frontend architecture engagements, and
            design-to-code consulting. Reach out directly or grab time on my calendar.
          </p>
        </Reveal>

        <RevealGroup className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <RevealItem>
            <MagneticLink
              href="mailto:hello.jaymin.maheta@gmail.com"
              cursorLabel="Email"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-primary-950 shadow-lg transition-colors hover:bg-accent-50 focus-visible:outline-offset-2"
            >
              Email Me
            </MagneticLink>
          </RevealItem>
          <RevealItem>
            <a
              href="https://linkedin.com/in/jaymin-maheta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/4 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-offset-2"
            >
              Connect on LinkedIn
            </a>
          </RevealItem>
          <RevealItem>
            <a
              href="/assets/docs/jaymin-maheta-resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white/85 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-offset-2"
            >
              Download Resume
            </a>
          </RevealItem>
        </RevealGroup>

        <dl className="mx-auto mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-left sm:grid-cols-3 sm:text-center">
          {TRUST_POINTS.map((point) => (
            <Reveal key={point.label}>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                  {point.label}
                </dt>
                <dd className="mt-1 text-[13.5px] font-medium text-white/85">{point.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
