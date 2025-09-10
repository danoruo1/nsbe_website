import { useState } from "react";
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
    image: "headshots/kevin.jpg",
    funfact: "I speak two languages",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/kevin-tchatat/"
  },
  {
    name: "Sydney",
    position: "Vice President",
    image: "headshots/sydney.jpg",
    funfact: "I haven't eaten meat in 6 years",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/sydney-osei/"

  },
  {
    name: "Ethan",
    position: "Treasurer",
    image: "headshots/ethan.jpg",
    funfact: "I'm a Ravens Fan",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/ethan-bunkley-945b9b2b8/"

  },
  {
    name: "Aisha",
    position: "Secretary",
    image: "headshots/aisha.jpg",
    funfact: "My birthday is on New Years",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/aisha-jawara-1640282a9/"

  },
  {
    name: "John",
    position: "Outreach Chair",
    image: "headshots/john.jpg",
    funfact: "I enjoy cooking",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/jsmith261/"

  },
  {
    name: "Jumi",
    position: "Event Planning Chair",
    image: "headshots/jumi.jpg",
    funfact: "I am a nail tech",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/jumoke-omoshebi-167a30269/"
  },
  {
    name: "Daniel",
    position: "Conference Planner",
    image: "headshots/daniel.jpg",
    funfact: "I visited the West Coast For the First Time",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/daniel-anoruo-b05097268"
  },
  {
    name: "Nke",
    position: "Fundraising Chair",
    image: "headshots/nke.jpg",
    funfact: "I enjoy Roller Skating",
    factEnabled: false,
    linkedin : ""

  },
  {
    name: "Grace",
    position: "Social Media Chair",
    image: "headshots/grace.jpg",
    funfact: "My First Language is French",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/grace-kouaho-02b79832b/"
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
    link: "https://discord.gg/ykeDasJW", // Added link for the Supportive Community card
  },
];

export default function Home() {
  const [hoveredMember, setHoveredMember] = useState(null);

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
        backgroundImage: "url('circuitBackground.png')",
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
            fontWeight: "bold",
            margin: 0,
            textShadow: `
              -3px -3px 0 black,
              3px -3px 0 black,
              -3px  3px 0 black,
              3px  3px 0 black,
              -3px  0px 0 black,
              3px  0px 0 black,
              0px -3px 0 black,
              0px  3px 0 black
            `,
          }}
        >
          Welcome to the NSBE Towson Chapter!
        </Typography>


      {/*}
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
        />*/}
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
              {/* Make the Supportive Community card clickable */}
              {item.title === "Supportive Community" ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
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
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 5px 15px rgba(255, 215, 0, 0.5)",
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
              )}
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
          position: "relative",
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
              <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                {/* Main Card - stays in place */}
                <Card

                onClick={() => {
                  setHoveredMember(prev => (prev === index ? null : index));

                  // Reset back after 3 seconds
                  setTimeout(() => {
                    setHoveredMember(null);
                  }, 3000);
                }}


                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    borderRadius: "15px",
                    textAlign: "center",
                    height: "100%",
                    border: "2px solid #ffd700",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
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
                
                {/* Fun Fact Panel - slides in from the right */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    color: "black",
                    borderRadius: "15px",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.3s ease-in-out",
                    transform: hoveredMember === index ? "translateX(0)" : "translateX(100%)",
                    boxSizing: "border-box",
                    zIndex: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Fun Fact:
                    <br></br>
                    {member.funfact || "No fun fact available"}
                  </Typography>

                  {member.linkedin && (
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", display: "inline-block" }}
                          >
                            <Box
                              sx={{
                                backgroundImage: "url('/linkedin.png')", // put linkedin.png in /public
                                width: "75%",
                                height: "25%",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            />
                          </a>
                        )}
                </div>
              </div>
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