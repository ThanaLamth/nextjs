import Link from "next/link";

import {
  decodeEntities,
  getAuthor,
  getFeaturedImage,
  stripHtml,
  toInternalPath,
  type WpPost,
} from "@/lib/wp";

type ArticleCardProps = {
  post: WpPost;
  variant?: "feature" | "compact";
};

export function ArticleCard({
  post,
  variant = "compact",
}: ArticleCardProps) {
  const featuredImage = getFeaturedImage(post);
  const author = getAuthor(post);
  const href = toInternalPath(post.link);
  const excerpt = stripHtml(post.excerpt.rendered);

  return (
    <article className={`article-card article-card--${variant}`}>
      {featuredImage ? (
        <Link href={href} className="article-card__image-link">
          <img
            src={featuredImage.source_url}
            alt={decodeEntities(featuredImage.alt_text || post.title.rendered)}
            className="article-card__image"
          />
        </Link>
      ) : null}
      <div className="article-card__body">
        <p className="article-card__meta">
          <span>{new Date(post.date).toLocaleDateString("en-US")}</span>
          {author ? <span>{author.name}</span> : null}
        </p>
        <h2 className="article-card__title">
          <Link href={href}>{decodeEntities(post.title.rendered)}</Link>
        </h2>
        <p className="article-card__excerpt">{excerpt}</p>
      </div>
    </article>
  );
}
