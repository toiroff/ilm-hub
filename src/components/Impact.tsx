import { AnimatedCounter } from './AnimatedCounter'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { UzbekistanMap } from './UzbekistanMap'
import { useLocale } from '../i18n/locale'
import { localizedImpactStats } from '../i18n/staticContent'

export function Impact() {
  const { locale } = useLocale()
  const stats = localizedImpactStats(locale)

  return (
    <section id="impact" className="section-pad relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/30 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            {locale === 'uz' ? 'Qamrovimiz' : 'Our Reach'}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {locale === 'uz'
              ? 'Oʻzbekiston boʻylab oʻsmoqdamiz'
              : 'Growing across Uzbekistan'}
          </h2>
          <p className="mt-4 text-white/55">
            {locale === 'uz'
              ? 'Oʻzbekistonning turli shaharlaridan talabalar ILM Hub challenges va loyihalariga qoʻshilgan.'
              : 'Students from cities across Uzbekistan have joined ILM Hub challenges and projects.'}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <UzbekistanMap />
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="glass-light rounded-3xl p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
