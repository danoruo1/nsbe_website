// Countdown.tsx
import React, { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("March 18, 2026 00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Run only on the client to avoid SSR hydration mismatches.
    setHasMounted(true);

    const update = () => {
      setTimeLeft(calculateTimeLeft());
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  // During SSR and the very first client render, render nothing
  // so the server and client HTML match.
  if (!hasMounted) {
    return null;
  }

  const registerLink = (
    <a
      href="https://member-nsbe-annual-2026.streampoint.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.registerLink}
    >
      REGISTER NOW!
    </a>
  );

  if (!timeLeft) {
    return (
      <div style={styles.container}>
        <div style={styles.titleWrapper}>
          <h2 style={styles.title}>The Event Has Started!</h2>
          <div style={styles.titleUnderline} />
        </div>
        {registerLink}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        <h2 style={styles.title}>Countdown to NSBE Nationals 2026</h2>
        <div style={styles.titleUnderline} />
      </div>
      <div style={styles.timeGrid}>
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
      {registerLink}
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <div style={styles.box}>
      <div style={styles.value}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "16px 20px 8px",
  },
  titleWrapper: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "14px",
    marginBottom: "0.9rem",
    background: "transparent",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.1rem, 2.4vw, 1.8rem)",
    fontWeight: 800,
    letterSpacing: "0.25px",
    backgroundImage:
      "linear-gradient(92deg, #ffe27a 0%, #ffd700 35%, #fff3b0 70%, #ffd700 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.6))",
  },
  titleUnderline: {
    height: "3px",
    width: "60%",
    margin: "6px auto 0",
    borderRadius: "3px",
    background:
      "linear-gradient(90deg, rgba(255,215,0,0), rgba(255,215,0,0.9), rgba(255,215,0,0))",
  },
  timeGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  box: {
    background: "#111",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    minWidth: "80px",
  },
  value: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  label: {
    fontSize: "0.8rem",
    opacity: 0.7,
  },
  registerLink: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.5rem 1.25rem",
    fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "#ffd700",
    background: "transparent",
    border: "2px solid #ffd700",
    borderRadius: "8px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
};