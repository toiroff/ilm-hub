import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { MediaBackground } from './MediaBackground'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'

export function Hero() {
  const { content } = useSiteContent()
  const { hero, stats } = content
  const { t } = useLocale()

  return (
    <section className="bg-grid border-b border-line">
      <div className="container-page grid gap-10 pt-6 pb-16 sm:pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-10 lg:pb-24">
        <div className="lg:col-span-7">
          <Link
            to="/habit-zone"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-4 pl-2 text-sm font-medium text-ink-soft hover:border-ink-faint hover:text-ink"
          >
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-ink">
              {t('home.hero.badge')}
            </span>
            {t('home.hero.pill')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <h1 className="h-display mt-6 lg:!text-[66px]">
            {hero.line1} <span className="text-blue">{hero.line2}</span> {hero.line3}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[19px] leading-relaxed text-ink-soft">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/habit-zone" size="lg">
              {t('cta.getApp')} <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="#challenge" variant="secondary" size="lg">
              {t('home.hero.secondary')}
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-line py-4">
                <dd className="text-[34px] leading-none font-bold tracking-[-0.04em]">
                  {stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </dd>
                <dt className="mt-2 text-sm leading-snug text-ink-soft">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-rows-[3fr_2fr]">
          <figure className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl bg-tint lg:aspect-auto">
            <MediaBackground image={hero.backgroundImage} video={hero.backgroundVideo} />
          </figure>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-tint lg:aspect-auto">
            <img
              src="/assets/projects/english-day-camp/photo-6.png"
              alt="A student receiving a certificate"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-tint lg:aspect-auto">
            <img
              src="/assets/who-we-are-2.png"
              alt="Graduates with certificates outside their school"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
