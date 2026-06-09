import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, User, Tag, TrendingUp, TrendingDown } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import NewsletterForm from "@/components/NewsletterForm";
import { ALL_NEWS } from "@/lib/mockNews";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ALL_NEWS.find((a) => a.id === parseInt(slug));
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — CoinLineup`,
    description: article.excerpt,
  };
}

const ARTICLE_BODY: Record<number, string[]> = {
  1: [
    "Hyperliquid has reached a historic milestone, crossing $500 billion in cumulative trading volume — a figure that underscores the platform's dominance in the decentralized derivatives market. The achievement comes amid a broader surge in on-chain trading activity driven by institutional interest and retail adoption.",
    "The platform's perpetual contracts now account for roughly 60% of all DEX-based derivatives volume globally, outpacing competitors like dYdX and GMX. Analysts credit Hyperliquid's ultra-low latency order book — powered by its custom HyperBFT consensus engine — as the key differentiator.",
    "The HYPE token has responded accordingly, gaining over 12% in 24 hours as market participants priced in the platform's continued market share growth. Open interest on HYPE perpetuals now sits at $340 million, up 40% month-over-month.",
    "Industry watchers see this milestone as a proof point for the viability of fully on-chain order books. 'What Hyperliquid has built challenges the assumption that you need a centralized matching engine for high-frequency trading,' said one DeFi analyst.",
  ],
  2: [
    "The Depository Trust & Clearing Corporation (DTCC), the backbone of US financial market settlement, has launched a blockchain-based pilot program with five major US banks including JPMorgan, Goldman Sachs, and Citibank.",
    "The pilot uses a permissioned Ethereum-compatible blockchain to settle equity trades within minutes rather than the current T+1 cycle. Early results show a 94% reduction in settlement failures during the test period.",
    "ETH markets reacted positively to the news, with the token gaining 2.1% as investors interpreted the development as a signal of broader institutional DeFi adoption. The DTCC has indicated it plans to scale the pilot to T+0 same-day settlement by Q3.",
    "This represents a significant shift in institutional posture toward blockchain technology. Major banks that once dismissed crypto are now building their most critical infrastructure on public blockchain rails.",
  ],
};

function getBody(id: number): string[] {
  return ARTICLE_BODY[id] ?? [
    "This story is developing. Our research team is working on a comprehensive analysis of all key developments and their implications for the broader cryptocurrency market.",
    "Market participants are closely monitoring on-chain data, institutional flows, and regulatory signals to assess the short and medium-term impact. Early indicators suggest significant momentum in the sector.",
    "Our analysts will provide a full breakdown covering technical analysis, fundamental drivers, and strategic implications for investors of all levels. Bookmark this page and subscribe to our newsletter for real-time updates.",
    "CoinLineup will continue to track this story as it evolves, providing context-rich coverage backed by primary sources, on-chain data, and expert commentary from leading voices in the space.",
  ];
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ALL_NEWS.find((a) => a.id === parseInt(slug));
  if (!article) notFound();

  const related = ALL_NEWS
    .filter((a) => a.id !== article.id && (a.category === article.category || a.section === article.section))
    .slice(0, 3);

  const moreArticles = ALL_NEWS.filter((a) => a.id !== article.id && !related.includes(a)).slice(0, 2);
  const body = getBody(article.id);
  const priceUp = (article.priceTag?.change ?? 0) >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <span>/</span>
        <Link href="/news" className="hover:text-brand-orange transition-colors">News</Link>
        <span>/</span>
        <Link href={`/news/${article.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-brand-orange transition-colors capitalize">
          {article.category}
        </Link>
        <span>/</span>
        <span className="line-clamp-1 max-w-xs">{article.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main content */}
        <article className="lg:col-span-8">
          {/* Category + badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="category-pill">{article.category}</span>
            {article.badge && (
              <span className="text-xs font-bold px-2 py-0.5 rounded text-white uppercase tracking-wide"
                style={{ background: article.badge === "BREAKING" ? "#E63946" : article.badge === "ANALYSIS" ? "#8B5CF6" : "#F7931A" }}>
                {article.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}>
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
                  {article.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{article.author}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>CoinLineup Research</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1"><Clock size={12} />{article.date}</span>
              <span>{article.readTime}</span>
              {article.priceTag && (
                <span className={`flex items-center gap-1 font-bold ${priceUp ? "price-up" : "price-down"}`}>
                  {priceUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {article.priceTag.symbol} {priceUp ? "+" : ""}{article.priceTag.change}%
                </span>
              )}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Excerpt */}
          <p className="text-base md:text-lg leading-relaxed font-medium mb-6"
            style={{ color: "var(--text-secondary)" }}>
            {article.excerpt}
          </p>

          {/* Body */}
          <div className="space-y-5">
            {body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <Tag size={14} style={{ color: "var(--text-muted)" }} />
            {[article.category, article.priceTag?.symbol, "Crypto", "Blockchain"].filter(Boolean).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border transition-colors hover:border-brand-orange hover:text-brand-orange cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display font-bold text-lg mb-5" style={{ color: "var(--text-primary)" }}>
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((a, i) => (
                  <NewsCard key={a.id} article={a} variant="default" index={i} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Back button */}
          <Link href="/news"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-orange"
            style={{ color: "var(--text-secondary)" }}>
            <ArrowLeft size={15} /> Back to News
          </Link>

          {/* Newsletter */}
          <div className="rounded-xl border p-5"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="font-display font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stay Updated
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Get {article.category} news delivered daily.
            </p>
            <NewsletterForm compact buttonText="Subscribe Free" />
          </div>

          {/* More stories */}
          {moreArticles.length > 0 && (
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-primary)" }}>
                More Stories
              </h4>
              <div className="space-y-3">
                {moreArticles.map((a, i) => (
                  <NewsCard key={a.id} article={a} variant="horizontal" index={i} />
                ))}
              </div>
            </div>
          )}

          {/* All articles link */}
          <Link href={`/news/${article.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-sm font-semibold transition-all hover:border-brand-orange hover:text-brand-orange"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <User size={14} /> More {article.category} News
          </Link>
        </aside>
      </div>
    </div>
  );
}
