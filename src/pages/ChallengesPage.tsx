import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import { ChallengeCalendar, Seasons, ClosingCta } from '../components/HomeSections'
import { TRACKS } from '../lib/tracks'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
import { localizedWeekOneWins } from '../i18n/staticContent'

const pillars = [
  { title: 'Daily consistency', detail: 'Detailed 21-day tasks with activity tracked every day.' },
  { title: 'Community support', detail: 'Weekly meetings and guest speakers keep you motivated.' },
  { title: 'Recognition', detail: 'Certificates, awards, and most-active challenger highlights.' },
]

export function ChallengesPage() {
  const { content } = useSiteContent()
  const { t, locale } = useLocale()
  const uz = locale === 'uz'
  const featured = content.challenges.find((c) => c.featured) ?? content.challenges[0]
  const wins = localizedWeekOneWins(locale)

  return (
    <>
      <PageHeader
        eyebrow="ILM Mode Challenge"
        title={
          <>
            A <span className="text-blue">21-day</span> discipline challenge
          </>
        }
        subtitle="Build focus, self-control, and consistency with daily tasks, weekly meetings, guest speakers, and a closing ceremony."
        aside={<ChallengeCalendar />}
      >
        <Button to="/habit-zone" size="lg">
          {t('home.challenge.tryApp')} <ArrowRight className="h-5 w-5" />
        </Button>
        <Button href="#agenda" variant="secondary" size="lg">
          See the agenda
        </Button>
      </PageHeader>

      <section id="agenda" className="scroll-mt-20 bg-navy text-white">
        <div className="container-page py-20 lg:py-28">
          <p className="eyebrow eyebrow-light">Agenda</p>
          <h2 className="h-section mt-5 max-w-[16ch]">How a season runs</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2">
            {content.challengeWeeks.map((week, i) => (
              <li key={`${week.title}-${i}`} className="bg-navy p-8 sm:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="text-[48px] leading-none font-bold tracking-[-0.05em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-white/50">{week.week}</span>
                </div>
                <p className="mt-6 text-2xl font-bold tracking-tight">{week.title}</p>
                <p className="mt-3 leading-relaxed text-white/65">{week.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-tint">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow">{uz ? 'Hisobdorlik' : 'Accountability'}</p>
            <h2 className="h-section mt-5">{uz ? 'Har bir vazifa, har kuni tekshiriladi.' : 'Every task, checked every day.'}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {uz
                ? 'Mentorlar har bir ishtirokchining kundalik vazifalarini umumiy jadvalda koʻrib chiqadi. Hech kim yolgʻiz qolmaydi va hech bir kun eʼtibordan chetda qolmaydi.'
                : 'Mentors review every participant’s daily tasks in a shared sheet. Nobody is left on their own, and no day goes unnoticed.'}
            </p>
          </div>
          <figure className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_28px_60px_-32px_rgba(11,18,32,0.4)]">
              <img
                src="/assets/challenge/daily-review-sheet.jpg"
                alt={uz ? '3-mavsum kundalik tekshiruv jadvali, ismlar yashirilgan' : 'Season 3 daily review sheet with names hidden'}
                loading="lazy"
                className="w-full rounded-xl"
              />
            </div>
            <figcaption className="mt-4 text-sm text-ink-faint">
              {uz
                ? 'Haqiqiy 3-mavsum jadvalidan parcha, 16–20-kunlar. Maxfiylik uchun ismlar yashirilgan.'
                : 'Part of a real Season 3 review sheet, days 16–20. Names are hidden for privacy.'}
            </figcaption>
          </figure>
        </div>
      </section>

      {featured && (
        <section className="bg-white">
          <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-5">
              <img
                src="/assets/projects/english-day-camp/photo-3.png"
                alt="A student receiving a certificate"
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="eyebrow">
                {featured.category} · {featured.duration}
              </p>
              <h2 className="h-section mt-5">{featured.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{featured.description}</p>

              <p className="mt-10 text-sm font-semibold text-ink-faint">{t('home.challenge.tracks')}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {TRACKS.map((track) => (
                  <li key={track} className="rounded-lg bg-tint px-3 py-1.5 font-medium">
                    {track}
                  </li>
                ))}
              </ul>

              <ul className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                {pillars.map((p) => (
                  <li key={p.title}>
                    <p className="font-bold">{p.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.detail}</p>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 space-y-3 border-t border-line pt-8">
                {featured.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="bg-tint">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-5">
            <p className="eyebrow">Real results</p>
            <h2 className="h-section mt-5">What participants achieved</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              In their own words, after their first season — change doesn’t take months, it takes intention and
              consistency.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {wins.map((win) => (
              <li key={win} className="flex items-start gap-3 rounded-2xl bg-white p-5 font-medium">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <Check className="h-3.5 w-3.5 text-accent-ink" />
                </span>
                {win}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Seasons />

      <ClosingCta />
    </>
  )
}
