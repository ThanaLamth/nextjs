"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { fetchMarketData, type CoinPrice } from "@/lib/market-data";
import type { NavItemData } from "@/lib/site-ui";

type SiteHeaderClientProps = {
  siteName: string;
  navItems: NavItemData[];
  initialTicker: CoinPrice[];
};

type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
}

export function SiteHeaderClient({
  siteName,
  navItems,
  initialTicker,
}: SiteHeaderClientProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [ticker, setTicker] = useState<CoinPrice[]>(initialTicker);
  const [currentPath, setCurrentPath] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const nextTheme = stored === "light" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    let active = true;

    const loadTicker = async () => {
      try {
        const data = await fetchMarketData();
        if (active) {
          setTicker(data);
        }
      } catch {
        if (active) {
          setTicker([]);
        }
      }
    };

    void loadTicker();
    const intervalId = window.setInterval(loadTicker, 60000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const isActive = (href: string, sub?: NavItemData["sub"]) => {
    if (!currentPath) {
      return false;
    }

    if (currentPath === href || currentPath.startsWith(href)) {
      return true;
    }

    return Boolean(
      sub?.some((item) => currentPath === item.href || currentPath.startsWith(item.href)),
    );
  };

  const openDrop = (label: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setOpenMenu(label);
  };

  const closeDrop = () => {
    timerRef.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <div
        style={{
          background: "var(--canvas-deep)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "12px 0",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              background: "#FF4060",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              padding: "2px 7px",
              borderRadius: 3,
              letterSpacing: "0.06em",
              flexShrink: 0,
              fontFamily: "var(--font-display)",
            }}
          >
            LIVE
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center", overflow: "hidden", flex: 1 }}>
            {(ticker.length ? ticker : Array(6).fill(null)).map((coin, index) => (
              <div
                key={coin ? coin.sym : index}
                style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
              >
                {coin ? (
                  <>
                    {coin.image ? (
                      <img
                        src={coin.image}
                        alt={coin.sym}
                        style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          background: coin.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 7,
                          fontWeight: 800,
                          color: "#fff",
                        }}
                      >
                        {coin.sym[0]}
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--text-2)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {coin.sym}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: "var(--text-1)",
                        fontWeight: 500,
                      }}
                    >
                      {coin.price}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: coin.bull ? "#00E5A0" : "#FF4060",
                      }}
                    >
                      {coin.bull ? "▲" : "▼"}
                      {coin.chg}
                    </span>
                  </>
                ) : (
                  <div style={{ width: 80, height: 10, background: "var(--raised)", borderRadius: 3 }} />
                )}
              </div>
            ))}
          </div>
          <Link href="/markets" style={{ fontSize: 11, color: "var(--text-3)", whiteSpace: "nowrap", flexShrink: 0 }}>
            View all markets →
          </Link>
        </div>
      </div>

      <div
        style={{
          background: "var(--header-blur-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "24px 0",
        }}
      >
	        <div className="container" style={{ display: "flex", alignItems: "center", gap: 24 }}>
	          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
	            <div>
	              <img
	                className="brand-logo brand-logo--light"
	                src="/tokentopnews-logo-white.png"
	                alt={siteName}
	                style={{
	                  width: 208,
	                  height: "auto",
	                  maxWidth: "100%",
	                }}
	              />
	              <img
	                className="brand-logo brand-logo--dark"
	                src="/tokentopnews-logo-dark.png"
	                alt={siteName}
	                style={{
	                  width: 208,
	                  height: "auto",
	                  maxWidth: "100%",
	                }}
	              />
	              <div
	                style={{
	                  fontSize: 9,
	                  color: "var(--text-3)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                CRYPTO NEWS, INSIGHT &amp; MARKET CONTEXT
              </div>
            </div>
          </Link>
          <div style={{ flex: 1, maxWidth: 380, position: "relative" }}>
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: 8,
                padding: "8px 38px 8px 14px",
                fontSize: 13,
                color: "var(--text-1)",
                outline: "none",
              }}
            />
            <svg
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-3)",
              }}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexShrink: 0 }}>
            <Link href="/newsletter" className="btn btn-outline btn-sm">
              Newsletter
            </Link>
            <Link href="/subscribe" className="btn btn-primary btn-sm">
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "var(--canvas)",
          borderBottom: "0.5px solid var(--border-subtle)",
          position: "relative",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "stretch" }}>
          {navItems.map((item) => {
            const active = isActive(item.href, item.sub);
            const hasSub = Boolean(item.sub?.length);
            const menuOpen = openMenu === item.label;

            return (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => (hasSub ? openDrop(item.label) : undefined)}
                onMouseLeave={() => (hasSub ? closeDrop() : undefined)}
              >
                <Link
                  href={item.href}
                  style={{
                    padding: "20px 14px",
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.04em",
                    color: active ? "#fff" : "var(--text-3)",
                    background: active ? "var(--brand)" : "transparent",
                    borderRadius: active ? 4 : 0,
                    margin: "6px 2px",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    transition: "color 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                  {hasSub ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{
                        opacity: 0.6,
                        transform: menuOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.15s",
                      }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  ) : null}
                </Link>

                {hasSub && menuOpen ? (
                  <div
                    onMouseEnter={() => openDrop(item.label)}
                    onMouseLeave={closeDrop}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                      padding: "6px 0",
                      minWidth: 200,
                      zIndex: 300,
                    }}
                  >
                    {item.sub?.map((sub) => {
                      const subActive =
                        currentPath === sub.href || currentPath.startsWith(`${sub.href}/`);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          style={{
                            display: "block",
                            padding: "8px 16px",
                            fontSize: 12,
                            fontWeight: 500,
                            color: subActive ? "var(--text-brand)" : "var(--text-2)",
                            background: subActive ? "var(--brand-subtle)" : "transparent",
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.background = "var(--raised)";
                            event.currentTarget.style.color = "var(--text-1)";
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.background = subActive
                              ? "var(--brand-subtle)"
                              : "transparent";
                            event.currentTarget.style.color = subActive
                              ? "var(--text-brand)"
                              : "var(--text-2)";
                          }}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--r-md)",
                background: "var(--raised)",
                color: "var(--text-3)",
                border: "0.5px solid var(--border-subtle)",
                transition: "background 0.18s, color 0.18s",
              }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link
              href="/profile"
              aria-label="Profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "var(--text-3)",
                fontSize: 12,
                padding: "4px 6px",
                borderRadius: "var(--r-md)",
                transition: "color 0.15s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
              </svg>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
