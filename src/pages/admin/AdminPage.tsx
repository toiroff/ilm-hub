import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  FileText,
  Flame,
  FolderKanban,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareQuote,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Users,
  BarChart3,
  Info,
  Images,
} from 'lucide-react'
import { useSiteContent } from '../../content/ContentContext'
import type { GalleryItem, GalleryItemType, SiteContent } from '../../content/types'
import type { EventItem, Project, Season } from '../../data/content'
import type { TeamMember } from '../../data/team'
import type { Testimonial } from '../../data/testimonials'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import type { Session } from '@supabase/supabase-js'

type Tab =
  | 'hero'
  | 'about'
  | 'who'
  | 'team'
  | 'projects'
  | 'events'
  | 'challenges'
  | 'gallery'
  | 'voices'
  | 'stats'

const tabs: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: 'hero', label: 'Hero', icon: Sparkles },
  { id: 'about', label: 'About', icon: Info },
  { id: 'who', label: 'Who We Are', icon: LayoutDashboard },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'challenges', label: 'Seasons', icon: Flame },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'voices', label: 'Voices', icon: MessageSquareQuote },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
]

function Field({
  label,
  value,
  onChange,
  rows,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium tracking-wide text-white/45 uppercase">
        {label}
      </span>
      {rows ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-y rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none transition focus:border-teal/50"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none transition focus:border-teal/50"
        />
      )}
      {hint ? <span className="text-xs text-white/35">{hint}</span> : null}
    </label>
  )
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onUpload: (file: File) => Promise<void>
}) {
  const [uploading, setUploading] = useState(false)

  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-medium tracking-wide text-white/45 uppercase">
        {label}
      </p>
      {value ? (
        <img
          src={value}
          alt=""
          className="h-32 w-full rounded-xl object-cover object-center"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-white/35">
          No image yet
        </div>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload below"
        className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none focus:border-teal/50"
      />
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-teal/40 hover:text-white">
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ImagePlus className="h-3.5 w-3.5" />
        )}
        Upload photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            setUploading(true)
            await onUpload(file)
            setUploading(false)
            e.target.value = ''
          }}
        />
      </label>
    </div>
  )
}

function VideoField({
  label,
  value,
  onChange,
  onUpload,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onUpload: (file: File) => Promise<void>
  hint?: string
}) {
  const [uploading, setUploading] = useState(false)

  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-medium tracking-wide text-white/45 uppercase">
        {label}
      </p>
      {value ? (
        <video
          src={value}
          className="h-36 w-full rounded-xl object-cover bg-black"
          muted
          controls
          playsInline
        />
      ) : (
        <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-white/35">
          No video yet — image background will be used
        </div>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Video URL (.mp4) or upload below"
        className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none focus:border-teal/50"
      />
      {hint ? <p className="text-xs text-white/35">{hint}</p> : null}
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-teal/40 hover:text-white">
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ImagePlus className="h-3.5 w-3.5" />
          )}
          Upload video
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setUploading(true)
              await onUpload(file)
              setUploading(false)
              e.target.value = ''
            }}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="inline-flex items-center gap-1 rounded-full border border-orange/30 px-3 py-1.5 text-xs text-orange"
          >
            <Trash2 className="h-3 w-3" /> Clear video
          </button>
        ) : null}
      </div>
    </div>
  )
}

