import { Typography } from "@mui/material";
import SectionContainer from "./SectionContainer";
import PolishedText from "./PolishedText";

function HoverableImage({ src, alt, style = {} }) {
  const baseStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    ...style,
  };
  return (
    <div
      style={{ display: "inline-block", borderRadius: style.borderRadius || 0 }}
      onMouseEnter={(e) => {
        e.currentTarget.firstChild.style.transform = "translateY(-5px)";
        e.currentTarget.firstChild.style.boxShadow = "0 5px 15px rgba(255, 215, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.firstChild.style.transform = "translateY(0)";
        e.currentTarget.firstChild.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
      }}
    >
      <img src={src} alt={alt} style={baseStyle} />
    </div>
  );
}

export default function InfoSection() {
  return (
    <SectionContainer>
      <div
        style={{
          width: "100%",
          background: "linear-gradient(180deg,rgb(6, 6, 6),rgb(53, 48, 10))",
          color: "black",
          textAlign: "center",
          padding: "0.75rem",
          borderRadius: "10px",
          border: "2px solid #ffd700",
          marginBottom: "1rem",
        }}
      >
        <PolishedText as={"h2"} minSize="1rem" maxSize="1.6rem">
          Meetings Every Tuesday
        </PolishedText>
        <Typography variant="h6" style={{ marginTop: "0.35rem", fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", color: "white" }}>
          5:00 PM - 6:15 PM | Cyber Center
        </Typography>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <HoverableImage
          src="/groupPhoto.jpg"
          alt="Group Photo"
          style={{
            flex: "1 1 280px",
            maxWidth: "420px",
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "16px",
            border: "2px solid #ffd700",
            display: "block",
          }}
        />

        <div
          style={{
            flex: "1 1 280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            color: "white",
            maxWidth: "560px",
          }}
        >
          <PolishedText as={"h2"} minSize="1.2rem" maxSize="2.1rem">
            What is NSBE?
          </PolishedText>

          <Typography
            variant="body1"
            style={{
              fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            The National Society of Black Engineers (NSBE) is one of the largest
            student-governed organizations in the country. Founded in 1975, NSBE
            supports and promotes the aspirations of collegiate and pre-collegiate
            students and technical professionals in engineering and technology.
          </Typography>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            flex: "1 1 280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            color: "white",
            maxWidth: "560px",
          }}
        >
          <PolishedText as={"h2"} minSize="1.2rem" maxSize="2.1rem">
            Our Mission
          </PolishedText>

          <Typography
            variant="body1"
            style={{
              fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            Our mission is to increase the number of culturally responsible Black
            engineers who excel academically, succeed professionally, and positively
            impact the community. We achieve this through academic excellence,
            professional development, and community outreach.
          </Typography>
        </div>

        <HoverableImage
          src="/mission.jpg"
          alt="NSBE Mission"
          style={{
            flex: "1 1 280px",
            maxWidth: "420px",
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "16px",
            border: "2px solid #ffd700",
            display: "block",
          }}
        />
      </div>
    </SectionContainer>
  );
}


