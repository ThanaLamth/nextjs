import type { MetadataRoute } from "next";
import { getSiteUrl, pathFromWpLink } from "@/lib/wordpress";

type SitemapItem = {
  modified: string;
  link: string;
};

type WpCategory = {
  id: number;
};

const DEFAULT_SITE_URL = "https://coinlineup.com";
const DEFAULT_API_BASE_URL = `${DEFAULT_SITE_URL}/wp-json/wp/v2`;

function getWordPressApiBaseUrl(): string {
  return process.env.WORDPRESS_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

function apiUrl(pathname: string): URL {
  const base = getWordPressApiBaseUrl().replace(/\/+$/, "");
  return new URL(`${base}/${pathname.replace(/^\/+/, "")}`);
}

async function fetchSitemapJson<T>(
  pathname: string,
  searchParams: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = apiUrl(pathname);

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 900,
      tags: ["wp:sitemap"],
    },
  });

  if (!response.ok) {
    throw new Error(`Sitemap WordPress request failed for ${url.pathname}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getRecentPosts(limit: number): Promise<SitemapItem[]> {
  return fetchSitemapJson<SitemapItem[]>("posts", {
    per_page: limit,
    _fields: "modified,link",
  });
}

async function getPageBySlug(slug: string): Promise<SitemapItem | null> {
  const pages = await fetchSitemapJson<SitemapItem[]>("pages", {
    slug,
    _fields: "modified,link",
  });

  return pages[0] ?? null;
}

async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
  const categories = await fetchSitemapJson<WpCategory[]>("categories", {
    slug,
    per_page: 100,
    _fields: "id",
  });

  return categories[0] ?? null;
}

async function getCategoriesByParent(parent: number): Promise<WpCategory[]> {
  return fetchSitemapJson<WpCategory[]>("categories", {
    parent,
    per_page: 100,
    _fields: "id",
  });
}

async function getPostsByCategoryId(categoryId: number, limit: number): Promise<SitemapItem[]> {
  return fetchSitemapJson<SitemapItem[]>("posts", {
    categories: categoryId,
    per_page: limit,
    _fields: "modified,link",
  });
}

async function getPostsByCategoryTreeSlug(slug: string, limit: number): Promise<SitemapItem[]> {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];

  const children = await getCategoriesByParent(category.id);
  const ids = [category.id, ...children.map((item) => item.id)];
  const results = await Promise.all(
    ids.map((id) => getPostsByCategoryId(id, Math.max(limit, 6))),
  );

  const seen = new Set<string>();

  return results
    .flat()
    .filter((post) => {
      if (seen.has(post.link)) return false;
      seen.add(post.link);
      return true;
    })
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
    .slice(0, limit);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [recentPostsResult, newsPostsResult, aboutPageResult] = await Promise.allSettled([
    getRecentPosts(100),
    getPostsByCategoryTreeSlug("news", 30),
    getPageBySlug("about"),
  ]);

  const recentPosts = recentPostsResult.status === "fulfilled" ? recentPostsResult.value : [];
  const newsPosts = newsPostsResult.status === "fulfilled" ? newsPostsResult.value : [];
  const aboutPage = aboutPageResult.status === "fulfilled" ? aboutPageResult.value : null;

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${siteUrl}/news`,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tools`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/us`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/us/methodology`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/uk`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/uk/methodology`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/canada`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/canada/methodology`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/australia`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/crypto-tax-calculator/australia/methodology`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  if (aboutPage) {
    staticEntries.push({
      url: `${siteUrl}${pathFromWpLink(aboutPage.link)}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(aboutPage.modified),
    });
  }

  const postEntries = [...recentPosts, ...newsPosts].reduce<MetadataRoute.Sitemap>(
    (items, post) => {
      const url = `${siteUrl}${pathFromWpLink(post.link)}`;
      if (items.some((entry) => entry.url === url)) {
        return items;
      }

      items.push({
        url,
        lastModified: new Date(post.modified),
        changeFrequency: "hourly",
        priority: 0.8,
      });
      return items;
    },
    [],
  );

  return [...staticEntries, ...postEntries];
}
