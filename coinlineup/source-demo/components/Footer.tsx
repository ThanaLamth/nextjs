import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Youtube, Send, Mail, Star } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const FOOTER_LINKS: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Explore: [
    { label: "News", href: "/news" },
    { label: "Guides", href: "/guides" },
    { label: "Markets", href: "/markets" },
    { label: "Projects", href: "/projects" },
  ],
  Resources: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
  Community: [
    { label: "Newsletter", href: "/signup" },
    { label: "Twitter (X)", href: "https://twitter.com/coinlineup", external: true },
    { label: "Discord", href: "https://discord.gg/coinlineup", external: true },
  ],
};

function PhoneMockup() {
  return (
    <div className="relative mx-auto select-none" style={{ width: 160 }}>
      {/* orange glow */}
      <div className="absolute pointer-events-none"
        style={{
          inset: "-32px",
          background: "radial-gradient(ellipse at 50% 55%, rgba(247,147,26,0.22) 0%, transparent 65%)",
          filter: "blur(16px)",
        }} />

      {/* phone shell */}
      <div className="relative overflow-hidden"
        style={{
          borderRadius: 32,
          border: "2.5px solid #2E2E2E",
          background: "#0C0C0C",
          height: 324,
          boxShadow: "0 32px 72px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
        }}>

        {/* status bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>9:41</span>
          <div style={{ width: 40, height: 10, background: "#161616", borderRadius: 8 }} />
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.55)" }}>●●●</span>
        </div>

        {/* navbar */}
        <div className="flex items-center justify-between mx-2 px-2 py-1.5 mb-2"
          style={{ background: "#111", borderRadius: 8 }}>
          <div className="flex items-center gap-1">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F7931A", flexShrink: 0 }} />
            <div style={{ height: 6, width: 44, borderRadius: 3, background: "rgba(255,255,255,0.65)" }} />
          </div>
          <div style={{ height: 14, width: 28, borderRadius: 4, background: "rgba(247,147,26,0.45)" }} />
        </div>

        {/* hero card */}
        <div className="mx-2 mb-2"
          style={{ borderRadius: 10, overflow: "hidden", height: 70, background: "#1C1C1C" }}>
          <div style={{ height: "100%", background: "linear-gradient(135deg, rgba(247,147,26,0.22) 0%, transparent 55%)", position: "relative" }}>
            <div style={{ position: "absolute", bottom: 8, left: 8 }}>
              <div style={{ fontSize: 5.5, fontWeight: 700, background: "#E63946", color: "#fff", borderRadius: 3, padding: "1.5px 4px", display: "inline-block", marginBottom: 4, letterSpacing: "0.04em" }}>
                BREAKING
              </div>
              <div style={{ height: 5, width: 76, borderRadius: 3, background: "rgba(255,255,255,0.7)", marginBottom: 3 }} />
              <div style={{ height: 4, width: 54, borderRadius: 3, background: "rgba(255,255,255,0.32)" }} />
            </div>
          </div>
        </div>

        {/* price tickers */}
        <div className="flex gap-1.5 mx-2 mb-2">
          {[{ sym: "BTC", color: "#F7931A" }, { sym: "ETH", color: "#627EEA" }].map((c) => (
            <div key={c.sym} className="flex-1 px-2 py-1.5" style={{ background: "#161616", borderRadius: 8 }}>
              <div className="flex items-center gap-1 mb-1">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{c.sym}</span>
              </div>
              <div style={{ height: 4, width: 38, borderRadius: 2, background: "rgba(255,255,255,0.28)", marginBottom: 3 }} />
              <div style={{ height: 3, width: 24, borderRadius: 2, background: "#00A86B" }} />
            </div>
          ))}
        </div>

        {/* news items */}
        {[{ w: "80%" }, { w: "65%" }, { w: "74%" }].map((item, i) => (
          <div key={i} className="flex items-start gap-1.5 mx-2 mb-1.5">
            <div style={{ width: 34, height: 26, borderRadius: 6, background: "#1E1E1E", flexShrink: 0 }} />
            <div className="flex-1 pt-0.5">
              <div style={{ height: 4, width: item.w, borderRadius: 2, background: "rgba(255,255,255,0.26)", marginBottom: 4 }} />
              <div style={{ height: 3, width: "50%", borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
            </div>
          </div>
        ))}

        {/* home indicator */}
        <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 38, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.35)" }} />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "var(--footer-bg)" }}>

      {/* ── Newsletter — 3-column: Form | Phone | Social proof ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-11">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-center">

          {/* Col 1: Input field + CTA */}
          <div className="md:pr-8 lg:pr-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-brand-orange flex items-center justify-center flex-shrink-0">
                <Mail size={12} className="text-white" />
              </span>
              <span className="text-brand-orange font-display font-semibold text-xs uppercase tracking-widest">Newsletter</span>
            </div>
            <h3 className="font-display font-bold text-2xl mb-2 leading-snug" style={{ color: "var(--footer-text)" }}>
              Stay Ahead of<br />the Market
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--footer-text-muted)" }}>
              Get daily crypto insights before the market moves
            </p>
            <NewsletterForm dark buttonText="Subscribe" />
            <p className="text-xs mt-2.5" style={{ color: "var(--footer-text-muted)" }}>
              No spam · Unsubscribe anytime
            </p>
          </div>

          {/* Col 2: Phone mockup — center hero */}
          <div className="flex justify-center order-first md:order-none">
            <PhoneMockup />
          </div>

          {/* Col 3: Social proof / Feedback */}
          <div className="flex flex-col items-center text-center">
            <p className="font-display font-bold text-4xl mb-1" style={{ color: "var(--footer-text)" }}>
              Join 50,000+
            </p>
            <p className="text-base mb-5" style={{ color: "var(--footer-text-muted)" }}>crypto enthusiasts</p>
            <div className="flex items-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={22} className="fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <p className="text-lg font-bold" style={{ color: "var(--footer-text)" }}>4.8 / 5</p>
            <p className="text-xs mt-1" style={{ color: "var(--footer-text-muted)" }}>from 2,300+ reviews</p>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: "var(--footer-border)" }} />
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

          {/* Brand */}
          <div className="lg:w-56 flex-shrink-0">
            <Link href="/">
              <Image src="/logo-white.png" alt="CoinLineup" width={150} height={28} className="h-7 w-auto mb-4" />
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--footer-text-muted)" }}>
              Your go-to source for crypto news, guides, and market insights.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: <Twitter size={14} />, href: "https://twitter.com/coinlineup" },
                { icon: <Github size={14} />, href: "#" },
                { icon: <Youtube size={14} />, href: "#" },
                { icon: <Send size={14} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors hover:bg-brand-orange hover:text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--footer-border)", color: "var(--footer-text-muted)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10 lg:gap-14">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="min-w-[100px]">
                <h4 className="font-display font-semibold text-sm mb-3" style={{ color: "var(--footer-text)" }}>
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer"
                          className="text-sm transition-colors hover:text-brand-orange"
                          style={{ color: "var(--footer-text-muted)" }}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href}
                          className="text-sm transition-colors hover:text-brand-orange"
                          style={{ color: "var(--footer-text-muted)" }}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t" style={{ borderColor: "var(--footer-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{ color: "var(--footer-text-muted)" }}>
            <p>© 2026 CoinLineup. All rights reserved.</p>
            <p>Made with ♥ for the crypto community</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
