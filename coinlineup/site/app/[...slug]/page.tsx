import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
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

function getHeroImage(post: {
  featured_image?: string | false;
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string; media_details?: { sizes?: { medium_large?: { source_url?: string }; full?: { source_url?: string } } } }> };
}): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const source =
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.media_details?.sizes?.full?.source_url ??
    media?.source_url ??
    (typeof post.featured_image === "string" ? post.featured_image : null);

  if (!source || source === "/logo-white.png") {
    return null;
  }

  return source;
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
  const heroImage = getHeroImage(resolved.post);
  const excerpt = decodeHtml(resolved.post.excerpt.rendered).trim();
  const authorName = decodeHtml(resolved.post._embedded?.author?.[0]?.name ?? "CoinLineup Editorial Team");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <div className="mb-8 text-xs flex flex-wrap items-center gap-2" style={{ color: "var(--text-muted)" }}>
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

      <article className="space-y-8 md:space-y-10">
        <header className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {primaryCategory ? <span className="category-pill">{primaryCategory.name}</span> : null}
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Updated {formatDate(resolved.post.modified)}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl leading-[1.08] tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
            {decodeHtml(resolved.post.title.rendered)}
          </h1>

          {excerpt ? (
            <p className="mt-5 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              {excerpt}
            </p>
          ) : null}

          <div
            className="mt-6 flex flex-col gap-4 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Written by
              </p>
              <p className="mt-1 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {authorName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="inline-flex items-center gap-1"><Clock size={14} />{formatDate(resolved.post.date)}</span>
              <span className="text-[10px]">•</span>
              <span>{mapWpPostToArticle(resolved.post).readTime}</span>
            </div>
          </div>
        </header>

        {heroImage ? (
          <figure className="max-w-4xl overflow-hidden rounded-[28px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="relative aspect-[16/9]">
              <Image
                src={heroImage}
                alt={decodeHtml(resolved.post.title.rendered)}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          </figure>
        ) : null}

        <div className="article-shell max-w-4xl">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: resolved.post.content.rendered }}
          />
        </div>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="mt-16 border-t pt-10" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
            Related Articles
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            More from the same section.
          </p>
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
