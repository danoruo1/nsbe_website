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
  const monthKey = `${currentYear}-${currentMonth}`;

  // Aggregate events for the current month, grouping multi-day events by id.
  // Use string-based month matching to avoid timezone shifts.
  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
  const monthEvents = Object.entries(eventsByDate)
    .flatMap(([dateStr, events]) => {
      if (!dateStr.startsWith(currentMonthKey)) return [];
      return events.map((e) => ({ ...e, date: dateStr }));
    })
    .reduce((acc, evt) => {
      const key = evt.id || `${evt.date}-${evt.text}`;
      const existing = acc[key];
      if (!existing) {
        acc[key] = {
          id: key,
          text: evt.text,
          startDate: evt.date,
          endDate: evt.date,
        };
      } else {
        if (evt.date < existing.startDate) existing.startDate = evt.date;
        if (evt.date > existing.endDate) existing.endDate = evt.date;
      }
      return acc;
    }, {})
  ;

  const monthEventList = Object.values(monthEvents).sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  return (
    <SectionContainer style={{ color: "white" }}>
      <PolishedText as={"h2"} minSize="1.1rem" maxSize="1.9rem">Chapter Events Calendar</PolishedText>

      <div key={monthKey} className="calendar-month-fade">
        {/* Monthly event summary box */}
        <div
          style={{
            marginTop: "0.4rem",
            marginBottom: "0.8rem",
            padding: "0.6rem 0.8rem",
            borderRadius: "10px",
            background: "rgba(0, 0, 0, 0.7)",
            border: "1px solid #ffd700",
            minHeight: "140px",
            maxHeight: "140px",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ color: "#ffd700", fontWeight: "bold", marginBottom: "0.3rem" }}
          >
            Events this month
          </Typography>
          {monthEventList.length === 0 ? (
            <Typography variant="body2" style={{ color: "#ccc" }}>
              No events scheduled for this month yet.
            </Typography>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {monthEventList.map((e) => {
                const [sy, sm, sd] = e.startDate.split("-").map(Number);
                const [ey, em, ed] = e.endDate.split("-").map(Number);
                const start = new Date(sy, sm - 1, sd);
                const end = new Date(ey, em - 1, ed);

                const sameDay = e.startDate === e.endDate;
                const label = sameDay
                  ? start.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : `${start.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}–${end.toLocaleDateString(undefined, {
                      day: "numeric",
                    })}`;

                return (
                  <li key={e.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: "#ffd700", minWidth: "3.5rem" }}>{label}</span>
                    <span style={{ color: "white", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {e.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          <button onClick={goPrev} disabled={!canGoPrev()} style={{ background: "transparent", border: "1px solid #ffd700", color: canGoPrev() ? "#ffd700" : "#777", padding: "0.35rem 0.6rem", borderRadius: "8px", cursor: canGoPrev() ? "pointer" : "not-allowed" }}>Prev</button>
          <Typography variant="h5" style={{ color: "white", fontSize: "clamp(1rem, 2.2vw, 1.4rem)" }}>{monthLabel}</Typography>
          <button onClick={goNext} disabled={!canGoNext()} style={{ background: "transparent", border: "1px solid #ffd700", color: canGoNext() ? "#ffd700" : "#777", padding: "0.35rem 0.6rem", borderRadius: "8px", cursor: canGoNext() ? "pointer" : "not-allowed" }}>Next</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", width: "100%" }}>
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
                  minHeight: "90px",
                  height: "11vh",
                  maxHeight: "120px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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


