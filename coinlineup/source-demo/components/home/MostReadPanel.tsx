import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { type NewsArticle } from "@/lib/mockNews";

interface Props { articles: NewsArticle[] }

const RANK_COLORS = ["#F7931A", "#F7931A", "#9CA3AF", "#9CA3AF", "#9CA3AF"];

export default function MostReadPanel({ articles }: Props) {
  return (
    <div>
      <SectionHeader title="Most Read" dotColor="#E63946" viewAllHref="/news" viewAllLabel="View all" />
      <div className="space-y-0">
        {articles.slice(0, 5).map((a, i) => (
          <Link
            key={a.id}
            href={`/news/${a.category.toLowerCase().replace(/\s+/g, "-")}/${a.id}`}
            className="flex items-start gap-3 py-3 border-b group transition-colors last:border-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="font-display font-bold text-xl leading-none flex-shrink-0 w-6 text-center mt-0.5"
              style={{ color: RANK_COLORS[i] }}
            >
              {i + 1}
            </span>
            <p
              className="text-xs font-semibold leading-snug line-clamp-3 group-hover:text-brand-orange transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {a.title}
            </p>
          </Link>
        ))}
      </div>
      <Link href="/news" className="flex items-center gap-1 text-xs text-brand-orange mt-3 font-medium hover:gap-2 transition-all">
        View all most read →
      </Link>
    </div>
  );
}
