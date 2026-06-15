'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative p-2 rounded-lg text-teal-300 hover:text-teal-100 hover:bg-teal-800/50 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
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
      <span className="opacity-0">
        <Moon size={18} />
      </span>
    </button>
  )
}
