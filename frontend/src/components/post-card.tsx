import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";
import CategoryCircle from "@/components/category-circle";

export default function PostCard({ post }: { post: PostCardType }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const category = post.categories[0] ?? "Journal";

  return (
    <article className="flex" style={{ gap: "var(--space-md)" }}>
      {/* Category circle — left */}
      <div className="pt-1">
        <CategoryCircle text={category + '·'} size={48} fontSize={8}>
          <span
            style={{
              fontFamily: "var(--font-nav)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-fg)",
            }}
          >
            {category[0]}
          </span>
        </CategoryCircle>
      </div>

      {/* Content — right */}
      <div className="flex-1 flex flex-col" style={{ gap: "var(--space-sm)" }}>
        {/* Title */}
        <Link href={`/journal/${post.slug}`}>
          <h2 className="type-title">{post.title}</h2>
        </Link>

        {/* Excerpt */}
        <p className="type-body-sm line-clamp-3">{post.excerpt}</p>

        {/* Image — only if present */}
        {post.featuredImageUrl && (
          <Link href={`/journal/${post.slug}`}>
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                backgroundColor: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-md)",
                marginTop: "var(--space-xs)",
              }}
            >
              <Image
                src={post.featuredImageUrl}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>
          </Link>
        )}

        {/* Footer — date + read more */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "var(--space-xs)" }}
        >
          <time dateTime={post.date} className="type-meta">
            {formattedDate}
          </time>
          <Link
            href={`/journal/${post.slug}`}
            className="type-label transition-opacity hover:opacity-60"
          >
            Read more &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
