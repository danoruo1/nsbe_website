export default function SectionContainer({ children, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        background: "linear-gradient(145deg, rgba(255,215,0,0.12), rgba(0,0,0,0.7))",
        border: "3px solid white",
        borderRadius: "18px",
        padding: "1.5rem",
        height: "80.5vh", // base desktop height
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div className="hide-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingRight: "0.25rem", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {children}
      </div>
    </div>
  );
}


