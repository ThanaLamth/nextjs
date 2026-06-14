import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { RichText } from "@/components/rich-text";
import {
  removeInlineThumbnailFigures,
  sanitizeHtmlImageUrls,
} from "@/lib/media";
import {
  absoluteUrl,
  decodeEntities,
  getAllCategories,
  getAuthor,
  getFeaturedImage,
  getPostCategories,
  getPostsByCategoryId,
  resolveEntityByPath,
  stripHtml,
  toLocalArticlePath,
  toLocalCategoryPath,
  toLocalEntityPath,
  type WpCategory,
  type WpPost,
} from "@/lib/wp";
import {
  estimateReadTime,
  extractHeadings,
  formatDisplayDate,
  getCategoryMeta,
  getUiCategoryKey,
  injectHeadingIds,
} from "@/lib/site-ui";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

const SUBSECTION_META: Record<string, { label: string; desc: string }> = {
  "insights/liquidity": {
    label: "Liquidity Analysis",
    desc: "Deep-dive into market liquidity metrics, order book depth, and capital flows",
  },
  "insights/institutional": {
    label: "Institutional",
    desc: "Institutional adoption signals, ETF flows, custody solutions, and corporate treasury moves",
  },
  "insights/on-chain": {
    label: "On-Chain Data",
    desc: "On-chain analytics, wallet activity, exchange balances, and network health metrics",
  },
  "trends/ai-crypto": {
    label: "AI & Crypto",
    desc: "The intersection of artificial intelligence and digital assets - AI tokens, agents, and infrastructure",
  },
  "trends/defi": {
    label: "DeFi",
    desc: "Decentralized finance protocols, yield opportunities, TVL trends, and protocol updates",
  },
  "trends/memecoins": {
    label: "Memecoins",
    desc: "Meme coin market dynamics, viral launches, community-driven rallies, and cultural signals",
  },
  "narratives/bitcoin-cycle": {
    label: "Bitcoin Cycle",
    desc: "BTC halving cycles, market phases, historical patterns, and cycle-aware price analysis",
  },
  "narratives/ethereum-ecosystem": {
    label: "Ethereum Ecosystem",
    desc: "ETH upgrades, Layer-2 scaling, staking yields, and the broader Ethereum developer ecosystem",
  },
  "narratives/altcoin-season": {
    label: "Altcoin Season",
    desc: "Alt rotation signals, BTC dominance shifts, sector rotation, and high-beta opportunities",
  },
  "narratives/cross-market": {
    label: "Cross-Market",
    desc: "Cross-asset correlations, macro-crypto relationships, and multi-market signal analysis",
  },
  "macro/fed": {
    label: "Fed & Rates",
    desc: "Federal Reserve policy decisions, interest rate projections, and monetary policy impact on crypto",
  },
  "macro/global-liquidity": {
    label: "Global Liquidity",
    desc: "M2 money supply trends, global liquidity cycles, and their historically strong correlation with crypto prices",
  },
  "macro/regulation": {
    label: "Regulation",
    desc: "Crypto regulation, legislation updates, SEC/CFTC actions, MiCA, and global compliance developments",
  },
  "macro/crypto-macro": {
    label: "Crypto Macro",
    desc: "Macro factors uniquely driving the crypto market cycle - hashrate, miner economics, and protocol dynamics",
  },
  "weekly-recap/top-stories": {
    label: "Top Stories",
    desc: "A curated summary of the most important crypto news and market developments from the past 7 days",
  },
};

const BROWSE_CATEGORY_SLUGS = [
  "insights",
  "trends",
  "narratives",
  "macro",
  "sponsored-articles",
  "press-release",
  "weekly-recap",
] as const;

const ARTICLE_MARKET_SNAPSHOT = [
  { sym: "BTC", price: "$75,000", chg: "+2.3%", bull: true },
  { sym: "ETH", price: "$3,255", chg: "+1.54%", bull: true },
  { sym: "SOL", price: "$161.48", chg: "+2.31%", bull: true },
  { sym: "XRP", price: "$0.54", chg: "-1.2%", bull: false },
] as const;

