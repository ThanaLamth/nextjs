'use client'

import { useReadingProgress } from '@/hooks/useReadingProgress'

export function ReadingProgress() {
  const progress = useReadingProgress()

  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 bg-teal-500 transition-[width] duration-100 ease-linear"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
