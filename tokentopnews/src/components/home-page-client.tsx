"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { chartToSvgPath, fetchCoinChart, fetchMarketData, type CoinPrice } from "@/lib/market-data";
import { formatTimeAgo, type CategorySectionData, type DisplayPost } from "@/lib/site-ui";

type HomePageClientProps = {
  hero?: DisplayPost;
  latest: DisplayPost[];
  mostRead: DisplayPost[];
  featured: DisplayPost[];
  categorySections: CategorySectionData[];
  sponsored: DisplayPost[];
  press: DisplayPost[];
};

const PERIODS: Array<{ label: string; days: string }> = [
  { label: "24H", days: "1" },
  { label: "7D", days: "7" },
  { label: "30D", days: "30" },
  { label: "1Y", days: "365" },
  { label: "ALL", days: "max" },
];

function imageBackground(image?: string) {
  return image
    ? `linear-gradient(to bottom,rgba(13,11,20,0.1),rgba(13,11,20,0.88)), url(${image}) center/cover`
    : "var(--surface)";
}

function timeAgo(article: DisplayPost) {
  return formatTimeAgo(article.publishedAt);
}

export function HomePageClient({
  hero,
  latest,
  mostRead,
  featured,
  categorySections,
  sponsored,
  press,
}: HomePageClientProps) {
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [period, setPeriod] = useState(0);
  const [chartPts, setChartPts] = useState<{ line: string; area: string }>({ line: "", area: "" });
  const [btc, setBtc] = useState<CoinPrice | null>(null);

  useEffect(() => {
    let active = true;

    const loadMarket = async () => {
      try {
        const data = await fetchMarketData();
        if (active) {
          setCoins(data);
          setBtc(data.find((coin) => coin.id === "bitcoin") ?? null);
        }
      } catch {
        if (active) {
          setCoins([]);
          setBtc(null);
        }
      }
    };

    void loadMarket();
    const intervalId = window.setInterval(loadMarket, 60000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadChart = async () => {
      try {
        const points = await fetchCoinChart("bitcoin", PERIODS[period].days);
        if (active) {
          setChartPts(chartToSvgPath(points));
        }
      } catch {
        if (active) {
          setChartPts({ line: "", area: "" });
        }
      }
    };

    void loadChart();

    return () => {
      active = false;
    };
  }, [period]);

  const featuredLead = featured[0];
  const featuredRest = featured.slice(1, 3);

  return (
    <main>
      <section style={{ padding: "var(--s8) 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="grid-12" style={{ alignItems: "start" }}>
              <div className="home-col--latest" style={{ gridColumn: "span 2" }}>
              <div className="t-section" style={{ color: "var(--text-1)", marginBottom: "var(--s5)" }}>
                LASTED NEWS
              </div>
              <div>
                {latest.map((article, index) => (
                  <Link key={article.id} href={article.href} style={{ display: "block" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        padding: "10px 0",
                        borderBottom:
                          index < latest.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="t-meta" style={{ marginBottom: 3 }}>
                          {timeAgo(article)}
                        </div>
                        <div className="t-h4 clamp3" style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.45 }}>
                          {article.title}
                        </div>
                      </div>
                      {article.image ? (
                        <div
                          style={{
                            width: 54,
                            height: 50,
                            borderRadius: 6,
                            flexShrink: 0,
                            background: `url(${article.image}) center/cover`,
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 2,
                              background: `var(--grad-${article.categoryKey})`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/cryptocurrency-news/" className="view-all" style={{ marginTop: "var(--s4)", display: "flex" }}>
                View all latest news →
              </Link>
            </div>

            <div className="home-col--hero" style={{ gridColumn: "span 8" }}>
              {hero ? (
                <Link href={hero.href} style={{ display: "block" }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "var(--r-xl)",
                      overflow: "hidden",
                      height: 480,
                      cursor: "pointer",
                      background: imageBackground(hero.image),
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `var(--grad-${hero.categoryKey})`,
                      }}
                    />
                    <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 10, alignItems: "center" }}>
                      <span className={`badge badge-${hero.categoryKey}`}>{hero.categoryLabel.toUpperCase()}</span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {timeAgo(hero)}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--s10) var(--s8) var(--s8)" }}>
                      <h1 className="t-h1" style={{ fontSize: 26, marginBottom: "var(--s4)", lineHeight: 1.2, color: "#fff" }}>
                        {hero.title}
                      </h1>
                      <p
                        className="t-body clamp2"
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          marginBottom: "var(--s5)",
                          maxWidth: 540,
                        }}
                      >
                        {hero.excerpt}
                      </p>
                      <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: "var(--grad-brand)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 800,
                              color: "#fff",
                            }}
                          >
                            {hero.author[0] ?? "T"}
                          </div>
                          <span>{hero.author}</span>
                        </div>
                        <span>|</span>
                        <span>{hero.source}</span>
                        <span>|</span>
                        <span>{hero.dateLabel}</span>
                        <span>|</span>
                        <span>{hero.readLabel}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>

            <div className="home-col--most" style={{ gridColumn: "span 2" }}>
              <div className="t-section" style={{ color: "var(--text-1)", marginBottom: "var(--s5)" }}>
                MOST READ
              </div>
              <div>
                {mostRead.map((article, index) => (
                  <Link key={article.id} href={article.href} style={{ display: "block" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        padding: "10px 0",
                        borderBottom:
                          index < mostRead.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: `var(--grad-${article.categoryKey})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: 11,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        {article.image ? (
                          <div
                            style={{
                              width: 40,
                              height: 36,
                              borderRadius: 5,
                              float: "right",
                              marginLeft: 6,
                              background: `url(${article.image}) center/cover`,
                            }}
                          />
                        ) : null}
                        <div className="t-h4 clamp3" style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.4 }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--bull)", marginTop: 3 }}>^ 2.3%</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/cryptocurrency-news/" className="view-all" style={{ marginTop: "var(--s4)", display: "flex" }}>
                View all most read →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)", padding: "var(--s8) 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="grid-12">
            <div className="market-col--list" style={{ gridColumn: "span 2" }}>
              <div className="t-section" style={{ color: "var(--text-brand)", marginBottom: "var(--s4)" }}>
                MARKET SNAPSHOT
              </div>
              {(coins.length ? coins : Array(6).fill(null)).map((coin, index) => (
                <div
                  key={coin ? coin.sym : index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 0",
                    borderBottom: "0.5px solid var(--border-subtle)",
                  }}
                >
                  {coin ? (
                    <>
                      {coin.image ? (
                        <img
                          src={coin.image}
                          alt={coin.sym}
                          style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0 }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: coin.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 8,
                            fontWeight: 800,
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {coin.sym[0]}
                        </div>
                      )}
                      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-1)", flex: 1 }}>{coin.sym}</span>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--text-2)" }}>{coin.price}</div>
                        <div className={coin.bull ? "bull" : "bear"} style={{ fontSize: 10 }}>
                          {coin.bull ? "▲" : "▼"} {coin.chg}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ height: 16, background: "var(--raised)", borderRadius: 4, width: "100%" }} />
                  )}
                </div>
              ))}
              <a
                href="https://www.coingecko.com/"
                target="_blank"
                rel="noreferrer"
                className="view-all"
                style={{ marginTop: "var(--s4)", display: "flex" }}
              >
                All markets →
              </a>
            </div>

            <div className="market-col--chart" style={{ gridColumn: "span 7", borderLeft: "0.5px solid var(--border-subtle)", paddingLeft: "var(--s6)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--s4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#F7931A", flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-3)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    BITCOIN / USD
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {PERIODS.map((periodOption, index) => (
                    <button
                      key={periodOption.label}
                      type="button"
                      onClick={() => setPeriod(index)}
                      style={{
                        padding: "3px 10px",
                        background: index === period ? "#F7931A" : "var(--raised)",
                        border: `0.5px solid ${index === period ? "transparent" : "var(--border)"}`,
                        borderRadius: "var(--r-pill)",
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        color: index === period ? "#fff" : "var(--text-3)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {periodOption.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: "var(--s3)" }}>
                <div style={{ fontSize: 38, fontWeight: 800, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  {btc?.price || "—"}
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 4, alignItems: "center" }}>
                  <span className={btc?.bull ? "bull" : "bear"} style={{ fontSize: 13, fontWeight: 700 }}>
                    {btc?.bull ? "▲" : "▼"} {btc?.chg || "—"} ({PERIODS[period].label})
                  </span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 20 }}>
                    {[
                      { label: "24H HIGH", value: btc?.high24h || "—" },
                      { label: "24H LOW", value: btc?.low24h || "—" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div
                          style={{
                            fontSize: 9,
                            color: "var(--text-3)",
                            fontFamily: "var(--font-display)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {stat.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ height: 130, background: "var(--raised)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                <svg viewBox="0 0 400 130" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="btcg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F7931A" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#F7931A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {chartPts.area ? <path d={chartPts.area} fill="url(#btcg)" /> : null}
                  {chartPts.line ? (
                    <path
                      d={chartPts.line}
                      fill="none"
                      stroke="#F7931A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M0,90 L50,80 L100,70 L150,75 L200,55 L250,60 L300,45 L350,30 L400,50"
                      fill="none"
                      stroke="#F7931A"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                    />
                  )}
                </svg>
              </div>
            </div>

            <div className="market-col--featured" style={{ gridColumn: "span 3", borderLeft: "0.5px solid var(--border-subtle)", paddingLeft: "var(--s6)" }}>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                FEATURED
              </div>
              {featuredLead ? (
                <Link href={featuredLead.href} style={{ display: "block" }}>
                  <div
                    style={{
                      borderRadius: "var(--r-lg)",
                      overflow: "hidden",
                      height: 180,
                      position: "relative",
                      background: imageBackground(featuredLead.image),
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--grad-brand)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--s3)" }}>
                      <div className="t-h4 clamp2" style={{ fontSize: 12, marginBottom: 5, color: "#fff" }}>
                        {featuredLead.title}
                      </div>
                      <div className="t-meta" style={{ color: "rgba(255,255,255,0.55)", fontSize: 10 }}>
                        {timeAgo(featuredLead)}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null}
              {featuredRest.map((article) => (
                <Link key={article.id} href={article.href} style={{ display: "block" }}>
                  <div
                    style={{
                      padding: "8px 0",
                      borderBottom: "0.5px solid var(--border-subtle)",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    {article.image ? (
                      <div
                        style={{
                          width: 44,
                          height: 36,
                          borderRadius: 5,
                          flexShrink: 0,
                          background: `url(${article.image}) center/cover`,
                        }}
                      />
                    ) : null}
                    <div className="clamp2" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", lineHeight: 1.4 }}>
                      {article.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--s10) 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="grid-12">
            {categorySections.map((section) => {
              const featuredArticle = section.posts[0];
              const rest = section.posts.slice(1, 5);

              return (
                <div className="category-block" key={section.key} style={{ gridColumn: "span 3", borderRight: "0.5px solid var(--border-subtle)", paddingRight: "var(--s5)" }}>
                  <div style={{ marginBottom: "var(--s4)" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span className={`grad-${section.key}`}>{section.label.toUpperCase()}</span>
                    </h2>
                  </div>
                  {featuredArticle ? (
                    <Link href={featuredArticle.href} style={{ display: "block", marginBottom: "var(--s4)" }}>
                      <div
                        style={{
                          borderRadius: "var(--r-lg)",
                          overflow: "hidden",
                          height: 190,
                          position: "relative",
                          background: imageBackground(featuredArticle.image),
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            background: `var(--grad-${section.key})`,
                          }}
                        />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--s4)" }}>
                          <div className="t-h4 clamp2" style={{ fontSize: 12, marginBottom: 4, color: "#fff" }}>
                            {featuredArticle.title}
                          </div>
                          <div className="t-meta" style={{ color: "rgba(255,255,255,0.6)" }}>
                            {timeAgo(featuredArticle)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : null}
                  {rest.map((article) => (
                    <Link key={article.id} href={article.href} style={{ display: "block" }}>
                      <div
                        style={{
                          padding: "6px 0",
                          borderBottom: "0.5px solid var(--border-subtle)",
                          display: "flex",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: `var(--${section.key === "narratives" ? "narr" : section.key})`,
                            flexShrink: 0,
                            marginTop: 6,
                          }}
                        />
                        <div>
                          <div className="clamp2" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", lineHeight: 1.4 }}>
                            {article.title}
                          </div>
                          <div style={{ fontSize: 9, color: "var(--text-3)", marginTop: 2 }}>{timeAgo(article)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--s10) 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--s6)" }}>
            <h2 className="t-section" style={{ color: "var(--text-1)" }}>
              SPONSORED ARTICLES
            </h2>
          </div>
          <div className="grid-12">
            {sponsored.map((article) => (
              <Link key={article.id} href={article.href} className="sponsored-card" style={{ gridColumn: "span 3", display: "block" }}>
                <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                  <div style={{ height: 160, position: "relative", background: imageBackground(article.image) }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--grad-sponsored)" }} />
                    <span className="badge badge-sponsored" style={{ position: "absolute", top: 12, left: 12, fontSize: 8 }}>
                      SPONSORED
                    </span>
                  </div>
                  <div style={{ padding: "var(--s4)" }}>
                    <div className="t-h4 clamp2" style={{ fontSize: 13, marginBottom: "var(--s3)" }}>
                      {article.title}
                    </div>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-3)" }}>
                      <span>{article.dateLabel}</span>
                      <span>·</span>
                      <span>Dubai</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--s10) 0" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--s6)" }}>
            <h2 className="t-section" style={{ color: "var(--text-1)" }}>
              PRESS RELEASE <span style={{ fontWeight: 400, color: "var(--text-3)" }}>( OFFICIAL STATEMENTS )</span>
            </h2>
          </div>
          <div className="grid-12">
            {press.map((article) => (
              <Link key={article.id} href={article.href} className="press-card" style={{ gridColumn: "span 3", display: "block" }}>
                <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                  <div style={{ height: 140, position: "relative", background: imageBackground(article.image) }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--grad-press)" }} />
                    <span className="badge badge-press" style={{ position: "absolute", top: 12, left: 12, fontSize: 8 }}>
                      PRESS RELEASE
                    </span>
                  </div>
                  <div style={{ padding: "var(--s4)" }}>
                    <div className="t-h4 clamp2" style={{ fontSize: 13, marginBottom: "var(--s3)" }}>
                      {article.title}
                    </div>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-3)" }}>
                      <span>{article.dateLabel}</span>
                      <span>·</span>
                      <span>Dubai</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
