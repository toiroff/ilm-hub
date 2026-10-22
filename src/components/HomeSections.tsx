import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Download, Plus } from 'lucide-react'
import { Button } from './Button'
import { CoverImage } from './CoverImage'
import { Phone } from './HabitZone'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
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
      title: t('home.what.challenge'),
      text: t('home.intro.challenges'),
      image: '/assets/who-we-are.png',
      alt: 'Challenge graduates with their certificates',
      link: { to: '/challenges', label: t('home.what.challengeLink') },
      extra: (
        <ul className="mt-6 flex flex-wrap gap-2">
          {TRACKS.map((track) => (
            <li key={track} className="rounded-lg bg-tint px-3 py-1.5 text-[15px] font-medium">
              {track}
            </li>
          ))}
        </ul>
      ),
    },
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
                <p className="text-[56px] leading-none font-bold tracking-[-0.05em] text-accent">0{i + 1}</p>
                <h3 className="mt-4 text-[28px] leading-tight font-bold sm:text-[32px]">{row.title}</h3>
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

  return (
    <section id="challenge" className="scroll-mt-20 bg-white">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.challenge.eyebrow')}</p>
            <h2 className="h-section mt-5">{t('home.challenge.title')}</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">{t('home.challenge.body')}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ol className="border-t border-line">
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

            <p className="mt-10 text-sm font-semibold text-ink-faint">{t('home.challenge.tracks')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TRACKS.map((track) => (
                <li key={track} className="rounded-lg bg-tint px-3 py-1.5 text-[15px] font-medium">
                  {track}
                </li>
              ))}
            </ul>
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

export function Voices() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const [featured, ...rest] = content.testimonials
  if (!featured) return null

  return (
    <section className="bg-white">
      <div className="container-page py-20 lg:py-28">
        <p className="eyebrow">{t('home.voices.title')}</p>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-7">
            <span className="block text-[96px] leading-[0.6] font-bold text-accent" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-6 text-[22px] leading-[1.5] font-medium tracking-[-0.01em] sm:text-[26px]">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {initials(featured.name)}
              </span>
              <span>
                <span className="block font-semibold">{featured.name}</span>
                <span className="block text-[15px] text-ink-faint">{featured.role}</span>
              </span>
              {featured.link && <SourceLink href={featured.link} />}
            </figcaption>
          </figure>
          <div className="space-y-4 lg:col-span-5">
            {rest.slice(0, 2).map((v) => (
              <figure key={`${v.name}-${v.seasonId}`} className="rounded-2xl bg-tint p-7">
                <blockquote className="leading-relaxed text-ink-soft">“{v.quote}”</blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
                  <span>
                    <span className="font-semibold">{v.name}</span>
                    <span className="text-ink-faint"> · {v.role}</span>
                  </span>
                  {v.link && <SourceLink href={v.link} />}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Team() {
  const { content } = useSiteContent()
  const { t } = useLocale()
  const solo = content.teamLeads.length === 1

  return (
    <section className="bg-white">
      <div className="container-page grid gap-12 border-t border-line py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <p className="eyebrow">{t('home.team.eyebrow')}</p>
          <h2 className="h-section mt-5">{t('home.team.title')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t('home.team.text')}</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {content.teamMembers.slice(0, 6).map((m) => (
              <li key={m.name} className="border-t border-line py-3">
                <p className="font-semibold">{m.name}</p>
                <p className="truncate text-sm text-ink-faint">{m.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink to="/about#team">{t('home.team.link')}</TextLink>
          </div>
        </div>
        <div className={`grid gap-4 lg:col-span-7 ${solo ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {content.teamLeads.map((lead, i) => (
            <figure
              key={lead.name}
              className={solo ? 'grid items-end gap-6 sm:grid-cols-2 sm:gap-8' : i % 2 === 1 ? 'sm:mt-16' : ''}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-tint">
                {lead.photo ? (
                  <img src={lead.photo} alt={lead.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl font-bold">{initials(lead.name)}</div>
                )}
              </div>
              <figcaption className={solo ? 'sm:pb-2' : 'mt-4'}>
                <p className={`font-bold tracking-tight ${solo ? 'text-2xl' : 'text-lg'}`}>{lead.name}</p>
                <p className="text-[15px] text-ink-soft">{lead.role}</p>
                {solo && lead.bio && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead.bio}</p>}
              </figcaption>
            </figure>
          ))}
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
