import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Newspaper, BarChart2, Rocket } from "lucide-react";
import { buildArticleHref, type NewsArticle, timeAgo } from "@/lib/content";

const BADGE_COLORS: Record<string, string> = {
  "BREAKING": "#E63946",
  "MARKET ANALYSIS": "#F7931A",
  "NEW PROJECT": "#00A86B",
  "ANALYSIS": "#8B5CF6",
  "INSIGHT": "#3B82F6",
  "DEEP DIVE": "#2563EB",
};

function ColumnHeader({ title, href, icon }: { title: string; href: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2">
        <span className="text-brand-orange">{icon}</span>
        <h3 className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
      </div>
      <Link href={href} className="text-xs text-brand-orange flex items-center gap-0.5 hover:gap-1 transition-all">
        View all <ArrowRight size={11} />
      </Link>
    </div>
  );
}

function FeaturedCard({ article }: { article: NewsArticle }) {
  const badgeColor = article.badge ? (BADGE_COLORS[article.badge] ?? "#F7931A") : null;
  return (
    <Link href={buildArticleHref(article)}
      className="block relative rounded-xl overflow-hidden h-36 mb-3 group">
      <Image src={article.thumbnail} alt={article.title} fill
        className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {article.badge && badgeColor && (
          <span className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
            style={{ background: badgeColor }}>
            {article.badge}
          </span>
        )}
        <h4 className="font-display font-bold text-white text-xs mt-1 leading-snug line-clamp-2">
          {article.title}
        </h4>
      </div>
    </Link>
  );
}

function CompactRow({ article }: { article: NewsArticle }) {
  return (
    <Link href={buildArticleHref(article)}
      className="flex items-start gap-2.5 py-2 border-t group hover:bg-brand-orange/5 -mx-1 px-1 rounded transition-colors"
      style={{ borderColor: "var(--border)" }}>
      <div className="relative w-10 h-8 flex-shrink-0 rounded overflow-hidden mt-0.5">
        <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="40px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-brand-orange transition-colors"
          style={{ color: "var(--text-primary)" }}>
          {article.title}
        </p>
        <p className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
          <Clock size={9} />{timeAgo(article.hoursAgo) || article.date}
        </p>
      </div>
    </Link>
  );
}

function EmptyColumnState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed px-3 py-6 text-center" style={{ borderColor: "var(--border)" }}>
      <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        No {label.toLowerCase()} stories yet
      </p>
      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
        This column will populate from WordPress once content is published.
      </p>
    </div>
  );
}

interface Props {
  newsArticles: NewsArticle[];
  marketsArticles: NewsArticle[];
  projectsArticles: NewsArticle[];
}

export default function BottomColumns({ newsArticles, marketsArticles, projectsArticles }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* NEWS */}
        <div>
          <ColumnHeader title="News" href="/news" icon={<Newspaper size={14} />} />
          {newsArticles[0] ? (
            <>
              <FeaturedCard article={newsArticles[0]} />
              {newsArticles.slice(1, 5).map((a) => <CompactRow key={a.id} article={a} />)}
            </>
          ) : (
            <EmptyColumnState label="News" />
          )}
        </div>

        {/* MARKETS */}
        <div>
          <ColumnHeader title="Markets" href="/news/markets" icon={<BarChart2 size={14} />} />
          {marketsArticles[0] ? (
            <>
              <FeaturedCard article={marketsArticles[0]} />
              {marketsArticles.slice(1, 5).map((a) => <CompactRow key={a.id} article={a} />)}
            </>
          ) : (
            <EmptyColumnState label="Markets" />
          )}
        </div>

        {/* PROJECTS */}
        <div>
          <ColumnHeader title="Projects" href="/projects" icon={<Rocket size={14} />} />
          {projectsArticles[0] ? (
            <>
              <FeaturedCard article={projectsArticles[0]} />
              {projectsArticles.slice(1, 5).map((a) => <CompactRow key={a.id} article={a} />)}
            </>
          ) : (
            <EmptyColumnState label="Projects" />
          )}
        </div>
      </div>
    </section>
  );
}
