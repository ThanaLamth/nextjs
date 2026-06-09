import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { buildArticleHref, type NewsArticle, timeAgo } from "@/lib/content";

interface Props { articles: NewsArticle[] }

export default function LatestNewsPanel({ articles }: Props) {
  return (
    <div>
      <SectionHeader title="Latest News" dotColor="#E63946" viewAllHref="/news" viewAllLabel="View all" />
      <div className="space-y-1">
        {articles.slice(0, 5).map((a) => (
          <Link
            key={a.id}
            href={buildArticleHref(a)}
            className="flex items-start gap-3 p-2.5 rounded-xl group transition-colors hover:bg-brand-orange/5"
          >
            {/* Thumbnail */}
            <div className="relative w-14 h-11 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={a.thumbnail}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="56px"
              />
              {a.badge === "BREAKING" && (
                <span className="absolute top-0.5 left-0.5 bg-brand-red text-white text-[8px] font-bold px-1 rounded">
                  BREAKING
                </span>
              )}
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-brand-orange transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {a.title}
              </p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
                {timeAgo(a.hoursAgo) || a.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
