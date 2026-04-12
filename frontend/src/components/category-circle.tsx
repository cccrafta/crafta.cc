"use client";

import type { ReactNode } from "react";

type Orient = "upright" | "radial";
type Facing = "inwards" | "outwards";

export default function CategoryCircle({
  text,
  size = 48,
  fontSize = 7,
  orient = "radial",
  facing = "outwards",
  startAngle = 0,
  spread = 1,
  spinning = true,
  spinDuration = 20,
  children,
}: {
  text: string;
  size?: number;
  fontSize?: number;
  orient?: Orient;
  facing?: Facing;
  startAngle?: number;
  spread?: number | "natural";
  spinning?: boolean;
  spinDuration?: number;
  children?: ReactNode;
}) {
  const displayText = text.toUpperCase();
  const chars = [...displayText];
  const count = chars.length;
  if (count === 0) return null;

  const radius = size / 2;

  // Calculate step angle
  let stepMag: number;
  if (spread === "natural") {
    const radiusNum = radius;
    stepMag = radiusNum > 0 ? (fontSize / radiusNum) * (180 / Math.PI) : 0;
  } else {
    const totalArc = 360 * spread;
    stepMag = count > 1 ? totalArc / (spread >= 1 ? count : count - 1) : 0;
  }

  const isRadial = orient === "radial";
  const faceRotation = isRadial ? (facing === "inwards" ? 180 : 0) : null;

  const charData = chars.map((char, i) => {
    const angle = startAngle + i * stepMag;
    let transform: string;
    if (faceRotation !== null) {
      transform = `rotate(${angle}deg) translateY(-${radius - fontSize / 2}px) rotate(${faceRotation}deg)`;
    } else {
      transform = `rotate(${angle}deg) translateY(-${radius - fontSize / 2}px) rotate(${-angle}deg)`;
    }
    return { char, transform };
  });

  return (
    <div
      className="shrink-0"
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {/* Rotating ring of characters */}
      <div
        style={{
          width: size,
          height: size,
          position: "absolute",
          inset: 0,
          animation: spinning
            ? `spin-slow ${spinDuration}s linear infinite`
            : undefined,
        }}
      >
        {charData.map((c, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: `-${fontSize / 2}px`,
              marginLeft: `-${fontSize / 2}px`,
              width: `${fontSize}px`,
              height: `${fontSize}px`,
              fontSize,
              fontFamily: "var(--font-nav)",
              fontWeight: 700,
              color: "var(--color-fg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "center center",
              transform: c.transform,
            }}
          >
            {c.char}
          </span>
        ))}
      </div>

      {/* Center content — does NOT rotate */}
      {children && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
