import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-8xl font-bold text-teal-700 font-mono mb-4">404</div>
      <h1 className="text-2xl font-bold text-teal-100 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        Page Not Found
      </h1>
      <p className="text-teal-400 mb-8 max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try browsing our
        categories or searching for what you need.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-lg bg-teal-500 text-teal-900 font-semibold hover:bg-teal-400 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="px-6 py-2.5 rounded-lg bg-teal-800 text-teal-200 border border-teal-600/40 hover:bg-teal-700 transition-colors"
        >
          Search Articles
        </Link>
      </div>
    </div>
  )
}
