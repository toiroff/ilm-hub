import type { Project } from '../data/content'
import type { GalleryItem, SiteContent } from '../content/types'

function keyOf(item: Pick<GalleryItem, 'src' | 'videoUrl'>) {
  return (item.videoUrl?.trim() || item.src).trim()
}

/** Collect cover photos, gallery photos, and detail videos from projects. */
export function collectProjectGalleryItems(projects: Project[]): GalleryItem[] {
  const items: GalleryItem[] = []
  const seen = new Set<string>()

  const push = (
    project: Project,
    src: string,
    type: GalleryItem['type'],
    label: string,
    videoUrl?: string,
  ) => {
    const trimmed = src?.trim()
    if (!trimmed) return
    const key = (videoUrl?.trim() || trimmed)
    if (seen.has(key)) return
    seen.add(key)
    items.push({
      id: `project-${project.id}-${items.length}`,
      type,
      src: trimmed,
      label,
      videoUrl: videoUrl?.trim() || undefined,
    })
  }

  for (const project of projects) {
    for (const src of project.gallery ?? []) {
      push(project, src, 'projects', project.title)
    }
    if (project.cover) {
      push(project, project.cover, 'projects', `${project.title} — cover`)
    }
    const video = project.backgroundVideo?.trim()
    if (video) {
      push(
        project,
        project.cover || video,
        'videos',
        `${project.title} — video`,
        video,
      )
    }
  }

  return items
}

/** Project media + CMS gallery extras (deduped). */
export function buildGalleryFeed(content: SiteContent): GalleryItem[] {
  const manual = (content.gallery ?? []).filter((g) => g?.src?.trim())
  const fromProjects = collectProjectGalleryItems(content.projects)
  const seen = new Set<string>()
  const out: GalleryItem[] = []

  for (const item of [...fromProjects, ...manual]) {
    const key = keyOf(item)
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(item)
  }

  return out
}

export const GALLERY_FILTERS = [
  'all',
  'photos',
  'videos',
  'ceremonies',
  'projects',
] as const

export type GalleryFilter = (typeof GALLERY_FILTERS)[number]

export function filterGalleryItems(
  items: GalleryItem[],
  filter: GalleryFilter,
): GalleryItem[] {
  if (filter === 'all') return items
  if (filter === 'videos') {
    return items.filter((g) => g.type === 'videos' || Boolean(g.videoUrl))
  }
  if (filter === 'photos') {
    return items.filter((g) => !g.videoUrl && g.type !== 'videos')
  }
  return items.filter((g) => g.type === filter)
}
