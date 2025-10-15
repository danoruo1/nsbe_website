import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SectionContainer from "./SectionContainer";
import PolishedText from "./PolishedText";
// Admin token now provided by SiteLogin stored in localStorage

export default function CalendarSection() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [eventDate, setEventDate] = useState(() => today.toISOString().slice(0, 10));
  const [eventText, setEventText] = useState("");
  const [eventsByDate, setEventsByDate] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear() + 1, 11, 31);

  useEffect(() => {
    // Load events from server JSON
    const load = async () => {
      try {
        const res = await fetch("/api/calendar");
        const data = await res.json();
        const byDate = {};
        (data.events || []).forEach((e) => {
          const k = e.date;
          if (!byDate[k]) byDate[k] = [];
          byDate[k].push({ id: e.id || `${k}-${Math.random()}`, text: e.title });
        });
        setEventsByDate(byDate);
      } catch {}
    };
    load();
    // detect admin token
    if (typeof window !== "undefined") {
      const tok = window.localStorage.getItem("nsbe_admin_token") || "";
      setIsAdmin(Boolean(tok));
      const onAdminChange = () => {
        const t = window.localStorage.getItem("nsbe_admin_token") || "";
        setIsAdmin(Boolean(t));
      };
      window.addEventListener("nsbe-admin-updated", onAdminChange);
      window.addEventListener("storage", onAdminChange);
      return () => {
        window.removeEventListener("nsbe-admin-updated", onAdminChange);
        window.removeEventListener("storage", onAdminChange);
      };
    }
  }, []);

  const saveEvents = (next) => { setEventsByDate(next); };

  const addEvent = async () => {
    if (!eventDate || !eventText.trim()) return;
    try {
      const token = window.localStorage.getItem("nsbe_admin_token") || "";
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ date: eventDate, title: eventText.trim() }),
      });
      if (!res.ok) return; // silently fail if unauthorized
      const { event } = await res.json();
      const next = { ...eventsByDate };
      next[event.date] = [...(next[event.date] || []), { id: event.id, text: event.title }];
      saveEvents(next);
      setEventText("");
    } catch {}
  };

  const removeEvent = (dateKey, id) => {
    const next = { ...eventsByDate };
    next[dateKey] = (next[dateKey] || []).filter((e) => e.id !== id);
    if (next[dateKey].length === 0) delete next[dateKey];
    saveEvents(next);
  };

  const monthLabel = new Date(currentYear, currentMonth, 1).toLocaleString(undefined, { month: "long", year: "numeric" });

  const canGoPrev = () => {
    const candidate = new Date(currentYear, currentMonth, 1);
    return candidate > minDate;
  };
  const canGoNext = () => {
    const candidate = new Date(currentYear, currentMonth, 1);
    const nextMonth = new Date(candidate.getFullYear(), candidate.getMonth() + 1, 1);
    return nextMonth <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  };
  const goPrev = () => {
    if (!canGoPrev()) return;
    const m = currentMonth - 1;
    if (m < 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); } else { setCurrentMonth(m); }
  };
  const goNext = () => {
    if (!canGoNext()) return;
    const m = currentMonth + 1;
    if (m > 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); } else { setCurrentMonth(m); }
  };

  const getMonthGrid = (year, month) => {
    const first = new Date(year, month, 1);
    const startDay = (first.getDay() + 6) % 7; // Monday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      const day = prevMonthDays - startDay + 1 + i;
      const d = new Date(year, month - 1, day);
      cells.push({ date: d, inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d), inMonth: true });
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const d = new Date(last); d.setDate(d.getDate() + 1);
      cells.push({ date: d, inMonth: false });
    }
    return cells;
  };

  const monthCells = getMonthGrid(currentYear, currentMonth);
  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <SectionContainer style={{ color: "white" }}>
      <PolishedText as={"h2"} minSize="1.1rem" maxSize="1.9rem">Chapter Events Calendar</PolishedText>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
        <button onClick={goPrev} disabled={!canGoPrev()} style={{ background: "transparent", border: "1px solid #ffd700", color: canGoPrev() ? "#ffd700" : "#777", padding: "0.35rem 0.6rem", borderRadius: "8px", cursor: canGoPrev() ? "pointer" : "not-allowed" }}>Prev</button>
        <Typography variant="h5" style={{ color: "white", fontSize: "clamp(1rem, 2.2vw, 1.4rem)" }}>{monthLabel}</Typography>
        <button onClick={goNext} disabled={!canGoNext()} style={{ background: "transparent", border: "1px solid #ffd700", color: canGoNext() ? "#ffd700" : "#777", padding: "0.35rem 0.6rem", borderRadius: "8px", cursor: canGoNext() ? "pointer" : "not-allowed" }}>Next</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
        {weekdayLabels.map((wd) => (
          <div key={wd} style={{ textAlign: "center", color: "#ffd700", fontWeight: "bold", padding: "0.2rem 0" }}>{wd}</div>
        ))}
        {monthCells.map(({ date, inMonth }, idx) => {
          const iso = date.toISOString().slice(0, 10);
          const dayEvents = eventsByDate[iso] || [];
          const isToday = iso === today.toISOString().slice(0, 10);
          return (
            <div
              key={idx}
              onClick={() => { setEventDate(iso); }}
              style={{
                background: inMonth ? "#0f0f0f" : "#0a0a0a",
                border: isToday ? "2px solid #ffd700" : "1px solid #333",
                borderRadius: "10px",
                padding: "0.45rem",
                minHeight: "78px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                <span style={{ color: inMonth ? "white" : "#666" }}>{date.getDate()}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {dayEvents.map((e) => (
                  <div key={e.id} style={{ background: "#1a1a1a", color: "#ffd700", border: "1px solid #444", borderRadius: "6px", padding: "2px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.text}</span>
                    {isAdmin && (
                      <button onClick={(ev) => { ev.stopPropagation(); removeEvent(iso, e.id); }} style={{ background: "transparent", border: "none", color: "#ff6666", cursor: "pointer" }}>×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
          <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} type="date" style={{ background: "#111", color: "white", border: "1px solid #444", padding: "0.35rem 0.55rem", borderRadius: "8px" }} />
          <input value={eventText} onChange={(e) => setEventText(e.target.value)} type="text" placeholder="Event title" style={{ flex: 1, minWidth: "200px", background: "#111", color: "white", border: "1px solid #444", padding: "0.35rem 0.55rem", borderRadius: "8px" }} />
          <button onClick={addEvent} style={{ background: "#ffd700", color: "black", border: "none", padding: "0.35rem 0.7rem", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Add Event</button>
        </div>
      )}
    </SectionContainer>
  );
}


