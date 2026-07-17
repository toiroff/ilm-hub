import { ArrowRight } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button } from '../components/Button'
import { journeyTimeline } from '../data/team'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'

const typeStyles: Record<string, string> = {
  project: 'bg-teal/15 text-teal',
  community: 'bg-indigo/20 text-indigo',
  challenge: 'bg-gold/15 text-gold',
  upcoming: 'bg-orange/15 text-orange',
}

export function AboutPage() {
  const { content } = useSiteContent()
  const { about, teamLeads, teamMembers } = content

  return (
    <div className="pt-20">
      <section className="section-pad relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(24,190,188,0.15),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              {about.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
              {about.headline}{' '}
              <span className="text-gradient">{about.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
              {about.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-12 pb-20 sm:pt-16 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-gold">
                Mission
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                {about.mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-gold">
                Our Story
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                {about.story}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-7xl">
          <h3 className="font-display text-lg font-semibold text-white">
            Values
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {about.values.map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
              >
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="timeline" className="section-pad pb-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              Journey
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Project timeline
            </h2>
            <p className="mt-4 text-white/55">
              From Telegram posts to camps and challenges — how ILM Hub grew.
            </p>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-teal via-indigo to-gold sm:left-1/2 sm:-translate-x-px" />
            {journeyTimeline.map((item, i) => (
              <Reveal
                key={`${item.period}-${item.title}`}
                delay={i * 0.04}
                className={`relative mb-10 flex ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className="hidden w-1/2 sm:block" />
                <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-navy bg-gold shadow-[0_0_12px_rgba(246,199,68,0.8)] sm:left-1/2" />
                <div className="ml-10 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:ml-0 sm:w-[calc(50%-2rem)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold tracking-wide text-gold uppercase">
                      {item.period}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${typeStyles[item.type]}`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/55">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section-pad pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              Team
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              The people behind ILM Hub
            </h2>
            <p className="mt-3 max-w-xl text-white/55">
              Organizers and mentors who design challenges, run camps, and
              support students every day.
            </p>
          </Reveal>

          <Stagger className="mt-12 flex flex-wrap items-start justify-center gap-10 sm:gap-16">
            {teamLeads.map((member) => (
              <StaggerItem key={member.name} className="w-[12rem] text-center sm:w-[14rem]">
                <article className="group">
                  {member.photo ? (
                    <div className="mx-auto flex h-44 w-36 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-navy-deep sm:h-52 sm:w-40">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-44 w-36 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/25 to-indigo/25 font-display text-3xl font-bold text-white/80 sm:h-52 sm:w-40">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="mt-5 font-display text-lg font-bold text-white sm:text-xl">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-gold">
                    {member.role}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center transition hover:border-teal/30">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="mx-auto h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal/30 to-indigo/30 font-display text-sm font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="mt-3 font-display text-sm font-bold text-white sm:text-base">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gold">
                    {member.role}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-navy via-indigo/80 to-navy p-10 sm:p-14">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Season 3 is coming
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Join the next chapter of ILM Mode — build discipline with a
              community across Uzbekistan.
            </p>
            <Button href={SEASON3_APPLY_URL} variant="gold" className="mt-8">
              Apply for Season 3 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
