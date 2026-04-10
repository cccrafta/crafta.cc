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
      <h1 className="type-title-lg">{post.title}</h1>
      <div className="mt-3 flex items-center gap-3 type-meta">
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
        className="prose type-body mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
