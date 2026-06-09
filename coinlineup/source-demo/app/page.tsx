import LatestNewsPanel from "@/components/home/LatestNewsPanel";
import HeroPanel from "@/components/home/HeroPanel";
import MostReadPanel from "@/components/home/MostReadPanel";
import MarketIntelligence from "@/components/home/MarketIntelligence";
import EditorsPicks from "@/components/home/EditorsPicks";
import ExploreTopics from "@/components/home/ExploreTopics";
import GuidesHub from "@/components/home/GuidesHub";
import BottomColumns from "@/components/home/BottomColumns";
import { getTopCoins, MOCK_COINS } from "@/lib/coingecko";
import {
  LATEST_NEWS, MOST_READ, EDITORS_PICKS,
  NEWS_SECTION, MARKETS_SECTION, PROJECTS_SECTION,
} from "@/lib/mockNews";

export const revalidate = 60;

export default async function HomePage() {
  let coins = MOCK_COINS;
  try { coins = await getTopCoins(20); } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── ROW 1: Latest News | Hero | Most Read ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <LatestNewsPanel articles={LATEST_NEWS} />
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2 h-full">
          <HeroPanel articles={LATEST_NEWS.slice(0, 5)} />
        </div>
        <div className="lg:col-span-3 order-3">
          <MostReadPanel articles={MOST_READ} />
        </div>
      </section>

      {/* ── ROW 2: Market Intelligence ── */}
      <section className="mt-16">
        <MarketIntelligence coins={coins} />
      </section>

      {/* ── ROW 3: Editor's Picks + Explore Topics ── */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <EditorsPicks articles={EDITORS_PICKS} />
        </div>
        <div className="lg:col-span-4">
          <ExploreTopics />
        </div>
      </section>

      {/* ── ROW 4: Guides Learning Hub ── */}
      <section className="mt-16">
        <GuidesHub />
      </section>

      {/* ── ROW 5: Bottom 4-column ── */}
      <section className="mt-16">
        <BottomColumns
          newsArticles={NEWS_SECTION}
          marketsArticles={MARKETS_SECTION}
          projectsArticles={PROJECTS_SECTION}
        />
      </section>

    </div>
  );
}
