import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter Confirmed — CoinLineup",
  description: "Your CoinLineup Daily newsletter subscription is confirmed.",
};

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isInvalid = status === "invalid";

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div
        className="rounded-[28px] border p-8 md:p-12"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
          CoinLineup Daily
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
          {isInvalid ? "Confirmation link invalid" : "Subscription confirmed"}
        </h1>
        <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
          {isInvalid
            ? "This confirmation link is missing, expired, or no longer valid. Submit your email again and we will send a fresh confirmation email."
            : "You are in. Expect a concise crypto briefing with major stories, market context, and selected reads worth your time."}
        </p>
        {isInvalid ? null : (
          <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            CoinLineup is being rebuilt as a cleaner editorial product, so the newsletter will stay focused on signal over noise.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={isInvalid ? "/signup" : "/"}
            className="rounded-full bg-brand-orange px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-dark"
          >
            {isInvalid ? "Try again" : "Read the latest stories"}
          </Link>
          <Link
            href="/news"
            className="rounded-full border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-orange hover:text-brand-orange"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            Browse news
          </Link>
        </div>
      </div>
    </div>
  );
}
