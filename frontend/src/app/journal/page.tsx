import { getJournalFeed } from "@/lib/services";
import { getCategories } from "@/lib/api";
import PostCard from "@/components/post-card";
import SearchBar from "@/components/search-bar";

export const metadata = {
  title: "Journal — crafta.cc",
  description: "Read the latest journal entries.",
};

export default async function JournalPage() {
  const [{ posts }, categories] = await Promise.all([
    getJournalFeed(),
    getCategories(),
  ]);

  if (posts.length === 0) {
    return (
      <div
        className="py-16 text-center"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        <p>No journal entries yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
      <SearchBar categories={categories} />
      <div
        className="flex flex-col"
        style={{ gap: "var(--space-3xl)", marginTop: "var(--space-xl)" }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
