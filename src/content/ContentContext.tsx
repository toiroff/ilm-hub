import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultLocalizedContent } from './defaults'
import {
  CONTENT_ROW_ID,
  type LocalizedSiteContent,
  type SiteContent,
} from './types'
import { mergeLocalizedBundle, resolveLocalizedContent } from './localize'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { useLocale } from '../i18n/locale'

type ContentContextValue = {
  /** Active public-locale content (with EN fallback for empty UZ fields). */
  content: SiteContent
  /** Full EN + UZ CMS bundle. */
  bundle: LocalizedSiteContent
  loading: boolean
  configured: boolean
  refresh: () => Promise<void>
  saveBundle: (next: LocalizedSiteContent) => Promise<{ error: string | null }>
  uploadImage: (
    file: File,
    folder?: string,
  ) => Promise<{ url: string | null; error: string | null }>
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale()
  const [bundle, setBundle] = useState<LocalizedSiteContent>(
    defaultLocalizedContent,
  )
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refresh = useCallback(async () => {
    if (!supabase) {
      setBundle(structuredClone(defaultLocalizedContent))
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
      setBundle(structuredClone(defaultLocalizedContent))
    } else if (data?.data) {
      setBundle(mergeLocalizedBundle(data.data))
    } else {
      setBundle(structuredClone(defaultLocalizedContent))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const saveBundle = useCallback(async (next: LocalizedSiteContent) => {
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
    setBundle(next)
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
        error: `File too large. Max ${maxMb}MB for ${
          file.type.startsWith('video/') ? 'videos' : 'images'
        }.`,
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

  const content = useMemo(
    () => resolveLocalizedContent(bundle, locale),
    [bundle, locale],
  )

  const value = useMemo(
    () => ({
      content,
      bundle,
      loading,
      configured: isSupabaseConfigured,
      refresh,
      saveBundle,
      uploadImage,
    }),
    [content, bundle, loading, refresh, saveBundle, uploadImage],
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
