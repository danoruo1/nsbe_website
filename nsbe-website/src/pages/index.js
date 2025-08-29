import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Typography, Card, CardContent, Box, Grid } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Board member data
const boardMembers = [
  {
    name: "Kevin",
    position: "President",
    image: "headshots/kevin.jpg", // Replace with actual image paths
  },
  {
    name: "Sydney",
    position: "Vice President",
    image: "headshots/sydney.jpg",
  },
  {
    name: "Ethan",
    position: "Treasurer",
    image: "headshots/ethan.jpg",
  },
  {
    name: "Aisha",
    position: "Secretary",
    image: "headshots/aisha.jpg",
  },
  {
    name: "John",
    position: "Outreach Chair",
    image: "headshots/john.jpg",
  },
  {
    name: "Jumi",
    position: "Event Planning Chair",
    image: "headshots/jumi.jpg",
  },
  {
    name: "Daniel",
    position: "Conference Planner",
    image: "headshots/daniel.jpg",
  },

  {
    name: "Nke",
    position: "Fundraising Chair",
    image: "headshots/nke.jpg",
  },

  {
    name: "Grace",
    position: "Social Media Chair",
    image: "headshots/grace.jpg",
  },
];

// What to expect data
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
  },
];

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-sans)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowX: "hidden",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {/* Top Row: Heading + Logo */}
      <div
        style={{
          width: "100%",
          minHeight: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h1"
          style={{
            color: "#ffd700",
            textAlign: "center",
            fontSize: "clamp(2rem, 5vw, 5.5rem)",
            margin: 0,
          }}
        >
          Welcome to the NSBE Towson Chapter!
        </Typography>

        <div
          style={{
            width: "clamp(60px, 10vw, 120px)",
            height: "clamp(40px, 6vw, 80px)",
            borderRadius: "5%",
            backgroundImage: "url('/nsbe.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Meeting Info Banner */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
          padding: "1rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          border: "2px solid #ffd700",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Meetings Every Tuesday
        </Typography>
        <Typography variant="h6" style={{ marginTop: "0.5rem" }}>
          5:00 PM - 6:15 PM | Cyber Center
        </Typography>
      </div>

      {/* Main Content Box */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          border: "5px solid white",
          borderRadius: "20px",
          padding: "2rem",
          gap: "3rem",
          boxSizing: "border-box",
          marginBottom: "2rem",
        }}
      >
        {/* What is NSBE Section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <img
            src="/groupPhoto.jpg"
            alt="Group Photo"
            style={{
              flex: "1 1 300px",
              maxWidth: "500px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "20px",
              border: "2px solid #ffd700",
            }}
          />

          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
              color: "white",
              maxWidth: "600px",
            }}
          >
            <Typography
              variant="h2"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                margin: 0,
                color: "#ffd700",
              }}
            >
              <u>What is NSBE?</u>
            </Typography>

            <Typography
              variant="body1"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
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

        {/* Our Mission Section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
              color: "white",
              maxWidth: "600px",
            }}
          >
            <Typography
              variant="h2"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                margin: 0,
                color: "#ffd700",
              }}
            >
              <u>Our Mission</u>
            </Typography>

            <Typography
              variant="body1"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
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

          <img
            src="/mission.jpg"
            alt="NSBE Mission"
            style={{
              flex: "1 1 300px",
              maxWidth: "500px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "20px",
              border: "2px solid #ffd700",

            }}
          />
        </div>
      </div>

      {/* What to Expect Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "black",
          border: "5px solid white",
          borderRadius: "20px",
          padding: "2rem",
          boxSizing: "border-box",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h2"
          style={{
            textAlign: "center",
            color: "#ffd700",
            marginBottom: "2rem",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
          }}
        >
          <u>What to Expect</u>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {expectItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  border: "2px solid #ffd700",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)",
                  },
                }}
              >
                <div
                  style={{
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#333",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
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
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Meet the Board Members Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "black",
          border: "5px solid white",
          borderRadius: "20px",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h2"
          style={{
            textAlign: "center",
            color: "#ffd700",
            marginBottom: "2rem",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
          }}
        >
          <u>Meet the Board Members</u>
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {boardMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  border: "2px solid #ffd700",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)",
                  },
                }}
              >
                <CardContent>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      backgroundColor: "#333",
                      margin: "0 auto 1rem",
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
            </Grid>
          ))}
        </Grid>
      </div>

      
      <footer>
        <Typography
          variant="body2"
          style={{ color: "white", marginTop: "2rem", textAlign: "center" }}
        >
          &copy; {new Date().getFullYear()} NSBE Towson Chapter. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}