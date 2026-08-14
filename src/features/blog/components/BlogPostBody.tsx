import { Reveal } from "../../../shared/components/Reveal";
import { PostIllustration } from "./PostIllustration";
import type { BlogPost } from "../types";

export function BlogPostBody({ post }: { post: BlogPost }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <p className="text-[17px] leading-relaxed text-text-body sm:text-lg">{post.intro}</p>
      </Reveal>

      <div className="my-10 sm:my-14">
        <PostIllustration slug={post.meta.slug} />
      </div>

      <div className="space-y-10 sm:space-y-12">
        {post.sections.map((section) => (
          <Reveal key={section.heading}>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-heading sm:text-2xl">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-relaxed text-text-body sm:text-base">
                  {p}
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 rounded-r-2xl border-y-[1.5px] border-r-[1.5px] border-l-[6px] border-border-strong border-l-brand-blue bg-gradient-to-br from-accent-50 to-bg-surface-alt p-6 text-[15px] font-semibold leading-relaxed text-text-heading shadow-lg shadow-accent-900/5 dark:from-accent-950/20 dark:to-bg-surface-alt sm:p-8 sm:text-base">
        {post.takeaway}
      </Reveal>
    </div>
  );
}
