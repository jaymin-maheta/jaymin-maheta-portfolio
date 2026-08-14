import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { loadBlogPostBySlug } from "../repository";
import { BlogPostHero } from "../components/BlogPostHero";
import { BlogPostBody } from "../components/BlogPostBody";
import { NotFoundPage } from "../../case-studies/pages/NotFoundPage";
import type { BlogPost } from "../types";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  // undefined = loading, null = not found, object = ready

  useEffect(() => {
    let cancelled = false;
    setPost(undefined);

    if (!slug) {
      setPost(null);
      return;
    }

    loadBlogPostBySlug(slug).then((result) => {
      if (!cancelled) setPost(result ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Layout>
        <div
          className="flex min-h-[50vh] items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label="Loading post"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-brand-blue" />
        </div>
      </Layout>
    );
  }

  if (post === null) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Navbar
        eyebrow="Writing"
        title="Jaymin Maheta"
        homeLink={{ href: "/", label: "Back to Portfolio" }}
      />
      <main id="main-content">
        <BlogPostHero meta={post.meta} />
        <BlogPostBody post={post} />
      </main>
      <Footer />
    </Layout>
  );
}
