import type { Metadata } from "next";
import Link from "next/link";

import {
  decodeEntities,
  getAuthor,
  getFeaturedImage,
  getLatestPosts,
  getPostCategories,
  stripHtml,
  toLocalArticlePath,
  type WpPost,
} from "@/lib/wp";
import {
  estimateReadTime,
  formatDisplayDate,
  getUiCategoryKey,
} from "@/lib/site-ui";

export const metadata: Metadata = {
  title: "Trending",
  description: "Most-read stories and topics in the last 24 hours.",
};

const TOPICS = [
  { rank: 1, topic: "Bitcoin ETF", count: "12.4K", chg: "+340%" },
  { rank: 2, topic: "BlackRock IBIT", count: "8.2K", chg: "+280%" },
  { rank: 3, topic: "Ethereum Pectra", count: "6.8K", chg: "+190%" },
  { rank: 4, topic: "Altcoin Season", count: "5.1K", chg: "+160%" },
  { rank: 5, topic: "Fed Rate Cut", count: "4.7K", chg: "+140%" },
  { rank: 6, topic: "DeFi TVL", count: "3.9K", chg: "+110%" },
  { rank: 7, topic: "Solana ETF", count: "3.4K", chg: "+95%" },
  { rank: 8, topic: "Bitcoin $100K", count: "2.8K", chg: "+80%" },
  { rank: 9, topic: "CBDC", count: "2.2K", chg: "+60%" },
  { rank: 10, topic: "AI Tokens", count: "1.9K", chg: "+55%" },
];

const POPULAR_TAGS = [
  "Bitcoin",
  "ETF",
  "DeFi",
  "Ethereum",
  "BTC",
  "Altcoins",
  "Layer2",
  "Macro",
  "Fed",
  "Institutional",
  "Mining",
  "NFT",
  "Web3",
  "Stablecoin",
];

type TrendingArticle = {
  id: number;
  href: string;
  title: string;
  category: string;
  author: string;
  time: string;
  read: string;
  img?: string;
};

function toTrendingArticle(post: WpPost): TrendingArticle {
  const category = getPostCategories(post)[0];

  return {
    id: post.id,
    href: toLocalArticlePath(post.slug),
    title: decodeEntities(post.title.rendered),
    category: getUiCategoryKey(category?.slug ?? "cryptocurrency-news"),
    author: getAuthor(post)?.name ?? "Editorial Team",
    time: formatDisplayDate(post.date),
    read: estimateReadTime(stripHtml(post.content?.rendered || post.excerpt.rendered)),
    img: getFeaturedImage(post)?.source_url,
  };
}

export default async function TrendingPage() {
  const posts = await getLatestPosts(10);
  const articles = posts.map(toTrendingArticle);

  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s10) 0",
          position: "relative",
          overflow: "hidden",
          marginBottom: "var(--s8)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg,var(--brand),var(--bear),var(--bull),var(--brand))",
          }}
        />
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              fontSize: 11,
              color: "var(--text-3)",
            }}
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-brand)" }}>Trending</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s5)" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "var(--r-lg)",
                background: "rgba(155,61,255,0.1)",
                border: "0.5px solid rgba(155,61,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              🔥
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                <span className="grad-brand">Trending Now</span>
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>
                Most-read stories and topics in the last 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid-12">
          <div style={{ gridColumn: "span 8" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderTop: "3px solid var(--brand)",
                borderRadius: "var(--r-lg)",
                padding: "var(--s5)",
                marginBottom: "var(--s8)",
              }}
            >
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: "var(--s5)" }}>
                🔥 TRENDING TOPICS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)" }}>
                {TOPICS.map((topic) => (
                  <Link
                    key={topic.rank}
                    href={`/search?q=${encodeURIComponent(topic.topic)}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 12px",
                      background: "var(--raised)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-md)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        fontFamily: "var(--font-display)",
                        color: topic.rank <= 3 ? "var(--brand)" : "var(--border)",
                        minWidth: 24,
                      }}
                    >
                      {topic.rank}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{topic.topic}</div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>
                        {topic.count} searches
                      </div>
                    </div>
                    <span className="bull" style={{ fontSize: 10 }}>
                      {topic.chg}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="t-section" style={{ color: "var(--text-3)", marginBottom: "var(--s5)" }}>
              TRENDING ARTICLES
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s4)" }}>
              {articles.map((article, index) => (
                <Link key={article.id} href={article.href} style={{ display: "block" }}>
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "var(--s4)",
                      display: "flex",
                      gap: "var(--s4)",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        fontFamily: "var(--font-display)",
                        color: index < 3 ? "var(--brand)" : "var(--border)",
                        minWidth: 36,
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                        <span className={`badge badge-${article.category}`} style={{ fontSize: 8 }}>
                          {article.category}
                        </span>
                        <span style={{ fontSize: 10, color: "var(--text-3)" }}>{article.time}</span>
                      </div>
                      <div className="t-h4 clamp2" style={{ fontSize: 14, marginBottom: 4 }}>
                        {article.title}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>
                        {article.author} · {article.read}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 80,
                        height: 72,
                        borderRadius: "var(--r-md)",
                        flexShrink: 0,
                        background: article.img ? `url(${article.img}) center/cover` : "var(--raised)",
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside style={{ gridColumn: "span 4" }}>
            <div
              style={{
                position: "sticky",
                top: 120,
                display: "flex",
                flexDirection: "column",
                gap: "var(--s6)",
              }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "var(--s5)",
                }}
              >
                <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                  POPULAR TAGS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {POPULAR_TAGS.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase()}`}
                      style={{
                        padding: "4px 10px",
                        background: "var(--raised)",
                        border: "0.5px solid var(--border)",
                        borderRadius: "var(--r-pill)",
                        fontSize: 10,
                        color: "var(--text-3)",
                      }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "var(--grad-brand)",
                  borderRadius: "var(--r-lg)",
                  padding: "var(--s5)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  Daily Briefing
                </h3>
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "var(--s4)",
                    lineHeight: 1.5,
                  }}
                >
                  Top stories delivered every morning.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                  style={{
                    width: "100%",
                    background: "rgba(0,0,0,0.18)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "var(--r-md)",
                    padding: "7px 10px",
                    fontSize: 12,
                    marginBottom: 8,
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-white"
                  style={{ width: "100%", justifyContent: "center", fontSize: 11 }}
                >
                  Get Daily Briefing
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
