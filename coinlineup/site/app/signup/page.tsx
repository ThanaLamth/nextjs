import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock3, Newspaper, BellRing, ShieldCheck } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Newsletter — CoinLineup" };

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1A1A1A 0%, #0D0D0D 100%)" }}
      >
        {/* Orange glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo-white.png" alt="CoinLineup" width={175} height={32} className="h-8 w-auto" />
          </Link>

          {/* Middle content */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-4">
              CoinLineup Daily
            </p>
            <h2 className="font-display font-bold text-4xl text-white leading-tight mb-5">
              Stay ahead of<br />
              <span className="gradient-text">the market</span><br />
              every morning
            </h2>
            <p className="text-brand-gray-33 text-base leading-relaxed mb-10">
              Get the top crypto stories, market context, and guide picks in one clean daily email. No password, no profile setup, no extra friction.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: <Newspaper size={18} />, title: "Top stories that matter", desc: "The most important crypto, markets, and regulation updates in one brief." },
                { icon: <Clock3 size={18} />, title: "Fast morning read", desc: "A concise roundup designed to be read in a few minutes." },
                { icon: <BellRing size={18} />, title: "Market-moving context", desc: "Not just headlines. You get why the story matters." },
                { icon: <ShieldCheck size={18} />, title: "Easy to leave", desc: "No spam. Unsubscribe anytime from any email." },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <span className="text-brand-orange flex-shrink-0 mt-0.5">{b.icon}</span>
                  <div>
                    <p className="font-display font-semibold text-white text-sm">{b.title}</p>
                    <p className="text-brand-gray-50 text-xs">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex items-center gap-8 pt-8 border-t border-brand-gray-85">
            {[
              { value: "Daily", label: "Briefing" },
              { value: "News", label: "& Analysis" },
              { value: "Email", label: "Only" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-2xl gradient-text">{s.value}</p>
                <p className="text-brand-gray-50 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: "var(--page-bg)" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <Image src="/logo-white.png" alt="CoinLineup" width={160} height={30} className="h-8 w-auto mx-auto" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>
              Subscribe to CoinLineup Daily
            </h1>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm">
              A daily crypto briefing with the biggest stories, guide picks, and market context.
            </p>
          </div>

          <div className="space-y-5">
            <NewsletterForm buttonText="Subscribe" />

            <div
              className="rounded-2xl border p-4"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                What you get
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Top crypto news before the market moves</li>
                <li>Selected guides and explainers worth reading</li>
                <li>A clean inbox-first format with no account setup</li>
              </ul>
            </div>

            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              CoinLineup is currently focused on editorial coverage, guides, and newsletter updates for readers who want a simpler product experience.
            </p>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
            By subscribing, you agree to our{" "}
            <Link href="/terms-conditions" className="text-brand-orange hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-brand-orange hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
