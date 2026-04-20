import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
  image?: string;
  /** Canonical URL; defaults to current URL */
  canonical?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets the document title + common meta tags (description, OG, Twitter) for
 * the current route. SPA navigation reuses the same document, so each route
 * that cares about SEO should call this at the top of its render.
 */
export function usePageMeta({ title, description, image, canonical }: PageMeta) {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:card', 'summary_large_image');

    const url = canonical ?? (typeof window !== 'undefined' ? window.location.href : undefined);
    if (url) {
      upsertMeta('property', 'og:url', url);
      upsertLink('canonical', url);
    }

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }
  }, [title, description, image, canonical]);
}
