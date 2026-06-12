import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the TokenTopNews team. Open roles in editorial, research, engineering and marketing.",
};

const OPENINGS = [
  { title: "Senior Crypto Journalist", dept: "Editorial", location: "Remote", type: "Full-time" },
  { title: "On-Chain Data Analyst", dept: "Research", location: "Remote", type: "Full-time" },
  { title: "Frontend Engineer (Next.js)", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Newsletter Growth Manager", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "DeFi Protocol Reporter", dept: "Editorial", location: "Remote", type: "Contract" },
];

export default function CareersPage() {
  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s10) 0",
          position: "relative",
          overflow: "hidden",
          marginBottom: "var(--s10)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "var(--grad-brand)",
          }}
        />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              fontSize: 11,
              color: "var(--text-3)",
              justifyContent: "center",
            }}
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-brand)" }}>Careers</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">Work With Us</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We are a fully remote, crypto-native team. If you are passionate about the
            intersection of finance, technology, and media — we want to hear from you.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--s8)" }}>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: 8 }}>
                OPEN POSITIONS
              </div>
              <h2 className="t-h1">{OPENINGS.length} roles available</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {OPENINGS.map((job) => (
                <div
                  key={job.title}
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-xl)",
                    padding: "var(--s5) var(--s6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 15,
                        marginBottom: 4,
                      }}
                    >
                      {job.title}
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-3)" }}>
                      <span>{job.dept}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                      <span>·</span>
                      <span style={{ color: job.type === "Full-time" ? "var(--bull)" : "var(--text-brand)" }}>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                    Apply
                  </button>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--raised)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "var(--s6)",
                textAlign: "center",
                marginTop: "var(--s8)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 6,
                }}
              >
                Don not see a fit?
              </div>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 12 }}>
                We are always open to exceptional talent. Send us your CV and a note about
                what you would bring to the team.
              </p>
              <button className="btn btn-outline btn-sm">Send open application</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
