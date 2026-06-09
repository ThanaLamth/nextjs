import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Clock3 } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import CategoryStrip from "@/components/CategoryStrip";
import { LATEST_NEWS, MOST_READ } from "@/lib/mockNews";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "News — Crypto & Blockchain Headlines" };

export default function NewsPage() {
  const latestNews = LATEST_NEWS.slice(0, 12);
  const mostRead = MOST_READ.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: "var(--text-primary)" }}>
          Crypto <span className="gradient-text">News</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Breaking news and in-depth analysis from the world of cryptocurrency
        </p>
      </div>

      {/* Category strip */}
      <CategoryStrip />

      {/* Main grid + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Clock3 size={18} className="text-brand-orange" />
              Latest News
            </h2>
          </div>

          {/* Featured first article */}
          <div className="mb-5">
            <NewsCard article={latestNews[0]} variant="featured" index={0} />
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestNews.slice(1).map((a, i) => (
              <NewsCard key={a.id} article={a} variant="default" index={i + 1} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Most Read */}
          <div>
            <h2 className="font-display font-bold text-xl flex items-center gap-2 mb-4" style={{ color: "var(--text-primary)" }}>
              <Flame size={18} className="text-brand-orange" />
              Most Read
            </h2>
            {mostRead.map((a, i) => (
              <NewsCard key={a.id} article={a} variant="compact" index={i} />
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="rounded-xl p-5" style={{ background: "rgba(247,147,26,0.08)", border: "1px solid rgba(247,147,26,0.25)" }}>
            <p className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
              Daily Crypto Brief
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Top stories delivered every morning.
            </p>
            <NewsletterForm compact buttonText="Subscribe Free" />
          </div>

          {/* Quick links */}
          <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
              Browse by Topic
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Bitcoin", "Ethereum", "Altcoins", "Regulation", "Banking", "Exchanges", "DeFi", "Blockchain Events"].map((tag) => (
                <Link key={tag} href={`/news/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-3 py-1 rounded-full text-xs transition-colors hover:bg-brand-orange hover:text-white"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
