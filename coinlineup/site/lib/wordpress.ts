import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import {
  decodeHtml,
  estimateReadTime,
  formatDate,
  NewsArticle,
  stripHtml,
} from "@/lib/content";

const DEFAULT_SITE_URL = "https://coinlineup.com";
const DEFAULT_API_BASE_URL = `${DEFAULT_SITE_URL}/wp-json/wp/v2`;

export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  parent: number;
  link: string;
  count?: number;
  taxonomy?: string;
}

interface WpTitle {
  rendered: string;
}

interface WpContent {
  rendered: string;
  protected: boolean;
}

interface WpExcerpt {
  rendered: string;
  protected: boolean;
}

interface WpAuthor {
  id: number;
  name: string;
  slug: string;
  link: string;
  description?: string;
}

interface WpMediaSize {
  source_url?: string;
}

interface WpMedia {
  id: number;
  source_url?: string;
  media_details?: {
    sizes?: {
      medium_large?: WpMediaSize;
      medium?: WpMediaSize;
      full?: WpMediaSize;
    };
  };
}

interface WpEmbedded {
  author?: WpAuthor[];
  "wp:featuredmedia"?: WpMedia[];
  "wp:term"?: WpTerm[][];
}

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: WpTitle;
  content: WpContent;
  excerpt: WpExcerpt;
  categories: number[];
  featured_image?: string | false;
  _embedded?: WpEmbedded;
}

export interface WpPage {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: WpTitle;
  content: WpContent;
  excerpt: WpExcerpt;
  featured_image?: string | false;
  _embedded?: WpEmbedded;
}

function getWordPressSiteUrl(): string {
  return process.env.WORDPRESS_SITE_URL ?? DEFAULT_SITE_URL;
}

function getWordPressApiBaseUrl(): string {
  return process.env.WORDPRESS_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

function apiUrl(pathname: string): URL {
  const base = getWordPressApiBaseUrl().replace(/\/+$/, "");
  return new URL(`${base}/${pathname.replace(/^\/+/, "")}`);
}

async function fetchWordPressJson<T>(
  pathname: string,
  searchParams: Record<string, string | number | boolean | undefined> = {}
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
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed for ${url.pathname}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function getFeaturedImage(post: WpPost | WpPage): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.media_details?.sizes?.medium?.source_url ??
    media?.source_url ??
    (typeof post.featured_image === "string" ? post.featured_image : "") ??
    ""
  );
}

function getPrimaryCategory(post: WpPost): string {
  const termGroup = post._embedded?.["wp:term"]?.[0];
  return termGroup?.[0]?.name ?? "News";
}

export function mapWpPostToArticle(post: WpPost, section?: NewsArticle["section"]): NewsArticle {
  const category = getPrimaryCategory(post);

  return {
    id: post.id,
    slug: post.slug,
    href: pathFromWpLink(post.link),
    title: decodeHtml(post.title.rendered),
    excerpt: decodeHtml(stripHtml(post.excerpt.rendered || post.content.rendered)).slice(0, 180),
    category,
    thumbnail: getFeaturedImage(post) || "/logo-white.png",
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content.rendered),
    author: decodeHtml(post._embedded?.author?.[0]?.name ?? "CoinLineup Editorial Team"),
    section,
  };
}

export function pathFromWpLink(link: string): string {
  return new URL(link).pathname.replace(/\/+$/, "") || "/";
}

async function getRecentPostsCached(limit: number): Promise<WpPost[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("wp:posts");
  cacheTag("home");

  return fetchWordPressJson<WpPost[]>("posts", {
    per_page: limit,
    _embed: 1,
  });
}

export async function getRecentPosts(limit = 12): Promise<WpPost[]> {
  return getRecentPostsCached(limit);
}

async function getPostBySlugCached(slug: string): Promise<WpPost | null> {
  "use cache";

  cacheLife("minutes");
  cacheTag("wp:posts");
  cacheTag(`wp:post:${slug}`);

  const posts = await fetchWordPressJson<WpPost[]>("posts", {
    slug,
    _embed: 1,
  });

  return posts[0] ?? null;
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  return getPostBySlugCached(slug);
}

async function getPageBySlugCached(slug: string): Promise<WpPage | null> {
  "use cache";

  cacheLife("hours");
  cacheTag("wp:pages");
  cacheTag(`wp:page:${slug}`);

  const pages = await fetchWordPressJson<WpPage[]>("pages", {
    slug,
    _embed: 1,
  });

  return pages[0] ?? null;
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  return getPageBySlugCached(slug);
}

async function getCategoryBySlugCached(slug: string): Promise<WpTerm | null> {
  "use cache";

  cacheLife("hours");
  cacheTag("wp:categories");
  cacheTag(`wp:category:${slug}`);

  const categories = await fetchWordPressJson<WpTerm[]>("categories", {
    slug,
    per_page: 100,
    _fields: "id,name,slug,parent,link",
  });

  return categories[0] ?? null;
}

export async function getCategoryBySlug(slug: string): Promise<WpTerm | null> {
  return getCategoryBySlugCached(slug);
}

async function getCategoriesByParentCached(parent: number): Promise<WpTerm[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("wp:categories");
  cacheTag(`wp:category-children:${parent}`);

  return fetchWordPressJson<WpTerm[]>("categories", {
    parent,
    per_page: 100,
    _fields: "id,name,slug,parent,link",
  });
}

export async function getCategoriesByParent(parent: number): Promise<WpTerm[]> {
  return getCategoriesByParentCached(parent);
}

