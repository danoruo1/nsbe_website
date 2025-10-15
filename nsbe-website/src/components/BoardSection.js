import { useState } from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import SectionContainer from "./SectionContainer";
import PolishedText from "./PolishedText";

const boardMembers = [
  { name: "Kevin", position: "President", image: "headshots/kevin.jpg", linkedin: "https://www.linkedin.com/in/kevin-tchatat/" },
  { name: "Sydney", position: "Vice President", image: "headshots/sydney.jpg", linkedin: "https://www.linkedin.com/in/sydney-osei/" },
  { name: "Ethan", position: "Treasurer", image: "headshots/ethan.jpg", linkedin: "https://www.linkedin.com/in/ethan-bunkley-945b9b2b8/" },
  { name: "Aisha", position: "Secretary", image: "headshots/aisha.jpg", linkedin: "https://www.linkedin.com/in/aisha-jawara-1640282a9/" },
  { name: "John", position: "Outreach Chair", image: "headshots/john.jpg", linkedin: "https://www.linkedin.com/in/jsmith261/" },
  { name: "Jumi", position: "Event Planning Chair", image: "headshots/jumi.jpg", linkedin: "https://www.linkedin.com/in/jumoke-omoshebi-167a30269/" },
  { name: "Daniel", position: "Conference Planner", image: "headshots/daniel.jpg", linkedin: "https://www.linkedin.com/in/daniel-anoruo-b05097268" },
  { name: "Nke", position: "Fundraising Chair", image: "headshots/nke.jpg", linkedin: "" },
  { name: "Grace", position: "Social Media Chair", image: "headshots/grace.jpg", linkedin: "https://www.linkedin.com/in/grace-kouaho-02b79832b/" },
  { name: "Marvin", position: "Community Service Chair", image: "headshots/marvin.jpeg", linkedin: "https://www.linkedin.com/in/marvinampofo/" },
];

export default function BoardSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <SectionContainer>
      <PolishedText as={"h2"} minSize="1.2rem" maxSize="2.1rem">Meet the Board Members</PolishedText>

      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {boardMembers.map((member, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Card
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                borderRadius: "15px",
                textAlign: "center",
                border: "2px solid #ffd700",
                transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": { boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)", transform: "translateY(-3px)" },
              }}
            >
              <CardContent>
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    backgroundColor: "#333",
                    margin: "0 auto 0.75rem",
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Typography variant="h5" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffd700", mt: 1 }}>
                  {member.position}
                </Typography>
              </CardContent>
            </Card>
            {/* Reserve fixed space for the hover box to avoid layout shift/overlap */}
            <div style={{ height: 48 }} />
            <div style={{ position: "relative", height: 0 }}>
              {member.linkedin && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: -48,
                    opacity: hovered === index ? 1 : 0,
                    transform: hovered === index ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 180ms ease, transform 180ms ease",
                    margin: "0 auto",
                    background: "rgba(255,215,0,0.12)",
                    border: "1px solid #ffd700",
                    borderRadius: "10px",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    pointerEvents: hovered === index ? "auto" : "none",
                  }}
                >
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#ffd700", fontWeight: "bold" }}>
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}


