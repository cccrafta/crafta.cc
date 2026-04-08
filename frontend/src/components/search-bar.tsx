"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default function SearchBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("cat") ?? "";
  const [query, setQuery] = useState(currentQuery);

  const isActive = currentQuery || currentCategory;

  function navigate(q: string, cat: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    const qs = params.toString();
    router.push(qs ? `/journal/search?${qs}` : "/journal");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(query, currentCategory);
  }

  function handleCategoryClick(slug: string) {
    if (slug === currentCategory) {
      // Deselect
      navigate(currentQuery, "");
    } else {
      navigate(currentQuery, slug);
    }
  }

  function handleClear() {
    setQuery("");
    router.push("/journal");
  }

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-md)" }}>
      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search journal..."
          className="w-full outline-none"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-fg)",
            backgroundColor: "transparent",
            borderBottom: "1px solid var(--color-border)",
            padding: "var(--space-sm) 0",
          }}
        />
        {isActive && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 uppercase transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-nav)",
              fontSize: "var(--text-xs)",
              color: "var(--color-fg-secondary)",
            }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Category pills */}
      <div className="flex flex-wrap" style={{ gap: "var(--space-sm)" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className="uppercase transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-nav)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.05em",
              padding: "var(--space-xs) var(--space-sm)",
              border: "1px solid",
              borderColor:
                currentCategory === cat.slug
                  ? "var(--color-fg)"
                  : "var(--color-border)",
              color:
                currentCategory === cat.slug
                  ? "var(--color-bg)"
                  : "var(--color-fg)",
              backgroundColor:
                currentCategory === cat.slug
                  ? "var(--color-fg)"
                  : "transparent",
            }}
          >
            {cat.name} [{String(cat.count).padStart(2, "0")}]
          </button>
        ))}
      </div>
    </div>
  );
}
