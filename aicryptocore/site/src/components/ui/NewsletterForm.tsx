'use client'

interface NewsletterFormProps {
  compact?: boolean
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  if (compact) {
    return (
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg bg-teal-900/60 border border-teal-700/40 text-teal-100 placeholder-teal-600 text-xs outline-none focus:border-teal-500 transition-colors"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-amber-400 text-amber-950 text-xs font-bold hover:bg-amber-300 transition-colors"
        >
          Subscribe Free
        </button>
      </form>
    )
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        className="px-3 py-2 rounded-lg bg-teal-800 border border-teal-700/40 text-teal-100 placeholder-teal-500 text-sm outline-none focus:border-teal-500 transition-colors"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-amber-400 text-amber-950 text-sm font-semibold hover:bg-amber-300 transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
