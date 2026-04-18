import CategoryCircle from "@/components/category-circle";

export default function Loading() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-lg)",
      }}
    >
      <CategoryCircle
        text="LOADING·"
        size={80}
        fontSize={8}
        spinDuration={2}
      >
        <span
          className="type-nav-sm"
          style={{ color: "var(--color-fg)", fontSize: "0.5rem" }}
        >
          ···
        </span>
      </CategoryCircle>
    </div>
  );
}
