# NSBE Towson Chapter Website — Documentation

This document describes the tech stack, project structure, pages, layouts, and conventions used in the NSBE Towson Chapter website.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 15.5.9 (React 19.1.0) |
| **Language** | JavaScript (ES modules) |
| **UI / Components** | [Material-UI (MUI)](https://mui.com/) 7.3.1 — `Typography`, `Card`, `Grid`, etc. |
| **Styling** | Inline styles + [Tailwind CSS](https://tailwindcss.com/) 4 (PostCSS), global CSS in `src/styles/globals.css` |
| **Fonts** | [Geist](https://vercel.com/font) (sans + mono) via `next/font/google` |
| **Animation** | CSS keyframes (e.g. `calendarFadeIn`), optional [Framer Motion](https://www.framer.com/motion/) 12.x |
| **Runtime** | Node.js (server + API routes) |

- **Path alias:** `@/` resolves to `src/` (e.g. `@/components/Header`, `@/nationals/countdown`).
- **No TypeScript:** All app and component code is `.js`.

---

## Project Structure

```
nsbe-website/
├── src/
│   ├── components/       # Reusable UI components
│   ├── nationals/        # Nationals 2026–related components & data
│   ├── pages/            # Next.js pages and API routes
│   └── styles/           # Global CSS
├── public/               # Static assets (images, etc.)
├── next.config.mjs
├── package.json
└── DOCUMENTATION.md      # This file
```

**Repo root (parent of `nsbe-website/`):**

- `calendar.json` — Calendar events data (read by `/api/calendar`; path is `../calendar.json` from the app).

---

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.js` | **Home:** Single-page slider with Header, 5 sections, Contact, footer. |
| `/nationals/preview-map` | `src/pages/nationals/preview-map.js` | **Standalone Expo map:** Full-page view of the NSBE 2026 Expo floorplan iframe. |

- **Home** is the main experience: one scrollable view with a **section slider** (left/right arrows). No separate routes for each section.
- **Preview map** is a dedicated page for the expo map only (e.g. deep links, sharing).

---

## Layouts

### App shell (`_app.js` + `_document.js`)

- **`_document.js`** — HTML shell: `<Html>`, `<Head>`, `<body className="antialiased">`, `<Main />`, `<NextScript />`.
- **`_app.js`** — Wraps every page:
  - Imports `@/styles/globals.css`.
  - **Countdown:** Renders `Countdown` from `@/nationals/countdown` **only when not on home** (`router.pathname !== "/"`). On home, the countdown is rendered inside the Header.
  - Renders `<Component {...pageProps} />` for the active page.

### Home page layout (`index.js`)

1. **Full-viewport wrapper**
   - `minHeight: 100vh`, flex column, centered content, dark gradient overlay (gold tint + black).
   - Font: `var(--font-geist-sans)`.

2. **Header** (`Header` component)
   - “Welcome to the NSBE Towson Chapter!” (gold gradient, hover effects).
   - On home only: **Countdown** and **REGISTER NOW!** link below the welcome text.

3. **Slider content**
   - One visible section at a time: `sections[currentSection]`.
   - Sections wrapped in a div with class `slider-page-fade` (fade-in on section change).
   - Outer container: `slider-content` — responsive scaling (see **globals.css**).

4. **Left/right arrows**
   - Fixed position; navigate between sections; disabled at first/last section.

5. **Contact block**
   - “Contact Us” + `nsbetowson@gmail.com`, gold border, full width (max 1200px).

6. **Footer**
   - Copyright: “© {year} NSBE Towson Chapter. All rights reserved.”

### Section layout (shared pattern)

Each **section** on the home page follows this pattern:

- Wrapped in **`SectionContainer`** (see below).
- Title via **`PolishedText`** (gold gradient, responsive `clamp()` font size).
- Content: MUI + inline styles; gold (`#ffd700`) and white as accent colors; dark backgrounds.

**`SectionContainer`** (`src/components/SectionContainer.js`):

- `maxWidth: 1200px`, `height: 80.5vh`, `minHeight: 600px`.
- Background: gradient `rgba(255,215,0,0.12)` → `rgba(0,0,0,0.7)`; border `3px solid white`; `borderRadius: 18px`.
- Inner scroll: `flex: 1`, `minHeight: 0`, `overflowY: auto`, class `hide-scrollbar`.

---

## Home Page Sections (order)

Sections are rendered in this order (slider index 0 → 4):

| Index | Component | Key | Content |
|-------|-----------|-----|--------|
| 0 | `InfoSection` | `info` | “What is NSBE?”, “Our Mission”, meeting times, group/mission images. |
| 1 | `NationalsMap` | `nationals` | “NSBE Nationals 2026 — Expo & Companies”: PreviewMap iframe + “Companies at the Expo” box (from `companyguide.csv`). |
| 2 | `CalendarSection` | `cal` | “Chapter Events Calendar”: month navigator, events-from-JSON, “Events this month” summary, calendar grid. |
| 3 | `ExpectSection` | `expect` | “What to Expect”: three cards (Technical Workshops, Professional Development, Supportive Community / Discord). |
| 4 | `BoardSection` | `board` | “Meet the Board Members”: grid of board members (headshots, names, positions, LinkedIn). |

---

## Format & Conventions

### Styling

- **Primary accent:** Gold `#ffd700` (borders, links, highlights).
- **Backgrounds:** Dark (`#0a0a0a`, `#111`, `rgba(0,0,0,0.7)`).
- **Text:** White or light gray; section titles use **PolishedText** (gradient + drop shadow).
- **Responsive text:** `clamp(minSize, vw, maxSize)` (e.g. `clamp(1rem, 2.2vw, 1.4rem)`).
- **Responsive layout:** `globals.css` media queries for `.slider-content` (scale) and `.slider-arrow` (padding/position).

### Components

- **PolishedText** — Gradient title component: `as` (tag), `minSize`, `maxSize`, `align`, hover scale/shadow.
- **SectionContainer** — Standard section wrapper (size, scroll, border, gradient).
- **Header** — Welcome line + optional countdown (home only).

### Data

- **Calendar:** Events live in repo-root `calendar.json`; shape `{ "events": [ { "id", "date", "title" } ] }`. Same `id` across dates is grouped in the “Events this month” summary (e.g. “Mar 15–22”).
- **Companies:** `src/nationals/companyguide.csv` — parsed by `/api/companyguide` and shown in **NationalsMap** grouped by industry.
- **Board/Expect:** Data is in-component (e.g. `boardMembers` and `expectItems` in `index.js` / `ExpectSection.js`).

### Animations

- **Section change:** `.slider-page-fade` uses `calendarFadeIn` (opacity 0→1, translateY 6px→0, 0.3s ease-out).
- **Calendar month change:** `.calendar-month-fade` uses the same `calendarFadeIn` keyframes.

---

## API Routes

| Method | Route | File | Description |
|--------|-------|------|-------------|
| GET | `/api/calendar` | `src/pages/api/calendar.js` | Returns JSON from `../calendar.json` (repo root). |
| POST | `/api/calendar` | same | Adds an event (body: `date`, `title`). Requires header `x-admin-token` (or body `token`) matching `NEXT_PUBLIC_ADMIN_TOKEN`. |
| GET | `/api/companyguide` | `src/pages/api/companyguide.js` | Reads `src/nationals/companyguide.csv`, parses CSV (handles quoted fields), returns `{ companies, byIndustry }`. |
| GET | `/api/hello` | `src/pages/api/hello.js` | Example API route. |
| (other) | `/api/login` | `src/pages/api/login.js` | Login-related API (see file for method/behavior). |

---

## Key Files Reference

| Path | Purpose |
|------|--------|
| `src/pages/_app.js` | App wrapper, global countdown for non-home routes. |
| `src/pages/_document.js` | HTML document shell. |
| `src/pages/index.js` | Home: sections array, slider state, layout, Contact, footer. |
| `src/pages/nationals/preview-map.js` | Standalone Expo map page. |
| `src/components/Header.js` | Welcome title + countdown (on home). |
| `src/components/SectionContainer.js` | Section wrapper (size, scroll, style). |
| `src/components/PolishedText.js` | Gradient section titles. |
| `src/components/InfoSection.js` | What is NSBE / Mission / meetings. |
| `src/components/nationalsMap.js` | Nationals section: PreviewMap + company list from API. |
| `src/components/CalendarSection.js` | Calendar + events from `/api/calendar`. |
| `src/components/ExpectSection.js` | What to Expect cards. |
| `src/components/BoardSection.js` | Board member grid. |
| `src/nationals/countdown.js` | Countdown to NSBE Nationals + “REGISTER NOW!” link. |
| `src/nationals/previewMap.js` | Expo floorplan iframe (nsbe2026.expofp.com). |
| `src/styles/globals.css` | Tailwind import, CSS variables, slider/arrow/fade styles. |
| `calendar.json` (repo root) | Calendar events source. |
| `src/nationals/companyguide.csv` | Company list for Nationals (industry, name, etc.). |

---

## Running the Project

- **Install:** `npm install`
- **Dev:** `npm run dev` (e.g. http://localhost:3000)
- **Build:** `npm run build`
- **Start (prod):** `npm start`

Calendar API expects `calendar.json` at the repository root (one level above `nsbe-website/`). Company guide is read from `src/nationals/companyguide.csv` by the API route.
