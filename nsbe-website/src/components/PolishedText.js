import { useState } from "react";

export default function PolishedText({
  as: Tag = "div",
  children,
  baseWeight = 800,
  minSize = "1rem",
  maxSize = "3rem",
  align = "center",
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: align,
        fontSize: `clamp(${minSize}, 3.2vw, ${maxSize})`,
        fontWeight: baseWeight,
        margin: 0,
        letterSpacing: hovered ? "0.6px" : "0.2px",
        transition: "letter-spacing 220ms ease, filter 220ms ease, transform 220ms ease",
        backgroundImage: hovered
          ? "linear-gradient(92deg, #ffe27a 0%, #ffd700 35%, #fff3b0 70%, #ffd700 100%)"
          : "linear-gradient(92deg, #ffd700 0%, #fff3b0 60%, #ffd700 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: hovered
          ? "drop-shadow(0 4px 18px rgba(255,215,0,0.25))"
          : "drop-shadow(0 2px 10px rgba(0,0,0,0.6))",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
    >
      {children}
    </Tag>
  );
}


