'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-default)] transition-all duration-150 focus-ring"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      >
        <Moon size={18} />
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
      >
        <Sun size={18} />
      </span>
      <span className="opacity-0 pointer-events-none"><Moon size={18} /></span>
    </button>
  )
}
