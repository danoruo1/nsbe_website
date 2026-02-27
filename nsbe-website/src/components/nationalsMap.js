import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SectionContainer from "./SectionContainer";
import PolishedText from "./PolishedText";
import PreviewMap from "@/nationals/previewMap";

export default function NationalsMap() {
  const [companyData, setCompanyData] = useState({ companies: [], byIndustry: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/companyguide");
        const data = await res.json();
        setCompanyData({
          companies: data.companies || [],
          byIndustry: data.byIndustry || {},
        });
      } catch {
        setCompanyData({ companies: [], byIndustry: {} });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const industries = Object.keys(companyData.byIndustry).sort();

  return (
    <SectionContainer style={{ color: "white" }}>
      <PolishedText as="h2" minSize="1.1rem" maxSize="1.9rem">
        NSBE Nationals 2026 — Expo & Companies
      </PolishedText>

      {/* Expo floorplan map (same as preview-map page) */}
      <div style={{ marginTop: "0.5rem", marginBottom: "1rem", width: "100%", borderRadius: "10px", overflow: "hidden", border: "2px solid #ffd700" }}>
        <PreviewMap />
      </div>

      {/* Companies at the expo box */}
      <div
        style={{
          flex: 1,
          minHeight: "200px",
          padding: "0.75rem 1rem",
          borderRadius: "10px",
          background: "rgba(0, 0, 0, 0.6)",
          border: "2px solid #ffd700",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="subtitle1"
          style={{ color: "#ffd700", fontWeight: "bold", marginBottom: "0.5rem" }}
        >
          Companies at the Expo
        </Typography>
        {loading ? (
          <Typography variant="body2" style={{ color: "#ccc" }}>
            Loading companies…
          </Typography>
        ) : industries.length === 0 ? (
          <Typography variant="body2" style={{ color: "#ccc" }}>
            No company data available.
          </Typography>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {industries.map((industry) => (
              <div key={industry}>
                <Typography
                  variant="caption"
                  style={{
                    display: "block",
                    color: "#ffd700",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {industry}
                </Typography>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {(companyData.byIndustry[industry] || []).map((c) => (
                    <li
                      key={`${industry}-${c.companyName}`}
                      style={{
                        background: "rgba(255, 215, 0, 0.08)",
                        color: "white",
                        border: "1px solid rgba(255, 215, 0, 0.4)",
                        borderRadius: "6px",
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      {c.companyName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
