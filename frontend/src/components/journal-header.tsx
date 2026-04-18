"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";

type Category = { id: number; name: string; slug: string };
type Tag = { id: number; name: string; slug: string; count: number };


export default function JournalHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync state from URL params on mount / URL change
  const urlQ = searchParams.get("q") ?? "";
  const urlCat = searchParams.get("cat") ?? "";
  const urlTag = searchParams.get("tag") ?? "";
  const hasUrlFilters = !!(urlQ || urlCat || urlTag);

  const [lookupOpen, setLookupOpen] = useState(hasUrlFilters);
  const [search, setSearch] = useState(urlQ);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [keywordOpen, setKeywordOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagSearch, setTagSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const tagSearchRef = useRef<HTMLInputElement>(null);

  // Open lookup if URL has active filters
  useEffect(() => {
    if (hasUrlFilters) setLookupOpen(true);
  }, [hasUrlFilters]);

  // Fetch categories + tags, then resolve URL slugs to objects
  useEffect(() => {
    if (!lookupOpen || dataFetched) return;
    Promise.all([
      fetch("/api/categories").then(r => r.json()),
      fetch("/api/tags").then(r => r.json()),
    ]).then(([cats, tgs]) => {
      const filteredCats: Category[] = Array.isArray(cats)
        ? cats.filter((c: Category) => c.slug !== "uncategorized")
        : [];
      const filteredTags: Tag[] = Array.isArray(tgs) ? tgs : [];

      setCategories(filteredCats);
      setTags(filteredTags);

      // Resolve URL slugs to objects
      if (urlCat) {
        const slugs = urlCat.split(",").filter(Boolean);
        const matched = filteredCats.filter(c => slugs.includes(c.slug));
        if (matched.length > 0) setSelectedCategories(matched);
      }
      if (urlTag) {
        const slugs = urlTag.split(",").filter(Boolean);
        const matched = filteredTags.filter(t => slugs.includes(t.slug));
        if (matched.length > 0) setSelectedTags(matched);
      }

      setDataFetched(true);
    }).catch(() => {});
  }, [lookupOpen, dataFetched, urlCat, urlTag]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (lookupOpen) setTimeout(() => searchInputRef.current?.focus(), 80);
    else { setCategoryOpen(false); setKeywordOpen(false); }
  }, [lookupOpen]);

  useEffect(() => {
    if (keywordOpen) setTimeout(() => tagSearchRef.current?.focus(), 50);
  }, [keywordOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (categoryOpen || keywordOpen) { setCategoryOpen(false); setKeywordOpen(false); }
      else setLookupOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [categoryOpen, keywordOpen]);

  const navigate = useCallback((overrides?: { q?: string; cats?: Category[]; tags?: Tag[] }) => {
    const params = new URLSearchParams();
    const q = overrides?.q !== undefined ? overrides.q : search;
    const cats = overrides?.cats !== undefined ? overrides.cats : selectedCategories;
    const tgs = overrides?.tags !== undefined ? overrides.tags : selectedTags;
    if (q) params.set("q", q);
    const catStr = cats.map(c => c.slug).join(",");
    const tagStr = tgs.map(t => t.slug).join(",");
    if (catStr) params.set("cat", catStr);
    if (tagStr) params.set("tag", tagStr);
    const qs = params.toString();
    router.push(qs ? `/journal/search?${qs}` : "/journal");
  }, [search, selectedCategories, selectedTags, router]);

  const clear = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedTags([]);
    setTagSearch("");
    setLookupOpen(false);
    router.push("/journal");
  };

  const removeCategoryChip = (slug: string) => {
    const next = selectedCategories.filter(c => c.slug !== slug);
    setSelectedCategories(next);
    navigate({ cats: next });
  };

  const removeTagChip = (slug: string) => {
    const next = selectedTags.filter(t => t.slug !== slug);
    setSelectedTags(next);
    navigate({ tags: next });
  };

  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate(); };

  // Backspace on empty input removes last chip: tags first, then categories
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace" || search !== "") return;
    if (selectedTags.length > 0) {
      const next = selectedTags.slice(0, -1);
      setSelectedTags(next);
      navigate({ tags: next });
    } else if (selectedCategories.length > 0) {
      const next = selectedCategories.slice(0, -1);
      setSelectedCategories(next);
      navigate({ cats: next });
    }
  };

  const handleCategorySelect = (cat: Category) => {
    const isSelected = selectedCategories.some(c => c.id === cat.id);
    const next = isSelected
      ? selectedCategories.filter(c => c.id !== cat.id)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    setCategoryOpen(false);
    navigate({ cats: next });
  };

  const handleTagSelect = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    const next = isSelected
      ? selectedTags.filter(t => t.id !== tag.id)
      : [...selectedTags, tag];
    setSelectedTags(next);
    setKeywordOpen(false);
    setTagSearch("");
    navigate({ tags: next });
  };

  const filteredTags = tags.filter(t =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const dropdownBase: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    backgroundColor: "var(--color-bg)",
    zIndex: 101,
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    padding: "var(--space-xs) var(--space-md)",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    color: active ? "var(--color-accent)" : "var(--color-fg)",
  });

  const hasFilters = !!(selectedCategories.length || selectedTags.length || search);

  const filterRow = lookupOpen ? (
    <>
      {/* Combobox: chips + search input */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-xs)",
          flexWrap: "wrap",
        }}
      >
        {/* Category chips */}
        {selectedCategories.map(cat => (
          <span key={cat.id} className="tag-chip" style={{ flexShrink: 0, gap: 4, paddingRight: 4 }}>
            {cat.name}
            <button
              type="button"
              onClick={() => removeCategoryChip(cat.slug)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", fontSize: "0.8rem", lineHeight: 1, color: "inherit", display: "flex", alignItems: "center" }}
            >×</button>
          </span>
        ))}

        {/* Tag chips */}
        {selectedTags.map(tag => (
          <span key={tag.id} className="tag-chip" style={{ flexShrink: 0, gap: 4, paddingRight: 4 }}>
            {tag.name}
            <button
              type="button"
              onClick={() => removeTagChip(tag.slug)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", fontSize: "0.8rem", lineHeight: 1, color: "inherit", display: "flex", alignItems: "center" }}
            >×</button>
          </span>
        ))}

        {/* Text input */}
        <input
          ref={searchInputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={hasFilters ? "" : "Search..."}
          className="type-search"
          style={{
            flex: 1,
            minWidth: 80,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--color-fg)",
          }}
        />
      </form>

      {/* Category dropdown */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => { setCategoryOpen(o => !o); setKeywordOpen(false); }}
          className="type-nav-sm transition-opacity hover:opacity-60"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: selectedCategories.length > 0 ? "var(--color-accent)" : "var(--color-fg)" }}
        >
          Category +
        </button>
        {categoryOpen && (
          <div style={{ ...dropdownBase, minWidth: 180 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => handleCategorySelect(cat)} style={itemStyle(selectedCategories.some(c => c.id === cat.id))}>
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Keyword dropdown */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => { setKeywordOpen(o => !o); setCategoryOpen(false); }}
          className="type-nav-sm transition-opacity hover:opacity-60"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: selectedTags.length > 0 ? "var(--color-accent)" : "var(--color-fg)" }}
        >
          Keyword +
        </button>
        {keywordOpen && (
          <div style={{ ...dropdownBase, width: 300 }}>
            <div style={{ padding: "var(--space-xs) var(--space-sm)" }}>
              <input
                ref={tagSearchRef}
                value={tagSearch}
                onChange={e => setTagSearch(e.target.value)}
                placeholder="Filter keywords..."
                style={{
                  width: "100%", background: "transparent", border: "none",
                  outline: "none",
                  paddingBottom: "var(--space-xs)", fontFamily: "var(--font-body)",
                  fontSize: "0.875rem", color: "var(--color-fg)",
                }}
              />
            </div>
            <div style={{ maxHeight: 260, overflowY: "auto", display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", padding: "var(--space-xs) var(--space-sm) var(--space-sm)" }}>
              {filteredTags.length === 0
                ? <span className="type-meta" style={{ color: "var(--color-fg-secondary)" }}>No keywords found</span>
                : filteredTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagSelect(tag)}
                    className="tag-chip"
                    style={{
                      cursor: "pointer", background: "none", border: "none",
                      ...(selectedTags.some(t => t.id === tag.id) ? { backgroundColor: "var(--color-fg)", color: "var(--color-bg)" } : {}),
                    }}
                  >
                    {tag.name}
                  </button>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </>
  ) : undefined;

  return (
    <Header
      actions={
        <button
          onClick={lookupOpen ? clear : () => setLookupOpen(true)}
          className="type-nav-sm transition-opacity hover:opacity-60"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: lookupOpen ? "var(--color-accent)" : "var(--color-fg)" }}
        >
          {lookupOpen ? "CLEAR" : "LOOKUP"}
        </button>
      }
    >
      {filterRow}
    </Header>
  );
}
