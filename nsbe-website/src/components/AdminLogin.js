import { useEffect, useState } from "react";

export default function AdminLogin() {
  const [tokenInput, setTokenInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = typeof window !== "undefined" ? window.localStorage.getItem("nsbe_admin_token") : "";
    if (existing) setTokenInput(existing);
  }, []);

  const save = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("nsbe_admin_token", tokenInput.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
      <input
        type="password"
        placeholder="Admin token"
        value={tokenInput}
        onChange={(e) => setTokenInput(e.target.value)}
        style={{ background: "#111", color: "white", border: "1px solid #444", padding: "0.35rem 0.6rem", borderRadius: "8px", minWidth: 200 }}
      />
      <button onClick={save} style={{ background: "#ffd700", color: "black", border: "none", padding: "0.4rem 0.8rem", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
        Save Token
      </button>
      {saved && <span style={{ color: "#8be28b" }}>Saved</span>}
    </div>
  );
}


