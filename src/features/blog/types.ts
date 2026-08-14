export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  publishedLabel: string;
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