async function getPostsByCategoryIdCached(categoryId: number, limit: number): Promise<WpPost[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("wp:posts");
  cacheTag(`wp:category-posts:${categoryId}`);

  return fetchWordPressJson<WpPost[]>("posts", {
    categories: categoryId,
    per_page: limit,
    _embed: 1,
  });
}

export async function getPostsByCategoryId(categoryId: number, limit = 12): Promise<WpPost[]> {
  return getPostsByCategoryIdCached(categoryId, limit);
}

function dedupePosts(posts: WpPost[]): WpPost[] {
  const seen = new Set<number>();
  const output: WpPost[] = [];

  for (const post of posts) {
    if (seen.has(post.id)) continue;
    seen.add(post.id);
    output.push(post);
  }

  return output.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getPostsByCategoryTreeSlug(slug: string, limit = 12): Promise<WpPost[]> {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];

  const children = await getCategoriesByParent(category.id);
  const ids = [category.id, ...children.map((item) => item.id)];

  const results = await Promise.all(ids.map((id) => getPostsByCategoryId(id, Math.max(limit, 6))));
  return dedupePosts(results.flat()).slice(0, limit);
}

export async function getCategoryArchiveByPath(segments: string[], limit = 12) {
  const category = await resolveCategoryByPath(segments);
  if (!category) return null;

  const [children, posts] = await Promise.all([
    getCategoriesByParent(category.id),
    getPostsByCategoryId(category.id, limit),
  ]);

  return { category, children, posts };
}

export async function getCategoryTreeArchiveBySlug(slug: string, limit = 12) {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;

  const [children, posts] = await Promise.all([
    getCategoriesByParent(category.id),
    getPostsByCategoryTreeSlug(slug, limit),
  ]);

  return { category, children, posts };
}

export async function getPostForCategoryPath(segments: string[], slug: string) {
  const [category, post] = await Promise.all([
    resolveCategoryByPath(segments),
    getPostBySlug(slug),
  ]);

  if (!category || !post) {
    return null;
  }

  if (!post.categories.includes(category.id)) {
    return null;
  }

  return { category, post };
}

export async function resolveCategoryByPath(segments: string[]): Promise<WpTerm | null> {
  if (segments.length === 0) return null;
  const candidate = await getCategoryBySlug(segments[segments.length - 1]);
  if (!candidate) return null;

  const expectedPath = `/${segments.join("/")}/`;
  return pathFromWpLink(candidate.link) === expectedPath.replace(/\/+$/, "") ? candidate : null;
}

export async function resolveContentByPath(segments: string[]) {
  if (segments.length === 1) {
    const [slug] = segments;
    const [page, post] = await Promise.all([getPageBySlug(slug), getPostBySlug(slug)]);

    if (page) return { kind: "page" as const, page };
    if (post) return { kind: "post" as const, post };
  }

  const category = await resolveCategoryByPath(segments);
  if (category) {
    const posts = await getPostsByCategoryId(category.id, 24);
    return { kind: "category" as const, category, posts };
  }

  return null;
}

export async function getRelatedPosts(post: WpPost, limit = 3): Promise<WpPost[]> {
  const primaryCategoryId = post.categories[0];
  if (!primaryCategoryId) return [];

  const posts = await getPostsByCategoryId(primaryCategoryId, limit + 3);
  return posts.filter((item) => item.id !== post.id).slice(0, limit);
}

export async function getHomePageData() {
  const latest = await getRecentPosts(14);

  const [newsSection, marketsSection, projectsSection, guidesSection] = await Promise.all([
    getPostsByCategoryTreeSlug("news", 6),
    getPostsByCategoryTreeSlug("markets", 6),
    getPostsByCategoryTreeSlug("projects", 6),
    getPostsByCategoryTreeSlug("guides", 4),
  ]);

  return {
    latest: latest.map((post) => mapWpPostToArticle(post, "news")),
    mostRead: latest.slice(5, 10).map((post) => mapWpPostToArticle(post, "news")),
    editorsPicks: (guidesSection.length ? guidesSection : latest.slice(2, 5)).map((post) =>
      mapWpPostToArticle(post, "guides")
    ),
    newsSection: (newsSection.length ? newsSection : latest.slice(0, 5)).map((post) =>
      mapWpPostToArticle(post, "news")
    ),
    marketsSection: (marketsSection.length ? marketsSection : latest.slice(5, 10)).map((post) =>
      mapWpPostToArticle(post, "markets")
    ),
    projectsSection: (projectsSection.length ? projectsSection : latest.slice(8, 13)).map((post) =>
      mapWpPostToArticle(post, "projects")
    ),
  };
}

export async function searchWordPressContent(query: string, limit = 12): Promise<NewsArticle[]> {
  const search = query.trim();
  if (!search) {
    return [];
  }

  const [posts, pages] = await Promise.all([
    fetchWordPressJson<WpPost[]>("posts", {
      search,
      per_page: limit,
      _embed: 1,
    }),
    fetchWordPressJson<WpPage[]>("pages", {
      search,
      per_page: Math.min(limit, 6),
      _embed: 1,
    }),
  ]);

  const postResults = posts.map((post) => mapWpPostToArticle(post, "news"));
  const pageResults = pages.map((page) => ({
    id: page.id,
    slug: page.slug,
    href: pathFromWpLink(page.link),
    title: decodeHtml(page.title.rendered),
    excerpt: decodeHtml(stripHtml(page.excerpt.rendered || page.content.rendered)).slice(0, 180),
    category: "Page",
    thumbnail: getFeaturedImage(page) || "/logo-white.png",
    date: formatDate(page.date),
    readTime: estimateReadTime(page.content.rendered),
    author: "CoinLineup",
    section: undefined,
  }));

  return [...postResults, ...pageResults].slice(0, limit);
}
