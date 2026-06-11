import "server-only";

import { cacheLife, cacheTag } from "next/cache";

export type RenderedField = {
  rendered: string;
  protected?: boolean;
};

export type YoastHeadJson = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_type?: string;
  og_site_name?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    type?: string;
  }>;
  article_published_time?: string;
  article_modified_time?: string;
  author?: string;
  twitter_site?: string;
};

export type WpAuthor = {
  id: number;
  name: string;
  slug: string;
  link?: string;
  description?: string;
  avatar_urls?: Record<string, string>;
};

export type WpMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string }>;
  };
};

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  link?: string;
};

export type WpPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: RenderedField;
  excerpt: RenderedField;
  content?: RenderedField;
  author: number;
  featured_media: number;
  categories: number[];
  yoast_head_json?: YoastHeadJson;
  _embedded?: {
    author?: WpAuthor[];
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: Array<WpCategory[]>;
  };
};

export type WpPage = {
  id: number;
  slug: string;
  link: string;
  parent: number;
  status: string;
  date?: string;
  modified?: string;
  title: RenderedField;
  excerpt?: RenderedField;
  content?: RenderedField;
  yoast_head_json?: YoastHeadJson;
};

export type SiteSettings = {
  name: string;
  description: string;
  url: string;
  home: string;
  page_on_front: number;
  show_on_front: string;
  site_logo?: number;
  site_icon_url?: string;
};

export type ResolvedEntity =
  | { kind: "post"; post: WpPost }
  | { kind: "page"; page: WpPage }
  | { kind: "category"; category: WpCategory; posts: WpPost[] };

const WORDPRESS_BASE_URL =
  process.env.WORDPRESS_BASE_URL ?? "https://tokentopnews.com";
const WORDPRESS_API_BASE = `${WORDPRESS_BASE_URL.replace(/\/$/, "")}/wp-json`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PRIMARY_CATEGORY_SLUGS = [
  "cryptocurrency-news",
  "insights",
  "trends",
  "narratives",
  "macro",
  "weekly-recap",
  "sponsored-articles",
  "press-release",
] as const;

export const TRUST_PAGE_SLUGS = [
  "about-us",
  "publishing-principles",
  "ownership-funding",
  "feedback-corrections",
  "ethics-policy",
  "diversity-policy",
  "diversity-staffing-report",
  "privacy-policy",
] as const;

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${WORDPRESS_API_BASE}${normalizedPath}`;
}

async function fetchWordPress<T>(path: string): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
}

function normalizePathFromLink(link: string): string {
  const url = new URL(link);
  const pathname = url.pathname.replace(/^\/+|\/+$/g, "");
  return pathname;
}

export function stripHtml(html: string): string {
  return decodeEntities(
    html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
  );
}

export function decodeEntities(text: string): string {
  let output = text;

  for (let index = 0; index < 3; index += 1) {
    output = output
      .replace(/&nbsp;/g, " ")
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&#038;/g, "&")
      .replace(/&amp;/g, "&");
  }

  return output;
}

export function getFeaturedImage(post: WpPost): WpMedia | undefined {
  return post._embedded?.["wp:featuredmedia"]?.[0];
}

export function getAuthor(post: WpPost): WpAuthor | undefined {
  return post._embedded?.author?.[0];
}

export function getPostCategories(post: WpPost): WpCategory[] {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getCachedSiteSettings();
}

async function getCachedSiteSettings(): Promise<SiteSettings> {
  "use cache";

  cacheLife("days");
  cacheTag("site");

  return fetchWordPress<SiteSettings>("/");
}

export async function getAllCategories(): Promise<WpCategory[]> {
  return getCachedAllCategories();
}

async function getCachedAllCategories(): Promise<WpCategory[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("categories");

  return fetchWordPress<WpCategory[]>(
    "/wp/v2/categories?per_page=100&_fields=id,name,slug,parent,count,link",
  );
}

export async function getPrimaryCategories(): Promise<WpCategory[]> {
  const categories = await getAllCategories();
  const order = new Map<string, number>(
    PRIMARY_CATEGORY_SLUGS.map((slug, index) => [slug, index]),
  );

  return categories
    .filter((category) =>
      PRIMARY_CATEGORY_SLUGS.includes(
        category.slug as (typeof PRIMARY_CATEGORY_SLUGS)[number],
      ),
    )
    .sort(
      (left, right) =>
        (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
        (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER),
    );
}

export async function getLatestPosts(limit = 12): Promise<WpPost[]> {
  return getCachedLatestPosts(limit);
}

async function getCachedLatestPosts(limit: number): Promise<WpPost[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("posts");
  cacheTag("home");

  return fetchWordPress<WpPost[]>(
    `/wp/v2/posts?per_page=${limit}&_embed&_fields=id,slug,link,date,modified,title,excerpt,categories,author,featured_media,yoast_head_json,_embedded`,
  );
}

export async function getPostsByCategoryId(
  categoryId: number,
  limit = 4,
): Promise<WpPost[]> {
  return getCachedPostsByCategoryId(categoryId, limit);
}

async function getCachedPostsByCategoryId(
  categoryId: number,
  limit: number,
): Promise<WpPost[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("posts");
  cacheTag(`category:${categoryId}`);

  return fetchWordPress<WpPost[]>(
    `/wp/v2/posts?per_page=${limit}&categories=${categoryId}&_embed&_fields=id,slug,link,date,modified,title,excerpt,categories,author,featured_media,yoast_head_json,_embedded`,
  );
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  return getCachedPostBySlug(slug);
}

async function getCachedPostBySlug(slug: string): Promise<WpPost | null> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");
  cacheTag(`post:${slug}`);

  const posts = await fetchWordPress<WpPost[]>(
    `/wp/v2/posts?slug=${encodeURIComponent(
      slug,
    )}&_embed&_fields=id,slug,link,date,modified,title,excerpt,content,categories,author,featured_media,yoast_head_json,_embedded`,
  );

  return posts[0] ?? null;
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  return getCachedPageBySlug(slug);
}

async function getCachedPageBySlug(slug: string): Promise<WpPage | null> {
  "use cache";

  cacheLife("hours");
  cacheTag("pages");
  cacheTag(`page:${slug}`);

  const pages = await fetchWordPress<WpPage[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(
      slug,
    )}&_fields=id,slug,link,parent,status,date,modified,title,excerpt,content,yoast_head_json`,
  );

  return pages[0] ?? null;
}

