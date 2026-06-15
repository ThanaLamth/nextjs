interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-teal-800/60 ${className}`}
    />
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-xl bg-teal-800/40 border border-teal-700/20 overflow-hidden">
      <Skeleton className="w-full aspect-video" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
