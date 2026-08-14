export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  publishedLabel: string;
  /** SEO: <title> tag content, distinct per post — omit "Jaymin Maheta" suffix, handled by the hook */
  seoTitle: string;
  /** SEO: meta description, 150-160 chars */
  seoDescription: string;
  /** SEO: comma-separated keyword phrases used for the keywords meta tag */
  seoKeywords: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs */
  bullets?: string[];
}

export interface BlogPost {
  meta: BlogPostMeta;
  intro: string;
  sections: BlogSection[];
  takeaway: string;
}
