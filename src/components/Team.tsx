import type { TeamMember } from '../data/team'
import { initials } from '../lib/initials'

/** A main person: large portrait, role tag, name and (on About) what they do. */
export function LeadCard({ lead, compact = false }: { lead: TeamMember; compact?: boolean }) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className={`overflow-hidden bg-tint ${compact ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        {lead.photo ? (
          <img
            src={lead.photo}
            alt={lead.name}
            loading="lazy"
            className="h-full w-full object-cover object-[50%_22%]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-bold text-ink">{initials(lead.name)}</div>
        )}
      </div>
      <figcaption className={compact ? 'p-5 sm:p-6' : 'flex-1 p-7 sm:p-9'}>
        <span className="inline-block rounded-lg bg-accent-soft px-2.5 py-1 text-sm font-semibold text-accent-ink">
          {lead.role}
        </span>
        <p
          className={`mt-4 leading-tight font-bold tracking-[-0.03em] ${
            compact ? 'text-xl sm:text-2xl' : 'text-[28px] sm:text-[32px]'
          }`}
        >
          {lead.name}
        </p>
        {!compact && lead.bio && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead.bio}</p>}
      </figcaption>
    </figure>
  )
}

/** Everyone else: one clean card per person with initials or photo, name and role. */
export function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li key={member.name} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
          {member.photo ? (
            <img src={member.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-base font-bold text-white">
              {initials(member.name)}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-lg leading-snug font-bold tracking-tight">{member.name}</p>
            <p className="mt-0.5 text-[15px] text-ink-soft">{member.role}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
