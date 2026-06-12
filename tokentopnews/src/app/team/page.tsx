import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the journalists, analysts and developers behind TokenTopNews.",
};

const TEAM = [
  {
    name: "Alex Morgan",
    role: "Editor-in-Chief",
    bio: "10+ years in financial journalism. Former Bloomberg crypto desk.",
    initials: "AM",
    color: "#9B3DFF",
  },
  {
    name: "Sarah Chen",
    role: "Lead Analyst",
    bio: "On-chain data specialist. Previously at Chainalysis.",
    initials: "SC",
    color: "#627EEA",
  },
  {
    name: "James Okafor",
    role: "Markets Reporter",
    bio: "DeFi and derivatives expert. Covers Asia-Pacific markets.",
    initials: "JO",
    color: "#F7931A",
  },
  {
    name: "Priya Nair",
    role: "Research Director",
    bio: "PhD in Economics. Macro and institutional crypto strategy.",
    initials: "PN",
    color: "#00E5A0",
  },
  {
    name: "Mike Torres",
    role: "Tech Reporter",
    bio: "Layer 1/2 infrastructure and protocol upgrades specialist.",
    initials: "MT",
    color: "#0089CC",
  },
  {
    name: "Lena Kovacs",
    role: "Newsletter Editor",
    bio: "Author of the Daily Briefing. 40K+ subscriber following.",
    initials: "LK",
    color: "#F3BA2F",
  },
];

export default function TeamPage() {
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
            <span style={{ color: "var(--text-brand)" }}>Our Team</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">Meet the Team</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Journalists, analysts, and developers who live and breathe crypto — every
            single day.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)" }}>
            {TEAM.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-xl)",
                  padding: "var(--s6)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "var(--s4)",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: member.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#fff",
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-brand)",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {member.role}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
