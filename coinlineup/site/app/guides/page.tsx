import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import {
  getCategoryTreeArchiveBySlug,
  mapWpPostToArticle,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Guides - CoinLineup",
  description: "Crypto guides, explainers, and educational articles from CoinLineup.",
};

export default async function GuidesPage() {
  const archive = await getCategoryTreeArchiveBySlug("guides", 12);
  const categories = archive?.children ?? [];
  const articles = archive?.posts.map((post) => mapWpPostToArticle(post, "guides")) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-brand-green" />
          <p className="text-brand-green font-display font-semibold text-sm uppercase tracking-widest">
            Learning Hub
          </p>
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          Crypto <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-base max-w-3xl" style={{ color: "var(--text-secondary)" }}>
          Learn from CoinLineup&apos;s live WordPress knowledge base while the new Next.js frontend is being rebuilt.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/guides/${category.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-brand-orange hover:text-brand-orange"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              <span>{category.name}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(247,147,26,0.12)", color: "#F7931A" }}
              >
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
          Latest Guides
        </h2>
        {archive?.category ? (
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {archive.category.count} total posts
          </span>
        ) : null}
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} variant="default" index={index} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-8 md:p-10"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            Guides are not available yet
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            The WordPress guide archive did not return any posts for this environment.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold">
            Back to home <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
