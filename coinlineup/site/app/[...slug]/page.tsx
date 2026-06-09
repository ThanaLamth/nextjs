import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Clock, ArrowLeft } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import {
  getRelatedPosts,
  getSiteUrl,
  mapWpPostToArticle,
  pathFromWpLink,
  resolveContentByPath,
} from "@/lib/wordpress";
import { decodeHtml, formatDate } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string[] }>;
}

function safeExcerpt(value: string): string {
  return decodeHtml(value).slice(0, 160);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveContentByPath(slug);

  if (!resolved) {
    return { title: "Not Found" };
  }

  if (resolved.kind === "post") {
    return {
      title: decodeHtml(resolved.post.title.rendered),
      description: safeExcerpt(resolved.post.excerpt.rendered),
      alternates: {
        canonical: pathFromWpLink(resolved.post.link),
      },
      openGraph: {
        type: "article",
        url: `${getSiteUrl()}${pathFromWpLink(resolved.post.link)}`,
        title: decodeHtml(resolved.post.title.rendered),
        description: safeExcerpt(resolved.post.excerpt.rendered),
      },
    };
  }

  if (resolved.kind === "page") {
    return {
      title: decodeHtml(resolved.page.title.rendered),
      description: safeExcerpt(resolved.page.excerpt.rendered),
      alternates: {
        canonical: pathFromWpLink(resolved.page.link),
      },
    };
  }

  return {
    title: `${resolved.category.name} — CoinLineup`,
    description: `Latest articles from the ${resolved.category.name} section on CoinLineup.`,
    alternates: {
      canonical: pathFromWpLink(resolved.category.link),
    },
  };
}

export default function CatchAllPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10" />}>
      <CatchAllContent params={params} />
    </Suspense>
  );
}

async function CatchAllContent({ params }: Props) {
  await connection();
  const { slug } = await params;
  const resolved = await resolveContentByPath(slug);

  if (!resolved) {
    notFound();
  }

  if (resolved.kind === "page") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-orange mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: "var(--text-primary)" }}>
          {decodeHtml(resolved.page.title.rendered)}
        </h1>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: resolved.page.content.rendered }}
        />
      </div>
    );
  }

  if (resolved.kind === "category") {
    const articles = resolved.posts.map((post) => mapWpPostToArticle(post));

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-1">Category</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--text-primary)" }}>
            {resolved.category.name}
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            Latest articles from this section.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, index) => (
              <NewsCard key={article.id} article={article} variant="default" index={index} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-secondary)" }}>No articles found in this category yet.</p>
        )}
      </div>
    );
  }

  const related = await getRelatedPosts(resolved.post, 3);
  const relatedArticles = related.map((post) => mapWpPostToArticle(post));
  const primaryCategory = resolved.post._embedded?.["wp:term"]?.[0]?.[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <span>/</span>
        {primaryCategory ? (
          <>
            <Link href={pathFromWpLink(primaryCategory.link)} className="hover:text-brand-orange transition-colors">
              {primaryCategory.name}
            </Link>
            <span>/</span>
          </>
        ) : null}
        <span className="line-clamp-1">{decodeHtml(resolved.post.title.rendered)}</span>
      </div>

      <article>
        <div className="mb-4">
          {primaryCategory ? <span className="category-pill">{primaryCategory.name}</span> : null}
        </div>
        <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
          {decodeHtml(resolved.post.title.rendered)}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          <span>{decodeHtml(resolved.post._embedded?.author?.[0]?.name ?? "CoinLineup Editorial Team")}</span>
          <span className="text-[10px]">•</span>
          <span className="inline-flex items-center gap-1"><Clock size={14} />{formatDate(resolved.post.date)}</span>
        </div>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: resolved.post.content.rendered }}
        />
      </article>

      {relatedArticles.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display font-bold text-2xl mb-5" style={{ color: "var(--text-primary)" }}>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} variant="default" index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
