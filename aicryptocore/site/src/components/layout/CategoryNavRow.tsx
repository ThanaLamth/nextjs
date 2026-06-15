import Link from 'next/link'
import { Newspaper, BarChart2, Cpu, Zap, Star, Globe } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'News',             href: '/news',             icon: Newspaper   },
  { label: 'Altcoin Insights', href: '/altcoin-insights', icon: BarChart2   },

  { label: 'Crypto AI Tools',  href: '/crypto-ai-tools',  icon: Cpu         },
  { label: 'Mining',           href: '/mining',           icon: Zap         },
  { label: 'Top Projects',     href: '/top-projects',     icon: Star        },
  { label: 'Press Release',    href: '/press-release',    icon: Globe       },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CategoryNavRow(_props?: unknown) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:border-[var(--color-border-teal)] hover:bg-[var(--color-border-teal)] transition-all duration-200 whitespace-nowrap shrink-0"
        >
          <Icon size={13} className="text-[var(--color-text-teal)] group-hover:text-[var(--color-text-primary)] transition-colors" />
          <span className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
