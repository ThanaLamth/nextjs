import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { RichText } from "@/components/rich-text";
import {
  absoluteUrl,
  decodeEntities,
  getAuthor,
  getFeaturedImage,
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

    return (
      <main className="shell page">
        <article className="article-layout">
          <div className="article-layout__main">
            <p className="eyebrow">Article</p>
            <h1>{decodeEntities(post.title.rendered)}</h1>
            <p className="lede">{stripHtml(post.excerpt.rendered)}</p>
            <div className="article-meta">
              <span>{new Date(post.date).toLocaleString("en-US")}</span>
              {author ? <span>{author.name}</span> : null}
              {categories[0] ? <span>{categories[0].name}</span> : null}
            </div>
            {featuredImage ? (
              <img
                src={featuredImage.source_url}
                alt={decodeEntities(featuredImage.alt_text || post.title.rendered)}
                className="hero-image"
              />
            ) : null}
            <RichText html={post.content?.rendered || ""} />
          </div>
        </article>
      </main>
    );
  }

  if (entity.kind === "page") {
    const page = entity.page;

    return (
      <main className="shell page">
        <section className="page-copy">
          <p className="eyebrow">Page</p>
          <h1>{decodeEntities(page.title.rendered)}</h1>
          <RichText html={page.content?.rendered || ""} />
        </section>
      </main>
    );
  }

  return (
    <main className="shell page">
      <section className="page-copy">
        <p className="eyebrow">Archive</p>
        <h1>{decodeEntities(entity.category.name)}</h1>
        <p className="lede">
          Live archive rendered from the WordPress category tree.
        </p>
      </section>
      <section className="archive-grid">
        {entity.posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
