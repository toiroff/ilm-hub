import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultSiteContent } from './defaults'
import { CONTENT_ROW_ID, type GalleryItem, type SiteContent } from './types'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type ContentContextValue = {
  content: SiteContent
  loading: boolean
  configured: boolean
  refresh: () => Promise<void>
  saveContent: (next: SiteContent) => Promise<{ error: string | null }>
  uploadImage: (file: File, folder?: string) => Promise<{ url: string | null; error: string | null }>
}

const ContentContext = createContext<ContentContextValue | null>(null)

function normalizeProject<T extends { gallery?: string[] | null }>(project: T) {
  return {
    ...project,
    gallery: Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [],
  }
}

function normalizeGalleryItem(raw: unknown): GalleryItem | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as Partial<GalleryItem>
  const src = typeof item.src === 'string' ? item.src.trim() : ''
  if (!src) return null
  const type =
    item.type === 'videos' ||
    item.type === 'ceremonies' ||
    item.type === 'projects' ||
    item.type === 'photos'
      ? item.type
      : 'photos'
  return {
    id:
      typeof item.id === 'string' && item.id.trim()
        ? item.id
        : `gallery-${Math.random().toString(36).slice(2, 9)}`,
    type,
    src,
    label: typeof item.label === 'string' && item.label.trim() ? item.label : 'Gallery',
    videoUrl:
      typeof item.videoUrl === 'string' && item.videoUrl.trim()
        ? item.videoUrl.trim()
        : undefined,
  }
}

function mergeContent(raw: unknown): SiteContent {
  const base = structuredClone(defaultSiteContent)
  if (!raw || typeof raw !== 'object') return base
  const data = raw as Partial<SiteContent>
  const projects = (data.projects ?? base.projects).map(normalizeProject)
  const galleryRaw = data.gallery ?? base.gallery
  const gallery = (Array.isArray(galleryRaw) ? galleryRaw : [])
    .map(normalizeGalleryItem)
    .filter((g): g is GalleryItem => Boolean(g))
  return {
    ...base,
    ...data,
    hero: { ...base.hero, ...data.hero },
    about: { ...base.about, ...data.about },
    whoWeAre: { ...base.whoWeAre, ...data.whoWeAre },
    teamLeads: data.teamLeads ?? base.teamLeads,
    teamMembers: data.teamMembers ?? base.teamMembers,
    projects,
    stats: data.stats ?? base.stats,
    testimonials: data.testimonials ?? base.testimonials,
    events: data.events ?? base.events,
    challenges: data.challenges ?? base.challenges,
    challengeWeeks: data.challengeWeeks ?? base.challengeWeeks,
    seasons: data.seasons ?? base.seasons,
    gallery,
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refresh = useCallback(async () => {
    if (!supabase) {
      setContent(defaultSiteContent)
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle()

    if (error) {
      console.warn('Content load failed, using defaults:', error.message)
      setContent(defaultSiteContent)
    } else if (data?.data) {
      setContent(mergeContent(data.data))
    } else {
      setContent(defaultSiteContent)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const saveContent = useCallback(async (next: SiteContent) => {
    if (!supabase) {
      return {
        error:
          'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env',
      }
    }
    const { error } = await supabase.from('site_content').upsert({
      id: CONTENT_ROW_ID,
      data: next,
      updated_at: new Date().toISOString(),
    })
    if (error) return { error: error.message }
    setContent(next)
    return { error: null }
  }, [])

  const uploadImage = useCallback(async (file: File, folder = 'uploads') => {
    if (!supabase) {
      return {
        url: null,
        error:
          'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env',
      }
    }
    const maxMb = file.type.startsWith('video/') ? 80 : 12
    if (file.size > maxMb * 1024 * 1024) {
      return {
        url: null,
        error: `File too large. Max ${maxMb}MB for ${file.type.startsWith('video/') ? 'videos' : 'images'}.`,
      }
    }
    const ext = file.name.split('.').pop() || 'bin'
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    })
    if (error) return { url: null, error: error.message }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return { url: data.publicUrl, error: null }
  }, [])

  const value = useMemo(
    () => ({
      content,
      loading,
      configured: isSupabaseConfigured,
      refresh,
      saveContent,
      uploadImage,
    }),
    [content, loading, refresh, saveContent, uploadImage],
  )

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export function useSiteContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useSiteContent must be used within ContentProvider')
  }
  return ctx
}
