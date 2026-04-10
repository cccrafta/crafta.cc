"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function JournalHeaderNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed && trimmed !== currentQuery) {
        router.push(`/journal/search?q=${encodeURIComponent(trimmed)}`);
      } else if (!trimmed && currentQuery) {
        router.push("/journal");
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleClear() {
    setQuery("");
    router.push("/journal");
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?..."
        className="type-search w-full outline-none text-center"
        style={{
          color: "var(--color-fg)",
          backgroundColor: "transparent",
          border: "none",
          padding: "var(--space-xs) 0",
        }}
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="type-nav-sm absolute right-0 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          Clear
        </button>
      )}
    </form>
  );
}
