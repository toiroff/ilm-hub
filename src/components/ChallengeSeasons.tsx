import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { Button } from './Button'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'

export function FeaturedChallenge() {
  const { content } = useSiteContent()
  const challengeWeeks = content.challengeWeeks

  return (
    <section id="challenges" className="section-pad relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 via-navy to-navy" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              Featured Challenge
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              ILM Mode Challenge
            </h2>
            <p className="mt-6 text-lg text-white/60">
              21 days of discipline.
              <br />
              Opening ceremony, weekly meetings & guest speakers.
              <br />
              Closing ceremony with certificates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={SEASON3_APPLY_URL} variant="gold">
                Join Next Season <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/challenges" variant="secondary">
                Explore Challenges
              </Button>
            </div>
          </Reveal>

          <Stagger className="space-y-0">
            {challengeWeeks.map((week, i) => (
              <StaggerItem key={`${week.week}-${week.title}-${i}`}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm font-bold text-gold">
                      {i + 1}
                    </div>
                    {i < challengeWeeks.length - 1 && (
                      <div className="my-1 h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs tracking-widest text-white/40 uppercase">
                      {week.week}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {week.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{week.detail}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

export function PreviousSeasons({
  eyebrow = 'Previous Seasons',
  title = 'Stories from every cohort',
  variant = 'cards',
}: {
  eyebrow?: string
  title?: string
  variant?: 'cards' | 'impact'
} = {}) {
  const { content } = useSiteContent()
  const seasons = content.seasons

  return (
    <section id="seasons" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h2>
          </div>
        </Reveal>

        {variant === 'impact' ? (
          <Stagger className="mt-14 space-y-6">
            {seasons.map((season) => (
              <StaggerItem key={season.id}>
                <article className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 transition hover:border-teal/30 sm:p-10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                          Season {season.number}
                        </span>
                        {season.period && (
                          <span className="text-xs tracking-wide text-white/45 uppercase">
                            {season.period}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                        {season.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                        {season.story}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {season.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm text-white/65"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/seasons/${season.id}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition group-hover:gap-2.5"
                      >
                        Read full story <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid w-full max-w-sm grid-cols-2 gap-3 lg:shrink-0">
                      <div className="rounded-2xl border border-white/10 bg-navy/40 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-white">
                          {season.participants}
                        </p>
                        <p className="mt-1 text-xs text-white/45">Participants</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-navy/40 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-gold">
                          {season.graduates}
                        </p>
                        <p className="mt-1 text-xs text-white/45">Graduates</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-navy/40 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-teal">
                          {season.completion}%
                        </p>
                        <p className="mt-1 text-xs text-white/45">Completion</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-navy/40 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-white">
                          21
                        </p>
                        <p className="mt-1 text-xs text-white/45">Days</p>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {seasons.map((season) => (
              <StaggerItem key={season.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/5">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={season.cover}
                      alt={season.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                      Season {season.number}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {season.period && (
                      <p className="text-xs tracking-wide text-gold/80 uppercase">
                        {season.period}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/50">
                      <span>{season.participants} Participants</span>
                      <span>·</span>
                      <span>{season.graduates} Graduates</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-teal">
                      {season.completion}% Completion
                    </p>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm text-white/55">
                      {season.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gold">
                        {'★'.repeat(Math.round(season.rating))}
                      </span>
                      <Link
                        to={`/seasons/${season.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-white transition group-hover:text-teal"
                      >
                        View Story <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  )
}
