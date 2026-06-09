import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import Image from "next/image";
import { Zap, Newspaper, BarChart2, Bell } from "lucide-react";

export const metadata: Metadata = { title: "Sign Up — CoinLineup" };

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
              Join CoinLineup
            </p>
            <h2 className="font-display font-bold text-4xl text-white leading-tight mb-5">
              Your Gateway to<br />
              <span className="gradient-text">Real-Time Market</span><br />
              Intelligence
            </h2>
            <p className="text-brand-gray-33 text-base leading-relaxed mb-10">
              Join over 2 million investors, traders, and crypto enthusiasts who trust CoinLineup for breaking news and market analysis.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: <Zap size={18} />, title: "Live Market Data", desc: "Real-time prices for 10,000+ cryptocurrencies" },
                { icon: <Newspaper size={18} />, title: "Breaking News", desc: "Be the first to know about market-moving events" },
                { icon: <BarChart2 size={18} />, title: "Portfolio Insights", desc: "Track your holdings with advanced analytics" },
                { icon: <Bell size={18} />, title: "Price Alerts", desc: "Custom alerts for your favourite assets" },
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
              { value: "2M+", label: "Members" },
              { value: "50+", label: "Countries" },
              { value: "24/7", label: "Coverage" },
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
              Create your account
            </h1>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-orange font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <SignUpForm />

          <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-brand-orange hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
