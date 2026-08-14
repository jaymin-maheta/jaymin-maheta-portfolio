import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { SplitText } from "../../../shared/components/SplitText";

const PRINCIPLES = [
  {
    title: "Design is the spec",
    body: "I read Figma files the way engineers read tickets — spacing, states, and edge cases are all in scope, not just the happy path.",
  },
  {
    title: "Systems over one-offs",
    body: "Every component I ship is built to be reused. A design system isn't a deliverable, it's the thing that makes every future feature faster.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard navigation, focus states, and contrast aren't a pass at the end — they're decided at the same time as the layout.",
  },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        About
      </p>
      <SplitText
        as="h2"
        id="about-heading"
        className="mb-6 block text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
      >
        From pixels in Figma to production code, for seven years.
      </SplitText>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal direction="left">
          <div className="space-y-4 text-[15px] leading-relaxed text-text-body sm:text-base">
            <p>
              I started as a UI/UX designer, not a developer — which changed how I build. Six
              years ago at 9Brainz I was in Figma and Adobe XD, designing web and mobile
              interfaces for client work. Watching my own designs get reinterpreted (and
              sometimes broken) by whoever implemented them next taught me the fastest way to
              protect a design is to build it myself.
            </p>
            <p>
              That's the throughline across four companies since: Zeronsec, 9Brainz, Kemsys
              Technologies, and now Augmented Tech Labs. I moved from frontend developer to UI/UX
              designer to Senior UI Engineer, picking up Angular, React, and design-system
              architecture along the way — always with the goal of closing the gap between what a
              designer intends and what a user actually experiences.
            </p>
            <p>
              Today that means leading Angular modernisation efforts (16 → 21), building 7-1 SCSS
              architectures that scale across teams, and mentoring the designers and developers
              around me so the gap I used to feel doesn't exist for them. I've shipped production
              interfaces for healthcare platforms serving 200+ hospital staff, government systems,
              and SaaS products — where accessibility and performance aren't nice-to-haves, they're
              the job.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="space-y-4">
          {PRINCIPLES.map((principle) => (
            <RevealItem
              key={principle.title}
              className="theme-transition rounded-2xl border border-border-light bg-bg-surface-alt p-6"
            >
              <h3 className="font-display text-base font-semibold text-text-heading">
                {principle.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{principle.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
