export default function StaticPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h1
        className="type-title-lg"
        style={{ marginBottom: "var(--space-xl)" }}
      >
        {title}
      </h1>
      <div className="type-body" style={{ lineHeight: 1.8 }}>
        {children}
      </div>
    </article>
  );
}
