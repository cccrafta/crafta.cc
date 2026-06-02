"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearch } from "@/components/search-context";

interface ImageResult {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  sourceUrl: string;
  sourceDomain: string;
}

interface WebResult {
  id: string;
  title: string;
  url: string;
  domain: string;
  description: string;
  favicon: string;
}

type Tab = "images" | "links";

export default function SearchPanel({ context }: { context?: string }) {
  const { query, setQuery } = useSearch();
  const [tab, setTab] = useState<Tab>("images");
  const [images, setImages] = useState<ImageResult[]>([]);
  const [webResults, setWebResults] = useState<WebResult[]>([]);
  const [imgStatus, setImgStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [webStatus, setWebStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [imgError, setImgError] = useState("");
  const [webError, setWebError] = useState("");
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const enrichedQuery = context ? `${query} ${context}` : query;

  const fetchImages = useCallback(async () => {
    if (!query.trim()) return;
    setImgStatus("loading");
    setImages([]);
    setImgError("");
    try {
      const res = await fetch(
        `/api/image-lookup?query=${encodeURIComponent(enrichedQuery)}`
      );
      const data = await res.json();
      if (!res.ok) {
        setImgError(data.error ?? "Search failed");
        setImgStatus("error");
        return;
      }
      setImages(data.images ?? []);
      setImgStatus("done");
    } catch {
      setImgError("Could not reach search");
      setImgStatus("error");
    }
  }, [enrichedQuery, query]);

  const fetchWeb = useCallback(async () => {
    if (!query.trim()) return;
    setWebStatus("loading");
    setWebResults([]);
    setWebError("");
    try {
      const res = await fetch(
        `/api/web-lookup?query=${encodeURIComponent(enrichedQuery)}`
      );
      const data = await res.json();
      if (!res.ok) {
        setWebError(data.error ?? "Search failed");
        setWebStatus("error");
        return;
      }
      setWebResults(data.results ?? []);
      setWebStatus("done");
    } catch {
      setWebError("Could not reach search");
      setWebStatus("error");
    }
  }, [enrichedQuery, query]);

  useEffect(() => {
    if (query.trim()) {
      fetchImages();
      fetchWeb();
    }
  }, [query, fetchImages, fetchWeb]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setQuery(inputValue.trim());
    }
  };

  const status = tab === "images" ? imgStatus : webStatus;
  const errorMsg = tab === "images" ? imgError : webError;
  const retry = tab === "images" ? fetchImages : fetchWeb;

  return (
    <aside className="search-panel" role="complementary">
      <form onSubmit={handleSubmit} className="search-panel-input-wrap">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className="search-panel-input type-body-sm"
        />
      </form>

      <div className="lookup-tabs">
        <button
          className={`lookup-tab ${tab === "images" ? "lookup-tab-active" : ""}`}
          onClick={() => setTab("images")}
        >
          Images
        </button>
        <button
          className={`lookup-tab ${tab === "links" ? "lookup-tab-active" : ""}`}
          onClick={() => setTab("links")}
        >
          Links
        </button>
      </div>

      <div className="search-panel-body">
        {(status === "idle" || !query.trim()) && (
          <div className="lookup-empty">
            <p className="type-body-sm">Select text in the article or type a query</p>
          </div>
        )}

        {status === "loading" && (
          <div className={tab === "images" ? "lookup-grid" : "lookup-link-list"}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={tab === "images" ? "lookup-skeleton" : "lookup-skeleton-link"}
              />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="lookup-empty">
            <p className="type-body-sm">{errorMsg}</p>
            <button
              onClick={retry}
              className="tag-chip"
              style={{ marginTop: "var(--space-sm)" }}
            >
              Retry
            </button>
          </div>
        )}

        {status === "done" && tab === "images" && images.length === 0 && (
          <div className="lookup-empty">
            <p className="type-body-sm">No images found</p>
          </div>
        )}

        {status === "done" && tab === "images" && images.length > 0 && (
          <div className="lookup-grid">
            {images.map((img) => (
              <a
                key={img.id}
                href={img.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lookup-card"
              >
                <img
                  src={img.thumbnailUrl}
                  alt={img.title}
                  className="lookup-card-img"
                  loading="lazy"
                />
                <span className="lookup-card-domain type-meta">
                  {img.sourceDomain}
                </span>
              </a>
            ))}
          </div>
        )}

        {status === "done" && tab === "links" && webResults.length === 0 && (
          <div className="lookup-empty">
            <p className="type-body-sm">No results found</p>
          </div>
        )}

        {status === "done" && tab === "links" && webResults.length > 0 && (
          <div className="lookup-link-list">
            {webResults.map((result) => (
              <a
                key={result.id}
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lookup-link-card"
              >
                <div className="lookup-link-header">
                  {result.favicon && (
                    <img
                      src={result.favicon}
                      alt=""
                      className="lookup-link-favicon"
                      loading="lazy"
                    />
                  )}
                  <span className="lookup-link-domain type-meta">
                    {result.domain}
                  </span>
                </div>
                <p className="lookup-link-title type-title-xs">{result.title}</p>
                <p className="lookup-link-desc type-meta">{result.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="lookup-panel-footer">
        <span className="type-meta">Powered by Brave Search</span>
      </div>
    </aside>
  );
}
