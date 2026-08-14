import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SplitText } from "../../../shared/components/SplitText";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// Placeholder content — replace with real client/team quotes before publishing.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sample quote — swap in real feedback here. e.g. \"Jaymin turned our Figma files into a production UI faster and cleaner than we expected, and the component library he left behind is still what we build on.\"",
    name: "Client Name",
    role: "Role / Title",
    company: "Company",
  },
  {
    quote:
      "Sample quote — swap in real feedback here. e.g. \"He's the rare engineer who reviews a design the way a designer would and reviews code the way a lead would — that combination is hard to find.\"",
    name: "Client Name",
    role: "Role / Title",
    company: "Company",
  },
  {
    quote:
      "Sample quote — swap in real feedback here. e.g. \"Mentored two junior developers on our team through a full Angular migration without slowing the roadmap down.\"",
    name: "Client Name",
    role: "Role / Title",
    company: "Company",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = TESTIMONIALS[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
            What People Say
          </p>
          <SplitText
            as="h2"
            id="testimonials-heading"
            className="block text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
          >
            Feedback from clients and teams.
          </SplitText>
        </div>
        <span className="rounded-full border border-dashed border-border-strong bg-bg-surface-alt px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
          Sample content — placeholder
        </span>
      </div>

      <div className="theme-transition relative overflow-hidden rounded-2xl border border-border-light bg-bg-surface-alt p-7 sm:p-10">
        <svg
          className="absolute right-6 top-6 h-12 w-12 text-border-strong/60"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>

        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <blockquote className="max-w-2xl text-[15px] italic leading-relaxed text-text-body sm:text-base">
              &ldquo;{active.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display text-[15px] font-semibold text-text-heading">
                {active.name}
              </p>
              <p className="text-[13px] text-text-muted">
                {active.role} · {active.company}
              </p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="relative z-10 mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                  i === index ? "w-6 bg-accent-500" : "w-1.5 bg-border-strong hover:bg-text-subtle"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="theme-transition flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-bg-surface text-text-muted transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="theme-transition flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-bg-surface text-text-muted transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
