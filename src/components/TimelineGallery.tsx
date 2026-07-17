import { useState } from 'react'
import { X, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { gallery, timeline } from '../data/content'
import { useSiteContent } from '../content/ContentContext'

export function Timeline() {
  return (
    <section id="timeline" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            Season Journey
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Challenge agenda
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-teal via-indigo to-gold sm:left-1/2 sm:-translate-x-px" />
          {timeline.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.05}
              className={`relative mb-10 flex ${
                i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              <div className="hidden w-1/2 sm:block" />
              <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-navy bg-teal shadow-[0_0_12px_rgba(24,190,188,0.8)] sm:left-1/2" />
              <div className="ml-10 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:ml-0 sm:w-[calc(50%-2rem)]">
                <h3 className="font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/55">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const filters = ['all', 'photos', 'videos', 'ceremonies', 'projects'] as const

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null)

  const items =
    filter === 'all' ? gallery : gallery.filter((g) => g.type === filter)

  return (
    <section id="gallery" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            Gallery
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Moments from the community
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
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
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <StaggerItem key={item.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                  <div className="flex w-full items-center justify-between p-4">
                    <span className="text-sm font-medium text-white">
                      {item.label}
                    </span>
                    {item.type === 'videos' && (
                      <Play className="h-5 w-5 text-gold" />
                    )}
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
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
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={active.src}
              alt={active.label}
              className="max-h-[85vh] max-w-4xl rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Testimonials() {
  const { content } = useSiteContent()
  const testimonials = content.testimonials
  const [index, setIndex] = useState(0)
  const safeIndex = testimonials.length
    ? Math.min(index, testimonials.length - 1)
    : 0
  const t = testimonials[safeIndex]

  if (!t) return null

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(246,199,68,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            Voices
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Voices from the community
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={`${t.name}-${safeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="glass-light rounded-[2rem] p-8 text-center sm:p-12"
            >
              <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
                “{t.quote}”
              </p>
              <p className="mt-8 font-display text-lg font-bold text-white">
                {t.name}
              </p>
              <p className="mt-1 text-sm text-white/45">{t.role}</p>
              <p className="mt-3 text-gold">{'★'.repeat(t.rating)}</p>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === safeIndex ? 'w-8 bg-teal' : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
