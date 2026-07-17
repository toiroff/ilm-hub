import { useMemo, useState } from 'react'
import { ArrowRight, Search, Users, MapPin, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type Project } from '../data/content'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { useSiteContent } from '../content/ContentContext'

const categories = ['All', 'Camp', 'Bootcamp']

export function ProjectsPage() {
  const { content } = useSiteContent()
  const projects = content.projects
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const q = query.toLowerCase()
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, category, projects])

  return (
    <div className="pt-20">
      <section className="section-pad relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.2),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
              Projects
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Past projects beyond the challenge
            </h1>
            <p className="mt-5 max-w-xl text-white/55">
              Camps, bootcamps, and community programs ILM Hub has organized —
              separate from our challenge seasons.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-4 pl-11 text-sm outline-none focus:border-teal/40"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    category === c
                      ? 'bg-indigo text-white'
                      : 'border border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-24">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
          {filtered.length === 0 && (
            <p className="py-20 text-center text-white/45">
              No projects match your search.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-teal/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-deep">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/30">
            No cover photo
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-3 text-xs text-white/45">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {project.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {project.participants} students
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {project.location}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/55">{project.summary}</p>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition hover:gap-2.5"
        >
          Read fully <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}
