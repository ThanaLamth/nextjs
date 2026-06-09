"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  date: string;
  readTime: string;
  priceTag?: { symbol: string; change: number };
  featured?: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "horizontal" | "compact";
  index?: number;
}

function CategoryPill({ category }: { category: string }) {
  return <span className="category-pill">{category}</span>;
}

function PriceTag({ symbol, change }: { symbol: string; change: number }) {
  const up = change >= 0;
  return (
    <div className={`flex items-center gap-1 text-xs font-semibold ${up ? "price-up" : "price-down"}`}>
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {symbol} {up ? "+" : ""}{change}%
    </div>
  );
}

// Featured large card — always dark overlay
function FeaturedCard({ article }: { article: NewsArticle }) {
  return (
    <div className="news-card relative rounded-2xl overflow-hidden group h-[480px] cursor-pointer">
      <Image
        src={article.thumbnail}
        alt={article.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <CategoryPill category={article.category} />
        <h2 className="font-display font-bold text-2xl text-white mt-3 mb-2 leading-tight line-clamp-3 drop-shadow">
          {article.title}
        </h2>
        <p className="text-gray-300 text-sm line-clamp-2 mb-3 drop-shadow">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Clock size={12} />{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          {article.priceTag && (
            <>
              <span>·</span>
              <PriceTag symbol={article.priceTag.symbol} change={article.priceTag.change} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Default card — uniform height, theme-aware
function DefaultCard({ article }: { article: NewsArticle }) {
  return (
    <div
      className="news-card h-full flex flex-col rounded-xl overflow-hidden cursor-pointer group border"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {/* Fixed-height image */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content — flex grow so all cards same height */}
      <div className="p-4 flex flex-col flex-1">
        <CategoryPill category={article.category} />

        <h3
          className="font-display font-bold mt-2 mb-2 leading-snug line-clamp-2 text-base"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h3>

        <p
          className="text-sm line-clamp-2 mb-3 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {article.excerpt}
        </p>

        {/* Footer pinned to bottom */}
        <div className="flex items-center justify-between text-xs mt-auto pt-2 border-t"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1">
            <Clock size={11} />{article.date}
          </span>
          <span>{article.readTime}</span>
        </div>

        {article.priceTag && (
          <div className="mt-2">
            <PriceTag symbol={article.priceTag.symbol} change={article.priceTag.change} />
          </div>
        )}
      </div>
    </div>
  );
}

// Horizontal compact card — theme-aware
function HorizontalCard({ article }: { article: NewsArticle }) {
  return (
    <div
      className="news-card flex gap-3 rounded-xl p-3 cursor-pointer group border"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryPill category={article.category} />
        <h4
          className="font-display font-semibold text-sm mt-1 mb-1 leading-snug line-clamp-2"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><Clock size={10} />{article.date}</span>
          {article.priceTag && (
            <PriceTag symbol={article.priceTag.symbol} change={article.priceTag.change} />
          )}
        </div>
      </div>
    </div>
  );
}

// Compact list item — theme-aware
function CompactCard({ article, index = 0 }: { article: NewsArticle; index?: number }) {
  return (
    <div
      className="flex items-start gap-3 px-3 py-3 rounded-xl cursor-pointer group transition-colors hover:bg-brand-orange/5 border-b last:border-0"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="font-display font-bold text-2xl leading-none w-7 flex-shrink-0"
        style={{ color: "var(--border-hover)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <CategoryPill category={article.category} />
        <h4
          className="font-display font-semibold text-sm mt-1 leading-snug line-clamp-2"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><Clock size={10} />{article.date}</span>
        </div>
      </div>
      <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden">
        <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="64px" />
      </div>
    </div>
  );
}

export default function NewsCard({ article, variant = "default", index = 0 }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={variant === "default" ? "h-full" : ""}
    >
      <Link
        href={`/news/${article.category.toLowerCase().replace(/\s+/g, "-")}/${article.id}`}
        className={variant === "default" ? "block h-full" : "block"}
      >
        {variant === "featured" && <FeaturedCard article={article} />}
        {variant === "horizontal" && <HorizontalCard article={article} />}
        {variant === "compact" && <CompactCard article={article} index={index} />}
        {variant === "default" && <DefaultCard article={article} />}
      </Link>
    </motion.div>
  );
}
