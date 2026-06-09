import type { MetadataRoute } from "next";
import {
  getPageBySlug,
  getPostsByCategoryTreeSlug,
  getRecentPosts,
  getSiteUrl,
  pathFromWpLink,
} from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [recentPosts, newsPosts, aboutPage] = await Promise.all([
    getRecentPosts(100),
    getPostsByCategoryTreeSlug("news", 30),
    getPageBySlug("about"),
  ]);

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
  ];

  if (aboutPage) {
    staticEntries.push({
      url: `${siteUrl}${pathFromWpLink(aboutPage.link)}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(aboutPage.modified),
    });
  }

  const postEntries = [...recentPosts, ...newsPosts].reduce<MetadataRoute.Sitemap>((items, post) => {
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
  }, []);

  return [...staticEntries, ...postEntries];
}
