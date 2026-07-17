import { ArrowRight, CheckCircle2, Flame, Users, Trophy } from 'lucide-react'
import { weekOneWins } from '../data/content'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button } from '../components/Button'
import { PreviousSeasons } from '../components/ChallengeSeasons'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'

const pillars = [
  {
    icon: Flame,
    title: 'Daily consistency',
    detail: 'Detailed 21-day tasks with activity tracked every day.',
  },
  {
    icon: Users,
    title: 'Community support',
    detail: 'Weekly meetings and guest speakers keep you motivated.',
  },
  {
    icon: Trophy,
    title: 'Recognition',
    detail: 'Certificates, awards, and most-active challenger highlights.',
  },
]

const tracks = ['IELTS', 'SAT', 'IT (No-coding)', 'Biology']

export function ChallengesPage() {
  const { content } = useSiteContent()
  const challenges = content.challenges
  const challengeWeeks = content.challengeWeeks
  const featured = challenges.find((c) => c.featured) ?? challenges[0]

  if (!featured) {
    return (
      <div className="pt-20 section-pad py-20 text-white/55">
        No challenges yet.
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="section-pad relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(246,199,68,0.15),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(24,190,188,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              Challenges
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
              ILM Mode — 21-day discipline challenge
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/55">
              Build focus, self-control, and consistency with daily tasks,
              weekly meetings, guest speakers, and a closing ceremony.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={SEASON3_APPLY_URL} variant="gold">
                Join Season 3 <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#agenda" variant="secondary">
                See agenda
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <article className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:bg-gradient-to-r" />
                <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                  Season 3
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="flex flex-wrap gap-3 text-xs text-white/50">
                  <span className="rounded-full bg-teal/15 px-3 py-1 text-teal">
                    {featured.category}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {featured.duration}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-white/55">{featured.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tracks.map((track) => (
                    <span
                      key={track}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {track}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 space-y-2">
                  {featured.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
                      {o}
                    </li>
                  ))}
                </ul>
                <Button href={SEASON3_APPLY_URL} className="mt-8 w-fit">
                  Apply for Season 3 <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section
        id="agenda"
        className="section-pad relative overflow-hidden py-20 lg:py-28"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 via-navy to-navy" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
                Challenge agenda
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Events & sessions
              </h2>
              <p className="mt-5 text-white/55">
                Every season includes ceremonies, guest speakers, and weekly
                check-ins — all online via Google Meet.
              </p>
            </Reveal>

            <Stagger className="space-y-0">
              {challengeWeeks.map((week, i) => (
                <StaggerItem key={week.title}>
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

      <section className="section-pad py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              Real results
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Just 21 Days. Real Change.
            </h2>
            <p className="mt-4 text-white/55">
              Our participants achieved this in 21 days — proof that change
              doesn’t require months. It requires intention and consistency.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {weekOneWins.map((win) => (
              <StaggerItem key={win}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm text-white/70">{win}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-8 text-center">
            <p className="text-sm text-white/45">And this was only the beginning.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Why challenges work
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition hover:border-teal/30">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{p.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <PreviousSeasons
        eyebrow="Past Seasons"
        title="Previous challenge seasons"
        variant="impact"
      />

      <section className="section-pad pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-navy via-indigo/80 to-navy p-10 sm:p-14">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready for your next challenge?
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Season 3 registration is open. Commit to consistency and grow with
              the community.
            </p>
            <Button href={SEASON3_APPLY_URL} variant="gold" className="mt-8">
              Register for Season 3 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
