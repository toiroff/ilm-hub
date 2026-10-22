import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { CoverImage } from '../components/CoverImage'
import { DetailRow } from '../components/PageHeader'
import { ClosingCta, SeasonRates } from '../components/HomeSections'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
import { initials } from '../lib/initials'

export function SeasonPage() {
  const { id } = useParams()
  const { content } = useSiteContent()
  const { t } = useLocale()
  const season = content.seasons.find((s) => s.id === id) ?? content.seasons[0]

  if (!season) {
    return (
      <section className="container-page py-32">
        <p className="text-xl font-bold">Season not found.</p>
        <Link to="/challenges" className="mt-3 inline-block font-semibold text-blue hover:underline">
          {t('season.back')}
        </Link>
      </section>
    )
  }

  const voices = content.testimonials.filter((v) => v.seasonId === season.id)

  return (
    <>
      <section className="bg-white">
        <div className="container-page pt-10 pb-16 lg:pt-14 lg:pb-24">
          <Link to="/challenges" className="inline-flex items-center gap-2 font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> {t('season.back')}
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {season.period && <p className="eyebrow">{season.period}</p>}
              <h1 className="h-display mt-6 !text-[42px] sm:!text-[56px] lg:!text-[64px]">{season.title}</h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-[19px]">{season.description}</p>
            </div>
            <div className="rounded-2xl bg-navy p-8 text-white lg:col-span-5 lg:self-start">
              <SeasonRates season={season} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-12 pb-20 lg:grid-cols-12 lg:gap-14 lg:pb-28">
          <div className={season.cover ? 'lg:col-span-7' : 'lg:col-span-9'}>
            <DetailRow label="Overview">
              <p className="text-lg leading-relaxed">{season.story}</p>
            </DetailRow>
            <DetailRow label="Highlights">
              <ul className="space-y-3">
                {season.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </DetailRow>
          </div>
          {season.cover && (
            <div className="overflow-hidden rounded-2xl bg-tint lg:col-span-5 lg:self-start">
              <CoverImage src={season.cover} alt={season.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {voices.length > 0 && (
        <section className="bg-tint">
          <div className="container-page py-20 lg:py-28">
            <h2 className="h-section">From Season {season.number} participants</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {voices.map((v) => (
                <figure key={`${v.name}-${v.quote.slice(0, 24)}`} className="rounded-2xl bg-white p-8">
                  <blockquote className="leading-relaxed text-ink">“{v.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      {initials(v.name)}
                    </span>
                    <span className="text-[15px]">
                      <span className="font-semibold">{v.name}</span>
                      <span className="text-ink-faint"> · {v.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta />
    </>
  )
}
