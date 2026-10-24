import { useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Download, Plus } from 'lucide-react'
import { Button } from './Button'
import { CoverImage } from './CoverImage'
import { Phone } from './HabitZone'
import { LeadCard } from './Team'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
import type { Testimonial } from '../data/testimonials'
import { initials } from '../lib/initials'

import { TRACKS } from '../lib/tracks'

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 font-semibold text-blue">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

export function WhatWeDo() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const w = content.whoWeAre
  const rows = [
    {
      title: t('home.what.projects'),
      text: t('home.intro.projects'),
      image: '/assets/projects/english-day-camp/photo-1.png',
      alt: 'English Day Camp participants on stage',
      link: { to: '/projects', label: t('home.projects.all') },
      extra: (
        <ul className="mt-6 space-y-2">
          {content.projects.slice(0, 3).map((p) => (
            <li key={p.id} className="flex items-center gap-3 text-[15px]">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              <span className="font-medium">{p.title}</span>
              <span className="text-ink-faint">· {p.date}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: t('home.what.community'),
      text: t('home.intro.communityText'),
      image: '/assets/projects/english-day-camp/photo-4.png',
      alt: 'ILM Hub students taking a group selfie',
      link: { to: '/about', label: t('home.what.communityLink') },
      extra: null,
    },
  ]

  return (
    <section className="bg-tint">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.what.eyebrow')}</p>
            <h2 className="h-section mt-5">
              {w.headline} <span className="text-blue">{w.headlineAccent}</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">{w.description}</p>
        </div>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
          {rows.map((row, i) => (
            <article key={row.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={`overflow-hidden rounded-2xl lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={row.image} alt={row.alt} className="aspect-[3/2] w-full object-cover" loading="lazy" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-[28px] leading-tight font-bold sm:text-[32px]">{row.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{row.text}</p>
                {row.extra}
                <div className="mt-8">
                  <TextLink to={row.link.to}>{row.link.label}</TextLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ChallengeCalendar() {
  const { t } = useLocale()
  const kind = (day: number) => (day === 1 || day === 21 ? 'ceremony' : day % 7 === 0 ? 'weekly' : 'daily')
  const legend = [
    { key: 'daily', label: t('home.cal.daily'), swatch: 'bg-tint ring-1 ring-line' },
    { key: 'weekly', label: t('home.cal.weekly'), swatch: 'bg-blue' },
    { key: 'ceremony', label: t('home.cal.ceremony'), swatch: 'bg-accent' },
  ]
  const cellClass = { daily: 'bg-tint text-ink', weekly: 'bg-blue text-white', ceremony: 'bg-accent text-white' }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-8">
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-bold tracking-tight">{t('home.cal.title')}</p>
        <p className="text-sm text-ink-faint">3 × 7</p>
      </div>
      <ol className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2.5" aria-label={t('home.cal.title')}>
        {Array.from({ length: 21 }, (_, i) => {
          const day = i + 1
          const k = kind(day)
          const label = legend.find((l) => l.key === k)!.label
          return (
            <li
              key={day}
              title={`${t('home.cal.day')} ${day} — ${label}`}
              className={`flex aspect-square items-center justify-center rounded-xl text-sm font-bold sm:text-lg ${cellClass[k]}`}
            >
              {day}
            </li>
          )
        })}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-soft">
        {legend.map((l) => (
          <li key={l.key} className="flex items-center gap-2">
            <span className={`h-3.5 w-3.5 rounded ${l.swatch}`} />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Challenge() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const facts = [
    ['21', t('home.challenge.fact.days')],
    [String(TRACKS.length), `${t('home.challenge.fact.tracks')}: ${TRACKS.join(', ')}`],
    [t('home.challenge.fact.dailyValue'), t('home.challenge.fact.daily')],
    [t('home.challenge.fact.certValue'), t('home.challenge.fact.cert')],
  ]

  return (
    <section id="challenge" className="scroll-mt-20 bg-white">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.challenge.eyebrow')}</p>
            <h2 className="h-section mt-5">
              {t('home.challenge.title')} <span className="text-blue">{t('home.challenge.titleAccent')}</span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-ink-soft">{t('home.challenge.lead')}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
            {facts.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-tint p-5">
                <dd className="text-[28px] leading-none font-bold tracking-[-0.03em] text-ink">{value}</dd>
                <dt className="mt-2 text-[15px] leading-snug text-ink-soft">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-lg font-bold tracking-tight">{t('home.challenge.rhythm')}</p>
            <ol className="mt-4 border-t border-line">
              {content.challengeWeeks.map((step, i) => (
                <li key={`${step.title}-${i}`} className="flex items-center gap-5 border-b border-line py-6">
                  <span className="w-10 shrink-0 text-2xl font-bold text-accent tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="flex-1 text-[22px] leading-tight font-bold tracking-tight sm:text-2xl">{step.title}</p>
                  <span className="shrink-0 rounded-lg bg-tint px-3 py-1 text-sm font-medium text-ink-soft">{step.week}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/challenges">
                {t('home.challenge.agenda')} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/habit-zone" variant="secondary">
                {t('home.challenge.tryApp')}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ChallengeCalendar />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Season results as rates (completion + satisfaction) — raw headcounts stay off the public site. */
export function SeasonRates({
  season,
  tone = 'light',
  className = '',
}: {
  season: { completion: number; satisfaction: number }
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { t } = useLocale()
  const dark = tone === 'dark'
  const rates = [
    { label: t('home.card.completion'), value: season.completion, bar: 'bg-accent' },
    { label: t('home.card.satisfaction'), value: season.satisfaction, bar: dark ? 'bg-white' : 'bg-blue' },
  ]

  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
      {rates.map((r) => (
        <div key={r.label}>
          <p className="text-[56px] leading-none font-bold tracking-[-0.05em]">
            {r.value}
            <span className={dark ? 'text-white/50' : 'text-ink-faint'}>%</span>
          </p>
          <p className={`mt-2 text-[15px] ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{r.label}</p>
          <div className={`mt-4 h-2 overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-white'}`}>
            <div className={`h-full rounded-full ${r.bar}`} style={{ width: `${r.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Seasons() {
  const { content } = useSiteContent()
  const { t } = useLocale()

  return (
    <section className="bg-white">
      <div className="container-page py-20 lg:py-28">
        <p className="eyebrow">{t('home.seasons.eyebrow')}</p>
        <h2 className="h-section mt-5 max-w-[18ch]">{t('home.seasons.title')}</h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {content.seasons.map((s) => (
            <Link
              key={s.id}
              to={`/seasons/${s.id}`}
              className="group flex flex-col rounded-2xl bg-tint p-7 transition-colors hover:bg-blue-soft sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink-faint">{s.period}</p>
                  <h3 className="mt-1 text-2xl font-bold sm:text-[28px]">{s.title}</h3>
                </div>
                <ArrowRight className="mt-2 h-6 w-6 shrink-0 text-ink-faint transition group-hover:translate-x-1 group-hover:text-blue" />
              </div>

              <SeasonRates season={s} className="mt-10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProject() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const [featured, ...others] = content.projects
  if (!featured) return null
  const thumbs = featured.gallery.slice(0, 3)

  return (
    <section className="bg-tint">
      <div className="container-page py-20 lg:py-28">
        <p className="eyebrow">{t('home.projects.featured')}</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Link to={`/projects/${featured.id}`} className="block overflow-hidden rounded-2xl">
              <CoverImage
                src={featured.cover}
                alt={featured.title}
                label={featured.title}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </Link>
            {thumbs.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {thumbs.map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt={`${featured.title} — photo ${i + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-sm font-semibold text-ink-faint">{featured.category}</p>
            <h2 className="h-section mt-3">{featured.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{featured.description}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
              {[
                [String(featured.participants), t('home.card.participants')],
                [featured.date, t('home.fact.date')],
                [featured.location, t('home.fact.format')],
              ].map(([value, label]) => (
                <div key={label}>
                  <dd className="text-lg leading-tight font-bold">{value}</dd>
                  <dt className="mt-1 text-sm text-ink-faint">{label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-3">
              {featured.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button to={`/projects/${featured.id}`}>
                {t('home.projects.read')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-16 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="group flex items-center gap-5 rounded-2xl bg-white p-3 pr-6">
                <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <CoverImage src={p.cover} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink-faint">
                    {p.category} · {p.date}
                  </p>
                  <p className="mt-0.5 text-xl font-bold tracking-tight group-hover:text-blue">{p.title}</p>
                  <p className="mt-0.5 text-[15px] text-ink-soft">
                    {p.participants} {t('home.card.students')}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink-faint group-hover:text-blue" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function SourceLink({ href }: { href: string }) {
  const { t } = useLocale()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
    >
      {t('home.voices.source')} <ArrowUpRight className="h-4 w-4" />
    </a>
  )
}

const AVATAR_COLORS = ['bg-accent', 'bg-blue', 'bg-navy', 'bg-accent-ink', 'bg-blue-hover']
const QUOTE_PREVIEW_CHARS = 150

function VoiceCard({ voice, seasonLabel }: { voice: Testimonial; seasonLabel: string }) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const long = voice.quote.length > QUOTE_PREVIEW_CHARS
  const color = AVATAR_COLORS[[...voice.name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length]

  return (
    <figure className="w-[300px] rounded-2xl bg-blue-soft p-5 sm:w-[360px] sm:p-6">
      <figcaption className="flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}>
          {initials(voice.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-ink">{voice.name}</span>
          <span className="block truncate text-sm text-ink-soft">{voice.role}</span>
        </span>
        <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-blue">{seasonLabel}</span>
      </figcaption>
      <blockquote className={`mt-4 text-[15px] leading-relaxed text-ink ${long && !open ? 'line-clamp-3' : ''}`}>
        {voice.quote}
      </blockquote>
      {(long || voice.link) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          {long && (
            <button type="button" onClick={() => setOpen((v) => !v)} className="text-sm font-semibold text-blue hover:underline">
              {open ? t('home.voices.less') : t('home.voices.more')}
            </button>
          )}
          {voice.link && <SourceLink href={voice.link} />}
        </div>
      )}
    </figure>
  )
}

/** One endlessly scrolling row: the list is rendered twice so the -50% loop is seamless. */
function VoiceRow({ voices, reverse, seasonLabel }: { voices: Testimonial[]; reverse?: boolean; seasonLabel: (id: string) => string }) {
  return (
    <div className="marquee marquee-fade">
      <ul
        className={`marquee-track flex w-max items-start ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': `${Math.max(30, voices.length * 9)}s` } as CSSProperties}
      >
        {[...voices, ...voices].map((v, i) => (
          <li key={`${v.name}-${i}`} className="shrink-0 pr-4" aria-hidden={i >= voices.length}>
            <VoiceCard voice={v} seasonLabel={seasonLabel(v.seasonId)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Voices() {
  const { content } = useSiteContent()
  const { t, locale } = useLocale()
  const all = content.testimonials
  if (all.length === 0) return null

  const seasonNumber = (id: string) => Number(id.replace(/\D/g, '')) || 0
  const seasonLabel = (id: string) =>
    locale === 'uz' ? `${seasonNumber(id)}-mavsum` : `Season ${seasonNumber(id)}`
  // Two rows moving in opposite directions (one row when there are only a few)
  const twoRows = all.length >= 6
  const rowA = twoRows ? all.filter((_, i) => i % 2 === 0) : all
  const rowB = twoRows ? all.filter((_, i) => i % 2 === 1) : []

  return (
    <section className="bg-white">
      <div className="container-page border-t border-line pt-20 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.voices.title')}</p>
            <h2 className="h-section mt-5">{t('home.voices.heading')}</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5">{t('home.voices.sub')}</p>
        </div>
      </div>
      <div className="mt-12 space-y-4 pb-20 lg:pb-28">
        <VoiceRow voices={rowA} seasonLabel={seasonLabel} />
        {rowB.length > 0 && <VoiceRow voices={rowB} reverse seasonLabel={seasonLabel} />}
      </div>
    </section>
  )
}

export function Team() {
  const { content } = useSiteContent()
  const { t } = useLocale()

  return (
    <section className="bg-white">
      <div className="container-page border-t border-line py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.team.eyebrow')}</p>
            <h2 className="h-section mt-5">{t('home.team.title')}</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">{t('home.team.text')}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {content.teamLeads.map((lead) => (
              <LeadCard key={lead.name} lead={lead} compact />
            ))}
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-ink-faint">{t('home.team.more')}</p>
            <ul className="mt-3 border-t border-line">
              {content.teamMembers.map((m) => (
                <li key={m.name} className="flex items-center gap-3 border-b border-line py-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {initials(m.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{m.name}</span>
                    <span className="block text-sm text-ink-soft">{m.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink to="/about#team">{t('home.team.link')}</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const { t } = useLocale()
  const [open, setOpen] = useState<number | null>(0)
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`home.faq.q${n}`), a: t(`home.faq.a${n}`) }))

  return (
    <section className="bg-tint">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 className="h-section">{t('home.faq.title')}</h2>
          <p className="mt-5 text-ink-soft">
            {t('home.join.email')}{' '}
            <a href="mailto:hello@ilmhub.community" className="font-semibold text-blue hover:underline">
              hello@ilmhub.community
            </a>
          </p>
        </div>
        <ul className="space-y-3 lg:col-span-7">
          {items.map((item, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <li key={item.q} className="rounded-2xl bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-semibold"
                >
                  {item.q}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-blue text-white' : 'bg-tint text-ink'
                    }`}
                  >
                    <Plus className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
                  </span>
                </button>
                <div
                  id={id}
                  className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <p className="overflow-hidden leading-relaxed text-ink-soft">
                    <span className="block max-w-[60ch] px-6 pb-6">{item.a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function ClosingCta() {
  const { t } = useLocale()
  return (
    <section id="contact" className="scroll-mt-20 overflow-hidden bg-navy text-white">
      <div className="container-page grid gap-12 pt-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-24">
        <div className="pb-4 lg:col-span-7 lg:pb-24">
          <h2 className="h-section max-w-[18ch]">{t('home.join.title')}</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/70">{t('home.join.subtitle')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={HABIT_ZONE_DOWNLOAD_URL} variant="inverse" size="lg">
              <Download className="h-5 w-5" /> {t('cta.download')}
            </Button>
            <Button href="mailto:hello@ilmhub.community" variant="ghost-inverse" size="lg">
              hello@ilmhub.community
            </Button>
          </div>
        </div>
        <div className="mx-auto h-[300px] w-full max-w-[280px] sm:h-[340px] lg:col-span-5 lg:mr-0">
          <Phone screen="challenge" alt="Habit Zone challenge screen" className="!bg-white/15" />
        </div>
      </div>
    </section>
  )
}
