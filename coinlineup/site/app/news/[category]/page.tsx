import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import CategoryStrip from "@/components/CategoryStrip";
import { ALL_NEWS } from "@/lib/mockNews";
import NewsletterForm from "@/components/NewsletterForm";
import {
  getCategoryBySlug,
  getPostsByCategoryId,
  mapWpPostToArticle,
  resolveCategoryByPath,
} from "@/lib/wordpress";

const VALID_CATEGORIES = [
  "crypto", "markets", "blockchain", "defi", "nft", "dao", "analysis",
  "bitcoin", "ethereum", "altcoins", "regulation", "banking", "exchanges", "blockchain-events",
];

const CATEGORY_LABELS: Record<string, string> = {
  "blockchain-events": "Blockchain Events",
  banking: "Banking",
  crypto: "Crypto",
  markets: "Markets",
  blockchain: "Blockchain",
  defi: "DeFi",
  nft: "NFT",
  dao: "DAO",
  analysis: "Analysis",
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  altcoins: "Altcoins",
  regulation: "Regulation",
  exchanges: "Exchanges",
};

function displayLabel(category: string) {
  return CATEGORY_LABELS[category.toLowerCase()] ?? (category.charAt(0).toUpperCase() + category.slice(1));
}

function normalize(s: string) {
  return s.toLowerCase().replace(/-/g, " ").trim();
}

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: `${displayLabel(category)} News — CoinLineup` };
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Props) {
  const { category } = await params;
  const liveCategory =
    (await resolveCategoryByPath(["news", category])) ??
    (await getCategoryBySlug(category));

  if (!liveCategory && !VALID_CATEGORIES.includes(category.toLowerCase())) notFound();

  const label = liveCategory?.name ?? displayLabel(category);
  const livePosts = liveCategory ? await getPostsByCategoryId(liveCategory.id, 18) : [];
  const articles = livePosts.length
    ? livePosts.map((post) => mapWpPostToArticle(post, "news"))
    : ALL_NEWS.filter((n) => normalize(n.category) === normalize(category));
  const allOthers = livePosts.length
    ? ALL_NEWS.slice(0, 4)
    : ALL_NEWS.filter((n) => normalize(n.category) !== normalize(category)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-1">Category</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--text-primary)" }}>
          {label} <span className="gradient-text">News</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {articles.length} article{articles.length !== 1 ? "s" : ""} in {label}
        </p>
      </div>

      <CategoryStrip />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        {/* Main articles */}
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <>
              {/* Featured */}
              <div className="mb-5">
                <NewsCard article={articles[0]} variant="featured" index={0} />
              </div>
              {/* Grid */}
              {articles.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.slice(1).map((a, i) => (
                    <NewsCard key={a.id} article={a} variant="default" index={i + 1} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--text-secondary)" }}>
                No articles yet
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Check back soon for {label} coverage.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {allOthers.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>
                More Stories
              </h3>
              <div className="space-y-3">
                {allOthers.map((a, i) => (
                  <NewsCard key={a.id} article={a} variant="horizontal" index={i} />
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl p-5" style={{ background: "rgba(247,147,26,0.08)", border: "1px solid rgba(247,147,26,0.25)" }}>
            <p className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
              Stay Updated
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Get {label} news delivered daily.
            </p>
            <NewsletterForm compact buttonText="Subscribe Free" />
          </div>
        </div>
      </div>
    </div>
  );
}
