export interface NewsArticle {
  id: number;
  slug?: string;
  href?: string;
  title: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  date: string;
  readTime: string;
  hoursAgo?: number;
  author?: string;
  badge?: string;
  priceTag?: { symbol: string; change: number };
  featured?: boolean;
  section?: "news" | "markets" | "projects" | "guides";
}

export function timeAgo(hours?: number): string {
  if (!hours && hours !== 0) return "";
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function buildArticleHref(article: NewsArticle): string {
  if (article.href) {
    return article.href;
  }

  return `/news/${article.category.toLowerCase().replace(/\s+/g, "-")}/${article.id}`;
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface SanitizeRenderedHtmlOptions {
  removeLeadingHeading?: boolean;
}

export function sanitizeRenderedHtml(
  value: string,
  options: SanitizeRenderedHtmlOptions = {},
): string {
  let sanitized = value;

  // Remove plugin-generated table-of-contents blocks that clutter trust pages.
  sanitized = sanitized.replace(
    /<div[^>]*id=(["'])ez-toc-container\1[^>]*>[\s\S]*?<\/nav>\s*<\/div>/gi,
    "",
  );

  // Remove inline marker spans injected around headings by the TOC plugin.
  sanitized = sanitized.replace(/<span[^>]*class=(["'])ez-toc-section(?:-end)?\1[^>]*>[\s\S]*?<\/span>/gi, "");

  if (options.removeLeadingHeading) {
    sanitized = sanitized.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  }

  sanitized = sanitized.replace(/<p>\s*(?:&nbsp;|\u00a0|\s)*<\/p>/gi, "");
  sanitized = sanitized.replace(/\n{3,}/g, "\n\n");

  return sanitized.trim();
}

export function decodeHtml(value: string): string {
  return value
    .replace(/&#8217;|&#039;|&#x27;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&quot;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/&#8230;/g, "...")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217/g, "'")
    .trim();
}

export function buildMetaDescription(value: string, title?: string, maxLength = 160): string {
  let plain = decodeHtml(stripHtml(sanitizeRenderedHtml(value, {
    removeLeadingHeading: true,
  }))).trim();

  if (!plain) {
    return "";
  }

  if (title) {
    const normalizedTitle = decodeHtml(title).trim();

    if (normalizedTitle) {
      const titlePrefixPattern = new RegExp(`^(?:${escapeRegExp(normalizedTitle)}[\\s:|\\-]+)+`, "i");
      plain = plain.replace(titlePrefixPattern, "").trim();
    }
  }

  if (plain.length <= maxLength) {
    return plain;
  }

  return plain.slice(0, maxLength).trimEnd();
}

export function estimateReadTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
