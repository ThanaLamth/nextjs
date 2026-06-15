'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface NavItem {
  label: string
  href: string
}

export function HeaderClient({ navItems }: { navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header
        className={`relative z-40 flex flex-col transition-all duration-200 bg-[var(--color-bg-nav)] backdrop-blur-md border-b border-black/10 dark:border-white/[0.05] ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/logo/logo.png" alt="AiCryptoCore" width={36} height={36} className="rounded-lg" />
            <span
              className="font-bold text-[var(--color-text-primary)] text-xl hidden sm:block tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AiCryptoCore
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-end max-w-sm ml-auto">
            <SearchBar />
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-6">
            <ThemeToggle />
            <span className="w-px h-4 bg-white/[0.08] dark:bg-white/[0.1] bg-black/10" />

            <Link
              href="/profile"
              aria-label="Profile"
              className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
            >
              <span className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/[0.05] flex items-center justify-center group-hover:border-[var(--color-border-teal)] transition-colors">
                <User size={14} />
              </span>
              <span className="font-medium">Profile</span>
            </Link>

            <span className="w-px h-4 bg-white/[0.08] dark:bg-white/[0.1] bg-black/10" />

            <Link
              href="/subscribe"
              className="flex items-center justify-center transition-all duration-150 hover:scale-105 shadow-sm btn-gradient"
              style={{ padding: '6px 16px', borderRadius: '9999px', fontSize: '14px' }}
            >
              Subscribe
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden shrink-0 ml-auto">
            <ThemeToggle />
            <Link
              href="/profile"
              aria-label="Profile"
              className="w-8 h-8 rounded-full bg-white/[0.05] border border-black/10 dark:border-white/[0.05] flex items-center justify-center"
            >
              <User size={14} className="text-[var(--color-text-secondary)]" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05] transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="hidden lg:block w-full border-t border-black/10 dark:border-white/[0.05] bg-[var(--color-bg-nav)]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav ref={navRef} className="flex flex-wrap items-center justify-center gap-2 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    isActive(item.href)
                      ? 'text-[var(--color-text-teal)] bg-[var(--color-border-teal)]/20 shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav
          className={`absolute left-0 top-16 bottom-0 w-[280px] bg-surface border-r border-black/10 dark:border-white/[0.05] overflow-y-auto transition-transform duration-300 flex flex-col ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 flex-1">
            <div className="mb-6">
              <SearchBar />
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--color-text-teal)] bg-[var(--color-border-teal)]/10'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-black/10 dark:border-white/[0.05]">
            <Link
              href="/subscribe"
              className="flex items-center justify-center w-full transition-all shadow-md btn-gradient"
              style={{ padding: '12px', borderRadius: '12px', fontSize: '16px' }}
            >
              Subscribe Now
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
