'use client'

import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

const MARKET_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', price: 98420, change: 2.34, mcap: '1.93T' },
  { symbol: 'ETH', name: 'Ethereum', price: 3841, change: -1.12, mcap: '461B' },
  { symbol: 'SOL', name: 'Solana', price: 184.5, change: 4.21, mcap: '84B' },
  { symbol: 'FET', name: 'Fetch.ai', price: 2.84, change: 8.93, mcap: '2.4B' },
  { symbol: 'RENDER', name: 'Render', price: 11.24, change: 5.67, mcap: '4.6B' },
  { symbol: 'TAO', name: 'Bittensor', price: 492, change: -2.45, mcap: '3.2B' },
]

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `$${price.toFixed(2)}`
}

export function MarketSummary() {
  return (
    <section className="bg-teal-800/50 border border-teal-700/30 rounded-2xl p-6 my-10">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={18} className="text-amber-400" />
        <h2 className="text-base font-semibold text-teal-200 uppercase tracking-wide">Market Overview</h2>
        <span className="ml-auto text-xs text-teal-500">Updated live</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MARKET_DATA.map((coin) => (
          <div
            key={coin.symbol}
            className="bg-teal-900/60 rounded-xl p-3 border border-teal-700/20 hover:border-teal-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-200">{coin.symbol}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {coin.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {Math.abs(coin.change).toFixed(2)}%
              </span>
            </div>
            <div className="text-sm font-semibold text-teal-100 font-mono">{formatPrice(coin.price)}</div>
            <div className="text-xs text-teal-500 mt-0.5">MCap: {coin.mcap}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
