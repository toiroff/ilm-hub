import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'
import { MediaBackground } from './MediaBackground'
import { useLocale } from '../i18n/locale'

export function Hero() {
  const { content } = useSiteContent()
  const { hero } = content
  const { t } = useLocale()

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <MediaBackground
          image={hero.backgroundImage}
          video={hero.backgroundVideo}
          className="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-indigo/30 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-teal/20 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-3/4 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-teal/25 blur-[70px]" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src="/assets/app-phone.png"
              alt="ILM Hub app home screen"
              className="w-64 drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] xl:w-72"
            />
          </motion.div>
          <div className="relative mt-6 flex flex-col items-center gap-1.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {t('app.comingSoon')}
            </span>
            <span className="max-w-[240px] text-center text-xs text-white/50">
              {t('app.tagline')}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="section-pad relative z-10 mx-auto w-full max-w-7xl pt-28 pb-24 lg:pt-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white"
            >
              {hero.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block text-gradient"
            >
              {hero.line2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white"
            >
              {hero.line3}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href={SEASON3_APPLY_URL}>
              {t('cta.joinSeason3')} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#seasons" variant="secondary">
              {t('cta.exploreSeasons')}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition hover:text-white/70"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-white/70" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
