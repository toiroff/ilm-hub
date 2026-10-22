import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { projects } from '../data/content'
import { CoverImage } from '../components/CoverImage'
import { DetailRow } from '../components/PageHeader'
import { ClosingCta } from '../components/HomeSections'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'
import { initials } from '../lib/initials'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-ink">
          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetailPage() {
  const { id } = useParams()
  const { content } = useSiteContent()
  const { t } = useLocale()
  const project = content.projects.find((p) => p.id === id) ?? content.projects[0] ?? projects[0]
  const others = content.projects.filter((p) => p.id !== project.id)
  const hasVideo = Boolean(project.backgroundVideo?.trim())
  const hasGallery = project.gallery.length > 0
  const hasMedia = hasVideo || Boolean(project.cover)

  return (
    <>
      <section className="bg-grid border-b border-line">
        <div className="container-page pt-10 pb-14 lg:pt-12 lg:pb-20">
          <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> {t('project.back')}
          </Link>
          <div className={`mt-8 grid gap-10 lg:items-center lg:gap-12 ${hasMedia ? 'lg:grid-cols-[420px_minmax(0,1fr)]' : 'lg:grid-cols-12'}`}>
            <div className={hasMedia ? '' : 'lg:col-span-8'}>
              <p className="eyebrow">
                {project.category} · {project.season}
              </p>
              <h1 className="h-display mt-6 !text-[40px] sm:!text-[52px] lg:!text-[56px]">{project.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{project.description}</p>
              <dl className="mt-8 grid grid-cols-3 border-t border-line pt-6">
                {[
                  [project.date, t('home.fact.date')],
                  [String(project.participants), t('home.card.participants')],
                  [project.location, t('home.fact.format')],
                ].map(([value, label], i) => (
                  <div key={label} className={i > 0 ? 'border-l border-line pl-4 sm:pl-6' : 'pr-2'}>
                    <dd className="text-lg leading-tight font-bold tracking-tight sm:text-xl">{value}</dd>
                    <dt className="mt-1 text-sm text-ink-faint first-letter:uppercase">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {hasMedia && (
              <div>
                <div className="overflow-hidden rounded-2xl border border-line bg-navy shadow-[0_28px_60px_-28px_rgba(11,18,32,0.45)]">
                  {hasVideo ? (
                    <video
                      src={project.backgroundVideo}
                      poster={project.cover || undefined}
                      controls
                      playsInline
                      preload="metadata"
                      className="block aspect-video w-full bg-navy object-cover"
                    />
                  ) : (
                    <CoverImage
                      src={project.cover}
                      alt={project.title}
                      label={project.title}
                      className="block aspect-[4/3] w-full object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`container-page ${hasGallery || others.length === 0 ? 'pb-20 lg:pb-28' : 'pb-16'}`}>
          <DetailRow label={t('project.overview')}>
            <p className="text-lg leading-relaxed">{project.overview}</p>
          </DetailRow>
          {project.speakers && project.speakers.length > 0 && (
            <DetailRow label={t('project.speakers')}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                {project.speakers.map((s) => (
                  <li key={s.name}>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-tint">
                      {s.photo ? (
                        <img src={s.photo} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-3xl font-bold text-ink">
                          {initials(s.name)}
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-lg leading-tight font-bold text-ink">{s.name}</p>
                    <p className="mt-1 text-[15px] leading-snug text-ink-soft">{s.role}</p>
                  </li>
                ))}
              </ul>
            </DetailRow>
          )}
          <DetailRow label={t('project.highlights')}>
            <CheckList items={project.highlights} />
          </DetailRow>
          <DetailRow label={project.schedule ? t('project.schedule') : t('project.activities')}>
            <ol className="space-y-3">
              {project.schedule
                ? project.schedule.map((item) => (
                    <li key={`${item.time}-${item.activity}`} className="grid grid-cols-[8rem_1fr] gap-4">
                      <span className="font-semibold text-ink-faint tabular-nums">{item.time}</span>
                      <span className="text-ink">{item.activity}</span>
                    </li>
                  ))
                : project.activities.map((activity, i) => (
                    <li key={activity} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-bold text-accent">{i + 1}</span>
                      <span className="text-ink">{activity}</span>
                    </li>
                  ))}
            </ol>
          </DetailRow>
          <DetailRow label={t('project.outcomes')}>
            <CheckList items={project.outcomes} />
          </DetailRow>
        </div>
      </section>

      {hasGallery && (
        <section className="bg-tint">
          <div className="container-page py-20 lg:py-28">
            <h2 className="h-section">{t('project.gallery')}</h2>
            <div className="mt-10 columns-1 gap-4 sm:columns-2">
              {project.gallery.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${project.title} — photo ${i + 1}`}
                  loading="lazy"
                  className="mb-4 w-full break-inside-avoid rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className={hasGallery ? 'bg-white' : 'bg-tint'}>
          <div className="container-page py-20">
            <h2 className="text-2xl font-bold tracking-tight">{t('project.more')}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {others.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className={`group flex items-center gap-5 rounded-2xl p-3 pr-6 ${hasGallery ? 'bg-tint' : 'bg-white'}`}>
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                    <CoverImage src={p.cover} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-accent-ink">{p.category}</p>
                    <p className="mt-0.5 text-xl font-bold tracking-tight group-hover:text-blue">{p.title}</p>
                    <p className="mt-0.5 truncate text-[15px] text-ink-soft">{p.summary}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-ink-faint group-hover:text-blue" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta />
    </>
  )
}
