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
  buildMetaDescription,
  decodeHtml,
  estimateReadTime,
  formatDate,
  sanitizeRenderedHtml,
  stripHtml,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const TRUST_PAGE_DESCRIPTIONS: Record<string, string> = {
  about:
    "CoinLineup covers crypto news, markets, blockchain developments, and educational guides with clearer sourcing, editorial transparency, and reader-facing standards.",
  authors:
    "Meet the public contributors and bylines behind CoinLineup coverage, along with the standards and disclosures that support article accountability.",
  masthead:
    "Review CoinLineup's public editorial structure, contributor list, newsroom contacts, and the information readers can use to evaluate who is behind the publication.",
  "editorial-policy":
    "Read how CoinLineup approaches accuracy, sourcing, transparency, editorial independence, and the distinction between journalism, analysis, and paid promotion.",
  "publish-editorial-standards-fact-checking-policy":
    "See the editorial standards and fact-checking expectations CoinLineup applies to sourcing, verification, updates, and article accountability.",
  "corrections-policy":
    "Learn how CoinLineup handles corrections, clarifications, updates, and reader-submitted accuracy concerns across published coverage.",
  "ownership-funding-transparency":
    "Understand CoinLineup's approach to ownership, funding transparency, commercial relationships, sponsorship labeling, and editorial independence.",
  contacts:
    "Contact CoinLineup for editorial questions, corrections requests, business inquiries, privacy requests, and general feedback.",
  "privacy-policy":
    "Read CoinLineup's privacy policy covering data collection, newsletter subscriptions, cookies, third-party services, retention, and user choices.",
  "terms-conditions":
    "Review CoinLineup's terms and conditions for site access, content use, user responsibilities, disclaimers, and legal limitations.",
  "content-disclaimer":
    "Read CoinLineup's content disclaimer explaining that site content is for informational purposes and should not be treated as financial, legal, or tax advice.",
  "affiliate-disclaimer":
    "Understand how CoinLineup discloses affiliate relationships, commercial links, and the separation between editorial coverage and monetization.",
  "rss-feed":
    "Find CoinLineup's RSS feed information, including the main feed URL, feed-reader usage notes, and how readers can follow newly published coverage.",
};

const TRUST_PAGE_CONTENT_OVERRIDES: Record<string, string> = {
  about: `
    <h1>About CoinLineup</h1>
    <p>CoinLineup is a digital publication covering cryptocurrency news, markets, blockchain developments, and educational guides. Our goal is to help readers understand fast-moving digital asset stories with clearer reporting, plain-language context, and visible editorial standards.</p>
    <p>We publish a mix of breaking news, explainers, market coverage, project reviews, and educational content for readers who want useful information rather than hype, imitation, or disguised promotion.</p>
    <h2>What CoinLineup is trying to do</h2>
    <p>Crypto publishing often moves faster than verification. CoinLineup's public trust pages exist so readers can see how the site presents its authorship, sourcing standards, corrections path, and commercial disclosures. We want readers to be able to evaluate not just what we publish, but how we publish it.</p>
    <p>This approach aligns with the broader expectation that news publishers should make it easy for readers to find information about the publication, the people behind it, and the standards applied to its work.</p>
    <h2>What we cover</h2>
    <ul>
      <li>Crypto and blockchain news</li>
      <li>Market developments and token ecosystem updates</li>
      <li>Beginner and advanced guides</li>
      <li>Project reviews and research-driven explainers</li>
      <li>Regulation, exchanges, DeFi, NFTs, and infrastructure stories</li>
    </ul>
    <h2>Who the site is for</h2>
    <p>CoinLineup serves a mixed audience that may include first-time crypto readers, active traders, researchers, and Web3 operators. Because that audience has different experience levels, we try to distinguish basic explainers from more technical analysis and avoid presenting speculation as settled fact.</p>
    <h2>How we work</h2>
    <p>CoinLineup aims to make each article accountable and easy to evaluate. We show bylines, visible publication information, and editorial policy pages so readers can understand who wrote the piece, how we verify information, and how to report an issue.</p>
    <ul>
      <li><a href="/editorial-policy/">Editorial Policy</a></li>
      <li><a href="/publish-editorial-standards-fact-checking-policy/">Editorial Standards &amp; Fact-Checking</a></li>
      <li><a href="/corrections-policy/">Corrections Policy</a></li>
      <li><a href="/ownership-funding-transparency/">Ownership &amp; Funding Transparency</a></li>
      <li><a href="/authors/">Authors</a></li>
      <li><a href="/masthead/">Masthead</a></li>
      <li><a href="/contacts/">Contact</a></li>
    </ul>
    <h2>Signals readers should expect on CoinLineup pages</h2>
    <ul>
      <li>A visible byline or accountable editorial label</li>
      <li>A publication date, and an updated date when a page is materially revised</li>
      <li>Links to policy, disclosure, or contact pages when they help explain how the content was produced</li>
      <li>Clear labels when a page contains sponsored, promotional, or affiliate-supported elements</li>
    </ul>
    <h2>Editorial independence</h2>
    <p>Editorial decisions are made independently from advertisers, sponsors, and affiliate relationships. CoinLineup does not sell favorable coverage, positive reviews, or guaranteed editorial placement.</p>
    <p>When content includes sponsorship, commercial placement, or affiliate relationships, we aim to label that relationship clearly so readers can distinguish news and analysis from paid promotion.</p>
    <h2>What CoinLineup is not</h2>
    <p>CoinLineup is a publisher, not an exchange, token issuer, broker, investment adviser, or law firm. Coverage may discuss companies, products, tokens, protocols, and market events, but publication does not equal endorsement.</p>
    <h2>How this page should be used</h2>
    <p>This page is intended to give readers a plain-language starting point. More specific process information appears on the Editorial Policy, Fact-Checking, Corrections, Ownership, Authors, and Masthead pages linked above.</p>
    <h2>Reader note</h2>
    <p>CoinLineup is a publisher, not an investment adviser. Nothing on this website should be treated as financial, legal, or tax advice. Readers should verify important claims and perform their own research before making decisions involving digital assets.</p>
  `,
};

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
      description: buildMetaDescription(resolved.post.excerpt.rendered, postTitle),
      alternates: {
        canonical: pathFromWpLink(resolved.post.link),
      },
      openGraph: {
        type: "article",
        url: `${getSiteUrl()}${pathFromWpLink(resolved.post.link)}`,
        title: postTitle,
        description: buildMetaDescription(resolved.post.excerpt.rendered, postTitle),
      },
    };
  }

  if (resolved.kind === "page") {
    const pageTitle = decodeHtml(resolved.page.title.rendered);
    const pageDescriptionSource =
      resolved.page.excerpt.rendered?.trim() || resolved.page.content.rendered;
    const pageDescription =
      TRUST_PAGE_DESCRIPTIONS[resolved.page.slug] ??
      buildMetaDescription(pageDescriptionSource, pageTitle);

    return {
      title: pageTitle,
      description: pageDescription,
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
    const pageContent =
      TRUST_PAGE_CONTENT_OVERRIDES[resolved.page.slug] ??
      sanitizeRenderedHtml(resolved.page.content.rendered, {
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
