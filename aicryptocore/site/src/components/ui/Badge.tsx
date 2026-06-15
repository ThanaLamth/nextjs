import type { ReactNode } from 'react'

type BadgeVariant = 'category' | 'sponsored' | 'new' | 'breaking' | 'premium'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  category: 'bg-[var(--color-badge-teal-bg)] text-[var(--color-badge-teal-text)] border-[var(--color-badge-teal-border)]',
  sponsored: 'bg-[var(--color-badge-amber-bg)] text-[var(--color-badge-amber-text)] border-[var(--color-badge-amber-border)]',
  new: 'bg-[var(--color-badge-teal-bg)] text-[var(--color-badge-teal-text)] border-[var(--color-badge-teal-border)]',
  breaking: 'bg-[var(--color-badge-red-bg)] text-[var(--color-badge-red-text)] border-[var(--color-badge-red-border)]',
  premium: 'bg-[var(--color-badge-violet-bg)] text-[var(--color-badge-violet-text)] border-[var(--color-badge-violet-border)]',
}

export function Badge({ variant = 'category', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
