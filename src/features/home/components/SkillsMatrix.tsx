import { useState, useMemo, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../../../shared/components/Reveal";
import { SplitText } from "../../../shared/components/SplitText";

type Category = "All" | "Design" | "Frontend" | "UI Libraries" | "Styling" | "Charts" | "Tooling";

interface Skill {
  name: string;
  category: Exclude<Category, "All">;
  level: "Expert" | "Advanced" | "Proficient";
}

const SKILLS: Skill[] = [
  { name: "UI/UX Design", category: "Design", level: "Expert" },
  { name: "Wireframing", category: "Design", level: "Expert" },
  { name: "Prototyping", category: "Design", level: "Expert" },
  { name: "User Research", category: "Design", level: "Advanced" },
  { name: "Design Systems", category: "Design", level: "Expert" },
  { name: "Mobile App Design", category: "Design", level: "Advanced" },
  { name: "Adaptive Design", category: "Design", level: "Advanced" },
  { name: "Figma", category: "Design", level: "Expert" },
  { name: "Adobe XD", category: "Design", level: "Advanced" },
  { name: "Zeplin", category: "Design", level: "Proficient" },

  { name: "Angular", category: "Frontend", level: "Expert" },
  { name: "React", category: "Frontend", level: "Expert" },
  { name: "HTML5", category: "Frontend", level: "Expert" },
  { name: "CSS3", category: "Frontend", level: "Expert" },
  { name: "SCSS", category: "Frontend", level: "Expert" },
  { name: "TypeScript", category: "Frontend", level: "Advanced" },

  { name: "PrimeNG", category: "UI Libraries", level: "Expert" },
  { name: "PrimeReact", category: "UI Libraries", level: "Advanced" },
  { name: "Angular Material", category: "UI Libraries", level: "Advanced" },
  { name: "NG Bootstrap", category: "UI Libraries", level: "Proficient" },

  { name: "Tailwind CSS", category: "Styling", level: "Expert" },
  { name: "Bootstrap", category: "Styling", level: "Advanced" },
  { name: "PrimeFlex", category: "Styling", level: "Advanced" },
  { name: "Materialize CSS", category: "Styling", level: "Proficient" },
  { name: "7-1 SCSS Architecture", category: "Styling", level: "Expert" },

  { name: "D3", category: "Charts", level: "Proficient" },
  { name: "Chart.js", category: "Charts", level: "Advanced" },

  { name: "GitLab", category: "Tooling", level: "Advanced" },
  { name: "Bitbucket", category: "Tooling", level: "Advanced" },
];

const CATEGORIES: Category[] = [
  "All",
  "Design",
  "Frontend",
  "UI Libraries",
  "Styling",
  "Charts",
  "Tooling",
];

const LEVEL_WEIGHT: Record<Skill["level"], number> = { Expert: 3, Advanced: 2, Proficient: 1 };

export function SkillsMatrix() {
  const [active, setActive] = useState<Category>("All");
  const reduceMotion = useReducedMotion();
  const tablistId = useId();

  const filtered = useMemo(
    () => (active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Capabilities
      </p>
      <SplitText
        as="h2"
        id="skills-heading"
        className="mb-3 block text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
      >
        An expertise matrix, not a progress bar.
      </SplitText>
      <Reveal>
        <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
          Filter by category to see where I go deep. Depth reflects years of hands-on production
          use, not a self-rated percentage.
        </p>
      </Reveal>

      <div
        role="tablist"
        aria-label="Filter skills by category"
        id={tablistId}
        className="mb-6 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={`theme-transition cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-semibold transition focus-visible:outline-offset-2 ${
                isActive
                  ? "border-transparent bg-primary-900 text-white shadow-sm dark:bg-accent-500 dark:text-primary-950"
                  : "border-border-strong bg-bg-surface text-text-muted hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.ul
        role="list"
        aria-labelledby="skills-heading"
        layout={!reduceMotion}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((skill, i) => (
          <motion.li
            key={skill.name}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -33% 0px" }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: reduceMotion ? 0 : (i % 3) * 0.08,
            }}
            className="theme-transition flex items-center justify-between gap-3 rounded-xl border border-border-light bg-bg-surface-alt px-4 py-3"
          >
            <span className="text-[14px] font-medium text-text-heading">{skill.name}</span>
            <span className="flex shrink-0 items-center gap-1" aria-label={skill.level}>
              {[1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    dot <= LEVEL_WEIGHT[skill.level] ? "bg-accent-500" : "bg-border-strong"
                  }`}
                />
              ))}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
