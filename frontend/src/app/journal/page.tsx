import { getJournalFeed } from "@/lib/services";
import JournalFeed from "@/components/journal-feed";

export const metadata = {
  title: "Journal — crafta.cc",
  description: "Read the latest journal entries.",
};

export default async function JournalPage() {
  const { posts, totalPages } = await getJournalFeed();

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

  return <JournalFeed posts={posts} totalPages={totalPages} />;
}
