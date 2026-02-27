import fs from "fs";
import path from "path";

function parseCSVLine(line) {
  const result = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let end = i + 1;
      let s = "";
      while (end < line.length) {
        if (line[end] === '"' && line[end + 1] === '"') {
          s += '"';
          end += 2;
        } else if (line[end] === '"') {
          end++;
          break;
        } else {
          s += line[end];
          end++;
        }
      }
      result.push(s);
      i = end;
      if (line[i] === ",") i++;
    } else {
      let end = line.indexOf(",", i);
      if (end === -1) end = line.length;
      result.push(line.slice(i, end).trim());
      i = end + 1;
    }
  }
  return result;
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }
  try {
    const dataPath = path.join(process.cwd(), "src", "nationals", "companyguide.csv");
    const text = fs.readFileSync(dataPath, "utf-8");
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) {
      return res.status(200).json({ companies: [], byIndustry: {} });
    }
    const header = parseCSVLine(lines[0]);
    const companies = [];
    const byIndustry = {};
    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      const num = row[0];
      const industry = (row[1] || "").trim();
      const companyName = (row[2] || "").trim();
      const employees = (row[3] || "").trim();
      const focusKeywords = (row[4] || "").trim();
      const mission = (row[5] || "").trim();
      if (!companyName) continue;
      const company = {
        id: num,
        industry,
        companyName,
        employees,
        focusKeywords,
        mission,
      };
      companies.push(company);
      if (industry) {
        if (!byIndustry[industry]) byIndustry[industry] = [];
        byIndustry[industry].push(company);
      }
    }
    return res.status(200).json({ companies, byIndustry });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to read company guide" });
  }
}
