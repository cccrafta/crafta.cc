import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/lib/types/wordpress";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default function JournalSidebar({
  featuredPost,
  categories,
  tags,
}: {
  featuredPost: PostCard;
  categories: Category[];
  tags: Tag[];
}) {
  return (
    <aside
      className="hidden lg:block"
      style={{ width: "260px", flexShrink: 0 }}
    >
      <div className="sticky" style={{ top: "var(--sticky-top)" }}>
        {/* Featured Post */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <h3
            className="type-section"
            style={{ marginBottom: "var(--space-md)", color: "var(--color-fg-secondary)" }}
          >
            Featured
          </h3>
          <Link href={`/journal/${featuredPost.slug}`} className="group block">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                backgroundColor: "var(--color-bg-secondary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              {featuredPost.featuredImageUrl ? (
                <Image
                  src={featuredPost.featuredImageUrl}
                  alt={featuredPost.featuredImageAlt || featuredPost.title}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-80"
                  sizes="260px"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: "var(--color-border)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>
            <h4 className="type-title-xs">{featuredPost.title}</h4>
          </Link>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <h3
            className="type-section"
            style={{ marginBottom: "var(--space-md)", color: "var(--color-fg-secondary)" }}
          >
            Categories
          </h3>
          <ul className="flex flex-col" style={{ gap: "var(--space-sm)" }}>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/journal/search?cat=${cat.slug}`}
                  className="type-label-sm flex items-center justify-between transition-opacity hover:opacity-60"
                >
                  <span>{cat.name}</span>
                  <span style={{ color: "var(--color-fg-secondary)" }}>
                    [{String(cat.count).padStart(2, "0")}]
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3
            className="type-section"
            style={{ marginBottom: "var(--space-md)", color: "var(--color-fg-secondary)" }}
          >
            Tags
          </h3>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "var(--space-xs) var(--space-sm)",
            }}
          >
            {tags
              .filter((tag) => tag.count > 0)
              .sort((a, b) => b.count - a.count)
              .map((tag) => (
                <Link
                  key={tag.id}
                  href={`/journal/search?q=${tag.name}`}
                  className="type-tag transition-opacity hover:opacity-60"
                  style={{ padding: "var(--space-xs) 0" }}
                >
                  {tag.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
