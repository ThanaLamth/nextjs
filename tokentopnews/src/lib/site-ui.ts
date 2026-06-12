export type NavSubItemData = {
  label: string;
  href: string;
};

export type NavItemData = {
  label: string;
  href: string;
  sub?: NavSubItemData[];
};

export type DisplayPost = {
  id: number;
  href: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryKey: string;
  categoryLabel: string;
  author: string;
  source: string;
  publishedAt: string;
  dateLabel: string;
  readLabel: string;
  image?: string;
  imageAlt?: string;
};

export type CategorySectionData = {
  key: string;
  label: string;
  href: string;
  posts: DisplayPost[];
};

export type CategoryMeta = {
  grad: string;
  accent: string;
  text: string;
  label: string;
  icon: string;
  badgeClass: string;
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  news: {
    grad: "linear-gradient(135deg,#7B2FF7,#E040FB)",
    accent: "#9B3DFF",
    text: "#C47AFF",
    label: "News",
    icon: "📰",
    badgeClass: "badge-news",
  },
  insights: {
    grad: "linear-gradient(135deg,#00C8FF,#7B2FF7)",
    accent: "#00C8FF",
    text: "#0090B0",
    label: "Insights",
    icon: "💡",
    badgeClass: "badge-insights",
  },
  trends: {
    grad: "linear-gradient(135deg,#FFA800,#E040FB)",
    accent: "#FFA800",
    text: "#C07800",
    label: "Trends",
    icon: "📈",
    badgeClass: "badge-trends",
  },
  narratives: {
    grad: "linear-gradient(135deg,#00D4A0,#9B3DFF)",
    accent: "#00D4A0",
    text: "#00A07A",
    label: "Narratives",
    icon: "📖",
    badgeClass: "badge-narratives",
  },
  macro: {
    grad: "linear-gradient(135deg,#FF5080,#FFA800)",
    accent: "#FF5080",
    text: "#D94060",
    label: "Macro",
    icon: "🌐",
    badgeClass: "badge-macro",
  },
  sponsored: {
    grad: "linear-gradient(135deg,#9B3DFF,#E040FB)",
    accent: "#9B3DFF",
    text: "#7B2DD0",
    label: "Sponsored Articles",
    icon: "⭐",
    badgeClass: "badge-sponsored",
  },
  press: {
    grad: "linear-gradient(135deg,#3B8BFF,#9B3DFF)",
    accent: "#3B8BFF",
    text: "#1B6BE0",
    label: "Press Release",
    icon: "📰",
    badgeClass: "badge-press",
  },
  "weekly-recap": {
    grad: "linear-gradient(135deg,#00C8FF,#00E5A0)",
    accent: "#00C8FF",
    text: "#0090B0",
    label: "Weekly Recap",
    icon: "📅",
    badgeClass: "badge-news",
  },
};

export function decodeBasicEntities(text: string): string {
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

export function textFromHtml(html: string): string {
  return decodeBasicEntities(
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

export function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatDisplayDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString).getTime();
  const deltaMs = Date.now() - date;
  const deltaMinutes = Math.max(1, Math.floor(deltaMs / 60000));

  if (deltaMinutes < 60) {
    return `${deltaMinutes}m ago`;
  }

  const deltaHours = Math.floor(deltaMinutes / 60);
  if (deltaHours < 24) {
    return `${deltaHours}h ago`;
  }

  const deltaDays = Math.floor(deltaHours / 24);
  if (deltaDays < 7) {
    return `${deltaDays}d ago`;
  }

  return formatDisplayDate(dateString);
}

export function getUiCategoryKey(slug: string): string {
  if (CATEGORY_META[slug]) {
    return slug;
  }

  if (slug === "cryptocurrency-news") {
    return "news";
  }

  if (slug === "press-release" || slug.includes("press")) {
    return "press";
  }

  if (slug === "sponsored-articles" || slug.includes("sponsored")) {
    return "sponsored";
  }

  if (slug === "regulation") {
    return "macro";
  }

  return "news";
}

export function getCategoryMeta(slug: string): CategoryMeta {
  return CATEGORY_META[getUiCategoryKey(slug)] ?? CATEGORY_META.news;
}

export function extractHeadings(html: string): string[] {
  const matches = html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi);
  return Array.from(matches, (match) =>
    decodeBasicEntities(match[1].replace(/<[^>]+>/g, "").trim()),
  ).filter(Boolean);
}

export function injectHeadingIds(html: string): string {
  let index = 0;

  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
    const id = `s${index}`;
    index += 1;
    return `<h2 id="${id}"${attrs}>${content}</h2>`;
  });
}
