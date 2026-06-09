import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import {
  getCategoryArchiveByPath,
  mapWpPostToArticle,
  pathFromWpLink,
} from "@/lib/wordpress";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const archive = await getCategoryArchiveByPath(["guides", category], 1);

  if (!archive) {
    return { title: "Guide Category Not Found" };
  }

  return {
    title: `${archive.category.name} Guides - CoinLineup`,
    description: `Live guide archive for ${archive.category.name} on CoinLineup.`,
  };
}

export default function GuideCategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" />}>
      <GuideCategoryContent params={params} />
    </Suspense>
  );
}

async function GuideCategoryContent({ params }: Props) {
  const { category } = await params;
  const archive = await getCategoryArchiveByPath(["guides", category], 18);

  if (!archive) {
    notFound();
  }

  const articles = archive.posts.map((post) => mapWpPostToArticle(post, "guides"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-orange mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={15} /> Back to Guides
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-brand-green" />
          <p className="text-brand-green font-display font-semibold text-sm uppercase tracking-widest">
            Guide Category
          </p>
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          {archive.category.name} <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Latest live WordPress posts filed under {archive.category.name}.
        </p>
      </div>

      {archive.children.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {archive.children.map((child) => (
            <Link
              key={child.id}
              href={pathFromWpLink(child.link)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:border-brand-orange hover:text-brand-orange"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {child.name} ({child.count})
            </Link>
          ))}
        </div>
      ) : null}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} variant="default" index={index} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-8 text-sm"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          No live guides are currently assigned directly to this category.
        </div>
      )}
    </div>
  );
}
