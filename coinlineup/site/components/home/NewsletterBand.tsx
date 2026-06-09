import NewsletterForm from "@/components/NewsletterForm";
import { Star } from "lucide-react";

export default function NewsletterBand() {
  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left: CTA */}
        <div className="md:col-span-2 px-8 py-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded bg-brand-orange flex items-center justify-center">
              <span className="text-white text-xs">✉</span>
            </span>
            <span className="text-brand-orange font-display font-semibold text-xs uppercase tracking-widest">Newsletter</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: "var(--text-primary)" }}>
            Stay Ahead of the Market
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Get daily crypto insights before the market moves. Join 50,000+ subscribers.
          </p>
          <div className="w-full md:w-96">
            <NewsletterForm buttonText="Subscribe Free" />
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            No spam · Unsubscribe anytime
          </p>
        </div>

        {/* Right: social proof */}
        <div
          className="flex flex-col items-center justify-center px-8 py-10 border-t md:border-t-0 md:border-l"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="font-display font-bold text-2xl mb-1" style={{ color: "var(--text-primary)" }}>
            Join 50,000+
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>crypto enthusiasts</p>
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} className="fill-brand-gold text-brand-gold" />
            ))}
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            4.8/5 from 2,300+ reviews
          </p>
        </div>
      </div>
    </section>
  );
}
