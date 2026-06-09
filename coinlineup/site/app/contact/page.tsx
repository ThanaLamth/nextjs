"use client";

import { useState } from "react";
import { Mail, Twitter, MessageSquare, Send, CheckCircle } from "lucide-react";

const TOPICS = [
  "News tip or story lead",
  "Editorial feedback",
  "Advertising & sponsorship",
  "Partnership enquiry",
  "Technical issue",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="max-w-xl mb-12">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-3">Contact</p>
        <h1 className="font-display font-bold text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Have a story tip, feedback, or partnership enquiry? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="rounded-2xl border p-12 text-center" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <CheckCircle size={48} className="text-brand-green mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Message Sent!</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Thanks for reaching out. We typically respond within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Name</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange themed-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Email</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange themed-input" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Topic</label>
                <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange themed-input">
                  <option value="">Select a topic…</option>
                  {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Message</label>
                <textarea required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help…"
                  rows={6}
                  className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-brand-orange themed-input resize-none" />
              </div>

              <button type="submit"
                className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold px-8 py-3 rounded-xl text-sm transition-colors">
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-5 space-y-5">

          <div className="rounded-xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>General enquiries</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>hello@coinlineup.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Press & partnerships</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>press@coinlineup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>Join the Community</h3>
            <div className="space-y-3">
              {[
                { icon: <Twitter size={16} />, label: "Twitter (X)", handle: "@CoinLineup", href: "https://twitter.com/coinlineup", color: "#1DA1F2" },
                { icon: <MessageSquare size={16} />, label: "Discord", handle: "discord.gg/coinlineup", href: "https://discord.gg/coinlineup", color: "#5865F2" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-brand-orange"
                  style={{ borderColor: "var(--border)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}20`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.label}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>Response Time</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              We aim to respond to all enquiries within <strong>1–2 business days</strong>. For urgent news tips, please use the Twitter DM for the fastest response.
            </p>
          </div>

        </aside>
      </div>
    </div>
  );
}
