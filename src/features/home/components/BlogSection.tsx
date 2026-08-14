import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { TiltCard } from "../../../shared/components/TiltCard";
import { getAllBlogPosts } from "../../blog/repository";

export function BlogSection() {
  const posts = getAllBlogPosts();

  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Writing
      </p>
      <Reveal>
        <h2
          id="writing-heading"
          className="mb-3 text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
        >
          Notes on engineering and design systems.
        </h2>
        <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
          Field notes from real migrations, architecture decisions and the design-to-code work
          behind the projects above.
        </p>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RevealItem key={post.slug} className="contents">
            <TiltCard
              to={`/blog/${post.slug}`}
              className="group theme-transition flex h-full flex-col rounded-2xl border border-border-light bg-bg-surface p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[var(--shadow-lg)] sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="rounded-full bg-bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-text-muted ring-1 ring-border-light">
                  {post.tag}
                </span>
                <span className="text-[12px] text-text-subtle">{post.readTime} read</span>
              </div>
              <h3 className="mb-2 font-display text-[16px] font-semibold leading-snug text-text-heading transition group-hover:text-brand-blue">
                {post.title}
              </h3>
              <p className="flex-1 text-[13.5px] leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue transition group-hover:gap-2.5">
                Read post
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
