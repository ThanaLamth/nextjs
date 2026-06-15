import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME} — ${SITE_DESCRIPTION}`,
}

const TEAM = [
  { name: 'Alex Chen', role: 'Founder & Chief Analyst', bio: 'Former quantitative researcher at two top-10 crypto funds. 8 years covering the intersection of AI and financial markets.' },
  { name: 'Sarah Kim', role: 'Head of Research', bio: 'DeFi researcher and blockchain infrastructure expert with a background in distributed systems engineering.' },
  { name: 'Marcus Webb', role: 'Trading Systems Editor', bio: 'Quantitative analyst and AI trading systems specialist. Previously at a systematic macro fund.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="text-4xl font-bold text-teal-50 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          About {SITE_NAME}
        </h1>
        <p className="text-xl text-teal-300 leading-relaxed max-w-2xl mx-auto">
          Premium news and analysis at the intersection of Artificial Intelligence and Web3/Crypto.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <div className="bg-teal-800/40 border border-teal-700/30 rounded-2xl p-8">
          <h2
            className="text-2xl font-bold text-teal-100 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our Mission
          </h2>
          <p className="text-teal-300 leading-relaxed mb-4 text-lg">
            {SITE_NAME} exists to bridge the knowledge gap between two of the most transformative
            technologies of our era: Artificial Intelligence and decentralized finance.
          </p>
          <p className="text-teal-400 leading-relaxed">
            We provide rigorous analysis, breaking news, and deep-dive research for everyone from
            crypto newcomers to DeFi power users and AI developers building the next generation of
            autonomous financial systems.
          </p>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold text-teal-100 mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          What We Cover
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { area: 'AI Agents', desc: 'Autonomous agents operating on-chain, DeFi bots, and the emerging agent economy.' },
            { area: 'AI Infrastructure', desc: 'Decentralized compute, AI model deployment, and safety frameworks for crypto-AI.' },
            { area: 'AI Trading', desc: 'Trading bots, AI signals, prediction models, and smart execution systems.' },
            { area: 'AI Data', desc: 'On-chain analytics, data indexing protocols, and AI-augmented oracle networks.' },
            { area: 'AI Ecosystem', desc: 'Layer 1 blockchains built for AI, DeFi protocols integrating AI, and data infrastructure.' },
          ].map((item) => (
            <div key={item.area} className="bg-teal-800/30 border border-teal-700/20 rounded-xl p-4">
              <h3 className="font-semibold text-teal-200 mb-1">{item.area}</h3>
              <p className="text-sm text-teal-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold text-teal-100 mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Editorial Team
        </h2>
        <div className="space-y-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-teal-800/40 border border-teal-700/30 rounded-xl p-6 flex gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-teal-700 flex items-center justify-center text-teal-200 font-bold text-xl shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-teal-100 text-lg mb-0.5">{member.name}</div>
                <div className="text-sm text-amber-400 mb-2">{member.role}</div>
                <div className="text-sm text-teal-400 leading-relaxed">{member.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-teal-800/40 border border-teal-700/30 rounded-2xl p-8 text-center">
        <h2
          className="text-xl font-bold text-teal-100 mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Get in Touch
        </h2>
        <p className="text-teal-400 mb-4">
          Press inquiries, editorial collaborations, and sponsored content:
        </p>
        <a
          href="mailto:hello@aicryptocore.com"
          className="inline-flex items-center px-6 py-2.5 rounded-lg bg-amber-400 text-amber-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          hello@aicryptocore.com
        </a>
      </section>
    </div>
  )
}
