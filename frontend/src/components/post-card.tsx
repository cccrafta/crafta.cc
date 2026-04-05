import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";

export default function PostCard({ post }: { post: PostCardType }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group block"
    >
      {post.featuredImageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden mb-3" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
          <Image
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover transition-opacity group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <h2
        className="text-lg font-normal leading-tight"
        style={{ color: "var(--color-fg)", fontFamily: "var(--font-heading)" }}
      >
        {post.title}
      </h2>
      <p
        className="mt-1 line-clamp-2 text-sm"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        {post.excerpt}
      </p>
      <div
        className="mt-2 flex items-center gap-2 text-xs"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }}
      >
        <time dateTime={post.date}>{formattedDate}</time>
      </div>
    </Link>
  );
}
