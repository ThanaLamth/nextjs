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