function getPostHref(post: WpPost): string {
  return toLocalArticlePath(post.slug);
}

function getCategoryHref(
  category: WpCategory,
  categoryMap: Map<number, WpCategory>,
): string {
  return toLocalCategoryPath(category, categoryMap);
}

function getSubsectionMeta(parentSlug: string, slug: string, fallbackLabel: string) {
  return (
    SUBSECTION_META[`${parentSlug}/${slug}`] ?? {
      label: fallbackLabel,
      desc: `Latest ${fallbackLabel} coverage and archive updates.`,
    }
  );
}

const getResolvedRouteEntity = cache(async (slug: string[]) => resolveEntityByPath(slug));

export async function generateMetadata({
  params,
}: CatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entity = await getResolvedRouteEntity(slug);

  if (!entity) {
    return {
      title: "Not Found",
    };
  }

  const canonical = absoluteUrl(await toLocalEntityPath(entity));

  if (entity.kind === "post") {
    const yoast = entity.post.yoast_head_json;

    return {
      title: decodeEntities(yoast?.title || entity.post.title.rendered),
      description: yoast?.description || stripHtml(entity.post.excerpt.rendered),
      alternates: {
        canonical,
      },
      openGraph: {
        title: yoast?.og_title || yoast?.title || entity.post.title.rendered,
        description: yoast?.og_description || yoast?.description,
        url: canonical,
        type: "article",
        images: yoast?.og_image?.map((image) => image.url),
      },
    };
  }

  if (entity.kind === "page") {
    const yoast = entity.page.yoast_head_json;

    return {
      title: decodeEntities(yoast?.title || entity.page.title.rendered),
      description:
        yoast?.description ||
        stripHtml(entity.page.excerpt?.rendered || entity.page.title.rendered),
      alternates: {
        canonical,
      },
    };
  }

  if (entity.category.parent) {
    const categories = await getAllCategories();
    const parentCategory = categories.find((category) => category.id === entity.category.parent);
    const meta = parentCategory
      ? getSubsectionMeta(
          parentCategory.slug,
          entity.category.slug,
          decodeEntities(entity.category.name),
        )
      : null;

    return {
      title: `${meta?.label ?? decodeEntities(entity.category.name)} | TokenTopNews`,
      description:
        meta?.desc ??
        `Latest ${decodeEntities(entity.category.name)} news, analysis and insights`,
      alternates: {
        canonical,
      },
    };
  }

  return {
    title: `${decodeEntities(entity.category.name)} | TokenTopNews`,
    description: `Latest ${decodeEntities(entity.category.name)} news, analysis and insights`,
    alternates: {
      canonical,
    },
  };
}

export default function CatchAllPage(props: CatchAllPageProps) {
  return (
    <Suspense fallback={<main />}>
      <CatchAllPageContent {...props} />
    </Suspense>
  );
}

