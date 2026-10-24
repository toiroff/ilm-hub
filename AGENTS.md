# AGENTS.md — ILM Hub

Guidance for AI agents and developers working on this repository.

## What this project is

**ILM Hub** is a premium marketing / storytelling / registration website for an Uzbekistan education initiative (not a learning platform).

- Built by students, for students
- Focus: discipline challenges, camps, community, registration
- Live content is editable via `/admin` (Supabase-backed CMS)

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion**, **React Router**, **Lucide**
- **Supabase** — auth, JSON content store, media uploads

### Commands

```bash
npm run dev       # local development
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # oxlint
```

### Environment

Copy `.env.example` → `.env` (never commit `.env`):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Use the real project URL — **not** the placeholder `YOUR_PROJECT`.  
After changing `.env`, restart `npm run dev`.

## Brand

Palette is derived from the logo and the ILM Hub app (`public/assets/app-home.png`): deep navy, confident blue, signature orange, cool light tint. Tokens live in `@theme` in `src/index.css`.

| Token | Value | Use |
|--------|--------|-----|
| `canvas` / `tint` | `#FFFFFF` / `#F3F6FB` | Page / alternating section background |
| `ink` / `ink-soft` / `ink-faint` | `#0B1220` / `#4A5468` / `#8A93A6` | Headings, body, captions |
| `line` | `#E3E8F0` | Hairline dividers and borders |
| `navy` / `navy-2` / `navy-deep` | `#0E1B3D` / `#172A57` / `#0A1430` | Dark sections (challenge, timeline, closing CTA), footer |
| `blue` / `blue-hover` / `blue-soft` | `#2457D6` / `#1C47B4` / `#E8EEFC` | Primary buttons, headline accent words, links, focus |
| `accent` / `accent-ink` / `accent-soft` | `#FF5E00` / `#B94400` / `#FFF1E8` | Orange accent: eyebrow marker, numbers, ceremonies, progress bars — never body text |

Logos and static images live under `public/assets/`.

Visual direction (Oct 2026 redesign, inspired by voicelab.uz, topcoachuni.com, unicraft.uz, openai.com): photo-led, editorial, confident. One typeface — **Onest** (renders the Uzbek ʻ natively) — bold and tightly tracked for headlines (`.h-display`, `.h-section`). Buttons are 12px-radius rectangles (`Button` variants `primary`, `secondary`, `inverse`, `ghost-inverse`). White / tint / navy sections alternate for rhythm; no gradients, glows or blobs. The home hero and `PageHeader` sit on a faint square grid (`.bg-grid`); the home hero shows one large + two small photos. The navbar turns into a floating rounded pill once the page scrolls (like voicelab.uz). Motion is limited to hover states, the FAQ accordion and the homepage graduate-opinions strip (two endlessly scrolling rows, `.marquee` in `index.css`; pauses on hover, static for reduced-motion users). `/admin` uses the same light style (white panels on `tint`, blue primary buttons, navy for the selected item, orange only for destructive actions) and still has no site Navbar/Footer.

## Project layout (important paths)

