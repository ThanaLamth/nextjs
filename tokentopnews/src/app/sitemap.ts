import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_URL, toInternalPath } from "@/lib/wp";

export const revalidate = 3600;

type SitemapPost = {
  slug: string;
  modified: string;
  link: string;
};

type SitemapPage = {
  link: string;
  modified?: string;
};

type SitemapCategory = {
  link?: string;
  slug: string;
};

async function fetchSitemapJson<T>(path: string): Promise<T> {
  const response = await fetch(
    `https://tokentopnews.com/wp-json${path.startsWith("/") ? path : `/${path}`}`,
  );

  if (!response.ok) {
    throw new Error(`Sitemap fetch failed for ${path}`);
  }

  return (await response.json()) as T;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages, categories] = await Promise.all([
    fetchSitemapJson<SitemapPost[]>(
      "/wp/v2/posts?per_page=100&_fields=slug,modified,link",
    ),
    fetchSitemapJson<SitemapPage[]>(
      "/wp/v2/pages?per_page=100&_fields=link,modified",
    ),
    fetchSitemapJson<SitemapCategory[]>(
      "/wp/v2/categories?per_page=100&_fields=slug,link",
    ),
  ]);

  const items: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: new URL(toInternalPath(new URL(post.link).pathname), SITE_URL).toString(),
      lastModified: new Date(post.modified),
    })),
    ...pages.map((page) => ({
      url: new URL(toInternalPath(new URL(page.link).pathname), SITE_URL).toString(),
      lastModified: page.modified ? new Date(page.modified) : new Date(),
    })),
    ...categories
      .filter((category) => category.link)
      .map((category) => ({
        url: new URL(
          toInternalPath(new URL(category.link as string).pathname),
          SITE_URL,
        ).toString(),
        lastModified: new Date(),
      })),
  ];

  return items;
}
