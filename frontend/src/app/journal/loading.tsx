export default function JournalLoading() {
  return (
    <div>
      <div className="mb-8 h-8 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
          >
            <div className="aspect-video animate-pulse bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
              <div className="flex gap-2">
                <div className="h-3 w-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-3 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
