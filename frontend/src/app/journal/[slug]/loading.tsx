export default function PostLoading() {
  return (
    <div>
      <div className="mb-8 aspect-video animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-9 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-3 flex gap-3">
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-40 animate-pulse self-center rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-8 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"
            style={{ width: `${85 + Math.random() * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