function Panel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="mb-5 border-b border-white/8 pb-4">
        <h2 className="font-display text-xl font-bold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-white/45">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function AdminPage() {
  const { content, loading, saveContent, uploadImage, refresh } =
    useSiteContent()
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [draft, setDraft] = useState<SiteContent>(content)
  const [tab, setTab] = useState<Tab>('projects')
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [projectId, setProjectId] = useState(content.projects[0]?.id ?? '')
  const [eventId, setEventId] = useState(content.events[0]?.id ?? '')
  const [seasonId, setSeasonId] = useState(content.seasons[0]?.id ?? '')
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }
    void supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => {
        setAuthError(
          'Cannot reach Supabase. Check internet / ad-block / project status.',
        )
      })
      .finally(() => setAuthLoading(false))

    const { data: sub } = supabase.auth.onAuthStateChange((_e, next) => {
      setSession(next)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Only sync draft when saved content from server changes — NOT when ids change
  useEffect(() => {
    setDraft(structuredClone(content))
    setProjectId((prev) =>
      content.projects.some((p) => p.id === prev)
        ? prev
        : (content.projects[0]?.id ?? ''),
    )
    setEventId((prev) =>
      content.events.some((e) => e.id === prev)
        ? prev
        : (content.events[0]?.id ?? ''),
    )
    setSeasonId((prev) =>
      content.seasons.some((s) => s.id === prev)
        ? prev
        : (content.seasons[0]?.id ?? ''),
    )
    setVoiceIndex(0)
    setGalleryIndex(0)
  }, [content])

  const selectedProject = useMemo(
    () => draft.projects.find((p) => p.id === projectId) ?? null,
    [draft.projects, projectId],
  )

  const selectedEvent = useMemo(
    () => draft.events.find((e) => e.id === eventId) ?? null,
    [draft.events, eventId],
  )

  const selectedSeason = useMemo(
    () => draft.seasons.find((s) => s.id === seasonId) ?? null,
    [draft.seasons, seasonId],
  )

  const selectedVoice = draft.testimonials[voiceIndex] ?? null
  const selectedGallery = draft.gallery[galleryIndex] ?? null

  const updateGalleryItem = (patch: Partial<GalleryItem>) => {
    if (!selectedGallery) return
    const id = selectedGallery.id
    setDraft((d) => ({
      ...d,
      gallery: d.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    }))
  }

  const updateProject = (patch: Partial<Project>) => {
    if (!selectedProject) return
    const id = selectedProject.id
    setDraft((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }

  const updateEvent = (patch: Partial<EventItem>) => {
    if (!selectedEvent) return
    const id = selectedEvent.id
    setDraft((d) => ({
      ...d,
      events: d.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }

  const updateSeason = (patch: Partial<Season>) => {
    if (!selectedSeason) return
    const id = selectedSeason.id
    setDraft((d) => ({
      ...d,
      seasons: d.seasons.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  }

  const updateVoice = (patch: Partial<Testimonial>) => {
    setDraft((d) => {
      const testimonials = [...d.testimonials]
      if (!testimonials[voiceIndex]) return d
      testimonials[voiceIndex] = { ...testimonials[voiceIndex], ...patch }
      return { ...d, testimonials }
    })
  }

  const addProject = () => {
    const id = `project-${Date.now()}`
    const next: Project = {
      id,
      title: 'New project',
      summary: 'Short summary of this project.',
      description: 'Longer description for the project page.',
      cover: '',
      backgroundVideo: '',
      season: 'Project',
      date: '2026',
      location: 'In-person',
      participants: 0,
      category: 'Camp',
      featured: true,
      highlights: ['Highlight 1'],
      overview: 'Overview of what happened and why it mattered.',
      activities: ['Activity 1'],
      outcomes: ['Outcome 1'],
      gallery: [],
    }
    setDraft((d) => ({ ...d, projects: [...d.projects, next] }))
    setProjectId(id)
    setStatus('New project created — edit details, then Save.')
  }

  const addEvent = () => {
    const id = `event-${Date.now()}`
    const next: EventItem = {
      id,
      title: 'New event',
      date: 'TBD',
      time: 'Online',
      type: 'Meeting',
      location: 'Google Meet',
      description: 'Describe this event…',
      featured: false,
      cover:
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    }
    setDraft((d) => ({ ...d, events: [...d.events, next] }))
    setEventId(id)
    setStatus('New event created — edit details, then Save.')
  }

  const addSeason = () => {
    const number =
      (draft.seasons.reduce((max, s) => Math.max(max, s.number), 0) || 0) + 1
    const id = `season-${number}`
    const next: Season = {
      id,
      number,
      title: `Season ${number}`,
      period: '2026',
      cover:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      participants: 0,
      cities: 0,
      graduates: 0,
      completion: 0,
      satisfaction: 95,
      rating: 5,
      description: 'Short description of this season.',
      story: 'Tell the story of this season…',
      highlights: ['Highlight 1'],
    }
    setDraft((d) => ({ ...d, seasons: [next, ...d.seasons] }))
    setSeasonId(id)
    setStatus('New season created — edit details, then Save.')
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setAuthError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) setAuthError(error.message)
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Network error')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus(null)
    const { error } = await saveContent(draft)
    setSaving(false)
    setStatus(error ? `Error: ${error}` : 'Saved — live site updated.')
  }

  const handleUpload = async (
    file: File,
    apply: (url: string) => void,
    folder?: string,
  ) => {
    const { url, error } = await uploadImage(file, folder)
    if (error || !url) {
      setStatus(`Upload failed: ${error ?? 'unknown'}`)
      return
    }
    apply(url)
    setStatus('Photo uploaded — click Save to publish.')
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 text-white">
        <h1 className="font-display text-3xl font-bold">Admin setup needed</h1>
        <p className="mt-4 text-white/60">
          Add Supabase keys to <code className="text-teal">.env</code> and follow{' '}
          <code className="text-teal">ADMIN.md</code>.
        </p>
        <Link to="/" className="mt-8 text-sm text-teal">
          ← Back to site
        </Link>
      </div>
    )
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/60">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-xs tracking-[0.2em] text-teal uppercase">ILM Hub</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            Admin login
          </h1>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Field label="Email" value={email} onChange={setEmail} />
            <label className="block space-y-1.5">
              <span className="text-xs font-medium tracking-wide text-white/45 uppercase">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none focus:border-teal/50"
              />
            </label>
            {authError && <p className="text-sm text-orange">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-navy"
            >
              Sign in
            </button>
          </form>
        </div>
        <Link
          to="/"
          className="mt-6 text-center text-sm text-white/50 hover:text-white"
        >
          ← Back to site
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">
      {/* Left sidebar */}
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-[#0a1020]">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] tracking-[0.25em] text-teal uppercase">
            ILM Hub
          </p>
          <h1 className="mt-1 font-display text-lg font-bold">Admin</h1>
          <p className="mt-1 truncate text-xs text-white/40">
            {session.user.email}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? 'bg-teal/15 font-semibold text-teal'
                    : 'text-white/55 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save changes
          </button>
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-sm text-white/60 hover:text-white"
          >
            <FileText className="h-4 w-4" /> View site
          </Link>
          <button
            type="button"
            onClick={() => void supabase?.auth.signOut()}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm text-white/40 hover:text-orange"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#070b14]/95 px-6 py-4 backdrop-blur">
          <div>
            <h2 className="font-display text-2xl font-bold">
              {tabs.find((t) => t.id === tab)?.label}
            </h2>
            <p className="text-sm text-white/40">
              Edit content, then Save to update the live site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white"
          >
            Reload
          </button>
        </header>

        <div className="space-y-6 px-6 py-6">
          {status && (
            <p
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.startsWith('Error') || status.startsWith('Upload')
                  ? 'border-orange/40 text-orange'
                  : 'border-teal/30 bg-teal/5 text-teal'
              }`}
            >
              {status}
            </p>
          )}

          {tab === 'hero' && (
            <Panel title="Homepage hero" description="First screen visitors see.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Line 1"
                  value={draft.hero.line1}
                  onChange={(v) =>
                    setDraft({ ...draft, hero: { ...draft.hero, line1: v } })
                  }
                />
                <Field
                  label="Line 2"
                  value={draft.hero.line2}
                  onChange={(v) =>
                    setDraft({ ...draft, hero: { ...draft.hero, line2: v } })
                  }
                />
                <Field
                  label="Line 3"
                  value={draft.hero.line3}
                  onChange={(v) =>
                    setDraft({ ...draft, hero: { ...draft.hero, line3: v } })
                  }
                />
                <Field
                  label="Subtitle"
                  value={draft.hero.subtitle}
                  onChange={(v) =>
                    setDraft({ ...draft, hero: { ...draft.hero, subtitle: v } })
                  }
                  rows={3}
                />
                <div className="sm:col-span-2">
                  <ImageField
                    label="Background image (fallback)"
                    value={draft.hero.backgroundImage}
                    onChange={(v) =>
                      setDraft({
                        ...draft,
                        hero: { ...draft.hero, backgroundImage: v },
                      })
                    }
                    onUpload={(file) =>
                      handleUpload(
                        file,
                        (url) =>
                          setDraft((d) => ({
                            ...d,
                            hero: { ...d.hero, backgroundImage: url },
                          })),
                        'hero',
                      )
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <VideoField
                    label="Background video"
                    value={draft.hero.backgroundVideo}
                    hint="If set, video plays instead of the image. Prefer short muted MP4 under ~40MB."
                    onChange={(v) =>
                      setDraft({
                        ...draft,
                        hero: { ...draft.hero, backgroundVideo: v },
                      })
                    }
                    onUpload={(file) =>
                      handleUpload(
                        file,
                        (url) =>
                          setDraft((d) => ({
                            ...d,
                            hero: { ...d.hero, backgroundVideo: url },
                          })),
                        'hero/video',
                      )
                    }
                  />
                </div>
              </div>
            </Panel>
          )}

          {tab === 'about' && (
            <Panel title="About page" description="/about page copy.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Eyebrow"
                  value={draft.about.eyebrow}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, eyebrow: v },
                    })
                  }
                />
                <Field
                  label="Headline"
                  value={draft.about.headline}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, headline: v },
                    })
                  }
                />
                <Field
                  label="Headline accent"
                  value={draft.about.headlineAccent}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, headlineAccent: v },
                    })
                  }
                />
                <Field
                  label="Intro"
                  value={draft.about.intro}
                  onChange={(v) =>
                    setDraft({ ...draft, about: { ...draft.about, intro: v } })
                  }
                  rows={4}
                />
                <Field
                  label="Mission"
                  value={draft.about.mission}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, mission: v },
                    })
                  }
                  rows={4}
                />
                <Field
                  label="Story"
                  value={draft.about.story}
                  onChange={(v) =>
                    setDraft({ ...draft, about: { ...draft.about, story: v } })
                  }
                  rows={4}
                />
                <Field
                  label="Values (comma-separated)"
                  value={draft.about.values.join(', ')}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      about: {
                        ...draft.about,
                        values: v
                          .split(',')
                          .map((x) => x.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  rows={2}
                />
              </div>
            </Panel>
          )}

          {tab === 'who' && (
            <Panel
              title="Who We Are"
              description="Homepage section texts and photos."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Headline"
                  value={draft.whoWeAre.headline}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, headline: v },
                    })
                  }
                />
                <Field
                  label="Headline accent"
                  value={draft.whoWeAre.headlineAccent}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, headlineAccent: v },
                    })
                  }
                />
                <Field
                  label="Description"
                  value={draft.whoWeAre.description}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, description: v },
                    })
                  }
                  rows={4}
                />
                <Field
                  label="Mission"
                  value={draft.whoWeAre.mission}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, mission: v },
                    })
                  }
                  rows={3}
                />
                <Field
                  label="Story"
                  value={draft.whoWeAre.story}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, story: v },
                    })
                  }
                  rows={3}
                />
                <Field
                  label="Badge value"
                  value={draft.whoWeAre.badgeValue}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, badgeValue: v },
                    })
                  }
                />
                <Field
                  label="Badge label"
                  value={draft.whoWeAre.badgeLabel}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, badgeLabel: v },
                    })
                  }
                />
                <ImageField
                  label="Top photo"
                  value={draft.whoWeAre.photoTop}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, photoTop: v },
                    })
                  }
                  onUpload={(file) =>
                    handleUpload(
                      file,
                      (url) =>
                        setDraft((d) => ({
                          ...d,
                          whoWeAre: { ...d.whoWeAre, photoTop: url },
                        })),
                      'who-we-are',
                    )
                  }
                />
                <ImageField
                  label="Bottom photo"
                  value={draft.whoWeAre.photoBottom}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      whoWeAre: { ...draft.whoWeAre, photoBottom: v },
                    })
                  }
                  onUpload={(file) =>
                    handleUpload(
                      file,
                      (url) =>
                        setDraft((d) => ({
                          ...d,
                          whoWeAre: { ...d.whoWeAre, photoBottom: url },
                        })),
                      'who-we-are',
                    )
                  }
                />
              </div>
            </Panel>
          )}

          {tab === 'team' && (
            <div className="space-y-6">
              <Panel title="Leads" description="Founder & Project Manager row.">
                <div className="grid gap-4 lg:grid-cols-2">
                  {draft.teamLeads.map((member, i) => (
                    <TeamEditor
                      key={`lead-${i}`}
                      member={member}
                      onChange={(next) => {
                        setDraft((d) => {
                          const teamLeads = [...d.teamLeads]
                          teamLeads[i] = next
                          return { ...d, teamLeads }
                        })
                      }}
                      onUpload={(file) =>
                        handleUpload(
                          file,
                          (url) => {
                            setDraft((d) => {
                              const teamLeads = [...d.teamLeads]
                              teamLeads[i] = { ...teamLeads[i], photo: url }
                              return { ...d, teamLeads }
                            })
                          },
                          'team',
                        )
                      }
                      onRemove={() =>
                        setDraft((d) => ({
                          ...d,
                          teamLeads: d.teamLeads.filter((_, j) => j !== i),
                        }))
                      }
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      teamLeads: [
                        ...d.teamLeads,
                        { name: 'New lead', role: 'Role', lead: true },
                      ],
                    }))
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm text-teal"
                >
                  <Plus className="h-4 w-4" /> Add lead
                </button>
              </Panel>

              <Panel title="Team members">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {draft.teamMembers.map((member, i) => (
                    <TeamEditor
                      key={`member-${i}`}
                      member={member}
                      compact
                      onChange={(next) => {
                        setDraft((d) => {
                          const teamMembers = [...d.teamMembers]
                          teamMembers[i] = next
                          return { ...d, teamMembers }
                        })
                      }}
                      onUpload={(file) =>
                        handleUpload(
                          file,
                          (url) => {
                            setDraft((d) => {
                              const teamMembers = [...d.teamMembers]
                              teamMembers[i] = {
                                ...teamMembers[i],
                                photo: url,
                              }
                              return { ...d, teamMembers }
                            })
                          },
                          'team',
                        )
                      }
                      onRemove={() =>
                        setDraft((d) => ({
                          ...d,
                          teamMembers: d.teamMembers.filter((_, j) => j !== i),
                        }))
                      }
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      teamMembers: [
                        ...d.teamMembers,
                        { name: 'New member', role: 'Role' },
                      ],
                    }))
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm text-teal"
                >
                  <Plus className="h-4 w-4" /> Add member
                </button>
              </Panel>
            </div>
          )}

          {tab === 'projects' && (
            <Panel
              title="Projects"
              description="Add, edit, or delete camps and bootcamps."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProjectId(p.id)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      selectedProject?.id === p.id
                        ? 'bg-indigo text-white'
                        : 'border border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={addProject}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal/50 px-3 py-1.5 text-sm text-teal hover:bg-teal/10"
                >
                  <Plus className="h-4 w-4" /> Add project
                </button>
              </div>

              {!selectedProject ? (
                <p className="text-sm text-white/50">
                  No projects yet. Click “Add project”.
                </p>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Title"
                      value={selectedProject.title}
                      onChange={(v) => updateProject({ title: v })}
                    />
                    <Field
                      label="Category"
                      value={selectedProject.category}
                      onChange={(v) => updateProject({ category: v })}
                      hint="Camp or Bootcamp"
                    />
                    <Field
                      label="Date"
                      value={selectedProject.date}
                      onChange={(v) => updateProject({ date: v })}
                    />
                    <Field
                      label="Season / label"
                      value={selectedProject.season}
                      onChange={(v) => updateProject({ season: v })}
                    />
                    <Field
                      label="Participants"
                      value={String(selectedProject.participants)}
                      onChange={(v) =>
                        updateProject({ participants: Number(v) || 0 })
                      }
                    />
                    <Field
                      label="Location"
                      value={selectedProject.location}
                      onChange={(v) => updateProject({ location: v })}
                    />
                    <Field
                      label="Summary"
                      value={selectedProject.summary}
                      onChange={(v) => updateProject({ summary: v })}
                      rows={3}
                    />
                    <Field
                      label="Description"
                      value={selectedProject.description}
                      onChange={(v) => updateProject({ description: v })}
                      rows={3}
                    />
                    <Field
                      label="Overview"
                      value={selectedProject.overview}
                      onChange={(v) => updateProject({ overview: v })}
                      rows={4}
                    />
                    <div className="sm:col-span-2">
                      <ImageField
                        label="Cover photo (outside — projects list)"
                        value={selectedProject.cover}
                        onChange={(v) => updateProject({ cover: v })}
                        onUpload={(file) =>
                          handleUpload(
                            file,
                            (url) => updateProject({ cover: url }),
                            `projects/${selectedProject.id}`,
                          )
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <VideoField
                        label="Background video (inside — project page)"
                        value={selectedProject.backgroundVideo ?? ''}
                        hint="Shown only on the project detail page. The cover photo is always used on the projects list."
                        onChange={(v) => updateProject({ backgroundVideo: v })}
                        onUpload={(file) =>
                          handleUpload(
                            file,
                            (url) => updateProject({ backgroundVideo: url }),
                            `projects/${selectedProject.id}/video`,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold">Gallery</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {(selectedProject.gallery ?? []).map((src, i) => (
                        <div
                          key={`${src}-${i}`}
                          className="rounded-xl border border-white/10 p-2"
                        >
                          <img
                            src={src}
                            alt=""
                            className="aspect-[4/3] w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateProject({
                                gallery: (selectedProject.gallery ?? []).filter(
                                  (_, j) => j !== i,
                                ),
                              })
                            }
                            className="mt-2 inline-flex items-center gap-1 text-xs text-orange"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white/70">
                      <ImagePlus className="h-4 w-4" /> Add gallery photo
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files ?? [])
                          if (!files.length || !selectedProject) return
                          const id = selectedProject.id
                          for (const file of files) {
                            await handleUpload(
                              file,
                              (url) => {
                                setDraft((d) => ({
                                  ...d,
                                  projects: d.projects.map((p) =>
                                    p.id === id
                                      ? {
                                          ...p,
                                          gallery: [...(p.gallery ?? []), url],
                                        }
                                      : p,
                                  ),
                                }))
                              },
                              `projects/${id}`,
                            )
                          }
                          e.target.value = ''
                        }}
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedProject.id
                      setDraft((d) => {
                        const projects = d.projects.filter((p) => p.id !== id)
                        setProjectId(projects[0]?.id ?? '')
                        return { ...d, projects }
                      })
                      setStatus('Project removed — click Save to publish.')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-orange/40 px-4 py-2 text-sm text-orange"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this project
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'events' && (
            <Panel
              title="Events"
              description="Opening, guest talks, weekly meetings, ceremonies."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.events.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setEventId(e.id)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      selectedEvent?.id === e.id
                        ? 'bg-indigo text-white'
                        : 'border border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {e.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={addEvent}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal/50 px-3 py-1.5 text-sm text-teal hover:bg-teal/10"
                >
                  <Plus className="h-4 w-4" /> Add event
                </button>
              </div>

              {!selectedEvent ? (
                <p className="text-sm text-white/50">No events yet.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Title"
                      value={selectedEvent.title}
                      onChange={(v) => updateEvent({ title: v })}
                    />
                    <Field
                      label="Type"
                      value={selectedEvent.type}
                      onChange={(v) => updateEvent({ type: v })}
                      hint="Ceremony, Talk, Meeting…"
                    />
                    <Field
                      label="Date label"
                      value={selectedEvent.date}
                      onChange={(v) => updateEvent({ date: v })}
                    />
                    <Field
                      label="Time"
                      value={selectedEvent.time}
                      onChange={(v) => updateEvent({ time: v })}
                    />
                    <Field
                      label="Location"
                      value={selectedEvent.location}
                      onChange={(v) => updateEvent({ location: v })}
                    />
                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white/70">
                      <input
                        type="checkbox"
                        checked={Boolean(selectedEvent.featured)}
                        onChange={(e) =>
                          updateEvent({ featured: e.target.checked })
                        }
                        className="h-4 w-4 accent-teal"
                      />
                      Featured on Events page
                    </label>
                    <div className="sm:col-span-2">
                      <Field
                        label="Description"
                        value={selectedEvent.description}
                        onChange={(v) => updateEvent({ description: v })}
                        rows={4}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <ImageField
                        label="Cover photo"
                        value={selectedEvent.cover}
                        onChange={(v) => updateEvent({ cover: v })}
                        onUpload={(file) =>
                          handleUpload(
                            file,
                            (url) => updateEvent({ cover: url }),
                            `events/${selectedEvent.id}`,
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedEvent.id
                      setDraft((d) => {
                        const events = d.events.filter((e) => e.id !== id)
                        setEventId(events[0]?.id ?? '')
                        return { ...d, events }
                      })
                      setStatus('Event removed — click Save to publish.')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-orange/40 px-4 py-2 text-sm text-orange"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this event
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'challenges' && (
            <Panel
              title="Challenge seasons"
              description="Edit Season 1, Season 2, Season 3… stories, stats, and covers."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.seasons.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeasonId(s.id)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      selectedSeason?.id === s.id
                        ? 'bg-indigo text-white'
                        : 'border border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={addSeason}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal/50 px-3 py-1.5 text-sm text-teal hover:bg-teal/10"
                >
                  <Plus className="h-4 w-4" /> Add season
                </button>
              </div>

              {!selectedSeason ? (
                <p className="text-sm text-white/50">No seasons yet.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Title"
                      value={selectedSeason.title}
                      onChange={(v) => updateSeason({ title: v })}
                    />
                    <Field
                      label="Season number"
                      value={String(selectedSeason.number)}
                      onChange={(v) =>
                        updateSeason({ number: Number(v) || 1 })
                      }
                    />
                    <Field
                      label="Period"
                      value={selectedSeason.period ?? ''}
                      onChange={(v) => updateSeason({ period: v })}
                      hint="e.g. January 2026"
                    />
                    <Field
                      label="Season ID"
                      value={selectedSeason.id}
                      onChange={(v) => {
                        const oldId = selectedSeason.id
                        setDraft((d) => ({
                          ...d,
                          seasons: d.seasons.map((s) =>
                            s.id === oldId ? { ...s, id: v } : s,
                          ),
                        }))
                        setSeasonId(v)
                      }}
                      hint="Used in URLs, e.g. season-3 — keep unique"
                    />
                    <Field
                      label="Participants"
                      value={String(selectedSeason.participants)}
                      onChange={(v) =>
                        updateSeason({ participants: Number(v) || 0 })
                      }
                    />
                    <Field
                      label="Graduates"
                      value={String(selectedSeason.graduates)}
                      onChange={(v) =>
                        updateSeason({ graduates: Number(v) || 0 })
                      }
                    />
                    <Field
                      label="Completion %"
                      value={String(selectedSeason.completion)}
                      onChange={(v) =>
                        updateSeason({ completion: Number(v) || 0 })
                      }
                    />
                    <Field
                      label="Satisfaction %"
                      value={String(selectedSeason.satisfaction)}
                      onChange={(v) =>
                        updateSeason({ satisfaction: Number(v) || 0 })
                      }
                    />
                    <Field
                      label="Rating (1–5)"
                      value={String(selectedSeason.rating)}
                      onChange={(v) =>
                        updateSeason({
                          rating: Math.min(5, Math.max(1, Number(v) || 5)),
                        })
                      }
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="Short description"
                        value={selectedSeason.description}
                        onChange={(v) => updateSeason({ description: v })}
                        rows={3}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Story"
                        value={selectedSeason.story}
                        onChange={(v) => updateSeason({ story: v })}
                        rows={5}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Highlights (one per line)"
                        value={selectedSeason.highlights.join('\n')}
                        onChange={(v) =>
                          updateSeason({
                            highlights: v
                              .split('\n')
                              .map((x) => x.trim())
                              .filter(Boolean),
                          })
                        }
                        rows={4}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <ImageField
                        label="Cover photo"
                        value={selectedSeason.cover}
                        onChange={(v) => updateSeason({ cover: v })}
                        onUpload={(file) =>
                          handleUpload(
                            file,
                            (url) => updateSeason({ cover: url }),
                            `seasons/${selectedSeason.id}`,
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedSeason.id
                      setDraft((d) => {
                        const seasons = d.seasons.filter((s) => s.id !== id)
                        setSeasonId(seasons[0]?.id ?? '')
                        return { ...d, seasons }
                      })
                      setStatus('Season removed — click Save to publish.')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-orange/40 px-4 py-2 text-sm text-orange"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this season
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'gallery' && (
            <Panel
              title="Gallery"
              description="Extra photos/videos for Home and /gallery. Project covers, project galleries, and project videos are included automatically."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.gallery.map((g, i) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGalleryIndex(i)}
                    className={`max-w-[10rem] truncate rounded-full px-3 py-1.5 text-sm ${
                      galleryIndex === i
                        ? 'bg-indigo text-white'
                        : 'border border-white/15 text-white/60'
                    }`}
                  >
                    {g.label || `Item ${i + 1}`}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next: GalleryItem = {
                      id: `gallery-${Date.now().toString(36)}`,
                      type: 'photos',
                      src: '',
                      label: 'New gallery item',
                    }
                    setDraft((d) => ({
                      ...d,
                      gallery: [...d.gallery, next],
                    }))
                    setGalleryIndex(draft.gallery.length)
                    setStatus('Gallery item added — upload media, then Save.')
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal/50 px-3 py-1.5 text-sm text-teal"
                >
                  <Plus className="h-4 w-4" /> Add item
                </button>
              </div>

              {!selectedGallery ? (
                <p className="text-sm text-white/50">
                  No extra gallery items yet. Project media still appears on the
                  site automatically.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Label"
                    value={selectedGallery.label}
                    onChange={(v) => updateGalleryItem({ label: v })}
                  />
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium tracking-wide text-white/45 uppercase">
                      Type
                    </span>
                    <select
                      value={selectedGallery.type}
                      onChange={(e) =>
                        updateGalleryItem({
                          type: e.target.value as GalleryItemType,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none focus:border-teal/50"
                    >
                      <option value="photos">photos</option>
                      <option value="videos">videos</option>
                      <option value="ceremonies">ceremonies</option>
                      <option value="projects">projects</option>
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <ImageField
                      label="Image / poster"
                      value={selectedGallery.src}
                      onChange={(v) => updateGalleryItem({ src: v })}
                      onUpload={(file) =>
                        handleUpload(
                          file,
                          (url) => updateGalleryItem({ src: url }),
                          'gallery',
                        )
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <VideoField
                      label="Video (optional)"
                      value={selectedGallery.videoUrl ?? ''}
                      hint="If set, this item plays as video in the lightbox. Poster uses the image above."
                      onChange={(v) =>
                        updateGalleryItem({
                          videoUrl: v.trim() || undefined,
                          type: v.trim() ? 'videos' : selectedGallery.type,
                        })
                      }
                      onUpload={(file) =>
                        handleUpload(
                          file,
                          (url) =>
                            updateGalleryItem({
                              videoUrl: url,
                              type: 'videos',
                            }),
                          'gallery/video',
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((d) => ({
                        ...d,
                        gallery: d.gallery.filter((_, i) => i !== galleryIndex),
                      }))
                      setGalleryIndex(0)
                      setStatus('Gallery item removed — click Save to publish.')
                    }}
                    className="inline-flex items-center gap-2 text-sm text-orange"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this item
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'voices' && (
            <Panel
              title="Voices / testimonials"
              description="Quotes shown on Home and season pages."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.testimonials.map((t, i) => (
                  <button
                    key={`${t.name}-${i}`}
                    type="button"
                    onClick={() => setVoiceIndex(i)}
                    className={`max-w-[10rem] truncate rounded-full px-3 py-1.5 text-sm ${
                      voiceIndex === i
                        ? 'bg-indigo text-white'
                        : 'border border-white/15 text-white/60'
                    }`}
                  >
                    {t.name || `Voice ${i + 1}`}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next: Testimonial = {
                      name: 'New graduate',
                      role: 'Season Graduate',
                      seasonId: 'season-1',
                      quote: 'Write their quote here…',
                      rating: 5,
                    }
                    setDraft((d) => ({
                      ...d,
                      testimonials: [...d.testimonials, next],
                    }))
                    setVoiceIndex(draft.testimonials.length)
                    setStatus('New voice added — edit, then Save.')
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal/50 px-3 py-1.5 text-sm text-teal"
                >
                  <Plus className="h-4 w-4" /> Add voice
                </button>
              </div>

              {!selectedVoice ? (
                <p className="text-sm text-white/50">No voices yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={selectedVoice.name}
                    onChange={(v) => updateVoice({ name: v })}
                  />
                  <Field
                    label="Role"
                    value={selectedVoice.role}
                    onChange={(v) => updateVoice({ role: v })}
                  />
                  <Field
                    label="Season ID"
                    value={selectedVoice.seasonId}
                    onChange={(v) => updateVoice({ seasonId: v })}
                    hint="Use season-1 or season-2"
                  />
                  <Field
                    label="Rating (1–5)"
                    value={String(selectedVoice.rating)}
                    onChange={(v) =>
                      updateVoice({
                        rating: Math.min(5, Math.max(1, Number(v) || 5)),
                      })
                    }
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Quote"
                      value={selectedVoice.quote}
                      onChange={(v) => updateVoice({ quote: v })}
                      rows={5}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((d) => ({
                        ...d,
                        testimonials: d.testimonials.filter(
                          (_, i) => i !== voiceIndex,
                        ),
                      }))
                      setVoiceIndex(0)
                      setStatus('Voice removed — click Save to publish.')
                    }}
                    className="inline-flex items-center gap-2 text-sm text-orange"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this voice
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'stats' && (
            <Panel title="Stats" description="Homepage number counters.">
              <div className="grid gap-4 sm:grid-cols-2">
                {draft.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-2xl border border-white/10 p-4"
                  >
                    <Field
                      label="Label"
                      value={stat.label}
                      onChange={(v) => {
                        setDraft((d) => {
                          const stats = [...d.stats]
                          stats[i] = { ...stats[i], label: v }
                          return { ...d, stats }
                        })
                      }}
                    />
                    <Field
                      label="Value"
                      value={String(stat.value)}
                      onChange={(v) => {
                        setDraft((d) => {
                          const stats = [...d.stats]
                          stats[i] = { ...stats[i], value: Number(v) || 0 }
                          return { ...d, stats }
                        })
                      }}
                    />
                    <Field
                      label="Suffix"
                      value={stat.suffix}
                      onChange={(v) => {
                        setDraft((d) => {
                          const stats = [...d.stats]
                          stats[i] = { ...stats[i], suffix: v }
                          return { ...d, stats }
                        })
                      }}
                    />
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  )
}

function TeamEditor({
  member,
  onChange,
  onUpload,
  onRemove,
  compact,
}: {
  member: TeamMember
  onChange: (m: TeamMember) => void
  onUpload: (file: File) => Promise<void>
  onRemove: () => void
  compact?: boolean
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      {member.photo ? (
        <img
          src={member.photo}
          alt=""
          className="mx-auto h-20 w-20 rounded-full object-cover"
        />
      ) : null}
      <Field
        label="Name"
        value={member.name}
        onChange={(v) => onChange({ ...member, name: v })}
      />
      <Field
        label="Role"
        value={member.role}
        onChange={(v) => onChange({ ...member, role: v })}
      />
      {!compact && (
        <Field
          label="Bio"
          value={member.bio ?? ''}
          onChange={(v) => onChange({ ...member, bio: v })}
          rows={3}
        />
      )}
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">
          <ImagePlus className="h-3.5 w-3.5" /> Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) await onUpload(file)
              e.target.value = ''
            }}
          />
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 text-xs text-orange"
        >
          <Trash2 className="h-3 w-3" /> Remove
        </button>
      </div>
    </div>
  )
}
