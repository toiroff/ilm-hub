import { useMemo, useState } from 'react'
import { Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteContent } from '../content/ContentContext'
import type { GalleryItem } from '../content/types'
import { GALLERY_FILTERS, buildGalleryFeed, filterGalleryItems, type GalleryFilter } from '../lib/gallery'
import { useLocale } from '../i18n/locale'

export function GalleryGrid() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [active, setActive] = useState<GalleryItem | null>(null)

  const feed = useMemo(() => buildGalleryFeed(content), [content])
  const items = useMemo(() => filterGalleryItems(feed, filter), [feed, filter])

  return (
    <section className="container-page pb-20 lg:pb-28">
      <div className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl bg-tint p-1" role="group" aria-label="Filter gallery">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`press rounded-lg px-4 py-2 text-[15px] font-semibold whitespace-nowrap capitalize ${
              filter === f ? 'bg-navy text-white' : 'text-ink-soft hover:bg-white hover:text-ink'
            }`}
          >
            {t(`gallery.filter.${f}`)}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-12 text-ink-faint">{t('gallery.empty')}</p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => {
            const isVideo = Boolean(item.videoUrl) || item.type === 'videos'
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = 'none'
                  }}
                />
                {isVideo && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-ink">
                    <Play className="h-3 w-3" /> {t('gallery.videoBadge')}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-sm text-white opacity-0 transition group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

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
              className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
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
                <img src={active.src} alt={active.label} className="max-h-[85vh] w-full rounded-2xl object-contain" />
              )}
              <p className="mt-3 text-center text-sm text-white/70">{active.label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
