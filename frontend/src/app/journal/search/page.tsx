import { searchJournal } from "@/lib/services";
import { getCategories } from "@/lib/api";
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

  const categories = await getCategories();

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
      <p
        className="type-label"
        style={{
          color: "var(--color-fg-secondary)",
          marginBottom: "var(--space-lg)",
        }}
      >
        {label}{" "}
        <span style={{ color: "var(--color-accent)" }}>
          [{String(posts.length).padStart(2, "0")}]
        </span>
      </p>

      {posts.length === 0 ? (
        <p className="type-body-sm" style={{ color: "var(--color-fg-secondary)" }}>
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
