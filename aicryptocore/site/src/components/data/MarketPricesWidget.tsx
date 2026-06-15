'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CoinRow {
  symbol: string
  name: string
  price: string
  change: string
  up: boolean
}

const COIN_META = [
  { id: 'bitcoin',      symbol: 'BTC',    name: 'Bitcoin'   },
  { id: 'ethereum',     symbol: 'ETH',    name: 'Ethereum'  },
  { id: 'solana',       symbol: 'SOL',    name: 'Solana'    },
  { id: 'fetch-ai',     symbol: 'FET',    name: 'Fetch.ai'  },
  { id: 'bittensor',    symbol: 'TAO',    name: 'Bittensor' },
  { id: 'render-token', symbol: 'RENDER', name: 'Render'    },
]

const FALLBACK: CoinRow[] = [
  { symbol: 'BTC',    name: 'Bitcoin',   price: '$98,420', change: '+2.34%', up: true  },
  { symbol: 'ETH',    name: 'Ethereum',  price: '$3,841',  change: '-1.12%', up: false },
  { symbol: 'SOL',    name: 'Solana',    price: '$184.50', change: '+4.21%', up: true  },
  { symbol: 'FET',    name: 'Fetch.ai',  price: '$2.84',   change: '+8.93%', up: true  },
  { symbol: 'TAO',    name: 'Bittensor', price: '$492',    change: '-2.45%', up: false },
  { symbol: 'RENDER', name: 'Render',    price: '$11.24',  change: '+5.67%', up: true  },
]

function fmt(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1)    return `$${price.toFixed(2)}`
  return `$${price.toFixed(3)}`
}

export function MarketPricesWidget() {
  const [rows, setRows] = useState<CoinRow[]>(FALLBACK)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const ids = COIN_META.map((c) => c.id).join(',')
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
          { cache: 'no-store' }
        )
        if (!res.ok) return
        const data: Record<string, { usd: number; usd_24h_change: number }> = await res.json()

        const mapped: CoinRow[] = COIN_META.map((meta) => {
          const entry = data[meta.id]
          const change = entry?.usd_24h_change ?? 0
          return {
            symbol: meta.symbol,
            name:   meta.name,
            price:  fmt(entry?.usd ?? 0),
            change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
            up:     change >= 0,
          }
        }).filter((r) => r.price !== '$0.000')

        if (!cancelled && mapped.length > 0) setRows(mapped)
      } catch {
        // stay on fallback silently
      }
    }

    load()
    const interval = setInterval(load, 60_000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  return (
    <ul className="divide-y divide-white/[0.04]">
      {rows.map((coin) => (
        <li key={coin.symbol} className="grid grid-cols-[1fr_auto_65px] items-center gap-3 py-2.5">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{coin.name}</span>
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase">{coin.symbol}</span>
          </div>
          <div className="text-xs font-mono text-[var(--color-text-primary)] text-right">
            {coin.price}
          </div>
          <div
            className="flex items-center gap-1 text-xs font-medium justify-end"
            style={{ color: coin.up ? 'var(--color-price-up)' : 'var(--color-price-down)' }}
          >
            {coin.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {coin.change}
          </div>
        </li>
      ))}
    </ul>
  )
}
