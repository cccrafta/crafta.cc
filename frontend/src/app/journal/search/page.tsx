import { searchJournal } from "@/lib/services";
import { getCategories, getTagBySlug } from "@/lib/api";
import PostGridCard from "@/components/post-grid-card";
import { ConnectionError } from "@/lib/http-client";

export const metadata = {
  title: "Search — crafta.cc",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; tag?: string }>;
}) {
  const { q, cat, tag } = await searchParams;

  try {
    const catSlugs = cat ? cat.split(",").filter(Boolean) : [];
    const tagSlugs = tag ? tag.split(",").filter(Boolean) : [];

    const [categories, tagDataArray] = await Promise.all([
      getCategories(),
      tagSlugs.length > 0
        ? Promise.all(tagSlugs.map((s) => getTagBySlug(s)))
        : Promise.resolve([]),
    ]);

    const categoryIds = catSlugs.length > 0
      ? categories
          .filter((c) => catSlugs.includes(c.slug))
          .map((c) => c.id)
      : undefined;

    const tagIds = tagDataArray.length > 0
      ? tagDataArray.filter(Boolean).map((t) => t!.id)
      : undefined;

    const { posts } = await searchJournal(q, categoryIds, tagIds, 1, 20);

    return (
      <div>
        {posts.length === 0 ? (
          <p className="type-body-sm" style={{ color: "var(--color-fg-secondary)" }}>
            No posts found.
          </p>
        ) : (
          <div className="journal-grid">
            {posts.map((post) => (
              <PostGridCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    const message =
      error instanceof ConnectionError
        ? "Unable to connect to the content server."
        : "Something went wrong loading search results.";

    return (
      <div
        className="py-16 text-center"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        <p className="type-title-sm">{message}</p>
        <p className="type-body-sm" style={{ marginTop: "var(--space-sm)" }}>
          Please try again later.
        </p>
      </div>
    );
  }
}