async function CatchAllPageContent({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const entity = await getResolvedRouteEntity(slug);

  if (!entity) {
    notFound();
  }

  if (entity.kind === "post") {
    const post = entity.post;
    const author = getAuthor(post);
    const postCategories = getPostCategories(post);
    const allCategories = await getAllCategories();
    const categoryMap = new Map(allCategories.map((category) => [category.id, category]));
    const primaryCategory = postCategories[0];
    const categoryKey = getUiCategoryKey(primaryCategory?.slug ?? "cryptocurrency-news");
    const categoryMeta = getCategoryMeta(primaryCategory?.slug ?? "cryptocurrency-news");
    const categoryHref = primaryCategory
      ? getCategoryHref(primaryCategory, categoryMap)
      : null;
    const articleHtml = sanitizeHtmlImageUrls(
      removeInlineThumbnailFigures(injectHeadingIds(post.content?.rendered || "")),
    );
    const headings = extractHeadings(post.content?.rendered || "");
    const relatedPosts = primaryCategory
      ? (await getPostsByCategoryId(primaryCategory.id, 6))
          .filter((relatedPost) => relatedPost.id !== post.id)
          .slice(0, 3)
      : [];
    const readLabel = estimateReadTime(
      stripHtml(post.content?.rendered || post.excerpt.rendered),
    );

    return (
      <main>
        <section
          style={{
            position: "relative",
            background: "var(--surface)",
            borderBottom: "0.5px solid var(--border-subtle)",
            padding: "var(--s10) 0",
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
              background: categoryMeta.grad,
            }}
          />
          <div className="container">
            <div className="grid-12">
              <div className="article-main-col" style={{ gridColumn: "span 8" }}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: "var(--s4)",
                    fontSize: 11,
                    color: "var(--text-3)",
                  }}
                >
                  <Link href="/">Home</Link>
                  {primaryCategory && categoryHref ? (
                    <>
                      <span>/</span>
                      <Link href={categoryHref} style={{ textTransform: "capitalize" }}>
                        {decodeEntities(primaryCategory.name)}
                      </Link>
                    </>
                  ) : null}
                </div>
                <span
                  className={`badge badge-${categoryKey}`}
                  style={{ marginBottom: "var(--s4)", display: "inline-flex" }}
                >
                  {(primaryCategory ? decodeEntities(primaryCategory.name) : "News").toUpperCase()}
                </span>
                <h1
                  className="t-hero article-hero-title"
                  style={{
                    fontSize: 32,
                    marginBottom: "var(--s5)",
                    color: "var(--text-1)",
                  }}
                >
                  {decodeEntities(post.title.rendered)}
                </h1>
                <p
                  className="t-body-lg"
                  style={{
                    color: "var(--text-2)",
                    marginBottom: "var(--s5)",
                    maxWidth: 580,
                  }}
                >
                  {stripHtml(post.excerpt.rendered)}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontSize: 12,
                    color: "var(--text-3)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--grad-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {(author?.name ?? "E")[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)" }}>
                        {author?.name ?? "Editorial Team"}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>TTN</div>
                    </div>
                  </div>
                  <span style={{ opacity: 0.5 }}>|</span>
                  <span>{formatDisplayDate(post.date)}</span>
                  <span style={{ opacity: 0.5 }}>|</span>
                  <span>⏰ {readLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="grid-12">
            <div className="article-main-col" style={{ gridColumn: "span 8" }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "var(--s4) 0",
                  borderTop: "0.5px solid var(--border-subtle)",
                  borderBottom: "0.5px solid var(--border-subtle)",
                  marginBottom: "var(--s8)",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--text-3)", marginRight: 4 }}>
                  Share:
                </span>
                {["Twitter/X", "Telegram", "LinkedIn", "Copy link"].map((share) => (
                  <button key={share} type="button" className="btn btn-ghost btn-sm">
                    {share}
                  </button>
                ))}
              </div>

              <div className="article-rich" dangerouslySetInnerHTML={{ __html: articleHtml }} />

              {postCategories.length ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    margin: "var(--s10) 0",
                    paddingTop: "var(--s6)",
                    borderTop: "0.5px solid var(--border-subtle)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>Tags:</span>
                  {postCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={getCategoryHref(category, categoryMap)}
                      style={{
                        padding: "4px 12px",
                        background: "var(--surface)",
                        border: "0.5px solid var(--border)",
                        borderRadius: "var(--r-pill)",
                        fontSize: 11,
                        color: "var(--text-2)",
                      }}
                    >
                      #{decodeEntities(category.name)}
                    </Link>
                  ))}
                </div>
              ) : null}

              {relatedPosts.length ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "var(--s6)",
                      gap: 16,
                    }}
                  >
                    <h2 className="t-h3">Related Articles</h2>
                    {categoryHref ? (
                      <Link href={categoryHref} className="view-all">
                        View all →
                      </Link>
                    ) : null}
                  </div>
                  <div className="grid-12">
                    {relatedPosts.map((relatedPost) => {
                      const relatedImage = getFeaturedImage(relatedPost);
                      const relatedCategory = getPostCategories(relatedPost)[0];
                      const relatedKey = getUiCategoryKey(
                        relatedCategory?.slug ?? "cryptocurrency-news",
                      );
                      const relatedMeta = getCategoryMeta(
                        relatedCategory?.slug ?? "cryptocurrency-news",
                      );

                      return (
                        <Link
                          key={relatedPost.id}
                          href={getPostHref(relatedPost)}
                          className="related-card"
                          style={{ gridColumn: "span 4", display: "block" }}
                        >
                          <div
                            style={{
                              background: "var(--surface)",
                              border: "0.5px solid var(--border)",
                              borderRadius: "var(--r-lg)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: 130,
                                background: relatedImage
                                  ? `url(${relatedImage.source_url}) center/cover`
                                  : "var(--raised)",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: 3,
                                  background: relatedMeta.grad,
                                }}
                              />
                            </div>
                            <div style={{ padding: "var(--s4)" }}>
                              <span
                                className={`badge badge-${relatedKey}`}
                                style={{ marginBottom: 8, fontSize: 8 }}
                              >
                                {(relatedCategory
                                  ? decodeEntities(relatedCategory.name)
                                  : "News"
                                ).toUpperCase()}
                              </span>
                              <div
                                className="t-h4 clamp2"
                                style={{ fontSize: 12, marginBottom: 6 }}
                              >
                                {decodeEntities(relatedPost.title.rendered)}
                              </div>
                              <div style={{ fontSize: 10, color: "var(--text-3)" }}>
                                {formatDisplayDate(relatedPost.date)} ·{" "}
                                {estimateReadTime(stripHtml(relatedPost.excerpt.rendered))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="article-sidebar-col" style={{ gridColumn: "span 4" }}>
              <div
                style={{
                  position: "sticky",
                  top: 120,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--s6)",
                }}
              >
                {headings.length ? (
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderLeft: `3px solid ${categoryMeta.accent}`,
                      borderRadius: "var(--r-lg)",
                      padding: "var(--s5)",
                    }}
                  >
                    <div className="t-tag" style={{ color: categoryMeta.text, marginBottom: "var(--s4)" }}>
                      IN THIS ARTICLE
                    </div>
                    {headings.map((heading, index) => (
                      <a
                        key={heading}
                        href={`#s${index}`}
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "var(--text-3)",
                          padding: "4px 0 4px 12px",
                          borderLeft: "2px solid var(--border)",
                          marginBottom: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        {heading}
                      </a>
                    ))}
                  </div>
                ) : null}

                <div
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    padding: "var(--s5)",
                  }}
                >
                  <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                    MARKET SNAPSHOT
                  </div>
                  {ARTICLE_MARKET_SNAPSHOT.map((coin) => (
                    <div
                      key={coin.sym}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "7px 0",
                        borderBottom: "0.5px solid var(--border-subtle)",
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{coin.sym}</span>
                      <span style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-2)" }}>
                        {coin.price}
                      </span>
                      <span className={coin.bull ? "bull" : "bear"} style={{ fontSize: 11 }}>
                        {coin.bull ? "▲" : "▼"} {coin.chg}
                      </span>
                    </div>
                  ))}
                  <Link href="/markets" className="view-all" style={{ marginTop: "var(--s3)", display: "flex", fontSize: 11 }}>
                    View all markets →
                  </Link>
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
                      top: -20,
                      right: -20,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    Stay ahead of the market
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.5,
                      marginBottom: "var(--s4)",
                    }}
                  >
                    Get daily crypto insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="newsletter-input"
                    style={{
                      width: "100%",
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "var(--r-md)",
                      padding: "8px 12px",
                      fontSize: 12,
                      marginBottom: "var(--s3)",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-white"
                    style={{ width: "100%", justifyContent: "center", fontSize: 12 }}
                  >
                    Subscribe Free →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  if (entity.kind === "page") {
    const page = entity.page;

    return (
      <main>
        <section
          style={{
            background: "var(--surface)",
            borderBottom: "0.5px solid var(--border-subtle)",
            padding: "var(--s10) 0",
            marginBottom: "var(--s8)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: 840 }}>
              <p className="t-section" style={{ color: "var(--text-brand)", marginBottom: "var(--s3)" }}>
                Page
              </p>
              <h1 className="t-hero" style={{ fontSize: 36 }}>
                {decodeEntities(page.title.rendered)}
              </h1>
            </div>
          </div>
        </section>
        <section className="container">
          <div
            style={{
              maxWidth: 840,
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-xl)",
              padding: "var(--s6)",
            }}
          >
            <RichText html={page.content?.rendered || ""} />
          </div>
        </section>
      </main>
    );
  }

  const categories = await getAllCategories();
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const categoryKey = getUiCategoryKey(entity.category.slug);
  const categoryMeta = getCategoryMeta(entity.category.slug);
  const subLinks = categories.filter((category) => category.parent === entity.category.id);
  const browseCategories = BROWSE_CATEGORY_SLUGS.map((slugValue) =>
    categories.find((category) => category.slug === slugValue),
  ).filter((category): category is NonNullable<(typeof categories)[number]> => Boolean(category));
  const featuredPost = entity.posts[0];
  const restPosts = entity.posts.slice(1, 10);
  const parentCategory = entity.category.parent
    ? categories.find((category) => category.id === entity.category.parent)
    : null;
  const siblingCategories = parentCategory
    ? categories.filter((category) => category.parent === parentCategory.id)
    : [];

  if (parentCategory) {
    const parentMeta = getCategoryMeta(parentCategory.slug);
    const parentKey = getUiCategoryKey(parentCategory.slug);
    const subsectionMeta = getSubsectionMeta(
      parentCategory.slug,
      entity.category.slug,
      decodeEntities(entity.category.name),
    );
    const categoryLabel = subsectionMeta.label;

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
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: parentMeta.grad }} />
          <div
            style={{
              position: "absolute",
              top: -80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 300,
              borderRadius: "50%",
              background: `radial-gradient(ellipse,${parentMeta.accent}15 0%,transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div className="container" style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: "var(--s4)",
                fontSize: 11,
                color: "var(--text-3)",
                alignItems: "center",
              }}
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <Link
                href={getCategoryHref(parentCategory, categoryMap)}
                style={{ color: parentMeta.text, fontWeight: 600 }}
              >
                {decodeEntities(parentCategory.name)}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--text-2)" }}>{categoryLabel}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "var(--s6)",
              }}
            >
              <div style={{ maxWidth: 600 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "var(--s4)" }}>
                  <div
                    style={{
                      padding: "4px 12px",
                      background: `${parentMeta.accent}20`,
                      border: `0.5px solid ${parentMeta.accent}40`,
                      borderRadius: "var(--r-pill)",
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                      color: parentMeta.text,
                    }}
                  >
                    {decodeEntities(parentCategory.name).toUpperCase()}
                  </div>
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 800,
                    marginBottom: 12,
                    lineHeight: 1.15,
                  }}
                >
                  <span className={`grad-${parentKey}`}>{categoryLabel}</span>
                </h1>
                <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.65, maxWidth: 520 }}>
                  {subsectionMeta.desc}
                </p>
              </div>
              <div style={{ display: "flex", gap: "var(--s6)" }}>
                {[{ n: "240+", l: "Articles" }, { n: "12K", l: "Readers" }].map((stat) => (
                  <div key={stat.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)" }}>
                      <span className={`grad-${parentKey}`}>{stat.n}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--text-3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {siblingCategories.length ? (
              <div style={{ display: "flex", gap: 6, marginTop: "var(--s6)", flexWrap: "wrap" }}>
                {siblingCategories.map((sibling) => {
                  const isActive = sibling.id === entity.category.id;
                  return (
                    <Link
                      key={sibling.id}
                      href={getCategoryHref(sibling, categoryMap)}
                      style={{
                        padding: "5px 14px",
                        background: isActive ? parentMeta.grad : "var(--raised)",
                        border: `0.5px solid ${isActive ? "transparent" : "var(--border)"}`,
                        borderRadius: "var(--r-pill)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: isActive ? "#fff" : "var(--text-2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {getSubsectionMeta(parentCategory.slug, sibling.slug, decodeEntities(sibling.name)).label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>

        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: "var(--s8)",
              paddingBottom: "var(--s6)",
              borderBottom: "0.5px solid var(--border-subtle)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "var(--text-3)", marginRight: 4 }}>Sort by:</span>
            {["Latest", "Most Read", "Featured", "This Week"].map((filter, index) => (
              <button
                key={filter}
                type="button"
                style={{
                  padding: "5px 14px",
                  background: index === 0 ? parentMeta.grad : "var(--surface)",
                  border: `0.5px solid ${index === 0 ? "transparent" : "var(--border)"}`,
                  borderRadius: "var(--r-pill)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: index === 0 ? "#fff" : "var(--text-3)",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid-12">
            <div className="category-main-col" style={{ gridColumn: "span 9" }}>
              {featuredPost ? (
                <Link href={getPostHref(featuredPost)} style={{ display: "block", marginBottom: "var(--s8)" }}>
                  <div
                    className="archive-feature-card"
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-xl)",
                      overflow: "hidden",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    <div
                      style={{
                        minHeight: 240,
                        background: getFeaturedImage(featuredPost)
                          ? `linear-gradient(to bottom,rgba(13,11,20,0.15),rgba(13,11,20,0.8)),url(${getFeaturedImage(featuredPost)?.source_url}) center/cover`
                          : "var(--raised)",
                        position: "relative",
                      }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: parentMeta.grad }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--s4)" }}>
                        <div className="t-h4 clamp2" style={{ color: "#fff", fontSize: 14 }}>
                          {decodeEntities(featuredPost.title.rendered)}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "var(--s6)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            color: parentMeta.text,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: 8,
                          }}
                        >
                          {categoryLabel} · Featured
                        </span>
                        <h2 className="t-h2 clamp3" style={{ marginBottom: 12 }}>
                          {decodeEntities(featuredPost.title.rendered)}
                        </h2>
                        <p className="t-body clamp2" style={{ color: "var(--text-2)" }}>
                          {stripHtml(featuredPost.excerpt.rendered)}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-3)", marginTop: "var(--s4)" }}>
                        <span>{getAuthor(featuredPost)?.name ?? "Editorial Team"}</span>
                        <span>·</span>
                        <span>{formatDisplayDate(featuredPost.date)}</span>
                        <span>·</span>
                        <span>{estimateReadTime(stripHtml(featuredPost.excerpt.rendered))}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null}

              <div className="grid-12" style={{ marginBottom: "var(--s8)" }}>
                {restPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={getPostHref(post)}
                    className="related-card"
                    style={{ gridColumn: "span 4", display: "block" }}
                  >
                    <div
                      style={{
                        background: "var(--surface)",
                        border: "0.5px solid var(--border)",
                        borderRadius: "var(--r-lg)",
                        overflow: "hidden",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: 150,
                          background: getFeaturedImage(post)
                            ? `url(${getFeaturedImage(post)?.source_url}) center/cover`
                            : "var(--raised)",
                          position: "relative",
                        }}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: parentMeta.grad }} />
                      </div>
                      <div style={{ padding: "var(--s4)" }}>
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            color: parentMeta.text,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 6,
                          }}
                        >
                          {categoryLabel}
                        </div>
                        <div className="t-h4 clamp2" style={{ fontSize: 13, marginBottom: 8 }}>
                          {decodeEntities(post.title.rendered)}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--text-3)" }}>
                          {formatDisplayDate(post.date)} · {estimateReadTime(stripHtml(post.excerpt.rendered))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ textAlign: "center", paddingTop: "var(--s8)", borderTop: "0.5px solid var(--border-subtle)" }}>
                <button type="button" className="btn btn-ghost" style={{ minWidth: 200, justifyContent: "center" }}>
                  Load more
                </button>
              </div>
            </div>

            <aside className="category-sidebar-col" style={{ gridColumn: "span 3" }}>
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
                    IN THIS CATEGORY
                  </div>
                  {siblingCategories.map((sibling) => {
                    const isActive = sibling.id === entity.category.id;
                    return (
                      <Link
                        key={sibling.id}
                        href={getCategoryHref(sibling, categoryMap)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: 8,
                          borderRadius: "var(--r-md)",
                          background: isActive ? `${parentMeta.accent}15` : "transparent",
                          border: `0.5px solid ${isActive ? parentMeta.accent : "transparent"}`,
                          marginBottom: 2,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: isActive ? parentMeta.accent : "var(--border)",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? "var(--text-1)" : "var(--text-2)" }}>
                          {getSubsectionMeta(parentCategory.slug, sibling.slug, decodeEntities(sibling.name)).label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div
                  style={{
                    background: parentMeta.grad,
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
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                    {categoryLabel} updates
                  </h3>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: "var(--s3)", lineHeight: 1.5 }}>
                    Get the latest {categoryLabel} analysis delivered weekly.
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
                  <button type="button" className="btn btn-white" style={{ width: "100%", justifyContent: "center", fontSize: 11 }}>
                    Subscribe →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  const categoryLabel = decodeEntities(entity.category.name);

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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: categoryMeta.grad }} />
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(ellipse,${categoryMeta.accent}18 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: "var(--s3)", fontSize: 11, color: "var(--text-3)" }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: categoryMeta.text, fontWeight: 600 }}>{categoryLabel}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s6)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s5)" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "var(--r-lg)",
                  background: categoryMeta.grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {categoryMeta.icon}
              </div>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, marginBottom: 6 }}>
                  <span className={`grad-${categoryKey}`}>{categoryLabel}</span>
                </h1>
                <p style={{ fontSize: 13, color: "var(--text-3)" }}>
                  Latest {categoryLabel} news and analysis
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--s8)" }}>
              {[{ n: "1,240", l: "Articles" }, { n: "48K", l: "Readers" }].map((stat) => (
                <div key={stat.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-display)" }}>
                    <span className={`grad-${categoryKey}`}>{stat.n}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {subLinks.length ? (
            <div style={{ display: "flex", gap: 6, marginTop: "var(--s6)", flexWrap: "wrap" }}>
              {subLinks.map((sub) => (
                <Link
                  key={sub.id}
                  href={getCategoryHref(sub, categoryMap)}
                  style={{
                    padding: "5px 14px",
                    background: "var(--raised)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-pill)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getSubsectionMeta(entity.category.slug, sub.slug, decodeEntities(sub.name)).label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="container">
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: "var(--s8)",
            paddingBottom: "var(--s6)",
            borderBottom: "0.5px solid var(--border-subtle)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "var(--text-3)", marginRight: 4 }}>Sort by:</span>
          {["Latest", "Most Read", "Featured", "This Week"].map((filter, index) => (
            <button
              key={filter}
              type="button"
              style={{
                padding: "5px 14px",
                background: index === 0 ? categoryMeta.grad : "var(--surface)",
                border: `0.5px solid ${index === 0 ? "transparent" : "var(--border)"}`,
                borderRadius: "var(--r-pill)",
                fontSize: 11,
                fontWeight: 600,
                color: index === 0 ? "#fff" : "var(--text-3)",
              }}
            >
              {filter}
            </button>
          ))}
          <input
            type="text"
            placeholder={`Search in ${categoryLabel}...`}
            style={{
              marginLeft: "auto",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "6px 12px",
              fontSize: 12,
              color: "var(--text-1)",
              width: 200,
              outline: "none",
            }}
          />
        </div>

        <div className="grid-12">
          <div className="category-main-col" style={{ gridColumn: "span 9" }}>
            {featuredPost ? (
              <Link href={getPostHref(featuredPost)} style={{ display: "block", marginBottom: "var(--s8)" }}>
                <div
                  className="archive-feature-card"
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-xl)",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <div
                    style={{
                      height: 260,
                      background: getFeaturedImage(featuredPost)
                        ? `url(${getFeaturedImage(featuredPost)?.source_url}) center/cover`
                        : "var(--raised)",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: categoryMeta.grad }} />
                    <span className={`badge badge-${categoryKey}`} style={{ position: "absolute", top: 16, left: 16 }}>
                      {categoryLabel.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ padding: "var(--s6)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: "var(--font-display)",
                          color: categoryMeta.text,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        Featured
                      </span>
                      <h2 className="t-h2 clamp3" style={{ marginBottom: 12 }}>
                        {decodeEntities(featuredPost.title.rendered)}
                      </h2>
                      <p className="t-body clamp2" style={{ color: "var(--text-2)" }}>
                        {stripHtml(featuredPost.excerpt.rendered)}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-3)", marginTop: "var(--s4)", flexWrap: "wrap" }}>
                      <span>{getAuthor(featuredPost)?.name ?? "Editorial Team"}</span>
                      <span>·</span>
                      <span>{formatDisplayDate(featuredPost.date)}</span>
                      <span>·</span>
                      <span>{estimateReadTime(stripHtml(featuredPost.excerpt.rendered))}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="grid-12" style={{ marginBottom: "var(--s8)" }}>
              {restPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getPostHref(post)}
                  className="related-card"
                  style={{ gridColumn: "span 4", display: "block" }}
                >
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        height: 160,
                        background: getFeaturedImage(post)
                          ? `url(${getFeaturedImage(post)?.source_url}) center/cover`
                          : "var(--raised)",
                        position: "relative",
                      }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: categoryMeta.grad }} />
                    </div>
                    <div style={{ padding: "var(--s4)" }}>
                      <span className={`badge badge-${categoryKey}`} style={{ marginBottom: 8, fontSize: 8 }}>
                        {categoryLabel}
                      </span>
                      <div className="t-h4 clamp2" style={{ fontSize: 13, marginBottom: 8 }}>
                        {decodeEntities(post.title.rendered)}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>
                        {formatDisplayDate(post.date)} · {estimateReadTime(stripHtml(post.excerpt.rendered))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", paddingTop: "var(--s8)", borderTop: "0.5px solid var(--border-subtle)" }}>
              <button type="button" className="btn btn-ghost" style={{ minWidth: 200, justifyContent: "center" }}>
                Load more articles
              </button>
            </div>
          </div>

          <aside className="category-sidebar-col" style={{ gridColumn: "span 3" }}>
            <div
              style={{
                position: "sticky",
                top: 120,
                display: "flex",
                flexDirection: "column",
                gap: "var(--s6)",
              }}
            >
              {subLinks.length ? (
                <div
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    padding: "var(--s5)",
                  }}
                >
                  <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                    SUB-CATEGORIES
                  </div>
                  {subLinks.map((sub) => (
                    <Link
                      key={sub.id}
                      href={getCategoryHref(sub, categoryMap)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: 8,
                        borderRadius: "var(--r-md)",
                        marginBottom: 2,
                        color: "var(--text-2)",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: categoryMeta.accent, flexShrink: 0 }} />
                      {getSubsectionMeta(entity.category.slug, sub.slug, decodeEntities(sub.name)).label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <div
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "var(--s5)",
                }}
              >
                <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                  BROWSE CATEGORIES
                </div>
                {browseCategories.map((category) => {
                  const browseMeta = getCategoryMeta(category.slug);
                  const isActive = category.id === entity.category.id;

                  return (
                    <Link
                      key={category.id}
                      href={getCategoryHref(category, categoryMap)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: 8,
                        borderRadius: "var(--r-md)",
                        background: isActive ? `${browseMeta.accent}15` : "transparent",
                        border: `0.5px solid ${isActive ? browseMeta.accent : "transparent"}`,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: browseMeta.grad,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                        }}
                      >
                        {browseMeta.icon}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? "var(--text-1)" : "var(--text-2)" }}>
                        {decodeEntities(category.name)}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div
                style={{
                  background: categoryMeta.grad,
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
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                  Never miss a {categoryLabel} update
                </h3>
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
                <button type="button" className="btn btn-white" style={{ width: "100%", justifyContent: "center", fontSize: 11 }}>
                  Subscribe →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
