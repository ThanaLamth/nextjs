'use client'

import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
      inputRef.current?.blur()
    }
  }

  function handleClear() {
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className={`flex items-center gap-2 px-3 h-7 rounded-lg border transition-all duration-150 ${
        focused
          ? 'border-[var(--color-border-teal)] bg-[var(--color-bg-surface)]'
          : 'border-glass bg-white/[0.04] hover:bg-white/[0.06]'
      }`}>
        <Search size={13} className="text-[var(--color-text-muted)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search articles..."
          className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none min-w-0"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors shrink-0"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </form>
  )
}
