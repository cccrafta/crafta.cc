import { searchJournal } from "@/lib/services";
import { getCategories } from "@/lib/api";
import SearchBar from "@/components/search-bar";
import PostGridCard from "@/components/post-grid-card";

export const metadata = {
  title: "Search — crafta.cc",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;

  // Get categories for the filter pills
  const categories = await getCategories();

  // Find category ID from slug
  const categoryId = cat
    ? categories.find((c) => c.slug === cat)?.id
    : undefined;

  const { posts } = await searchJournal(q, categoryId, 1, 20);

  const label = q
    ? `Results for "${q}"`
    : cat
      ? `${categories.find((c) => c.slug === cat)?.name ?? cat}`
      : "All posts";

  return (
    <div>
      <SearchBar categories={categories} />

      <p
        className="uppercase"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-fg-secondary)",
          letterSpacing: "0.2em",
          fontFamily: "var(--font-nav)",
          marginTop: "var(--space-xl)",
          marginBottom: "var(--space-lg)",
        }}
      >
        {label}{" "}
        <span style={{ color: "var(--color-accent)" }}>
          [{String(posts.length).padStart(2, "0")}]
        </span>
      </p>

      {posts.length === 0 ? (
        <p style={{ color: "var(--color-fg-secondary)", fontSize: "var(--text-sm)" }}>
          No posts found.
        </p>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-lg)",
          }}
        >
          {posts.map((post) => (
            <PostGridCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
