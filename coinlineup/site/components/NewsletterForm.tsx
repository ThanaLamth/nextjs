"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface Props {
  placeholder?: string;
  buttonText?: string;
  compact?: boolean;
  dark?: boolean;
}

export default function NewsletterForm({
  placeholder = "Enter your email",
  buttonText = "Subscribe Free",
  compact = false,
  dark = false,
}: Props) {
  const inputClass = dark ? "footer-input" : "themed-input";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-3">
        <p className="price-up font-semibold text-sm">✓ You&apos;re subscribed! Check your inbox.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={`w-full rounded-lg px-3 py-2.5 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange ${inputClass}`}
        />
        <button type="submit"
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
          <Send size={13} />{buttonText}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={`flex-1 min-w-0 rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange ${inputClass}`}
      />
      <button type="submit"
        className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap flex-shrink-0">
        <Send size={14} />{buttonText}
      </button>
    </form>
  );
}
