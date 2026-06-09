import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { buildArticleHref, type NewsArticle } from "@/lib/content";

interface Props { articles: NewsArticle[] }

const BADGE_STYLES: Record<string, string> = {
  "DEEP DIVE": "bg-blue-700",
  "ANALYSIS": "bg-purple-700",
  "INSIGHT": "bg-teal-700",
  "BREAKING": "bg-brand-red",
  "MARKET ANALYSIS": "bg-brand-orange",
  "NEW PROJECT": "bg-green-700",
  default: "bg-brand-orange",
};

export default function EditorsPicks({ articles }: Props) {
  return (
    <div>
      <SectionHeader
        title="Editor's Picks"
        icon={<Star size={16} />}
        viewAllHref="/news"
        viewAllLabel="View all picks"
      />
      <div className="grid grid-cols-3 gap-3">
        {articles.slice(0, 3).map((a) => {
          const badgeClass = a.badge ? (BADGE_STYLES[a.badge] ?? BADGE_STYLES.default) : "";
          return (
            <Link
              key={a.id}
              href={buildArticleHref(a)}
              className="relative rounded-xl overflow-hidden group h-52 block"
            >
              <Image
                src={a.thumbnail}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                {a.badge && (
                  <span className={`${badgeClass} text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide`}>
                    {a.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-white text-xs mt-1.5 leading-snug line-clamp-2">
                  {a.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/60">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5"><Clock size={9} />{a.readTime}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
