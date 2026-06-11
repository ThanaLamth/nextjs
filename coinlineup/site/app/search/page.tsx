import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import { searchWordPressContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Search — CoinLineup",
  description: "Search CoinLineup stories and pages.",
};

interface Props {
  searchParams: Promise<{ q?: string | string[] }>;
}

function readQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

export default async function SearchPage({ searchParams }: Props) {
  const query = readQuery((await searchParams).q);
  const results = query ? await searchWordPressContent(query, 18) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-orange">
          Search
        </p>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          {query ? `Results for "${query}"` : "Search CoinLineup"}
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          {query
            ? `${results.length} result${results.length === 1 ? "" : "s"} from live WordPress content.`
            : "Use the search box in the header to look up stories, guides, and pages."}
        </p>
      </div>

      {query ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article, index) => (
              <NewsCard key={`${article.category}-${article.id}`} article={article} variant="default" index={index} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl border px-6 py-12 text-center"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <p className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              No results found
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Try a broader keyword or search for the exact headline terms used in WordPress.
            </p>
          </div>
        )
      ) : (
        <div
          className="rounded-2xl border px-6 py-12 text-center"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Start with a keyword
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Example searches: Bitcoin ETF, DeFi, regulation, wallets.
          </p>
        </div>
      )}
    </div>
  );
}
