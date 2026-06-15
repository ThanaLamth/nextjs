import { HomePageClient } from "@/components/home-page-client";
import {
  getCachedCoinChartSnapshot,
  getCachedHeaderTickerData,
} from "@/lib/market-data-server";
import {
  estimateReadTime,
  formatDisplayDate,
  getUiCategoryKey,
  textFromHtml,
  type CategorySectionData,
  type DisplayPost,
} from "@/lib/site-ui";
import {
  decodeEntities,
  getAllCategories,
  getAuthor,
  getFeaturedImage,
  getLatestPosts,
  getPostCategories,
  getPostsByCategoryId,
  toLocalArticlePath,
  toLocalCategoryPath,
  toLocalCategorySlug,
  type WpCategory,
  type WpPost,
} from "@/lib/wp";

function toDisplayPost(post: WpPost, sourceName: string): DisplayPost {
  const image = getFeaturedImage(post);
  const categories = getPostCategories(post);
  const primaryCategory = categories[0];
  const categorySlug = toLocalCategorySlug(primaryCategory?.slug ?? "cryptocurrency-news");
  const categoryLabel = primaryCategory
    ? decodeEntities(primaryCategory.name)
    : "News";
  const text = textFromHtml(post.content?.rendered || post.excerpt.rendered || "");
  const author = getAuthor(post)?.name ?? "Editorial Team";

  return {
    id: post.id,
    href: toLocalArticlePath(post.slug),
    title: decodeEntities(post.title.rendered),
    excerpt: textFromHtml(post.excerpt.rendered || post.content?.rendered || ""),
    categorySlug,
    categoryKey: getUiCategoryKey(categorySlug),
    categoryLabel,
    author,
    source: sourceName,
    publishedAt: post.date,
    dateLabel: formatDisplayDate(post.date),
    readLabel: estimateReadTime(text),
    image: image?.source_url,
    imageAlt: decodeEntities(image?.alt_text || post.title.rendered),
  };
}

async function getSectionData(
  category: WpCategory | undefined,
  categoryMap: Map<number, WpCategory>,
  sourceName: string,
): Promise<CategorySectionData | null> {
  if (!category) {
    return null;
  }

  const posts = await getPostsByCategoryId(category.id, 5);

  return {
    key: getUiCategoryKey(toLocalCategorySlug(category.slug)),
    label: decodeEntities(category.name),
    href: toLocalCategoryPath(category, categoryMap),
    posts: posts.map((post) => toDisplayPost(post, sourceName)),
  };
}

export default async function HomePage() {
  const [latestPosts, categories, initialCoins, initialChartSnapshot] = await Promise.all([
    getLatestPosts(24),
    getAllCategories(),
    getCachedHeaderTickerData(),
    getCachedCoinChartSnapshot("bitcoin", "1"),
  ]);
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const sourceName = "TTN";

  const [categorySections, sponsoredPosts, pressPosts] = await Promise.all([
    Promise.all(
      ["insights", "trends", "narratives", "macro"].map((slug) =>
        getSectionData(categoryBySlug.get(slug), categoryMap, sourceName),
      ),
    ).then((sections) =>
      sections.filter((section): section is CategorySectionData => Boolean(section)),
    ),
    categoryBySlug.get("sponsored-articles")
      ? getPostsByCategoryId(categoryBySlug.get("sponsored-articles")!.id, 4)
      : Promise.resolve([]),
    categoryBySlug.get("press-release")
      ? getPostsByCategoryId(categoryBySlug.get("press-release")!.id, 4)
      : Promise.resolve([]),
  ]);

  return (
    <HomePageClient
      hero={latestPosts[0] ? toDisplayPost(latestPosts[0], sourceName) : undefined}
      latest={latestPosts.slice(0, 5).map((post) => toDisplayPost(post, sourceName))}
      mostRead={latestPosts.slice(0, 5).map((post) => toDisplayPost(post, sourceName))}
      featured={latestPosts.slice(1, 4).map((post) => toDisplayPost(post, sourceName))}
      categorySections={categorySections}
      sponsored={
        (sponsoredPosts.length ? sponsoredPosts : latestPosts.slice(4, 8)).map((post) =>
          toDisplayPost(post, sourceName),
        )
      }
      press={
        (pressPosts.length ? pressPosts : latestPosts.slice(8, 12)).map((post) =>
          toDisplayPost(post, sourceName),
        )
      }
      initialCoins={initialCoins}
      initialChartSnapshot={initialChartSnapshot}
    />
  );
}