export async function getTrustPages(): Promise<WpPage[]> {
  return Promise.all(TRUST_PAGE_SLUGS.map((slug) => getPageBySlug(slug))).then(
    (pages) => pages.filter((page): page is WpPage => Boolean(page)),
  );
}

export async function getFrontPage(): Promise<WpPage | null> {
  const site = await getSiteSettings();

  if (!site.page_on_front) {
    return null;
  }

  return getCachedPageById(site.page_on_front);
}

async function getCachedPageById(id: number): Promise<WpPage | null> {
  "use cache";

  cacheLife("days");
  cacheTag("pages");
  cacheTag(`page-id:${id}`);

  try {
    return await fetchWordPress<WpPage>(
      `/wp/v2/pages/${id}?_fields=id,slug,link,parent,status,date,modified,title,excerpt,content,yoast_head_json`,
    );
  } catch {
    return null;
  }
}

function buildCategoryPath(
  category: WpCategory,
  categoryMap: Map<number, WpCategory>,
): string {
  const segments = [category.slug];
  let parentId = category.parent;

  while (parentId) {
    const parent = categoryMap.get(parentId);

    if (!parent) {
      break;
    }

    segments.unshift(parent.slug);
    parentId = parent.parent;
  }

  return segments.join("/");
}

export async function resolveEntityByPath(
  slugParts: string[],
): Promise<ResolvedEntity | null> {
  const normalizedPath = slugParts.filter(Boolean).join("/");
  const leafSlug = slugParts.at(-1);

  if (!leafSlug) {
    return null;
  }

  const page = await getPageBySlug(leafSlug);
  if (page && normalizePathFromLink(page.link) === normalizedPath) {
    return { kind: "page", page };
  }

  const categories = await getAllCategories();
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const category = categories.find(
    (entry) => entry.slug === leafSlug && buildCategoryPath(entry, categoryMap) === normalizedPath,
  );

  if (category) {
    const posts = await getPostsByCategoryId(category.id, 12);
    return { kind: "category", category, posts };
  }

  if (slugParts.length === 1) {
    const post = await getPostBySlug(leafSlug);
    if (post && normalizePathFromLink(post.link) === normalizedPath) {
      return { kind: "post", post };
    }
  }

  return null;
}

export function absoluteUrl(pathname = "/"): string {
  return new URL(toInternalPath(pathname), SITE_URL).toString();
}

export function toInternalPath(urlOrPath: string): string {
  const pathname = urlOrPath.startsWith("http")
    ? new URL(urlOrPath).pathname
    : urlOrPath;
  const normalized = pathname.replace(/\/+$/g, "");

  return normalized ? `${normalized}/` : "/";
}
