import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button } from '../components/Button'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'

export function EventsPage() {
  const { content } = useSiteContent()
  const events = content.events
  const featured = events.find((e) => e.featured) ?? events[0]
  const upcoming = events.filter((e) => e.id !== featured?.id)

  if (!featured) {
    return (
      <div className="pt-20 section-pad py-20 text-white/55">
        No events yet.
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="section-pad py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              Events
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Upcoming gatherings
            </h1>
            <p className="mt-5 max-w-xl text-white/55">
              Workshops, ceremonies, guest talks, and networking nights that
              keep the community connected.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <article className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-xs font-semibold tracking-widest text-teal uppercase">
                  {featured.type}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-white/55">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gold" />
                    {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    {featured.time}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    {featured.location}
                  </span>
                </div>
                <Button href={SEASON3_APPLY_URL} className="mt-8 w-fit">
                  Register Interest <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold">More upcoming</h2>
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <StaggerItem key={event.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-gold/30">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={event.cover}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold text-teal uppercase">
                      {event.type}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold">
                      {event.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-white/55">
                      {event.description}
                    </p>
                    <div className="mt-4 space-y-1.5 text-xs text-white/45">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        {event.date} · {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  )
}
