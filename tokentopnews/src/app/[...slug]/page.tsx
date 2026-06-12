import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { RichText } from "@/components/rich-text";
import {
  absoluteUrl,
  decodeEntities,
  getAuthor,
  getFeaturedImage,
  getPostsByCategoryId,
  getPostCategories,
  resolveEntityByPath,
  stripHtml,
  toInternalPath,
} from "@/lib/wp";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: CatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entity = await resolveEntityByPath(slug);

  if (!entity) {
    return {
      title: "Not Found",
    };
  }

  if (entity.kind === "post") {
    const yoast = entity.post.yoast_head_json;

    return {
      title: decodeEntities(yoast?.title || entity.post.title.rendered),
      description: yoast?.description || stripHtml(entity.post.excerpt.rendered),
      alternates: {
        canonical: yoast?.canonical || absoluteUrl(`/${slug.join("/")}/`),
      },
      openGraph: {
        title: yoast?.og_title || yoast?.title || entity.post.title.rendered,
        description: yoast?.og_description || yoast?.description,
        url: yoast?.og_url || entity.post.link,
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
        canonical: yoast?.canonical || absoluteUrl(`/${slug.join("/")}/`),
      },
    };
  }

  return {
    title: `${decodeEntities(entity.category.name)} | TokenTopNews`,
    description: `Latest posts from the ${entity.category.name} archive.`,
    alternates: {
      canonical: absoluteUrl(`/${slug.join("/")}/`),
    },
  };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const entity = await resolveEntityByPath(slug);

  if (!entity) {
    notFound();
  }

  if (entity.kind === "post") {
    const post = entity.post;
    const featuredImage = getFeaturedImage(post);
    const author = getAuthor(post);
    const categories = getPostCategories(post);
    const relatedPosts = categories[0]
      ? (await getPostsByCategoryId(categories[0].id, 4)).filter(
          (relatedPost) => relatedPost.id !== post.id,
        )
      : [];

    return (
      <main className="page-shell">
        <section className="article-hero-band">
          <div className="shell article-hero">
            <div className="article-hero__content">
              <p className="eyebrow">Article</p>
              <h1>{decodeEntities(post.title.rendered)}</h1>
              <p className="lede">{stripHtml(post.excerpt.rendered)}</p>
              <div className="article-meta">
                <span>{new Date(post.date).toLocaleString("en-US")}</span>
                {author ? <span>{author.name}</span> : null}
                {categories[0] ? (
                  <Link href={toInternalPath(`/${categories[0].slug}`)}>
                    {decodeEntities(categories[0].name)}
                  </Link>
                ) : null}
              </div>
            </div>
            {featuredImage ? (
              <img
                src={featuredImage.source_url}
                alt={decodeEntities(featuredImage.alt_text || post.title.rendered)}
                className="article-hero__image"
              />
            ) : null}
          </div>
        </section>
        <section className="shell article-stage">
          <article className="article-layout">
            <div className="article-layout__main">
              <RichText html={post.content?.rendered || ""} />
            </div>
          </article>
          {relatedPosts.length > 0 ? (
            <aside className="article-sidebar">
              <div className="panel-heading">
                <p className="eyebrow">Related</p>
                <h2>More from this desk</h2>
              </div>
              <div className="stack">
                {relatedPosts.map((relatedPost) => (
                  <ArticleCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </aside>
          ) : null}
        </section>
      </main>
    );
  }

  if (entity.kind === "page") {
    const page = entity.page;

    return (
      <main className="page-shell">
        <section className="shell editorial-page">
          <div className="page-copy">
            <p className="eyebrow">Page</p>
            <h1>{decodeEntities(page.title.rendered)}</h1>
            <RichText html={page.content?.rendered || ""} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="shell archive-hero">
        <div className="page-copy">
          <p className="eyebrow">Archive</p>
          <h1>{decodeEntities(entity.category.name)}</h1>
          <p className="lede">
            Live archive rendered from the WordPress category tree and styled from
            the migrated editorial frontend.
          </p>
        </div>
      </section>
      <section className="shell archive-preview">
        <div className="archive-grid">
          {entity.posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
