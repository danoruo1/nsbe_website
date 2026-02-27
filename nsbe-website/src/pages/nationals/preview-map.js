import PreviewMap from "@/nationals/previewMap";

export default function PreviewMapPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <PreviewMap />
      </div>
    </div>
  );
}
