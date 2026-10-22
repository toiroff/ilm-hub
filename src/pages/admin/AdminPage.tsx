import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Flame,
  FolderKanban,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareQuote,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  Users,
  BarChart3,
  Info,
  Images,
} from 'lucide-react'
import { useSiteContent } from '../../content/ContentContext'
import type {
  GalleryItem,
  GalleryItemType,
  LocalizedSiteContent,
  SiteContent,
} from '../../content/types'
import type { Project, Season } from '../../data/content'
import type { TeamMember } from '../../data/team'
import type { Testimonial } from '../../data/testimonials'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import type { Session } from '@supabase/supabase-js'
import type { Locale } from '../../i18n/messages'
import { useLocale } from '../../i18n/locale'

type Tab =
  | 'hero'
  | 'about'
  | 'who'
  | 'team'
  | 'projects'
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
      <span className="text-sm font-semibold text-ink">
        {label}
      </span>
      {rows ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-y rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue-soft"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue-soft"
        />
      )}
      {hint ? <span className="text-sm text-ink-faint">{hint}</span> : null}
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
    <div className="space-y-3 rounded-2xl border border-line bg-tint p-4">
      <p className="text-sm font-semibold text-ink">
        {label}
      </p>
      {value ? (
        <img
          src={value}
          alt=""
          className="h-44 w-full rounded-xl bg-white object-cover object-center"
        />
      ) : (
        <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-line bg-white text-sm text-ink-faint">
          No image yet
        </div>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload below"
        className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue-soft"
      />
      <label className="press inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink-faint">
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
    <div className="space-y-3 rounded-2xl border border-line bg-tint p-4">
      <p className="text-sm font-semibold text-ink">
        {label}
      </p>
      {value ? (
        <video
          src={value}
          className="h-44 w-full rounded-xl bg-navy object-cover"
          muted
          controls
          playsInline
        />
      ) : (
        <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-line bg-white text-sm text-ink-faint">
          No video yet — image background will be used
        </div>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Video URL (.mp4) or upload below"
        className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue-soft"
      />
      {hint ? <p className="text-sm text-ink-faint">{hint}</p> : null}
      <div className="flex flex-wrap gap-2">
        <label className="press inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink-faint">
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
            className="press inline-flex items-center gap-1.5 rounded-xl border border-accent/30 bg-white px-3.5 py-2 text-sm font-semibold text-accent-ink hover:bg-accent-soft"
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
    <section className="rounded-2xl border border-line bg-white p-5 sm:p-8">
      <div className="mb-6 border-b border-line pb-5">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-[15px] text-ink-soft">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function AdminBrand() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <img src="/assets/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
      <span className="text-lg font-bold tracking-tight">ILM Hub</span>
      <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-ink">Admin</span>
    </Link>
  )
}

export function AdminPage() {
  const { bundle, loading, saveBundle, uploadImage, refresh } = useSiteContent()
  const { t } = useLocale()
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [adminLocale, setAdminLocale] = useState<Locale>('en')
  const [draftBundle, setDraftBundle] = useState<LocalizedSiteContent>(() =>
    structuredClone(bundle),
  )
  const draft = draftBundle[adminLocale]
  const setDraft = (
    updater: SiteContent | ((prev: SiteContent) => SiteContent),
  ) => {
    setDraftBundle((b) => {
      const current = b[adminLocale]
      const next = typeof updater === 'function' ? updater(current) : updater
      return { ...b, [adminLocale]: next }
    })
  }
  const [tab, setTab] = useState<Tab>('projects')
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [projectId, setProjectId] = useState(bundle.en.projects[0]?.id ?? '')
  const [seasonId, setSeasonId] = useState(bundle.en.seasons[0]?.id ?? '')
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

  // Sync draft when saved bundle from server changes
  useEffect(() => {
    setDraftBundle(structuredClone(bundle))
    const source = bundle[adminLocale]
    setProjectId((prev) =>
      source.projects.some((p) => p.id === prev)
        ? prev
        : (source.projects[0]?.id ?? ''),
    )
    setSeasonId((prev) =>
      source.seasons.some((s) => s.id === prev)
        ? prev
        : (source.seasons[0]?.id ?? ''),
    )
    setVoiceIndex(0)
    setGalleryIndex(0)
  }, [bundle])

  // Keep selection valid when switching EN/UZ
  useEffect(() => {
    const source = draftBundle[adminLocale]
    setProjectId((prev) =>
      source.projects.some((p) => p.id === prev)
        ? prev
        : (source.projects[0]?.id ?? ''),
    )
    setSeasonId((prev) =>
      source.seasons.some((s) => s.id === prev)
        ? prev
        : (source.seasons[0]?.id ?? ''),
    )
    setVoiceIndex(0)
    setGalleryIndex(0)
  }, [adminLocale])

  const selectedProject = useMemo(
    () => draft.projects.find((p) => p.id === projectId) ?? null,
    [draft.projects, projectId],
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

  const addSeason = () => {
    const number =
      (draft.seasons.reduce((max, s) => Math.max(max, s.number), 0) || 0) + 1
    const id = `season-${number}`
    const next: Season = {
      id,
      number,
      title: `Season ${number}`,
      period: '2026',
      cover: '',
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
    const { error } = await saveBundle(draftBundle)
    setSaving(false)
    setStatus(error ? `Error: ${error}` : t('admin.saved'))
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
      <div className="bg-grid flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)]">
          <AdminBrand />
          <h1 className="mt-8 text-[28px] leading-tight font-bold tracking-tight">Admin setup needed</h1>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Add the Supabase keys to <code className="rounded bg-tint px-1.5 py-0.5 text-[14px] text-ink">.env</code> and
            follow <code className="rounded bg-tint px-1.5 py-0.5 text-[14px] text-ink">ADMIN.md</code>.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 font-semibold text-blue hover:underline">
            <ArrowLeft className="h-4 w-4" /> {t('admin.backToSite')}
          </Link>
        </div>
      </div>
    )
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-faint">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="bg-grid flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)] sm:p-10">
          <AdminBrand />
          <h1 className="mt-8 text-[32px] leading-tight font-bold tracking-[-0.03em]">Sign in</h1>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Edit the website content. Changes go live when you click Save.
          </p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Field label="Email" value={email} onChange={setEmail} />
            <label className="block space-y-1.5">
              <span className="text-sm font-semibold text-ink">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue-soft"
              />
            </label>
            {authError && (
              <p className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm font-medium text-accent-ink">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="press h-12 w-full rounded-xl bg-blue text-base font-semibold text-white hover:bg-blue-hover"
            >
              Sign in
            </button>
          </form>
        </div>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> {t('admin.backToSite')}
        </Link>
      </div>
    )
  }

  const activeTab = tabs.find((x) => x.id === tab)
  const isError = Boolean(status && (status.startsWith('Error') || status.startsWith('Upload')))
  const localeSwitch = (
    <div className="flex gap-1 rounded-xl bg-tint p-1" role="group" aria-label="Editing language">
      {(['en', 'uz'] as Locale[]).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setAdminLocale(loc)}
          aria-pressed={adminLocale === loc}
          className={`press flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold ${
            adminLocale === loc ? 'bg-white text-ink shadow-sm' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {loc === 'en' ? 'English' : 'Oʻzbek'}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex min-h-screen bg-tint text-ink">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line px-5 py-5">
          <AdminBrand />
          <p className="mt-3 truncate text-sm text-ink-faint">{session.user.email}</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {tabs.map((item) => {
            const Icon = item.icon
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`press flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] ${
                  active ? 'bg-blue-soft font-semibold text-blue' : 'text-ink-soft hover:bg-tint hover:text-ink'
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="space-y-3 border-t border-line p-4">
          <p className="text-xs font-semibold text-ink-faint">Editing language</p>
          {localeSwitch}
          <div className="flex gap-2 pt-1">
            <Link
              to="/"
              className="press flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-2 text-sm font-semibold text-ink hover:border-ink-faint"
            >
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <button
              type="button"
              onClick={() => void supabase?.auth.signOut()}
              className="press flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-accent-soft hover:text-accent-ink"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold tracking-tight">{activeTab?.label}</h1>
              <p className="mt-0.5 text-sm text-ink-soft">
                {adminLocale === 'uz' ? t('admin.editingUz') : t('admin.editingEn')}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => void refresh()}
                className="press hidden h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-ink-faint sm:inline-flex"
              >
                <RotateCcw className="h-4 w-4" /> Reload
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="press inline-flex h-10 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-semibold text-white hover:bg-blue-hover disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? t('admin.saving') : t('admin.save')}
              </button>
            </div>
          </div>

          {/* Phones and tablets: sections + language under the header */}
          <div className="space-y-3 border-t border-line px-5 py-3 sm:px-8 lg:hidden">
            <div className="-mx-5 flex gap-1.5 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`press shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    tab === item.id ? 'bg-navy text-white' : 'bg-tint text-ink-soft'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="w-48">{localeSwitch}</div>
              <button
                type="button"
                onClick={() => void supabase?.auth.signOut()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-accent-ink"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 px-5 py-8 sm:px-8">
          {status && (
            <p
              role="status"
              className={`rounded-xl border px-4 py-3 text-[15px] font-medium ${
                isError ? 'border-accent/30 bg-accent-soft text-accent-ink' : 'border-blue/20 bg-blue-soft text-blue'
              }`}
            >
              {status}
            </p>
          )}

          {tab === 'hero' && (
            <Panel title="Homepage hero" description="Headline, subtitle and the large photo at the top of the homepage.">
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
                    label="Hero photo (large, right side)"
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
                    hint="Optional. If set, this muted video plays in place of the hero photo. Keep it short (MP4 under ~40MB)."
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
              description="The “What we do” intro on the homepage and the two story photos on the About page."
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
                <ImageField
                  label="About page — story photo 1"
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
                  label="About page — story photo 2"
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
              <Panel title="Leads" description="Shown large on the homepage and About page.">
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
                  className="mt-5 press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
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
                  className="mt-5 press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
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
                    className={`press rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                      selectedProject?.id === p.id
                        ? 'bg-navy text-white'
                        : 'border border-line bg-white text-ink-soft hover:text-ink'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={addProject}
                  className="press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
                >
                  <Plus className="h-4 w-4" /> Add project
                </button>
              </div>

              {!selectedProject ? (
                <p className="text-ink-soft">
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
                        label="Video (project page, next to the title)"
                        value={selectedProject.backgroundVideo ?? ''}
                        hint="Plays with controls next to the project title. Cards on the Projects page always use the cover photo."
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
                    <h3 className="text-lg font-bold tracking-tight">Gallery</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {(selectedProject.gallery ?? []).map((src, i) => (
                        <div
                          key={`${src}-${i}`}
                          className="rounded-xl border border-line bg-white p-2"
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
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:underline"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="mt-3 press inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink-faint">
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
                    className="press inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-soft"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this project
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'challenges' && (
            <Panel
              title="Challenge seasons"
              description="Season stories and results. Public pages show completion and satisfaction as percentages, not headcounts."
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {draft.seasons.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeasonId(s.id)}
                    className={`press rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                      selectedSeason?.id === s.id
                        ? 'bg-navy text-white'
                        : 'border border-line bg-white text-ink-soft hover:text-ink'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={addSeason}
                  className="press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
                >
                  <Plus className="h-4 w-4" /> Add season
                </button>
              </div>

              {!selectedSeason ? (
                <p className="text-ink-soft">No seasons yet.</p>
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
                    className="press inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-soft"
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
                    className={`press max-w-[12rem] truncate rounded-lg px-3.5 py-2 text-sm font-semibold ${
                      galleryIndex === i
                        ? 'bg-navy text-white'
                        : 'border border-line bg-white text-ink-soft hover:text-ink'
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
                  className="press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
                >
                  <Plus className="h-4 w-4" /> Add item
                </button>
              </div>

              {!selectedGallery ? (
                <p className="text-ink-soft">
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
                    <span className="text-sm font-semibold text-ink">
                      Type
                    </span>
                    <select
                      value={selectedGallery.type}
                      onChange={(e) =>
                        updateGalleryItem({
                          type: e.target.value as GalleryItemType,
                        })
                      }
                      className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue-soft"
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
                    className="press inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-soft"
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
                    className={`press max-w-[12rem] truncate rounded-lg px-3.5 py-2 text-sm font-semibold ${
                      voiceIndex === i
                        ? 'bg-navy text-white'
                        : 'border border-line bg-white text-ink-soft hover:text-ink'
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
                  className="press inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue/40 px-3.5 py-2 text-sm font-semibold text-blue hover:bg-blue-soft"
                >
                  <Plus className="h-4 w-4" /> Add voice
                </button>
              </div>

              {!selectedVoice ? (
                <p className="text-ink-soft">No voices yet.</p>
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
                    hint="Which season page shows this quote, e.g. season-1"
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
                    className="press inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-soft"
                  >
                    <Trash2 className="h-4 w-4" /> Delete this voice
                  </button>
                </div>
              )}
            </Panel>
          )}

          {tab === 'stats' && (
            <Panel title="Stats" description="The four numbers in the homepage hero.">
              <div className="grid gap-4 sm:grid-cols-2">
                {draft.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-2xl border border-line bg-tint p-4"
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
    <div className="space-y-3 rounded-2xl border border-line bg-tint p-4">
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
        <label className="press inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink-faint">
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
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:underline"
        >
          <Trash2 className="h-3 w-3" /> Remove
        </button>
      </div>
    </div>
  )
}
