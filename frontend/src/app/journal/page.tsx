import { getJournalFeed } from "@/lib/services";
import { getCategories, getTags } from "@/lib/api";
import PostCard from "@/components/post-card";
import JournalSidebar from "@/components/journal-sidebar";

export const metadata = {
  title: "Journal — crafta.cc",
  description: "Read the latest journal entries.",
};

export default async function JournalPage() {
  const [{ posts }, categories, tags] = await Promise.all([
    getJournalFeed(),
    getCategories(),
    getTags(),
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

  const featuredPost = posts[0];

  return (
    <div className="flex justify-center" style={{ gap: "var(--space-3xl)" }}>
      {/* Feed Label */}
      <div className="hidden lg:block self-start sticky" style={{ top: "var(--sticky-top)" }}>
        <h3
          className="type-section"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          Feed
        </h3>
      </div>

      {/* Feed */}
      <div className="w-full" style={{ maxWidth: "550px" }}>
        <div className="flex flex-col" style={{ gap: "var(--space-3xl)" }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <JournalSidebar
        featuredPost={featuredPost}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
