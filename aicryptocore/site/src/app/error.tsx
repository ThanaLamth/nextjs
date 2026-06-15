'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-teal-100 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        Something went wrong
      </h1>
      <p className="text-teal-400 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 rounded-lg bg-teal-500 text-teal-900 font-semibold hover:bg-teal-400 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
