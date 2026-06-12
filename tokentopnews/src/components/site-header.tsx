import { SiteHeaderClient } from "@/components/site-header-client";
import type { NavItemData } from "@/lib/site-ui";
import {
  decodeEntities,
  PRIMARY_CATEGORY_SLUGS,
  toInternalPath,
  type SiteSettings,
  type WpCategory,
  type WpPage,
} from "@/lib/wp";

type SiteHeaderProps = {
  site: SiteSettings;
  categories: WpCategory[];
  trustPages: WpPage[];
};

const NAV_LABEL_OVERRIDES: Record<string, string> = {
  "cryptocurrency-news": "NEWS",
  insights: "INSIGHTS",
  trends: "TRENDS",
  narratives: "NARRATIVES",
  macro: "MACRO",
  "weekly-recap": "WEEKLY RECAP",
  "sponsored-articles": "SPONSORED",
  "press-release": "PRESS RELEASE",
};

const STATIC_UTILITY_LINKS = [
  { label: "Newsletter", href: "/newsletter" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Markets", href: "/markets" },
  { label: "Trending", href: "/trending" },
] as const;

function toCategoryPath(category: WpCategory): string {
  return toInternalPath(category.link ?? `/${category.slug}`);
}

function toNavItems(categories: WpCategory[]): NavItemData[] {
  const categoriesById = new Map(categories.map((category) => [category.id, category]));

  return PRIMARY_CATEGORY_SLUGS.map((slug) =>
    categories.find((category) => category.slug === slug),
  )
    .filter((category): category is WpCategory => Boolean(category))
    .map((category) => {
      const sub = categories
        .filter((entry) => entry.parent === category.id)
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((entry) => {
          const parent = categoriesById.get(entry.parent);
          const href = parent
            ? toInternalPath(`${toCategoryPath(parent)}${entry.slug}`)
            : toCategoryPath(entry);

          return {
            label: decodeEntities(entry.name),
            href,
          };
        });

      return {
        label:
          NAV_LABEL_OVERRIDES[category.slug] ??
          decodeEntities(category.name).toUpperCase(),
        href: toCategoryPath(category),
        sub: sub.length ? sub : undefined,
      };
    });
}

export function SiteHeader({ site, categories, trustPages }: SiteHeaderProps) {
  const utilityLinks = STATIC_UTILITY_LINKS.map((link) => ({
    label: link.label,
    href: toInternalPath(link.href),
  }));

  return (
    <SiteHeaderClient
      siteName={decodeEntities(site.name)}
      description={decodeEntities(site.description)}
      navItems={toNavItems(categories)}
      utilityLinks={utilityLinks}
    />
  );
}
