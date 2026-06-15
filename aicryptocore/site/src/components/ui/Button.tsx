import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'amber'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  children: ReactNode
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-500 text-teal-900 hover:bg-teal-400 font-semibold',
  secondary: 'bg-teal-800 text-teal-200 border border-teal-600/40 hover:bg-teal-700',
  ghost: 'text-teal-300 hover:text-teal-100 hover:bg-teal-800/50',
  amber: 'bg-amber-400 text-amber-950 hover:bg-amber-300 font-bold shadow-[0_4px_16px_rgba(245,158,11,0.20)]',
}

const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2'

export function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
