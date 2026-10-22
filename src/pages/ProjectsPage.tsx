import { useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/content'
import { PageHeader } from '../components/PageHeader'
import { CoverImage } from '../components/CoverImage'
import { ClosingCta } from '../components/HomeSections'
import { useSiteContent } from '../content/ContentContext'

const categories = ['All', 'Camp', 'Bootcamp']

export function ProjectsPage() {
  const { content } = useSiteContent()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return content.projects.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, category, content.projects])

  const [lead, ...rest] = filtered

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Camps and projects <span className="text-blue">beyond the challenge</span>
          </>
        }
        subtitle="Programs ILM Hub has organized alongside the challenge seasons — where learning turns into shared, real-world work."
        image={{ src: '/assets/projects/english-day-camp/photo-2.png', alt: 'English Day Camp participants' }}
      />

      <section className="bg-tint">
        <div className="container-page py-16 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 rounded-xl bg-white p-1" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`press rounded-lg px-4 py-2 text-[15px] font-semibold ${
                    category === c ? 'bg-navy text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block sm:w-80">
              <span className="sr-only">Search projects</span>
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="h-12 w-full rounded-xl border border-line bg-white pr-4 pl-11 text-base outline-none focus:border-blue"
              />
            </label>
          </div>

          {!lead ? (
            <div className="mt-8 rounded-2xl bg-white py-20 text-center">
              <p className="text-lg font-semibold">No projects match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
                className="mt-3 font-semibold text-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <Link
                to={`/projects/${lead.id}`}
                className="group mt-8 grid overflow-hidden rounded-2xl bg-white lg:grid-cols-12"
              >
                <div className="overflow-hidden lg:col-span-7">
                  <CoverImage
                    src={lead.cover}
                    alt={lead.title}
                    label={`${lead.participants} students`}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col p-8 sm:p-10 lg:col-span-5">
                  <p className="text-sm font-semibold text-accent-ink">{lead.category}</p>
                  <h2 className="mt-3 text-[32px] leading-tight font-bold tracking-[-0.03em] group-hover:text-blue">
                    {lead.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead.summary}</p>
                  <Meta project={lead} />
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-blue">
                    Read the full story <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>

              {rest.length > 0 && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {rest.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ClosingCta />
    </>
  )
}

function Meta({ project }: { project: Project }) {
  return (
    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
      {[
        [project.date, 'Date'],
        [String(project.participants), 'Students'],
        [project.location, 'Format'],
      ].map(([value, label]) => (
        <div key={label}>
          <dd className="font-bold">{value}</dd>
          <dt className="mt-0.5 text-sm text-ink-faint">{label}</dt>
        </div>
      ))}
    </dl>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.id}`} className="group block overflow-hidden rounded-2xl bg-white">
      <div className="overflow-hidden">
        <CoverImage
          src={project.cover}
          alt={project.title}
          label={`${project.participants} students`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-7">
        <p className="text-sm font-semibold text-accent-ink">{project.category}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight group-hover:text-blue">{project.title}</h2>
        <p className="mt-2 line-clamp-2 leading-relaxed text-ink-soft">{project.summary}</p>
        <Meta project={project} />
      </div>
    </Link>
  )
}
