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

| Token | Value |
|--------|--------|
| Navy | `#0F172A` |
| Teal | `#18bebc` |
| Blue / Indigo | `#1E3A8A` / `#033d95` / indigo accents |
| Gold | `#f6c744` |
| Orange | `#f15a29` |

Logos and static images live under `public/assets/`.

Prefer expressive fonts already in the site (not default Inter/Roboto/Arial stacks). Keep dark navy aesthetic with teal/gold accents.

## Project layout (important paths)

```
src/
  App.tsx                 # routes + ContentProvider; /admin has no nav/footer
  content/
    types.ts              # SiteContent schema
    defaults.ts           # seed content from src/data/*
    ContentContext.tsx    # load/save/upload; merge with defaults
  data/
    content.ts            # seasons, projects, events, challenges, stats…
    team.ts               # team + journey timeline
    testimonials.ts       # voices
  lib/
    supabase.ts           # client; DEV uses Vite proxy /supabase-api
    links.ts              # SEASON3_APPLY_URL (Google Form)
  pages/
    admin/AdminPage.tsx   # CMS UI (left sidebar)
    AboutPage.tsx, ChallengesPage.tsx, ProjectsPage.tsx, …
  components/
    MediaBackground.tsx   # image or looping muted video background
    Hero.tsx, AboutStats.tsx, ChallengeSeasons.tsx, …
public/assets/            # static images (deploy with the site)
supabase/setup.sql        # DB + storage RLS setup
ADMIN.md                  # human setup checklist for Supabase
vite.config.ts            # Tailwind + /supabase-api proxy in dev
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home (hero, stats, who we are, challenges teaser, seasons, gallery, voices, contact) |
| `/about` | Mission, story, values, journey timeline, team |
| `/projects` | Project cards (cover **photo** only) |
| `/projects/:id` | Project detail (hero = **video** if set, else cover photo) |
| `/challenges` | ILM Mode challenge + agenda + previous seasons |
| `/seasons/:id` | Season story + season-specific voices |
| `/events` | Agenda-style events |
| `/register` | Season 3 apply → Google Form |
| `/admin` | Content admin (authenticated) |

There is **no** separate `/team` route — team lives on About.

## Product facts (keep consistent)

- Geography: **Uzbekistan** (not global)
- Students: **250+**
- Challenge seasons completed: **2** (Season 3 upcoming)
- Season 1 (Jan 2026): 40 participants, 28 graduates
- Season 2 (Feb–Mar 2026): 20 selected, 15 graduates
- Season 3: open / July 2026; apply URL in `src/lib/links.ts`
- Tracks: IELTS, SAT, IT (No-coding), Biology
- Major projects include: English Day Camp (Aug 2024, **30** participants), IT Bootcamp, ILM Hub Camp S3
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
- Events (CRUD)
- **Seasons** (challenge seasons CRUD — not the whole “ILM Mode” challenge blob)
- Voices (testimonials)
- Stats

Click **Save** to persist to Supabase. Content updates do not require a redeploy once Supabase is connected on the host.

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
- Images max ~12MB; videos max ~80MB (client check); raise Supabase bucket limits if needed
- Prefer short muted **MP4** for backgrounds

### Hero

- Optional `backgroundVideo` — looping muted video
- `backgroundImage` used when no video (and as video poster)

### Projects (important)

| Surface | Media |
|---------|--------|
| **Outside** — `/projects` cards, “More projects” thumbnails | Always **cover photo** |
| **Inside** — `/projects/:id` hero | **Video** if set; otherwise cover photo |

Do **not** put project videos on list cards.  
Do **not** add background video to challenge seasons (image cover only).

### Galleries

Project galleries use natural image aspect ratios (masonry / no forced crop that breaks portraits).

## Design guidelines (frontend)

When changing marketing pages:

- One strong composition per first viewport; brand-forward
- Avoid generic purple-on-white AI clichés, flat single-color only backgrounds, and card-heavy heroes
- Prefer real community photos over stock when available
- Match existing section patterns rather than inventing a new design system
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
