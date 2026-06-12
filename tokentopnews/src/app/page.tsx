import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import {
  decodeEntities,
  getAuthor,
  getFeaturedImage,
  getFrontPage,
  getLatestPosts,
  getPostCategories,
  getPostsByCategoryId,
  getPrimaryCategories,
  stripHtml,
  toInternalPath,
} from "@/lib/wp";

export default async function HomePage() {
  const [frontPage, latestPosts, categories] = await Promise.all([
    getFrontPage(),
    getLatestPosts(15),
    getPrimaryCategories(),
  ]);

  const heroPost = latestPosts[0];
  const latestRail = latestPosts.slice(1, 6);
  const editorPicks = latestPosts.slice(6, 11);
  const briefingPosts = latestPosts.slice(11, 14);
  const sectionCategories = categories.filter((category) =>
    ["insights", "trends", "narratives", "macro"].includes(category.slug),
  );
  const categorySections = await Promise.all(
    sectionCategories.map(async (category) => ({
      category,
      posts: await getPostsByCategoryId(category.id, 5),
    })),
  );
  const frontPageSummary = stripHtml(
    frontPage?.content?.rendered || frontPage?.excerpt?.rendered || "",
  ).slice(0, 240);
  const heroCategory = heroPost ? getPostCategories(heroPost)[0] : null;
  const heroImage = heroPost ? getFeaturedImage(heroPost) : null;
  const heroAuthor = heroPost ? getAuthor(heroPost) : null;

  return (
    <main className="page-shell">
      <section className="hero-band">
        <div className="shell hero-grid">
          <div className="rail-panel">
            <div className="panel-heading">
              <p className="eyebrow">Latest Wire</p>
              <h2>Fast-moving headlines</h2>
            </div>
            <div className="story-rail">
              {latestRail.map((post) => {
                const image = getFeaturedImage(post);

                return (
                  <Link key={post.id} href={toInternalPath(post.link)} className="rail-story">
                    <div className="rail-story__body">
                      <p className="rail-story__meta">
                        {new Date(post.date).toLocaleDateString("en-US")}
                      </p>
                      <h3>{decodeEntities(post.title.rendered)}</h3>
                    </div>
                    {image ? (
                      <img
                        src={image.source_url}
                        alt={decodeEntities(image.alt_text || post.title.rendered)}
                        className="rail-story__image"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
            <Link href={toInternalPath("/cryptocurrency-news")} className="view-all">
              View all latest news
            </Link>
          </div>
          {heroPost ? (
            <article className="hero-story" data-category={heroCategory?.slug ?? "default"}>
              {heroImage ? (
                <img
                  src={heroImage.source_url}
                  alt={decodeEntities(heroImage.alt_text || heroPost.title.rendered)}
                  className="hero-story__image"
                />
              ) : null}
              <div className="hero-story__overlay" />
              <div className="hero-story__content">
                <div className="hero-story__topline">
                  {heroCategory ? (
                    <span className="badge">{decodeEntities(heroCategory.name)}</span>
                  ) : null}
                  <span>{new Date(heroPost.date).toLocaleDateString("en-US")}</span>
                </div>
                <h1>{decodeEntities(heroPost.title.rendered)}</h1>
                <p>{stripHtml(heroPost.excerpt.rendered)}</p>
                <div className="hero-story__footer">
                  {heroAuthor ? <span>{heroAuthor.name}</span> : null}
                  <Link href={toInternalPath(heroPost.link)} className="btn btn-white">
                    Read story
                  </Link>
                </div>
              </div>
            </article>
          ) : null}
          <div className="rank-panel">
            <div className="panel-heading">
              <p className="eyebrow">Editors&apos; File</p>
              <h2>Stories worth tracking</h2>
            </div>
            <div className="rank-list">
              {editorPicks.map((post, index) => {
                const image = getFeaturedImage(post);

                return (
                  <Link key={post.id} href={toInternalPath(post.link)} className="rank-story">
                    <span className="rank-story__index">{index + 1}</span>
                    <div className="rank-story__body">
                      <h3>{decodeEntities(post.title.rendered)}</h3>
                      <p>{stripHtml(post.excerpt.rendered)}</p>
                    </div>
                    {image ? (
                      <img
                        src={image.source_url}
                        alt={decodeEntities(image.alt_text || post.title.rendered)}
                        className="rank-story__image"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="coverage-band">
        <div className="shell coverage-grid">
          <section className="coverage-card">
            <div className="panel-heading">
              <p className="eyebrow">Coverage Map</p>
              <h2>Primary desk lanes</h2>
            </div>
            <div className="coverage-list">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={toInternalPath(`/${category.slug}`)}
                  className="coverage-list__item"
                >
                  <span>{decodeEntities(category.name)}</span>
                  <span>{category.count}</span>
                </Link>
              ))}
            </div>
          </section>
          <section className="coverage-card coverage-card--feature">
            <div className="panel-heading">
              <p className="eyebrow">Front Page</p>
              <h2>
                {decodeEntities(
                  frontPage?.title.rendered || "Latest crypto news, prices and market updates",
                )}
              </h2>
            </div>
            <p className="lede">
              {frontPageSummary ||
                "Live WordPress content is now flowing through the staged Next.js frontend while URL structure is preserved for cutover."}
            </p>
            {frontPage ? (
              <Link href={toInternalPath(frontPage.link)} className="btn btn-primary">
                Open front page source
              </Link>
            ) : null}
          </section>
          <section className="coverage-card">
            <div className="panel-heading">
              <p className="eyebrow">Fresh Briefing</p>
              <h2>Recently published</h2>
            </div>
            <div className="briefing-list">
              {briefingPosts.map((post) => (
                <Link key={post.id} href={toInternalPath(post.link)} className="briefing-list__item">
                  <p>{new Date(post.date).toLocaleDateString("en-US")}</p>
                  <h3>{decodeEntities(post.title.rendered)}</h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="shell category-grid">
        {categorySections.map(({ category, posts }) => {
          const featured = posts[0];
          const rest = posts.slice(1, 5);
          const featuredImage = featured ? getFeaturedImage(featured) : null;

          return (
            <section
              key={category.id}
              className="category-panel"
              data-category={category.slug}
            >
              <div className="panel-heading panel-heading--inline">
                <div>
                  <p className="eyebrow">{decodeEntities(category.name)}</p>
                  <h2>{decodeEntities(category.name)} archive</h2>
                </div>
                <Link href={toInternalPath(`/${category.slug}`)} className="view-all">
                  View archive
                </Link>
              </div>
              {featured ? (
                <Link href={toInternalPath(featured.link)} className="category-feature">
                  {featuredImage ? (
                    <img
                      src={featuredImage.source_url}
                      alt={decodeEntities(featuredImage.alt_text || featured.title.rendered)}
                      className="category-feature__image"
                    />
                  ) : null}
                  <div className="category-feature__overlay" />
                  <div className="category-feature__content">
                    <h3>{decodeEntities(featured.title.rendered)}</h3>
                    <p>{new Date(featured.date).toLocaleDateString("en-US")}</p>
                  </div>
                </Link>
              ) : (
                <p className="muted">No posts in this category yet.</p>
              )}
              <div className="category-list">
                {rest.map((post) => (
                  <Link key={post.id} href={toInternalPath(post.link)} className="category-list__item">
                    <span className="category-list__dot" />
                    <div>
                      <h3>{decodeEntities(post.title.rendered)}</h3>
                      <p>{new Date(post.date).toLocaleDateString("en-US")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="shell archive-preview">
        <div className="panel-heading panel-heading--inline">
          <div>
            <p className="eyebrow">More Stories</p>
            <h2>Additional posts from the live WordPress feed</h2>
          </div>
          <Link href={toInternalPath("/cryptocurrency-news")} className="view-all">
            Open news archive
          </Link>
        </div>
        <div className="archive-grid">
          {latestPosts.slice(0, 6).map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
