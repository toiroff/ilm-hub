import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
import { localizedTimeline } from '../i18n/staticContent'

export function Timeline() {
  const { locale } = useLocale()
  const items = localizedTimeline(locale)

  return (
    <section id="timeline" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            {locale === 'uz' ? 'Mavsum yoʻli' : 'Season Journey'}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {locale === 'uz' ? 'Challenge kun tartibi' : 'Challenge agenda'}
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-teal via-indigo to-gold sm:left-1/2 sm:-translate-x-px" />
          {items.map((item, i) => (
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

export { Gallery } from './GalleryGrid'

export function Testimonials() {
  const { content } = useSiteContent()
  const { locale } = useLocale()
  const testimonials = content.testimonials
  const [index, setIndex] = useState(0)
  const safeIndex = testimonials.length
    ? Math.min(index, testimonials.length - 1)
    : 0
  const t = testimonials[safeIndex]

  if (!t) return null

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(246,199,68,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            {locale === 'uz' ? 'Ovozlar' : 'Voices'}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {locale === 'uz'
              ? 'Jamiyatdan ovozlar'
              : 'Voices from the community'}
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
                  i === safeIndex
                    ? 'w-8 bg-teal'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
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
