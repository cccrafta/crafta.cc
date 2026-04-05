import Image from "next/image";
import type { PostDetail } from "@/lib/types/wordpress";

export default function PostContent({ post }: { post: PostDetail }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <h1
        className="text-3xl font-normal leading-tight"
        style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-4xl)" }}
      >
        {post.title}
      </h1>
      <div
        className="mt-3 flex items-center gap-3 text-sm"
        style={{ color: "var(--color-accent)" }}
      >
        <time dateTime={post.date}>{formattedDate}</time>
      </div>

      {post.featuredImageUrl && (
        <div
          className="relative mt-8 aspect-video overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <Image
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      <div
        className="prose mt-8 max-w-none"
        style={{ fontFamily: "var(--font-body)" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
