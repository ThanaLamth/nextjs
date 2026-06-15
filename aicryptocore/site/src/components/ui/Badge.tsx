import type { ReactNode } from 'react'

type BadgeVariant = 'category' | 'sponsored' | 'new' | 'breaking' | 'premium'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  category: 'bg-teal-700/50 text-teal-200 border border-teal-600/30',
  sponsored: 'bg-amber-900/50 text-amber-300 border border-amber-700/30',
  new: 'bg-teal-500/20 text-teal-300 border border-teal-500/40',
  breaking: 'bg-red-900/50 text-red-300 border border-red-700/30',
  premium: 'bg-purple-900/50 text-purple-300 border border-purple-700/30',
}

export function Badge({ variant = 'category', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
