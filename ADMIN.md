# Admin panel setup (Supabase)

The site works without Supabase (uses built-in content).  
To edit texts and photos from `/admin`, connect a free Supabase project:

## 1. Create project
1. Go to [https://supabase.com](https://supabase.com) → New project
2. Open **Project Settings → API**
3. Copy **Project URL** and **anon public** key into `.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## 2. Database + storage
1. Open **SQL Editor** in Supabase
2. Paste and run `supabase/setup.sql`
3. Confirm Storage has a public bucket named `media`

## 3. Admin user
1. **Authentication → Users → Add user**
2. Create with email + password (this is your admin login)

## 4. Use the panel
1. Restart `npm run dev`
2. Open `/admin`
3. Sign in → edit About, Who We Are, Team, Projects, Stats → **Save**

## Troubleshooting “Failed to fetch”
1. Restart the app after saving `.env`: stop terminal → `npm run dev`
2. Open the **exact** Local URL Vite prints (e.g. `http://localhost:5174/admin`)
3. In Supabase dashboard, confirm the project is **Active** (not paused)
4. **Authentication → Providers → Email** → enable Email
5. **Authentication → Users → Add user** (auto-confirm / no email confirm needed)
6. Temporarily disable ad-block / privacy extensions on localhost
7. Try another browser or network (some ISPs block Supabase)