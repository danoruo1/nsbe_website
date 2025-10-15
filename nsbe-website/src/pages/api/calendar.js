import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "calendar.json");
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "changeme";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const json = fs.readFileSync(dataPath, "utf-8");
      const data = JSON.parse(json);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: "Failed to read calendar" });
    }
  }

  if (req.method === "POST") {
    const token = req.headers["x-admin-token"] || req.body?.token;
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { date, title } = req.body || {};
    if (!date || !title || typeof title !== "string") {
      return res.status(400).json({ error: "Missing date or title" });
    }
    try {
      const json = fs.readFileSync(dataPath, "utf-8");
      const data = JSON.parse(json || "{\"events\":[]}");
      const events = Array.isArray(data.events) ? data.events : [];
      const newEvent = { id: `${Date.now()}`, date, title: title.trim() };
      events.push(newEvent);
      fs.writeFileSync(dataPath, JSON.stringify({ events }, null, 2), "utf-8");
      return res.status(201).json({ ok: true, event: newEvent });
    } catch (e) {
      return res.status(500).json({ error: "Failed to write calendar" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end("Method Not Allowed");
}


