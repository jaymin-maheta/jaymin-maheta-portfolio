import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SplitText } from "../../../shared/components/SplitText";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Jaymin's creativity, versatility, and ability to take ownership truly stood out. He created an eye-catching and functional UI, developed the prototype, and stepped into development when the project needed it most. His contribution played an important role in delivering the project successfully.",
    name: "Kandarp Patel",
    role: "Co-Founder & CEO",
    company: "Augmented Systems LLP",
  },
  {
    quote:
      "Congratulations, Jaymin! Your incredible input wherever you are is truly appreciated. You are a true gem who will shine everywhere. Your creativity, dedication, and versatility make a real difference. Well done, and keep going!",
    name: "Kunjan Modi",
    role: "Associate Director",
    company: "Kemsys Technologies",
  },
  {
    quote:
      "It was a pleasure working with Jaymin at Kemsys. I've always admired his creativity and ability to bring ideas to life. His dedication, versatility, and passion for his work are truly inspiring, and this recognition is well deserved.",
    name: "Yash Mochi",
    role: "Technical Lead",
    company: "Kemsys Technologies",
  },
  {
    quote:
      "I had the chance to work with Jaymin on one of my iOS projects, and he did a fabulous job. His expertise in UI/UX, creativity, and attention to detail made a strong impression. I would gladly choose him again for his UI/UX expertise.",
    name: "Haardik Trivedi",
    role: "Senior Mobile Engineer (Mobile + Web)",
    company: "9Brainz",
  },
  {
    quote:
      "Jaymin's hard-working nature and willingness to take on challenges with responsibility are highly appreciated. He consistently takes ownership of his work and approaches challenges with a positive attitude.",
    name: "Mukesh Devmurari",
    role: "Full-Stack Web & API Developer",
    company: "Client Project",
  },
  {
    quote:
      "Jaymin's dedication and versatility across both design and development are truly impressive. His creativity, commitment, and ability to contribute across different areas made a significant difference to the project.",
    name: "Vishwas Dave",
    role: "Cybersecurity Consultant",
    company: "Client Project",
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
      <div className="mb-8">
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
