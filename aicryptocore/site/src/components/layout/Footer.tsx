import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Code2, Globe, Mail } from 'lucide-react'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { getNavigationCategories } from '@/lib/categories.server'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

export async function Footer() {
  const year = 2026
  const categories = await getNavigationCategories()

  return (
    <footer className="border-t border-white/[0.06] mt-16" style={{ background: 'rgba(10,10,15,0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="lg:max-w-[280px]">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo/logo.png" alt={SITE_NAME} width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-[var(--color-text-primary)] text-base" style={{ fontFamily: 'var(--font-display)' }}>
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{SITE_DESCRIPTION}</p>
            <div className="flex items-center gap-3">
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
                  className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-teal)] hover:bg-white/[0.05] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:min-w-[140px]">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wide">Explore</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:min-w-[140px]">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Sponsored Articles', href: '/sponsored-articles' },
                { label: 'Press Release', href: '/press-release' },
                { label: 'Search', href: '/search' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-[340px] w-full bg-white/[0.02] border border-[var(--color-border-default)] p-6 rounded-2xl relative overflow-hidden group hover:border-[var(--color-border-teal)] transition-colors">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-border-teal)] to-transparent opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-teal)] animate-pulse" />
                Stay Updated
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">Get the latest AI × Crypto insights delivered weekly. Join our growing community.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <Link href="/about" className="hover:text-[var(--color-text-secondary)] transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[var(--color-text-secondary)] transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-[var(--color-text-secondary)] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
