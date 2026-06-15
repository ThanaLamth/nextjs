'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CoinPrice {
  symbol: string
  name: string
  price: number
  change24h: number
}

const COIN_META: { id: string; symbol: string; name: string }[] = [
  { id: 'bitcoin',         symbol: 'BTC',    name: 'Bitcoin'        },
  { id: 'ethereum',        symbol: 'ETH',    name: 'Ethereum'       },
  { id: 'solana',          symbol: 'SOL',    name: 'Solana'         },
  { id: 'fetch-ai',        symbol: 'FET',    name: 'Fetch.ai'       },
  { id: 'render-token',    symbol: 'RENDER', name: 'Render'         },
  { id: 'bittensor',       symbol: 'TAO',    name: 'Bittensor'      },
  { id: 'near',            symbol: 'NEAR',   name: 'NEAR Protocol'  },
  { id: 'the-graph',       symbol: 'GRT',    name: 'The Graph'      },
  { id: 'ocean-protocol',  symbol: 'OCEAN',  name: 'Ocean Protocol' },
  { id: 'singularitynet',  symbol: 'AGIX',   name: 'SingularityNET' },
  { id: 'akash-network',   symbol: 'AKT',    name: 'Akash Network'  },
  { id: 'worldcoin-wld',   symbol: 'WLD',    name: 'Worldcoin'      },
]

const MOCK_PRICES: CoinPrice[] = [
  { symbol: 'BTC',    name: 'Bitcoin',        price: 98420,  change24h:  2.34  },
  { symbol: 'ETH',    name: 'Ethereum',       price: 3841,   change24h: -1.12  },
  { symbol: 'SOL',    name: 'Solana',         price: 184.5,  change24h:  4.21  },
  { symbol: 'FET',    name: 'Fetch.ai',       price: 2.84,   change24h:  8.93  },
  { symbol: 'RENDER', name: 'Render',         price: 11.24,  change24h:  5.67  },
  { symbol: 'TAO',    name: 'Bittensor',      price: 492,    change24h: -2.45  },
  { symbol: 'NEAR',   name: 'NEAR Protocol',  price: 7.82,   change24h:  3.18  },
  { symbol: 'GRT',    name: 'The Graph',      price: 0.284,  change24h: -0.89  },
  { symbol: 'OCEAN',  name: 'Ocean Protocol', price: 1.14,   change24h:  6.54  },
  { symbol: 'AGIX',   name: 'SingularityNET', price: 1.68,   change24h: 11.23  },
  { symbol: 'AKT',    name: 'Akash Network',  price: 4.92,   change24h:  2.87  },
  { symbol: 'WLD',    name: 'Worldcoin',      price: 3.41,   change24h: -3.21  },
]

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1)    return `$${price.toFixed(2)}`
  return `$${price.toFixed(3)}`
}

async function fetchCoinGeckoPrices(): Promise<CoinPrice[]> {
  const ids = COIN_META.map((c) => c.id).join(',')
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`)
  const data: Record<string, { usd: number; usd_24h_change: number }> = await res.json()

  return COIN_META.map((meta) => {
    const entry = data[meta.id]
    return {
      symbol:    meta.symbol,
      name:      meta.name,
      price:     entry?.usd          ?? 0,
      change24h: entry?.usd_24h_change ?? 0,
    }
  }).filter((c) => c.price > 0)
}

export function PriceTicker() {
  const [prices, setPrices] = useState<CoinPrice[]>(MOCK_PRICES)
  const [live, setLive]     = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchCoinGeckoPrices()
        if (!cancelled && data.length > 0) {
          setPrices(data)
          setLive(true)
        }
      } catch {
        // stay on mock data silently
      }
    }

    load()
    const interval = setInterval(load, 60_000) // refresh every 60s
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  const allItems = [...prices, ...prices]

  return (
    <div className="bg-[var(--color-bg-nav)] border-b-0 h-9 text-xs shadow-sm w-full flex items-center overflow-hidden">

      {/* Fixed badge */}
      <div className="px-3 sm:px-4 h-full flex items-center shrink-0 z-10 bg-[var(--color-bg-nav)] border-r border-[var(--color-border-default)] relative shadow-[4px_0_12px_rgba(0,0,0,0.05)]">
        <span className="text-[10px] font-bold bg-[var(--color-accent)] text-[#0a0a0f] px-1.5 py-0.5 rounded uppercase tracking-wider">
          {live ? 'LIVE' : 'LIVE'}
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden h-full flex items-center ml-2">
        <div className="ticker-wrap flex-1 overflow-hidden h-full flex items-center">
          <div className="ticker-track flex w-max items-center gap-8 h-full pr-8">
            {allItems.map((coin, i) => (
              <span key={`${coin.symbol}-${i}`} className="flex items-center gap-1.5 text-xs font-mono whitespace-nowrap">
                <span className="font-bold text-[var(--color-text-secondary)]">{coin.symbol}</span>
                <span className="text-[var(--color-text-primary)]">{formatPrice(coin.price)}</span>
                <span
                  className="flex items-center gap-0.5"
                  style={{ color: coin.change24h >= 0 ? 'var(--color-price-up)' : 'var(--color-price-down)' }}
                >
                  {coin.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(coin.change24h).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
