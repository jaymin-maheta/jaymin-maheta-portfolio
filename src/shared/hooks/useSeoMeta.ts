import { useEffect } from "react";

const SITE_URL = "https://jaymin-maheta.github.io/jaymin-maheta-portfolio";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoMetaOptions {
  title: string;
  description: string;
  keywords?: string;
  /** Path relative to the site root, e.g. "/compito" or "/blog/design-then-build" */
  path: string;
  /** Defaults to "website"; use "article" for blog posts */
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  /** Raw JSON-LD object(s) to inject in addition to the sitewide Person schema */
  structuredData?: object;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertStructuredData(id: string, data: object) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Sets per-route title, description, canonical, OG/Twitter tags and structured data. Reverts to nothing on unmount — the next route's mount call overwrites these tags directly. */
export function useSeoMeta({
  title,
  description,
  keywords,
  path,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
}: SeoMetaOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertCanonical(url);

    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    if (structuredData) {
      upsertStructuredData("route", structuredData);
    }
  }, [title, description, keywords, path, ogType, ogImage, structuredData]);
}
