import LatestNewsPanel from "@/components/home/LatestNewsPanel";
import HeroPanel from "@/components/home/HeroPanel";
import MostReadPanel from "@/components/home/MostReadPanel";
import MarketIntelligence from "@/components/home/MarketIntelligence";
import EditorsPicks from "@/components/home/EditorsPicks";
import ExploreTopics from "@/components/home/ExploreTopics";
import GuidesHub from "@/components/home/GuidesHub";
import BottomColumns from "@/components/home/BottomColumns";
import { getTopCoins, MOCK_COINS } from "@/lib/coingecko";
import { getHomePageData } from "@/lib/wordpress";

export default async function HomePage() {
  let coins = MOCK_COINS;
  try { coins = await getTopCoins(20); } catch {}
  const home = await getHomePageData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── ROW 1: Latest News | Hero | Most Read ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <LatestNewsPanel articles={home.latest} />
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2 h-full">
          <HeroPanel articles={home.latest.slice(0, 5)} />
        </div>
        <div className="lg:col-span-3 order-3">
          <MostReadPanel articles={home.mostRead} />
        </div>
      </section>

      {/* ── ROW 2: Market Intelligence ── */}
      <section className="mt-16">
        <MarketIntelligence coins={coins} />
      </section>

      {/* ── ROW 3: Editor's Picks + Explore Topics ── */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <EditorsPicks articles={home.editorsPicks} />
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
          newsArticles={home.newsSection}
          marketsArticles={home.marketsSection}
          projectsArticles={home.projectsSection}
        />
      </section>

    </div>
  );
}
