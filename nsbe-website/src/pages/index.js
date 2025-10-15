import { useState, useEffect } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Typography } from "@mui/material";
import Header from "@/components/Header";
import InfoSection from "@/components/InfoSection";
import CalendarSection from "@/components/CalendarSection";
import ExpectSection from "@/components/ExpectSection";
import BoardSection from "@/components/BoardSection";
import SiteLogin from "@/components/SiteLogin";

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
  {
    name: "Marvin",
    position: "Community Service Chair",
    image: "headshots/marvin.jpeg",
    funfact: "I learned how to play 3 Instruments",
    factEnabled: false,
    linkedin : "https://www.linkedin.com/in/marvinampofo/"
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
  const [currentSection, setCurrentSection] = useState(0); // 0: Info, 1: Calendar, 2: Expect, 3: Board
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  const [eventDate, setEventDate] = useState(() => today.toISOString().slice(0, 10));
  const [eventText, setEventText] = useState("");
  const [eventsByDate, setEventsByDate] = useState({}); // { 'YYYY-MM-DD': [{ id, text }] }

  // Navigation bounds: from this month through end of next year
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear() + 1, 11, 31);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("nsbe_events");
    if (stored) {
      try {
        setEventsByDate(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const saveEvents = (next) => {
    setEventsByDate(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("nsbe_events", JSON.stringify(next));
    }
  };

  const addEvent = () => {
    if (!eventDate || !eventText.trim()) return;
    const id = `${Date.now()}`;
    const next = { ...eventsByDate };
    next[eventDate] = [...(next[eventDate] || []), { id, text: eventText.trim() }];
    saveEvents(next);
    setEventText("");
  };

  const removeEvent = (dateKey, id) => {
    const next = { ...eventsByDate };
    next[dateKey] = (next[dateKey] || []).filter((e) => e.id !== id);
    if (next[dateKey].length === 0) delete next[dateKey];
    saveEvents(next);
  };

  const monthLabel = new Date(currentYear, currentMonth, 1).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  const canGoPrev = () => {
    const candidate = new Date(currentYear, currentMonth, 1);
    return candidate > minDate;
  };

  const canGoNext = () => {
    const candidate = new Date(currentYear, currentMonth, 1);
    // Jump to first of next month to compare strictly within bounds
    const nextMonth = new Date(candidate.getFullYear(), candidate.getMonth() + 1, 1);
    return nextMonth <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  };

  const goPrev = () => {
    if (!canGoPrev()) return;
    const m = currentMonth - 1;
    if (m < 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth(m);
    }
  };

  const goNext = () => {
    if (!canGoNext()) return;
    const m = currentMonth + 1;
    if (m > 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth(m);
    }
  };

  const getMonthGrid = (year, month) => {
    const first = new Date(year, month, 1);
    const startDay = (first.getDay() + 6) % 7; // make Monday=0, Sunday=6 for nicer grid
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells = [];
    // Leading days from previous month
    for (let i = 0; i < startDay; i++) {
      const day = prevMonthDays - startDay + 1 + i;
      const d = new Date(year, month - 1, day);
      cells.push({ date: d, inMonth: false });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }
    // Trailing days to complete full weeks (42 cells max)
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      cells.push({ date: d, inMonth: false });
    }
    return cells;
  };

  const monthCells = getMonthGrid(currentYear, currentMonth);
  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const sections = [<InfoSection key="info" />, <CalendarSection key="cal" />, <ExpectSection key="expect" />, <BoardSection key="board" />];

  const goLeft = () => setCurrentSection((s) => Math.max(0, s - 1));
  const goRight = () => setCurrentSection((s) => Math.min(sections.length - 1, s + 1));

  return (
    <div
      style={{
        fontFamily: "var(--font-geist-sans)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        padding: "1.5rem",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Gradient overlay to ensure background visibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(255,215,0,0.15), rgba(255,215,0,0) 60%), linear-gradient(180deg, #0a0a0a 0%, #000000 60%, #0b0b0b 100%)",
        }}
      />

      {/* Foreground content wrapper above the gradient */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Header />

        {/* Slider Content (responsive scale via CSS) */}
        <div className="slider-content" style={{ transformOrigin: "top center", width: "100%", display: "flex", justifyContent: "center" }}>
          {sections[currentSection]}
        </div>

        {/* Slider Arrows */}
        <button className="slider-arrow slider-arrow-left" onClick={goLeft} disabled={currentSection === 0} style={{ position: "fixed", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "2px solid #ffd700", color: currentSection === 0 ? "#777" : "#ffd700", padding: "0.5rem 0.7rem", borderRadius: "50%", cursor: currentSection === 0 ? "not-allowed" : "pointer" }}>{"<"}</button>
        <button className="slider-arrow slider-arrow-right" onClick={goRight} disabled={currentSection === sections.length - 1} style={{ position: "fixed", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "2px solid #ffd700", color: currentSection === sections.length - 1 ? "#777" : "#ffd700", padding: "0.5rem 0.7rem", borderRadius: "50%", cursor: currentSection === sections.length - 1 ? "not-allowed" : "pointer" }}>{">"}</button>

      {/* Email Contact Section at bottom */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            color: "white",
            textAlign: "center",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
          marginTop: "0.15rem",
            border: "2px solid #ffd700",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "0.15rem", fontSize: "clamp(1rem, 2.2vw, 1.25rem)" }}>
            Contact Us
          </Typography>
          <a
            href="mailto:nsbetowson@gmail.com"
            style={{
              color: "#ffd700",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              textDecoration: "underline",
              wordBreak: "break-word",
            }}
          >
            nsbetowson@gmail.com
          </a>

        {/* Site login below Contact Us */}
        <SiteLogin />
        </div>

        <footer>
          <Typography
            variant="body2"
            style={{ color: "white", marginTop: "1rem", textAlign: "center" }}
          >
            &copy; {new Date().getFullYear()} NSBE Towson Chapter. All rights reserved.
          </Typography>
        </footer>
      </div>
    </div>
  );
}