```
src/
  App.tsx                 # routes + ContentProvider; /admin has no nav/footer
  content/
    types.ts              # SiteContent schema
    defaults.ts           # seed content from src/data/*
    ContentContext.tsx    # load/save/upload; merge with defaults
  data/
    content.ts            # seasons, projects, challenges, stats…
    team.ts               # team + journey timeline
    testimonials.ts       # voices
  lib/
    supabase.ts           # client; DEV uses Vite proxy /supabase-api
    links.ts              # HABIT_ZONE_URL / _DOWNLOAD_URL / _PRIVACY_URL (Habit Zone site on Vercel)
    tracks.ts             # challenge tracks list
  pages/
    admin/AdminPage.tsx   # CMS UI (left sidebar)
    AboutPage.tsx, ChallengesPage.tsx, ProjectsPage.tsx, HabitZonePage.tsx, …
  components/
    MediaBackground.tsx   # image or looping muted video background
    Hero.tsx              # headline + stats + photo bento (CMS hero image/video, Habit Zone tile)
    HabitZone.tsx         # Phone (screenshot in a phone frame) + HabitZoneSection (homepage app section)
    HomeSections.tsx      # WhatWeDo, Challenge (+ ChallengeCalendar), Seasons, FeaturedProject, Voices, Team, Faq, ClosingCta
    PageHeader.tsx        # PageHeader (optional image / aside), SectionHeading, DetailRow
    CoverImage.tsx        # image with branded fallback for dead URLs
public/assets/            # static images (deploy with the site)
supabase/setup.sql        # DB + storage RLS setup
ADMIN.md                  # human setup checklist for Supabase
vite.config.ts            # Tailwind + /supabase-api proxy in dev
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home: hero → **What is ILM Mode?** (definition, facts, rhythm, calendar) → **What graduates say** → what we do → seasons → featured project → Habit Zone → team → FAQ → closing CTA |
| `/about` | Mission, story, values, journey timeline, team |
| `/projects` | Project cards (cover **photo** only) |
| `/projects/:id` | Project detail (hero = **video** if set, else cover photo) |
| `/challenges` | ILM Mode challenge + agenda + previous seasons |
| `/seasons/:id` | Season story + season-specific voices |
| `/events` | Removed — redirects to `/challenges` |
| `/register` | "Season 3 has ended" + what a season includes → Habit Zone (next-season applications not open) |
| `/habit-zone` | Habit Zone app page (screens, points, groups); downloads go to the Habit Zone site |
| `/admin` | Content admin (authenticated) |

There is **no** separate `/team` route — team lives on About.

## Product facts (keep consistent)

- Geography: **Uzbekistan** (not global)
- Students: **250+**
- Challenge seasons completed: **3** (Season 3 ended; next season not announced — no apply link)
- Season 1 (Jan 2026): 40 participants, 28 graduates — **70% completion**
- Season 2 (Feb–Mar 2026): 20 selected, 15 graduates — **75% completion**
- **Public pages show season results as rates (completion %, satisfaction %), never raw participant/graduate counts** (`SeasonRates` in `HomeSections.tsx`)
- Main team (shown large, `LeadCard` in `src/components/Team.tsx`): Muhammadumar (Founder & CEO) and Anvarjon Xolmirzayev (Mentor & Finance). Suhrob is no longer on the team — don't add him back
- Season 3 voices: Nargiza Keldiyeva (Telegram) and Murodbek Tuychiyev (public LinkedIn post, linked via the optional testimonial `link`). The Challenges page shows a real Season 3 review sheet (`public/assets/challenge/daily-review-sheet.jpg`) with **names blurred** — it is private, never publish an unredacted copy
- Season 3: July 2026, ended. Its results are not in `seasons` yet — add them in /admin → Seasons when known, never invent them
- **Habit Zone**: ILM Hub's habit app (Android, free, no ads; iPhone in preparation). 40 challenges in 9 categories, 21 or 30 days; +5 per task, +10 perfect day, −15 missed day; days close 23:59 Tashkent. Source app: `Desktop/App`; its site: `Desktop/habit-zone-website` → https://habit-zone.vercel.app (hosts the APK). Screenshots copied to `public/assets/habit-zone/` — refresh them from that site's `assets/screens/*-light.png`
- Tracks: IELTS, SAT, IT (No-coding), Biology
- Major projects include: English Day Camp (Aug 2024, **30** participants), IT Bootcamp, ILM Hub Camp S3
- IT Bootcamp: **May 2025**. Speakers: Elzodxon Sharofaddinov (founder of AISHA AI), Asadbek Rahimov (AI engineer & Python, 6+ yrs), Farrux Adxamov (frontend developer, 3+ yrs). After the session participants got a roadmap and daily tasks to learn Frontend and Backend. Speaker photos: `public/assets/projects/it-bootcamp/` (cropped from the event poster). Projects take an optional `speakers` list (shown on `/projects/:id`; data-only, no admin UI yet)
- ILM HUB Camp S3: **Fergana, November 2025**, college admissions camp (Study in Europe/USA, foreign grants & El-yurt umidi, girls in IT, networking, pizza/coffee, certificates). Speakers: Saidamir Egamberdiev (FLEX’23, Clarkson University, founder of educateduz.com) and Gulnoza Xamidova (University of Aberdeen graduate; Fulbright TEA, ITEC, EYUF). Video + cover + gallery frames live in `public/assets/projects/ilm-hub-camp-s3/` (frames were captured from `camp-s3.mp4`)
- This is an info/storytelling site, not an LMS

## Content architecture

### Defaults vs live CMS

1. **Defaults** — `src/data/*` → assembled in `src/content/defaults.ts`
2. **Live** — Supabase table `site_content` row `id = 'main'`, JSON column `data`
3. Public pages read via `useSiteContent()` from `ContentProvider`
4. If Supabase is missing/unreachable, the site still works with defaults

When adding editable fields:

1. Extend `SiteContent` in `src/content/types.ts`
2. Seed in `src/content/defaults.ts`
3. Merge in `ContentContext` `mergeContent()`
4. Add admin UI in `AdminPage.tsx`
5. Wire the public page/component to `useSiteContent()`

### Admin sidebar sections

- Hero (text + background image + **background video**)
- About
- Who We Are (texts + photos)
- Team (leads + members, photos)
- Projects (CRUD; cover photo + detail video + gallery)
- **Seasons** (challenge seasons CRUD — not the whole “ILM Mode” challenge blob)
- Voices (testimonials)
- Stats

Click **Save** to persist to Supabase. Content updates do not require a redeploy once Supabase is connected on the host.

Saved content always replaces the built-in defaults. When defaults change in code (new people, projects, quotes…), use **Reset section** in the admin header to pull the built-in EN + UZ version of that section, then Save.

### Dev proxy note

In development, Supabase calls go through Vite proxy path `/supabase-api` (see `src/lib/supabase.ts` + `vite.config.ts`) so browsers/firewalls that block `*.supabase.co` still work. Production builds use `VITE_SUPABASE_URL` directly.

**Important:** Prefer values from the project `.env` file over machine-wide env placeholders like `YOUR_PROJECT`.

## Media conventions

### Static assets

- Put committed images in `public/assets/…`
- Reference as `/assets/...`
- They ship with `npm run build` into `dist/`

### CMS uploads

- Uploaded via admin → Supabase Storage bucket **`media`** (public)
- Images max 12MB; videos max 50MB (Free plan file limit — client check + `media` bucket limit in `supabase/setup.sql`)
- Prefer short muted **MP4** for backgrounds

### Hero

- Optional `backgroundVideo` — looping muted video
- `backgroundImage` used when no video (and as video poster)

### Projects (important)

| Surface | Media |
|---------|--------|
| **Outside** — `/projects` cards, “More projects” thumbnails | Always **cover photo** |
| **Inside** — `/projects/:id` header | **Video** (with controls, beside the title) if set; otherwise cover photo |

Do **not** put project videos on list cards.  
Do **not** add background video to challenge seasons (image cover only).

### Galleries

Project galleries use natural image aspect ratios (masonry / no forced crop that breaks portraits).

## Design guidelines (frontend)

When changing marketing pages:

- Lead with real community photography, presented large (editorial image/text rows, bento grids) — never as tiny thumbnails, never stock
- Use `PageHeader` for inner pages (pass `image` or `aside` for a split header), `DetailRow` for label/text content, and `ClosingCta` as the closing call to action
- Alternate white / `tint` / `navy` sections; avoid repeated three-card grids and decorative shapes
- Blue highlights one phrase per headline; orange is a small accent (eyebrow marker, numbers, ceremonies), not a fill
- Stats come only from `content.stats` / seasons data — never invent numbers or quotes
- New homepage copy goes through `src/i18n/messages.ts` (`home.*` keys) for EN + UZ
- Mobile + desktop both matter

## Supabase setup (summary)

Full steps: **`ADMIN.md`**.

1. Create Supabase project → copy URL + **anon** key to `.env`
2. Run `supabase/setup.sql` in SQL Editor
3. Confirm Storage bucket `media` is public
4. Auth → Email provider ON → Add user (admin login)
5. Open `/admin`, sign in, edit, Save

### Troubleshooting “Failed to fetch”

- Wrong localhost port (use the URL Vite prints)
- `.env` still has `YOUR_PROJECT` placeholder
- Project paused / Email auth off
- Ad-block / network blocking Supabase
- Didn’t restart Vite after `.env` change

## SEO

- Live address: **https://www.ilm-hub.uz** (the bare `ilm-hub.uz` should redirect to www). Used in `index.html` (canonical, Open Graph, JSON-LD), `public/robots.txt`, `public/sitemap.xml` and `src/components/PageMeta.tsx`
- `PageMeta` sets a unique `<title>`, description and canonical per route (EN + UZ); add new routes to its `pages` map and to `sitemap.xml`
- Icons in `public/` (`favicon.ico`, `icon-*.png`, `apple-touch-icon.png`, `site.webmanifest`) are generated from `public/assets/logo-icon.png`. Google needs a square icon ≥48×48 for the search-result logo
- JSON-LD in `index.html` declares the site name and logo (`WebSite` + `EducationalOrganization`)

## Deployment

1. Ensure `.env` (or host env vars) has real Supabase keys on the deploy target
2. `npm run build`
3. Deploy **`dist/`** (includes `public/` assets)
4. Photos in `public/assets` deploy with the site; CMS photos/videos load from Supabase Storage

There is **no** separate backend server — static hosting + Supabase is enough.

## Agent do / don’t

**Do**

- Prefer editing CMS schema + admin + `useSiteContent()` over hardcoding page copy when the field should be editable
- Keep Uzbekistan / Season 3 / participant numbers consistent across pages
- Preserve photo-outside / video-inside for projects
- Keep `/admin` free of main site Navbar/Footer
- After structural content changes, run `npm run build` to verify TypeScript

**Don’t**

- Commit `.env` or service_role keys
- Replace real Supabase URLs with `YOUR_PROJECT` placeholders
- Add a separate Team page unless requested
- Turn this into a learning platform / course player
- Force-crop portrait gallery photos into landscape frames
- Put season background videos back unless the user asks

## Related docs

- `ADMIN.md` — Supabase admin setup for humans
- `supabase/setup.sql` — schema + RLS + storage policies
- `.env.example` — required Vite env vars
