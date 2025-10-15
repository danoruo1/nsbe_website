export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { username, password } = req.body || {};
  const ADMIN_USER = process.env.ADMIN_USERNAME || "";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";
  const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

  if (!ADMIN_USER || !ADMIN_PASS || !ADMIN_TOKEN) {
    return res.status(500).json({ error: "Server not configured" });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ token: ADMIN_TOKEN });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}


