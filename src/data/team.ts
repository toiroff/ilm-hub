export type JourneyItem = {
  period: string
  title: string
  detail: string
  type: 'project' | 'community' | 'challenge' | 'upcoming'
}

export const journeyTimeline: JourneyItem[] = [
  {
    period: 'August 2024',
    title: 'English Day Camp',
    detail:
      'Our first major project — an immersive day of English practice, games, and confidence-building for students.',
    type: 'project',
  },
  {
    period: 'Year-round',
    title: 'Telegram channel & talks',
    detail:
      'Useful posts on our Telegram channel, plus debates and talks that keep the community learning continuously.',
    type: 'community',
  },
  {
    period: 'May – June 2025',
    title: 'IT Bootcamp',
    detail:
      'A hands-on technology bootcamp where students built digital skills through workshops and team mini-projects.',
    type: 'project',
  },
  {
    period: 'November 6, 2025',
    title: 'ILM Hub Camp S3',
    detail:
      'A full community camp — workshops, bonding, and celebration beyond the challenge format.',
    type: 'project',
  },
  {
    period: 'January 2026',
    title: 'Challenge Season 1',
    detail:
      'Our first Discipline Challenge — 40 participants, 28 graduates who proved themselves as disciplined learners.',
    type: 'challenge',
  },
  {
    period: 'February – March 2026',
    title: 'Challenge Season 2',
    detail:
      'A selective season of 20 committed participants — 15 graduated after 21 days of focused habit building.',
    type: 'challenge',
  },
  {
    period: 'July 2026',
    title: 'Season 3 is coming',
    detail:
      'ILM Mode Challenge Season 3 opens next — tracks in IELTS, SAT, IT (No-coding), and Biology.',
    type: 'upcoming',
  },
]

export type TeamMember = {
  name: string
  role: string
  bio?: string
  photo?: string
  lead?: boolean
}

export const teamLeads: TeamMember[] = [
  {
    name: 'Muhammadumar',
    role: 'Founder & CEO',
    photo: '/assets/team-muhammadumar.png',
    lead: true,
    bio: 'Leads ILM Hub’s vision — from Telegram posts to camps and challenges that help students build discipline across Uzbekistan.',
  },
  {
    name: 'Siddiqjonov Suhrobbek',
    role: 'Project Manager',
    photo: '/assets/team-suhrobbek.png',
    lead: true,
    bio: 'Manages ILM Hub programs and operations, supporting every season from planning to graduation.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Abdunosirov Pahlavon',
    role: 'Organizer & Mentor',
  },
  {
    name: 'Vahhobova Mubinaxon',
    role: 'Organizer & Mentor',
  },
  {
    name: 'Vahhobova Gulsoraxon',
    role: 'Organizer',
  },
  {
    name: 'Salohiddinova Ruxshonaxon',
    role: 'Finance',
  },
  {
    name: 'Aburahimov Abdurahim',
    role: 'Finance',
  },
]

/** @deprecated use teamLeads + teamMembers */
export const team = [...teamLeads, ...teamMembers]
