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
          className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-xs outline-none focus:border-[var(--color-border-teal)] focus:ring-1 focus:ring-[var(--color-border-teal)] transition-all shadow-inner"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg btn-gradient text-xs font-bold transition-transform hover:scale-[1.02] shadow-sm"
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
        className="px-3 py-2 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-sm outline-none focus:border-[var(--color-border-teal)] focus:ring-1 focus:ring-[var(--color-border-teal)] transition-all shadow-inner"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg btn-gradient text-sm font-semibold transition-transform hover:scale-[1.02] shadow-sm"
      >
        Subscribe
      </button>
    </form>
  )
}
