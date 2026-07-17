import { Target, FolderKanban, CalendarDays, Award } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { whatWeDo } from '../data/content'

const icons = {
  target: Target,
  folder: FolderKanban,
  calendar: CalendarDays,
  award: Award,
} as const

const accents: Record<string, string> = {
  teal: 'from-teal/20 to-teal/5 text-teal group-hover:border-teal/40',
  indigo: 'from-indigo/20 to-indigo/5 text-indigo group-hover:border-indigo/40',
  gold: 'from-gold/20 to-gold/5 text-gold group-hover:border-gold/40',
  orange: 'from-orange/20 to-orange/5 text-orange group-hover:border-orange/40',
}

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything students need to stay consistent
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((card) => {
            const Icon = icons[card.icon as keyof typeof icons]
            return (
              <StaggerItem key={card.title}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b ${accents[card.accent]} p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {card.description}
                  </p>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
