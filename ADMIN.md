# Admin panel setup (Supabase)

The site works without Supabase: it shows its built-in content.
To edit texts, photos and videos from `/admin`, connect a free Supabase project.

## 1. Create the project
1. Go to [supabase.com](https://supabase.com) → **New project**
   - Name: `ilm-hub`
   - Region: **Central EU (Frankfurt)** — the closest fast region for Uzbekistan
   - Save the database password somewhere safe (you rarely need it)
2. Wait until the project shows as **Active**

## 2. Database, storage and admin list
1. Open **SQL Editor** → **New query**
2. Paste all of `supabase/setup.sql`
3. In step 5 at the bottom, replace `admin@example.com` with the email you will sign in with
4. Click **Run** — it should finish with "Success. No rows returned"

This creates:
- `site_content` — the site's text and media links (everyone can read, only admins can write)
- `site_admins` — the emails allowed to edit; add a row here for every extra admin
- a public `media` storage bucket for uploads (50 MB per file, images and videos only)

To add another admin later, run in the SQL Editor:

```sql
insert into public.site_admins (email) values (lower('name@example.com'));
```

## 3. Admin login
1. **Authentication → Users → Add user → Create new user**
2. Use the same email as in `site_admins`, set a password, keep **Auto Confirm User** on
3. Recommended: **Authentication → Sign In / Providers → Email** → turn off **Allow new users to sign up**,
   so nobody else can create an account

## 4. Connect the website
1. **Project Settings → API Keys** → copy the **Project URL** and the **publishable** (or legacy **anon**) key
2. Put them in `.env` (never commit this file):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...   # or the legacy eyJhbGciOi... anon key
```

3. Add the same two variables in **Vercel → ilm-hub → Settings → Environment Variables**
   (Production, Preview and Development), then redeploy
4. Never use the **secret** / `service_role` key in the website

## 5. Use the panel
1. Restart `npm run dev`, open `/admin`, sign in
2. Edit, then click **Save** (top right). The first Save stores the current content in Supabase;
   after that, the site always shows what is saved there

## Troubleshooting
- **"This account is not allowed to edit the site"** — the email is missing from `site_admins` (step 2)
- **"Failed to fetch"** — restart `npm run dev` after changing `.env`; open the exact URL Vite prints;
  check the project is Active (not paused); disable ad-block on localhost; some networks block
  `*.supabase.co` (in development the app goes through the `/supabase-api` proxy to avoid this)
- **Upload fails** — files must be under 50 MB (videos) or 12 MB (images)
- **Free projects pause after a week without activity** — open the Supabase dashboard and click Restore
