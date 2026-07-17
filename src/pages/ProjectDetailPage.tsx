import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { projects } from '../data/content'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button } from '../components/Button'
import { MediaBackground } from '../components/MediaBackground'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useSiteContent } from '../content/ContentContext'

export function ProjectDetailPage() {
  const { id } = useParams()
  const { content } = useSiteContent()
  const project =
    content.projects.find((p) => p.id === id) ??
    content.projects[0] ??
    projects[0]
  const others = content.projects.filter((p) => p.id !== project.id)

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {project.backgroundVideo?.trim() ? (
            <MediaBackground video={project.backgroundVideo} poster={project.cover} />
          ) : (
            <MediaBackground image={project.cover} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
        </div>
        <div className="section-pad relative mx-auto max-w-7xl py-24 lg:py-32">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-gold px-3 py-1 font-semibold text-navy">
                {project.category}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-white/60">
                {project.season}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/65">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" />
                {project.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-gold" />
                {project.participants} participants
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                {project.location}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Overview</h2>
            <p className="mt-5 leading-relaxed text-white/60">{project.overview}</p>

            <h3 className="mt-10 font-display text-xl font-bold">Highlights</h3>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-white/65"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold">
              {project.schedule ? 'Schedule' : 'Activities'}
            </h2>
            {project.schedule ? (
              <ol className="mt-6 space-y-3">
                {project.schedule.map((item) => (
                  <li
                    key={`${item.time}-${item.activity}`}
                    className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span className="shrink-0 font-display text-sm font-semibold text-gold">
                      {item.time}
                    </span>
                    <span className="text-sm text-white/70">{item.activity}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="mt-6 space-y-4">
                {project.activities.map((activity, i) => (
                  <li
                    key={activity}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/70">{activity}</span>
                  </li>
                ))}
              </ol>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Outcomes</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <StaggerItem key={outcome}>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm font-medium text-white/80">{outcome}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold">Gallery</h2>
          </Reveal>
          <Stagger className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {project.gallery.map((src, i) => (
              <StaggerItem key={src} className="mb-4 break-inside-avoid">
                <img
                  src={src}
                  alt={`${project.title} moment ${i + 1}`}
                  className="w-full rounded-2xl border border-white/10"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-pad pb-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold">More projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group flex overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition hover:border-teal/30"
                >
                  <img
                    src={p.cover}
                    alt=""
                    className="h-28 w-32 object-cover transition group-hover:scale-105 sm:h-auto sm:w-40"
                  />
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <p className="text-xs text-teal">{p.category}</p>
                    <h3 className="mt-1 font-display text-lg font-bold">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/50">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-brand-navy to-indigo p-10 sm:p-14">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Join Season 3
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Be part of the next chapter of ILM Hub — challenges, community,
              and projects that go beyond the classroom.
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
