import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import { getPostsByCategoryTreeSlug, mapWpPostToArticle } from "@/lib/wordpress";

export const metadata: Metadata = { title: "Projects — Crypto Projects" };

export default async function ProjectsPage() {
  const projects = (await getPostsByCategoryTreeSlug("projects", 18)).map((post) =>
    mapWpPostToArticle(post, "projects")
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-2">Coverage</p>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          Crypto <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          In-depth coverage of the most promising blockchain projects and protocols.
        </p>
      </div>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((article, index) => (
            <NewsCard key={article.id} article={article} variant="default" index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border px-6 py-12 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            No project coverage published yet
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            This section will populate automatically when project coverage is published in WordPress.
          </p>
        </div>
      )}
    </div>
  );
}
