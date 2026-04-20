import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

/**
 * SEO and Meta Tags Manager
 * Dynamically updates document head with SEO-optimized meta tags
 * Supports Open Graph, Twitter Cards, and mobile optimization
 */
export function SEOHead({
  title = 'Enterprise Venture Showcase | 9 Revolutionary Companies',
  description = 'Explore 9 groundbreaking ventures with $630B+ market potential, impacting 1.5B+ people globally. Interactive dashboards, analytics, and investment-grade insights.',
  keywords = 'venture capital, startups, business plans, innovation, technology, market analysis, financial projections, enterprise solutions',
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (selector: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${selector}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', 'Enterprise Venture Portfolio');
    setMetaTag('robots', 'index, follow');

    // Open Graph Meta Tags
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', ogType, 'property');
    setMetaTag('og:image', ogImage, 'property');
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, 'property');
    }

    // Twitter Card Meta Tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Mobile Optimization Meta Tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('apple-mobile-web-app-title', 'Venture Showcase');
    setMetaTag('format-detection', 'telephone=no');

    // Theme Color
    setMetaTag('theme-color', '#030213');
    setMetaTag('msapplication-TileColor', '#030213');

    // Canonical URL
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonicalUrl);
    }

    // Preconnect to external domains for performance
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    };

    addPreconnect('https://esm.sh');
    addPreconnect('https://images.unsplash.com');

  }, [title, description, keywords, ogImage, ogType, twitterCard, canonicalUrl]);

  return null; // This component doesn't render anything
}

/**
 * Hook to dynamically update page meta tags
 */
export function usePageMeta(meta: SEOHeadProps) {
  useEffect(() => {
    const prevTitle = document.title;
    
    return () => {
      // Restore previous title on unmount
      document.title = prevTitle;
    };
  }, []);

  return <SEOHead {...meta} />;
}
