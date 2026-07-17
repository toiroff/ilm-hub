import type { Locale } from '../i18n/messages'
import type { GalleryItem, LocalizedSiteContent, SiteContent } from './types'
import { defaultLocalizedContent, defaultSiteContent } from './defaults'
import { buildAutoUzbek, uzNeedsAutoTranslate } from './uzAuto'

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
    label:
      typeof item.label === 'string' && item.label.trim() ? item.label : 'Gallery',
    videoUrl:
      typeof item.videoUrl === 'string' && item.videoUrl.trim()
        ? item.videoUrl.trim()
        : undefined,
  }
}

/** Merge a partial/flat CMS payload into a full SiteContent. */
export function mergeContent(
  raw: unknown,
  base: SiteContent = defaultSiteContent,
): SiteContent {
  const root = structuredClone(base)
  if (!raw || typeof raw !== 'object') return root
  const data = raw as Partial<SiteContent>
  const projects = (data.projects ?? root.projects).map(normalizeProject)
  const galleryRaw = data.gallery ?? root.gallery
  const gallery = (Array.isArray(galleryRaw) ? galleryRaw : [])
    .map(normalizeGalleryItem)
    .filter((g): g is GalleryItem => Boolean(g))
  return {
    ...root,
    ...data,
    hero: { ...root.hero, ...data.hero },
    about: { ...root.about, ...data.about },
    whoWeAre: { ...root.whoWeAre, ...data.whoWeAre },
    teamLeads: data.teamLeads ?? root.teamLeads,
    teamMembers: data.teamMembers ?? root.teamMembers,
    projects,
    stats: data.stats ?? root.stats,
    testimonials: data.testimonials ?? root.testimonials,
    events: data.events ?? root.events,
    challenges: data.challenges ?? root.challenges,
    challengeWeeks: data.challengeWeeks ?? root.challengeWeeks,
    seasons: data.seasons ?? root.seasons,
    gallery,
  }
}

function isLocalizedBundle(raw: unknown): raw is { en: unknown; uz?: unknown } {
  return Boolean(
    raw &&
      typeof raw === 'object' &&
      'en' in raw &&
      (raw as { en: unknown }).en &&
      typeof (raw as { en: unknown }).en === 'object',
  )
}

/** Accept new `{ en, uz }` shape or legacy flat SiteContent. */
export function mergeLocalizedBundle(raw: unknown): LocalizedSiteContent {
  const base = structuredClone(defaultLocalizedContent)
  if (!raw || typeof raw !== 'object') return base

  if (isLocalizedBundle(raw)) {
    const en = mergeContent(raw.en, base.en)
    const uzMerged = mergeContent(raw.uz ?? raw.en, base.uz)
    return {
      en,
      uz: uzNeedsAutoTranslate(uzMerged, en) ? buildAutoUzbek(en) : uzMerged,
    }
  }

  // Legacy flat payload → English + auto Uzbek (media from EN)
  const en = mergeContent(raw, base.en)
  return {
    en,
    uz: buildAutoUzbek(en),
  }
}

function pickString(primary: string, fallback: string): string {
  return primary?.trim() ? primary : fallback
}

/** For display: auto-Uzbek when CMS UZ is still English; else coalesce. */
export function resolveLocalizedContent(
  bundle: LocalizedSiteContent,
  locale: Locale,
): SiteContent {
  if (locale === 'en') return bundle.en

  const autoUz = buildAutoUzbek(bundle.en)
  if (uzNeedsAutoTranslate(bundle.uz, bundle.en)) {
    return autoUz
  }

  const uz = bundle.uz

  const coalesceDeep = (p: unknown, f: unknown): unknown => {
    if (typeof p === 'string' && typeof f === 'string') return pickString(p, f)
    if (Array.isArray(p) && Array.isArray(f)) {
      if (p.length === 0 && f.length > 0) return structuredClone(f)
      return p.map((item, i) =>
        i < f.length ? coalesceDeep(item, f[i]) : item,
      )
    }
    if (
      p &&
      f &&
      typeof p === 'object' &&
      typeof f === 'object' &&
      !Array.isArray(p) &&
      !Array.isArray(f)
    ) {
      const out: Record<string, unknown> = {
        ...(f as Record<string, unknown>),
        ...(p as Record<string, unknown>),
      }
      for (const key of Object.keys(out)) {
        const pv = (p as Record<string, unknown>)[key]
        const fv = (f as Record<string, unknown>)[key]
        if (pv === undefined) out[key] = fv
        else if (fv !== undefined) out[key] = coalesceDeep(pv, fv)
      }
      return out
    }
    return p ?? f
  }

  return coalesceDeep(uz, autoUz) as SiteContent
}
