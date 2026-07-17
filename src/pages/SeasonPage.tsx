import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button } from '../components/Button'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'

export function SeasonPage() {
  const { id } = useParams()
  const { content } = useSiteContent()
  const { t } = useLocale()
  const season =
    content.seasons.find((s) => s.id === id) ?? content.seasons[0]
  const voices = content.testimonials.filter(
    (t) => season && t.seasonId === season.id,
  )

  if (!season) {
    return (
      <div className="pt-20 section-pad py-20 text-white/55">
        Season not found.
      </div>
    )
  }

  const seasonStats = [
    { value: season.participants, label: 'Participants', suffix: '' },
    { value: season.graduates, label: 'Graduates', suffix: '' },
    { value: season.completion, label: 'Completion', suffix: '%' },
    { value: season.satisfaction, label: 'Satisfaction', suffix: '%' },
  ]

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={season.cover}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
        </div>
        <div className="section-pad relative mx-auto max-w-7xl py-24 lg:py-32">
          <Link
            to="/challenges#seasons"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t('season.back')}
          </Link>
          <Reveal>
            <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              {season.period ?? 'Season Story'}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              {season.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/65">
              {season.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-y border-white/5 py-14">
        <Stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
          {seasonStats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold sm:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/50">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section-pad py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Overview</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/60">
              {season.story}
            </p>
            <h3 className="mt-10 font-display text-xl font-bold">Highlights</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {season.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-white/65"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {voices.length > 0 && (
        <section className="section-pad pb-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
                Voices
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                From Season {season.number} participants
              </h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
              {voices.map((v) => (
                <StaggerItem key={`${v.name}-${v.quote.slice(0, 24)}`}>
                  <article className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                    <p className="flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
                      “{v.quote}”
                    </p>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="font-display font-bold text-white">
                        {v.name}
                      </p>
                      <p className="mt-1 text-sm text-white/45">{v.role}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="section-pad pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-brand-navy to-indigo p-10 sm:p-14">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t('cta.registerNext')}
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Carry the spirit of Season {season.number} into Season 3.
            </p>
            <Button href={SEASON3_APPLY_URL} variant="gold" className="mt-8">
              {t('cta.joinSeason3')} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
