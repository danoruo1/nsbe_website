import { useState } from "react";
import { Typography } from "@mui/material";

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "15vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
        marginBottom: "1.25rem",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-block",
          padding: "0.25rem 0.5rem",
          borderRadius: "14px",
          transition: "transform 220ms ease, box-shadow 220ms ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          boxShadow: hovered
            ? "0 0 0 2px rgba(255,215,0,0.35), 0 10px 30px rgba(255,215,0,0.15)"
            : "0 0 0 2px rgba(255,215,0,0.15)",
          background: hovered
            ? "radial-gradient(600px 200px at 50% 0%, rgba(255,215,0,0.10), rgba(0,0,0,0) 60%)"
            : "transparent",
        }}
      >
        <Typography
          variant="h1"
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 4vw, 4.5rem)",
            fontWeight: 900,
            margin: 0,
            letterSpacing: hovered ? "0.6px" : "0.2px",
            transition: "letter-spacing 220ms ease, filter 220ms ease",
            backgroundImage: hovered
              ? "linear-gradient(92deg, #ffe27a 0%, #ffd700 35%, #fff3b0 70%, #ffd700 100%)"
              : "linear-gradient(92deg, #ffd700 0%, #fff3b0 60%, #ffd700 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: hovered
              ? "drop-shadow(0 4px 18px rgba(255,215,0,0.25))"
              : "drop-shadow(0 2px 10px rgba(0,0,0,0.6))",
          }}
        >
          Welcome to the NSBE Towson Chapter!
        </Typography>
        <div
          style={{
            height: "3px",
            width: hovered ? "86%" : "46%",
            margin: "8px auto 0",
            borderRadius: "3px",
            transition: "width 220ms ease",
            background: "linear-gradient(90deg, rgba(255,215,0,0), rgba(255,215,0,0.9), rgba(255,215,0,0))",
          }}
        />
      </div>
    </div>
  );
}


