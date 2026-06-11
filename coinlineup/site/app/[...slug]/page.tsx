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
import {
  decodeHtml,
  estimateReadTime,
  formatDate,
  sanitizeRenderedHtml,
  stripHtml,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string[] }>;
}

function safeExcerpt(value: string, title?: string): string {
  const plain = decodeHtml(stripHtml(sanitizeRenderedHtml(value))).trim();

  if (!plain) {
    return "";
  }

  if (!title) {
    return plain.slice(0, 160);
  }

  const normalizedTitle = decodeHtml(title).trim();
  const withoutTitlePrefix = plain.startsWith(normalizedTitle)
    ? plain.slice(normalizedTitle.length).trimStart()
    : plain;

  return withoutTitlePrefix.slice(0, 160);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveContentByPath(slug);

  if (!resolved) {
    return { title: "Not Found" };
  }

  if (resolved.kind === "post") {
    const postTitle = decodeHtml(resolved.post.title.rendered);

    return {
      title: postTitle,
      description: safeExcerpt(resolved.post.excerpt.rendered, postTitle),
      alternates: {
        canonical: pathFromWpLink(resolved.post.link),
      },
      openGraph: {
        type: "article",
        url: `${getSiteUrl()}${pathFromWpLink(resolved.post.link)}`,
        title: postTitle,
        description: safeExcerpt(resolved.post.excerpt.rendered, postTitle),
      },
    };
  }

  if (resolved.kind === "page") {
    const pageTitle = decodeHtml(resolved.page.title.rendered);
    const pageDescriptionSource =
      resolved.page.excerpt.rendered?.trim() || resolved.page.content.rendered;

    return {
      title: pageTitle,
      description: safeExcerpt(pageDescriptionSource, pageTitle),
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
    const pageContent = sanitizeRenderedHtml(resolved.page.content.rendered, {
      removeLeadingHeading: true,
    });

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
          dangerouslySetInnerHTML={{ __html: pageContent }}
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
  const excerpt = decodeHtml(stripHtml(resolved.post.excerpt.rendered)).trim();
  const postContent = sanitizeRenderedHtml(resolved.post.content.rendered);
  const author = resolved.post._embedded?.author?.[0];
  const authorName = decodeHtml(author?.name ?? "CoinLineup Editorial Team");
  const authorSlug = author?.slug;
  const readTime = estimateReadTime(postContent);
  const publishedDate = formatDate(resolved.post.date);
  const updatedDate = formatDate(resolved.post.modified);
  const showUpdatedDate = resolved.post.modified !== resolved.post.date;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 text-xs flex flex-wrap items-center gap-2" style={{ color: "var(--text-muted)" }}>
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
        <h1 className="max-w-4xl font-display font-bold text-3xl md:text-5xl leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
          {decodeHtml(resolved.post.title.rendered)}
        </h1>
        {excerpt ? (
          <p className="max-w-3xl text-lg leading-8 mb-5" style={{ color: "var(--text-secondary)" }}>
            {excerpt}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          {authorSlug ? (
            <Link href={`/authors#${authorSlug}`} className="font-medium hover:text-brand-orange transition-colors" style={{ color: "var(--text-primary)" }}>
              By {authorName}
            </Link>
          ) : (
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>By {authorName}</span>
          )}
          <span className="text-[10px]">•</span>
          <span>Published {publishedDate}</span>
          {showUpdatedDate ? (
            <>
              <span className="text-[10px]">•</span>
              <span>Updated {updatedDate}</span>
            </>
          ) : null}
          <span className="text-[10px]">•</span>
          <span className="inline-flex items-center gap-1"><Clock size={14} />{readTime}</span>
        </div>
        <div className="max-w-3xl">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </div>
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
