import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft, Clock } from "lucide-react";
import AuthorByline from "@/components/AuthorByline";
import { getAuthorProfile } from "@/lib/authors";
import {
  getAuthenticatedPreviewPageById,
  getAuthenticatedPreviewPostById,
} from "@/lib/wordpress-auth";
import {
  buildMetaDescription,
  decodeHtml,
  estimateReadTime,
  formatDate,
  sanitizeRenderedHtml,
  stripHtml,
} from "@/lib/content";

interface Props {
  params: Promise<{ type: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const entityId = Number.parseInt(id, 10);

  if (!Number.isFinite(entityId) || entityId <= 0) {
    return { title: "Preview Not Found" };
  }

  const entity =
    type === "page"
      ? await getAuthenticatedPreviewPageById(entityId)
      : await getAuthenticatedPreviewPostById(entityId);

  if (!entity) {
    return { title: "Preview Not Found" };
  }

  return {
    title: `${decodeHtml(entity.title.rendered)} (Preview)`,
    description: buildMetaDescription(
      entity.excerpt.rendered || entity.content.rendered,
      entity.title.rendered,
    ),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PreviewDraftPage({ params }: Props) {
  await connection();
  const { type, id } = await params;
  const entityId = Number.parseInt(id, 10);

  if (!Number.isFinite(entityId) || entityId <= 0) {
    notFound();
  }

  const entity =
    type === "page"
      ? await getAuthenticatedPreviewPageById(entityId)
      : await getAuthenticatedPreviewPostById(entityId);

  if (!entity) {
    notFound();
  }

  const title = decodeHtml(entity.title.rendered);
  const excerpt = decodeHtml(stripHtml(entity.excerpt.rendered || entity.content.rendered)).trim();
  const content = sanitizeRenderedHtml(entity.content.rendered, {
    removeLeadingHeading: type === "page",
  });

  if (type === "page") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          Preview Mode
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-orange mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        <div
          className="article-body max-w-3xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }

  const primaryCategory = entity._embedded?.["wp:term"]?.[0]?.[0];
  const authorName = decodeHtml(entity._embedded?.author?.[0]?.name ?? "CoinLineup Editorial Team");
  const authorSlug = entity._embedded?.author?.[0]?.slug;
  const authorProfile = getAuthorProfile(authorName);
  const readTime = estimateReadTime(content);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
        <span className="font-semibold uppercase tracking-[0.18em]">Preview Mode</span>
        <span className="text-[10px]">•</span>
        <span>Draft</span>
      </div>

      <article>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {primaryCategory ? <span className="category-pill">{primaryCategory.name}</span> : null}
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Unpublished preview
          </span>
        </div>
        <h1 className="max-w-4xl font-display font-bold text-3xl md:text-5xl leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        {excerpt ? (
          <p className="max-w-3xl text-lg leading-8 mb-5" style={{ color: "var(--text-secondary)" }}>
            {excerpt}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          <AuthorByline
            authorName={authorName}
            authorSlug={authorSlug}
            authorProfile={authorProfile}
          />
          <span>Updated {formatDate(entity.modified)}</span>
          <span className="text-[10px]">•</span>
          <span className="inline-flex items-center gap-1"><Clock size={14} />{readTime}</span>
        </div>
        <div className="max-w-3xl">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </div>
  );
}
