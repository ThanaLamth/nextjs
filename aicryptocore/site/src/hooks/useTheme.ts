'use client'

import { useThemeStore } from '@/stores/theme'
import { useEffect } from 'react'

export function useTheme() {
  const { theme, toggle } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  return { theme, toggle }
}
