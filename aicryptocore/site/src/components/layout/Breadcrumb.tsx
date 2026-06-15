import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-teal-400 flex-wrap">
      <Link href="/" className="hover:text-teal-200 transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-teal-600 shrink-0" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-teal-200 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? 'text-teal-200' : ''}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
