"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "@/components/post-card";
import PostGridCard from "@/components/post-grid-card";
import { useViewMode } from "@/components/view-toggle";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";

export default function JournalFeed({
  posts: initialPosts,
  totalPages: initialTotalPages,
}: {
  posts: PostCardType[];
  totalPages: number;
}) {
  const { view } = useViewMode();
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTotalPages > 1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    const res = await fetch(`/api/posts?page=${nextPage}&per_page=10`);
    const data = await res.json();

    setPosts((prev) => [...prev, ...data.posts]);
    setPage(nextPage);
    setHasMore(nextPage < data.totalPages);
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  if (view === "grid") {
    return (
      <div>
        <div
          className="w-full"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {posts.map((post) => (
            <PostGridCard key={post.id} post={post} />
          ))}
        </div>
        <div ref={loaderRef} style={{ height: 1 }} />
        {loading && (
          <div className="flex justify-center" style={{ padding: "var(--space-xl)" }}>
            <span className="type-meta">Loading...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="w-full" style={{ maxWidth: "550px" }}>
        <div className="flex flex-col" style={{ gap: "var(--space-3xl)" }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div ref={loaderRef} style={{ height: 1 }} />
      {loading && (
        <div className="flex justify-center" style={{ padding: "var(--space-xl)" }}>
          <span className="type-meta">Loading...</span>
        </div>
      )}
    </div>
  );
}
