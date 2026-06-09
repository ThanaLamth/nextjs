import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import { PROJECTS_SECTION } from "@/lib/mockNews";

export const metadata: Metadata = { title: "Projects — Crypto Projects" };

export default function ProjectsPage() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS_SECTION.map((a, i) => (
          <NewsCard key={a.id} article={a} variant="default" index={i} />
        ))}
      </div>
    </div>
  );
}
