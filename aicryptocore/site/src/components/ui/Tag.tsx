import Link from 'next/link'

interface TagProps {
  label: string
  href?: string
  className?: string
}

export function Tag({ label, href, className = '' }: TagProps) {
  const classes = `inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/20 hover:bg-amber-900/50 transition-colors duration-150 ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        #{label}
      </Link>
    )
  }

  return <span className={classes}>#{label}</span>
}
