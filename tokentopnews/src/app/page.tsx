import { ArticleCard } from "@/components/article-card";
import {
  decodeEntities,
  getFrontPage,
  getLatestPosts,
  getPostsByCategoryId,
  getPrimaryCategories,
  toInternalPath,
} from "@/lib/wp";

export default async function HomePage() {
  const [frontPage, latestPosts, categories] = await Promise.all([
    getFrontPage(),
    getLatestPosts(9),
    getPrimaryCategories(),
  ]);

  const heroPost = latestPosts[0];
  const sidePosts = latestPosts.slice(1, 5);
  const morePosts = latestPosts.slice(5, 9);
  const sectionCategories = categories.filter((category) =>
    ["insights", "trends", "narratives", "macro"].includes(category.slug),
  );
  const categorySections = await Promise.all(
    sectionCategories.map(async (category) => ({
      category,
      posts: await getPostsByCategoryId(category.id, 4),
    })),
  );

  return (
    <main className="shell page">
      <section className="hero">
        <div className="hero__intro">
          <p className="eyebrow">Migration Baseline</p>
          <h1>
            {decodeEntities(
              frontPage?.title.rendered || "Latest Crypto News, Prices & Market Updates",
            )}
          </h1>
          <p className="lede">
            This home page is already pulling live WordPress content while preserving
            Tokentopnews URL structure for the eventual frontend cutover.
          </p>
        </div>
        <div className="hero__grid">
          <div className="stack">
            {sidePosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          {heroPost ? <ArticleCard post={heroPost} variant="feature" /> : null}
          <div className="stack">
            {morePosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid">
        {categorySections.map(({ category, posts }) => (
          <section key={category.id} className="section-panel">
            <div className="section-panel__header">
              <p className="eyebrow">{category.name}</p>
              <a href={toInternalPath(`/${category.slug}`)} className="section-link">
                View archive
              </a>
            </div>
            <div className="stack">
              {posts.length > 0 ? (
                posts.map((post) => <ArticleCard key={post.id} post={post} />)
              ) : (
                <p className="muted">No posts in this category yet.</p>
              )}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
