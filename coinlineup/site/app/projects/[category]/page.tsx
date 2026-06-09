import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { ALL_NEWS } from "@/lib/mockNews";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  "top-projects": { label: "Top Projects", description: "The most impactful blockchain projects shaping the future of crypto." },
  reviews: { label: "Reviews", description: "In-depth reviews and analysis of key crypto projects and protocols." },
  "new-projects": { label: "New Projects", description: "The latest blockchain projects and protocol launches to watch." },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  return { title: `${meta?.label ?? category} — CoinLineup Projects` };
}

export default function ProjectCategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" />}>
      <ProjectCategoryContent params={params} />
    </Suspense>
  );
}

async function ProjectCategoryContent({ params }: Props) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  const label = meta?.label ?? category;

  const articles = ALL_NEWS.filter((a) => a.section === "projects");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-2">Projects</p>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          {label} <span className="gradient-text">Coverage</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          {meta?.description ?? `Explore ${label} in the blockchain ecosystem.`}
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <NewsCard key={a.id} article={a} variant="default" index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--text-secondary)" }}>
            Coverage coming soon
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Our team is researching {label}. Check back shortly.
          </p>
          <Link href="/projects" className="text-brand-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Browse all projects <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
