"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { buildArticleHref, type NewsArticle } from "@/lib/content";

interface Props { articles: NewsArticle[] }

function BadgePill({ label }: { label: string }) {
  const color = label === "BREAKING" ? "bg-brand-red" : label === "ANALYSIS" ? "bg-purple-600" : label === "INSIGHT" ? "bg-blue-600" : "bg-brand-orange";
  return (
    <span className={`${color} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
      {label}
    </span>
  );
}

function AuthorInitials({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <span className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
      {initials}
    </span>
  );
}

export default function HeroPanel({ articles }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (articles.length === 0) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % articles.length), 5000);
    return () => clearInterval(t);
  }, [articles.length]);

  if (articles.length === 0) {
    return null;
  }

  const article = articles[current];

  return (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[420px] group cursor-pointer">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Content */}
      <Link href={buildArticleHref(article)} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {article.badge && <BadgePill label={article.badge} />}
          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-display font-bold text-xl md:text-2xl text-white mt-3 mb-3 leading-tight line-clamp-3"
          >
            {article.title}
          </motion.h2>

          {/* Author row */}
          <motion.div
            key={`meta-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-3"
          >
            {article.author && <AuthorInitials name={article.author} />}
            {article.author && (
              <span className="text-white/80 text-xs font-medium">{article.author}</span>
            )}
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/70 text-xs flex items-center gap-1">
              <Clock size={11} />{article.date}
            </span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/70 text-xs">{article.readTime}</span>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center gap-1.5 mt-4">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setCurrent(i); }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "6px",
                  background: i === current ? "#F7931A" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
