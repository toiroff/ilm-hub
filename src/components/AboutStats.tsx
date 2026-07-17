import { Link } from 'react-router-dom'
import { AnimatedCounter } from './AnimatedCounter'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { useSiteContent } from '../content/ContentContext'

export function Stats() {
  const { content } = useSiteContent()

  return (
    <section id="stats" className="section-pad relative border-y border-white/5 py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {content.stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export function About() {
  const { content } = useSiteContent()
  const w = content.whoWeAre

  return (
    <section id="about" className="section-pad py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal/20 via-indigo/10 to-gold/10 blur-2xl" />
            <div className="relative space-y-3">
              <div className="overflow-hidden rounded-[1.75rem] card-glow aspect-[16/10]">
                <img
                  src={w.photoTop}
                  alt="ILM Hub students with certificates"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex aspect-[3/2] items-center justify-center overflow-hidden rounded-[1.75rem] bg-navy-deep card-glow">
                <img
                  src={w.photoBottom}
                  alt="ILM Hub students"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 z-10 glass-light rounded-2xl p-5 sm:right-6">
              <p className="font-display text-2xl font-bold text-gold">
                {w.badgeValue}
              </p>
              <p className="text-xs text-white/60">{w.badgeLabel}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              {w.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {w.headline}{' '}
              <span className="text-gradient">{w.headlineAccent}</span>
            </h2>
            <p className="mt-5 text-white/60 leading-relaxed">{w.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="font-display text-lg font-semibold text-gold">
                  Mission
                </h3>
                <p className="mt-2 text-white/60 leading-relaxed">{w.mission}</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-gold">
                  Our Story
                </h3>
                <p className="mt-2 text-white/60 leading-relaxed">{w.story}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-white">
                Values
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {w.values.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold"
            >
              Learn More
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
