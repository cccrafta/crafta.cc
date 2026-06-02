"use client";

import CategoryCircle from "@/components/category-circle";
import { useSearch } from "@/components/search-context";

export default function SearchTrigger() {
  const { isOpen, toggle } = useSearch();

  return (
    <button
      onClick={toggle}
      className="search-trigger"
      aria-label={isOpen ? "Close search" : "Open search"}
    >
      <CategoryCircle
        text="search·"
        size={56}
        fontSize={8}
        spinDuration={15}
      >
        <span
          style={{
            fontFamily: "var(--font-nav)",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--color-fg)",
          }}
        >
          S
        </span>
      </CategoryCircle>
    </button>
  );
}
