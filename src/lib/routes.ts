import { NavigationTab } from '../types';

// Canonical path for each nav tab. 'home' maps to '/' so the root URL is clean.
export const TAB_PATHS: Record<Exclude<NavigationTab, 'admin'>, string> = {
  home: '/',
  services: '/services',
  products: '/products',
  featured: '/featured-work',
  about: '/about',
  careers: '/careers',
  blogs: '/blogs',
  gallery: '/gallery',
  partners: '/partners',
  contact: '/contact',
  'client-portal': '/client-portal',
};

const PATH_TO_TAB: Record<string, NavigationTab> = Object.entries(TAB_PATHS).reduce(
  (acc, [tab, path]) => {
    acc[path] = tab as NavigationTab;
    return acc;
  },
  {} as Record<string, NavigationTab>
);

/**
 * Resolves a pathname (e.g. from window.location.pathname) to a known
 * NavigationTab. Returns null when the path doesn't match a static tab route
 * (e.g. it's a /blog/:slug deep link, which the caller should check for
 * separately with parseBlogSlug()).
 */
export function pathToTab(pathname: string): NavigationTab | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_TAB[clean] ?? null;
}

/** Returns the canonical path for a tab, e.g. tabToPath('services') -> '/services'. */
export function tabToPath(tab: NavigationTab): string {
  if (tab === 'admin') return window.location.pathname; // admin has no public path, leave URL untouched
  return TAB_PATHS[tab] ?? '/';
}

/** Extracts the slug from a /blog/:slug path, or null if the path isn't a blog deep link. */
export function parseBlogSlug(pathname: string): string | null {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Builds the canonical URL path for a single blog post. */
export function blogPostPath(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}
