import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";

interface PostPreview {
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
}

// Placeholder content — replace with real posts (or link an external blog) before publishing.
const POSTS: PostPreview[] = [
  {
    title: "Sample post — e.g. \"Migrating a large Angular app from Material to PrimeNG\"",
    excerpt:
      "Placeholder excerpt. Swap this for a real write-up of a technical decision, migration, or lesson learned worth sharing.",
    tag: "Angular",
    readTime: "6 min",
  },
  {
    title: "Sample post — e.g. \"A 7-1 SCSS architecture that survives multiple teams\"",
    excerpt:
      "Placeholder excerpt. Swap this for a real write-up of a technical decision, migration, or lesson learned worth sharing.",
    tag: "Architecture",
    readTime: "5 min",
  },
  {
    title: "Sample post — e.g. \"What changes when you design the component, then build it\"",
    excerpt:
      "Placeholder excerpt. Swap this for a real write-up of a technical decision, migration, or lesson learned worth sharing.",
    tag: "Design Systems",
    readTime: "4 min",
  },
];

export function BlogSection() {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
            Writing
          </p>
          <Reveal>
            <h2
              id="writing-heading"
              className="text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
            >
              Notes on engineering and design systems.
            </h2>
          </Reveal>
        </div>
        <span className="rounded-full border border-dashed border-border-strong bg-bg-surface-alt px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
          Sample content — placeholder
        </span>
      </div>

      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post) => (
          <RevealItem
            key={post.title}
            className="theme-transition flex h-full flex-col rounded-2xl border border-border-light bg-bg-surface p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[var(--shadow-lg)] sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-text-muted ring-1 ring-border-light">
                {post.tag}
              </span>
              <span className="text-[12px] text-text-subtle">{post.readTime} read</span>
            </div>
            <h3 className="mb-2 font-display text-[16px] font-semibold leading-snug text-text-heading">
              {post.title}
            </h3>
            <p className="flex-1 text-[13.5px] leading-relaxed text-text-muted">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-subtle">
              Coming soon
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
