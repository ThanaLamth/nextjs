'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { NAV_CATEGORIES } from '@/lib/categories'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-16 flex items-center border-b transition-all duration-200 ${
          scrolled
            ? 'bg-[#032B22]/92 backdrop-blur-md border-teal-800/40'
            : 'bg-[#032B22] border-teal-800/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo/logo.png"
              alt="AiCryptoCore"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-teal-100 text-lg block" style={{ fontFamily: 'var(--font-display)' }}>
                AI Crypto
              </span>
              <span className="text-[10px] tracking-[0.22em] text-teal-500 uppercase">
                AI × Crypto Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center flex-wrap">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                aria-current={pathname.startsWith(`/${cat.slug}`) ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname.startsWith(`/${cat.slug}`)
                    ? 'text-teal-300 bg-teal-800/50'
                    : 'text-teal-300 hover:text-teal-100 hover:bg-teal-800/40'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <SearchBar />
            <Link
              href="/about"
              className="hidden sm:inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-300"
            >
              Sign in
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-lg text-teal-300 hover:text-teal-100 hover:bg-teal-800/50 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <nav
          className={`absolute left-0 top-16 bottom-0 w-80 bg-[#032B22] border-r border-teal-800/40 overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="mb-4">
                <Link
                  href={`/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-teal-200 hover:text-teal-100 border-b border-teal-800/40 mb-2"
                >
                  {cat.label}
                </Link>
              </div>
            ))}
            <div className="pt-4 border-t border-teal-800/40 space-y-2">
              <Link href="/search" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-teal-400 hover:text-teal-200">Search</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-teal-400 hover:text-teal-200">About</Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950"
              >
                Sign in
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
