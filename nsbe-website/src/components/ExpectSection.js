import { Typography, Card, CardContent, Grid } from "@mui/material";
import SectionContainer from "./SectionContainer";
import PolishedText from "./PolishedText";

const expectItems = [
  {
    title: "Technical Workshops",
    description: "Hands-on sessions to enhance your engineering skills, from coding to hardware design.",
    image: "/technical.jpg",
  },
  {
    title: "Professional Development",
    description: "Career-building opportunities including resume reviews, interview practice, and networking events.",
    image: "/professionaldev.jpg",
  },
  {
    title: "Supportive Community",
    description: "Join a welcoming network of peers and mentors who support your academic and personal growth.",
    image: "community.jpg",
    link: "https://discord.gg/ykeDasJW",
  },
];

export default function ExpectSection() {
  return (
    <SectionContainer>
      <PolishedText as={"h2"} minSize="1.2rem" maxSize="2.1rem">What to Expect</PolishedText>

      <Grid container spacing={3} justifyContent="center">
        {expectItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            {item.title === "Supportive Community" ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    borderRadius: "15px",
                    textAlign: "center",
                    height: "100%",
                    border: "2px solid #ffd700",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: "0 5px 15px rgba(255, 215, 0, 0.5)" },
                  }}
                >
                  <div style={{ height: "160px", position: "relative", overflow: "hidden", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#333", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  </div>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" style={{ lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#ffd700", marginTop: "0.5rem", fontWeight: "bold" }}>
                      Click to join our Discord!
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  border: "2px solid #ffd700",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)" },
                }}
              >
                <div style={{ height: "160px", position: "relative", overflow: "hidden", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#333", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                </div>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" style={{ lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}


