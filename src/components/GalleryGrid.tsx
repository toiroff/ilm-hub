import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { useSiteContent } from '../content/ContentContext'
import type { GalleryItem } from '../content/types'
import {
  GALLERY_FILTERS,
  buildGalleryFeed,
  filterGalleryItems,
  type GalleryFilter,
} from '../lib/gallery'
import { useLocale } from '../i18n/locale'

type GalleryGridProps = {
  /** Limit items on home teaser; omit for full feed */
  limit?: number
  showViewAll?: boolean
  eyebrow?: string
  title?: string
  subtitle?: string
}

export function GalleryGrid({
  limit,
  showViewAll = false,
  eyebrow,
  title,
  subtitle,
}: GalleryGridProps) {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [active, setActive] = useState<GalleryItem | null>(null)

  const feed = useMemo(() => buildGalleryFeed(content), [content])
  const filtered = useMemo(
    () => filterGalleryItems(feed, filter),
    [feed, filter],
  )
  const items = limit ? filtered.slice(0, limit) : filtered
  const hasMore = Boolean(limit && filtered.length > limit)
  const eyebrowText = eyebrow ?? t('gallery.eyebrow')
  const titleText = title ?? t('gallery.title')
  const subtitleText = subtitle ?? t('gallery.subtitle')

  return (
    <section id="gallery" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            {eyebrowText}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {titleText}
          </h2>
          {subtitleText ? (
            <p className="mx-auto mt-4 max-w-2xl text-white/55">{subtitleText}</p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                  filter === f
                    ? 'bg-teal text-navy'
                    : 'border border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {t(`gallery.filter.${f}`)}
              </button>
            ))}
          </div>
        </Reveal>

        {items.length === 0 ? (
          <p className="mt-12 text-center text-sm text-white/45">
            {t('gallery.empty')}
          </p>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((item, i) => {
              const isVideo = Boolean(item.videoUrl) || item.type === 'videos'
              return (
                <Reveal
                  key={item.id}
                  delay={Math.min(i * 0.04, 0.24)}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-auto w-full transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                      <div className="flex w-full items-center justify-between p-4">
                        <span className="text-sm font-medium text-white">
                          {item.label}
                        </span>
                        {isVideo ? <Play className="h-5 w-5 text-gold" /> : null}
                      </div>
                    </div>
                    {isVideo ? (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-medium text-gold backdrop-blur">
                        <Play className="h-3 w-3" /> {t('gallery.videoBadge')}
                      </span>
                    ) : null}
                  </button>
                </Reveal>
              )
            })}
          </div>
        )}

        {showViewAll && hasMore ? (
          <div className="mt-12 flex justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:border-teal/40 hover:text-teal"
            >
              {t('gallery.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-6 top-6 rounded-full border border-white/20 p-2 text-white"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {active.videoUrl ? (
                <video
                  src={active.videoUrl}
                  poster={active.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] w-full rounded-2xl bg-black object-contain"
                />
              ) : (
                <img
                  src={active.src}
                  alt={active.label}
                  className="max-h-[85vh] w-full rounded-2xl object-contain"
                />
              )}
              <p className="mt-3 text-center text-sm text-white/70">
                {active.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/** Home-page gallery teaser (kept name for HomePage import). */
export function Gallery() {
  return <GalleryGrid limit={9} showViewAll />
}
