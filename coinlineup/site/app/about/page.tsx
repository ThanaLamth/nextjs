import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Shield, Globe, BarChart2, Mail, ArrowRight, Users, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — CoinLineup",
  description: "Learn about CoinLineup — your trusted source for cryptocurrency news, market analysis, and blockchain education.",
};

const STATS = [
  { value: "2M+", label: "Monthly Readers" },
  { value: "50K+", label: "Newsletter Subscribers" },
  { value: "50+", label: "Countries Covered" },
  { value: "24/7", label: "Live Coverage" },
];

const VALUES = [
  { icon: <Shield size={20} />, title: "Editorial Independence", desc: "Our editorial team operates independently from advertising and commercial partnerships. News coverage is never influenced by sponsors." },
  { icon: <Target size={20} />, title: "Accuracy First", desc: "Every article is fact-checked before publication. We correct errors promptly and transparently when they occur." },
  { icon: <Zap size={20} />, title: "Breaking Speed", desc: "We monitor global crypto markets 24/7 so you get market-moving news before it reaches mainstream media." },
  { icon: <Users size={20} />, title: "Community Driven", desc: "Built by crypto enthusiasts, for crypto enthusiasts. Your feedback shapes what we cover and how we cover it." },
];

const TEAM = [
  { name: "Sarah Chen", role: "Editor-in-Chief", bio: "Former Bloomberg crypto reporter with 8 years covering digital assets and blockchain technology." },
  { name: "Marcus Rivera", role: "Lead Market Analyst", bio: "CFA charterholder and quantitative analyst specialising in on-chain data and crypto market structure." },
  { name: "Priya Nair", role: "DeFi Research Lead", bio: "Smart contract developer turned researcher. Covered every major DeFi protocol launch since 2019." },
  { name: "Tom Wallace", role: "Head of Guides", bio: "Crypto educator who has helped over 500,000 beginners understand blockchain technology and investing basics." },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-3">About CoinLineup</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
          Your Trusted Source for <span className="gradient-text">Crypto Intelligence</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          CoinLineup was founded in 2020 with a single mission: deliver accurate, timely, and accessible cryptocurrency news and education to investors at every level.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Link href="/news"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
            Read Latest News
          </Link>
          <Link href="/contact"
            className="border font-display font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors hover:border-brand-orange hover:text-brand-orange"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border p-6 text-center"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="font-display font-bold text-3xl text-brand-orange mb-1">{s.value}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
        <div>
          <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The crypto information landscape is noisy, fast-moving, and often unreliable. Too much coverage is either promotional, sensationalist, or technically inaccurate. We exist to be the opposite.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            CoinLineup provides institutional-grade market analysis, breaking news, and educational guides — all in plain language that anyone can understand. Whether you are evaluating a trade or learning what a blockchain is for the first time, we have the content for you.
          </p>
          <Link href="/guides" className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm hover:gap-3 transition-all">
            Explore our guides <ArrowRight size={14} />
          </Link>
        </div>
        <div className="rounded-2xl border p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            &ldquo;Crypto moves fast. Miss a day and you miss the market.&rdquo;
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            That&apos;s why our team monitors global markets around the clock, publishing breaking news within minutes of major events — from regulatory decisions to protocol upgrades to institutional moves.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>Our Editorial Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                {v.icon}
              </div>
              <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--text-primary)" }}>Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-xl border p-5"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg mb-4">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{member.name}</h3>
              <p className="text-xs text-brand-orange font-semibold mb-3">{member.role}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="rounded-2xl border p-8 text-center" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
        <Mail size={32} className="text-brand-orange mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Get in Touch</h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Have a story tip, partnership enquiry, or just want to say hello?
        </p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-6 py-3 rounded-xl text-sm transition-colors">
          Contact Us <ArrowRight size={14} />
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs mt-10 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
        CoinLineup provides cryptocurrency news and market data for informational purposes only.
        Nothing on this site constitutes financial advice. Always conduct your own research before making investment decisions.
      </p>

    </div>
  );
}
