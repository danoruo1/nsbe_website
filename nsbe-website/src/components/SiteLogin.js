import { useEffect, useState } from "react";

const ATTEMPT_LIMIT = 3;
const LOCKOUT_MS = 10 * 60 * 1000; // 10 minutes

export default function SiteLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lockedUntil, setLockedUntil] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = parseInt(window.localStorage.getItem("nsbe_login_attempts") || "0", 10);
    const lu = parseInt(window.localStorage.getItem("nsbe_lock_until") || "0", 10);
    setAttempts(a);
    setLockedUntil(lu);
  }, []);

  const persistState = (a, lu) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("nsbe_login_attempts", String(a));
    window.localStorage.setItem("nsbe_lock_until", String(lu));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const now = Date.now();
    if (lockedUntil && now < lockedUntil) {
      setError("Locked out. Try again later.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const nextAttempts = attempts + 1;
        let nextLock = 0;
        if (nextAttempts >= ATTEMPT_LIMIT) {
          nextLock = Date.now() + LOCKOUT_MS;
          setError("Too many attempts. Locked for 10 minutes.");
        } else {
          setError("Invalid credentials");
        }
        setAttempts(nextAttempts);
        setLockedUntil(nextLock);
        persistState(nextAttempts, nextLock);
        return;
      }
      const data = await res.json();
      if (typeof window !== "undefined") {
        window.localStorage.setItem("nsbe_admin_token", data.token || "");
      }
      // reset attempts
      setAttempts(0);
      setLockedUntil(0);
      persistState(0, 0);
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const remainingMs = Math.max(0, lockedUntil - Date.now());
  const remainingMin = Math.ceil(remainingMs / 60000);

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading || (lockedUntil && Date.now() < lockedUntil)}
        style={{ background: "#111", color: "white", border: "1px solid #444", padding: "0.35rem 0.6rem", borderRadius: "8px", minWidth: 160 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading || (lockedUntil && Date.now() < lockedUntil)}
        style={{ background: "#111", color: "white", border: "1px solid #444", padding: "0.35rem 0.6rem", borderRadius: "8px", minWidth: 160 }}
      />
      <button type="submit" disabled={loading || (lockedUntil && Date.now() < lockedUntil)} style={{ background: "#ffd700", color: "black", border: "none", padding: "0.4rem 0.8rem", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
        {loading ? "Signing in..." : "Login"}
      </button>
      {error && <span style={{ color: "#ff7777" }}>{error}</span>}
      {lockedUntil && Date.now() < lockedUntil && (
        <span style={{ color: "#ffd700" }}> Retry in ~{remainingMin} min</span>
      )}
    </form>
  );
}


