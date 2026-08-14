import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../../../shared/components/Reveal";

interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  achievements: string[];
  stack: string[];
}

const ROLES: Role[] = [
  {
    company: "Augmented Tech Labs",
    title: "Senior UI Engineer (Senior UI/UX Designer)",
    period: "Oct 2023 — Present",
    location: "Ahmedabad, India",
    current: true,
    achievements: [
      "Converted high-fidelity Figma designs into responsive, production-ready Angular and React applications with pixel-perfect, cross-browser accuracy.",
      "Mentored junior UI developers on component-based architecture and effective use of Tailwind CSS, Bootstrap, PrimeNG, and PrimeReact.",
      "Built reusable UI components that improved code consistency and cut development effort across the application.",
      "Led design-to-code delivery across 5+ enterprise products spanning healthcare, distribution, and workforce management.",
    ],
    stack: ["Angular", "React", "PrimeNG", "PrimeReact", "Tailwind CSS", "Figma"],
  },
  {
    company: "Kemsys Technologies",
    title: "Software Engineer",
    period: "Apr 2022 — Sep 2023",
    location: "Ahmedabad, India",
    achievements: [
      "Solely responsible for converting designs for 4+ Figma-based web applications into clean, maintainable frontend code.",
      "Developed scalable, high-performance UI components while collaborating closely with developers to maintain design integrity.",
      "Mentored junior team members on design fundamentals, frontend coding standards, and responsive design principles.",
    ],
    stack: ["Angular", "Figma", "SCSS", "Responsive Design"],
  },
  {
    company: "9Brainz",
    title: "UI/UX Designer",
    period: "Sep 2020 — Apr 2022",
    location: "Junagadh, India",
    achievements: [
      "Designed 6+ web applications and 3 mobile application interfaces using Figma and Adobe XD.",
      "Created responsive layouts using Flexbox and CSS Grid to deliver modern, user-friendly interfaces.",
      "Converted UI designs into production-ready frontend code, working closely with the functional team.",
    ],
    stack: ["Figma", "Adobe XD", "Flexbox", "CSS Grid"],
  },
  {
    company: "Zeronsec India Pvt. Ltd.",
    title: "Frontend Developer",
    period: "Mar 2019 — Aug 2020",
    location: "Junagadh, India",
    achievements: [
      "Converted UI designs into production-ready code for the Sci-Fi Design System (Project Threat I 2.0).",
      "Solely responsible for implementing the responsive user interface of the Anirita product.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
];

function RoleCard({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <li className="relative pl-10">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          role.current
            ? "border-accent-500 bg-accent-500/20"
            : "border-border-strong bg-bg-surface"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${role.current ? "bg-accent-500" : "bg-border-strong"}`}
        />
      </span>

      <div className="theme-transition rounded-2xl border border-border-light bg-bg-surface-alt p-5 sm:p-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-text-heading">
                {role.title}
              </h3>
              {role.current && (
                <span className="rounded-full bg-accent-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-600 dark:text-accent-300">
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 text-[14px] font-medium text-brand-blue">{role.company}</p>
            <p className="mt-0.5 text-[13px] text-text-subtle">
              {role.period} · {role.location}
            </p>
          </div>
          <svg
            className={`mt-1.5 h-5 w-5 shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2.5 border-t border-border-light pt-4">
                {role.achievements.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-subtle" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-light bg-bg-surface px-2.5 py-1 text-[12px] font-medium text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Experience
      </p>
      <Reveal>
        <h2
          id="experience-heading"
          className="mb-3 text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
        >
          Seven years, four companies, one throughline.
        </h2>
        <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
          From frontend developer to Senior UI Engineer — expand a role for responsibilities,
          achievements, and the stack I used.
        </p>
      </Reveal>

      <ol className="relative space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-border-light">
        {ROLES.map((role, i) => (
          <RoleCard key={role.company} role={role} defaultOpen={i === 0} />
        ))}
      </ol>
    </section>
  );
}
