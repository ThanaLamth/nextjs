import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Code2, Globe, Mail } from 'lucide-react'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'
import { NAV_CATEGORIES } from '@/lib/categories'
import { HOME_FOOTER_STRIP } from '@/lib/demo-homepage'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

export function Footer() {
  const year = 2026

  return (
    <footer className="mt-16 border-t border-teal-800/30 bg-[#032B22]">
      <div className="border-b border-teal-800/30 bg-teal-950/70">
        <div className="max-w-7xl mx-auto grid gap-px bg-teal-800/20 px-4 sm:px-6 md:grid-cols-5">
          {HOME_FOOTER_STRIP.map((item) => (
            <div key={item.label} className="bg-[#032B22] px-4 py-5">
              <p className="text-sm font-semibold text-teal-100">{item.label}</p>
              <p className="mt-1 text-sm text-teal-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo/logo.png" alt={SITE_NAME} width={34} height={34} className="rounded-lg" />
              <div>
                <span className="block text-base font-bold text-teal-100" style={{ fontFamily: 'var(--font-display)' }}>
                  AI Crypto Hub
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-teal-500">
                  AI × Crypto intelligence
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-teal-400">
              {SITE_DESCRIPTION}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-teal-500">
              Built for operators, builders, researchers, and allocators who need structured AI × crypto signal, not a noisy feed.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: ExternalLink, href: '#', label: 'Twitter' },
                { icon: Code2, href: '#', label: 'GitHub' },
                { icon: Globe, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:hello@aicryptocore.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-lg p-2 text-teal-500 transition-colors hover:bg-teal-800/50 hover:text-teal-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="text-sm text-teal-400 transition-colors hover:text-teal-200">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'Search', href: '/search' },
                { label: 'Press Releases', href: '/press-release' },
                { label: 'Sponsored Articles', href: '/sponsored-articles' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-teal-400 transition-colors hover:text-teal-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">Briefs</h3>
            <p className="mt-4 text-sm leading-7 text-teal-400">
              Subscribe for daily, builder, and signal briefs focused on the AI × crypto stack.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-teal-800/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-teal-600">© {year} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-teal-600">
            <Link href="/about" className="transition-colors hover:text-teal-400">Privacy Policy</Link>
            <Link href="/about" className="transition-colors hover:text-teal-400">Terms of Service</Link>
            <Link href="/about" className="transition-colors hover:text-teal-400">Methodology</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
