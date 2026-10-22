export type JourneyItem = {
  period: string
  title: string
  detail: string
  type: 'project' | 'community' | 'challenge' | 'latest'
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
    period: 'May 2025',
    title: 'IT Bootcamp',
    detail:
      'Three IT speakers on AI, Python and Frontend — then a roadmap and daily tasks for learning Frontend and Backend.',
    type: 'project',
  },
  {
    period: 'November 6, 2025',
    title: 'ILM Hub Camp S3',
    detail:
      'A college admissions camp in Fergana — study abroad sessions, grant advice, networking and certificates.',
    type: 'project',
  },
  {
    period: 'January 2026',
    title: 'Challenge Season 1',
    detail:
      'Our first Discipline Challenge — 70% of participants graduated as disciplined learners.',
    type: 'challenge',
  },
  {
    period: 'February – March 2026',
    title: 'Challenge Season 2',
    detail:
      'A selective season of committed participants — 75% graduated after 21 days of focused habit building.',
    type: 'challenge',
  },
  {
    period: 'July 2026',
    title: 'Challenge Season 3',
    detail:
      'The third ILM Mode season, with tracks in IELTS, SAT, IT (No-coding), and Biology.',
    type: 'challenge',
  },
  {
    period: 'Autumn 2026',
    title: 'Habit Zone app',
    detail:
      'Our own habit app for Android — 40 ready-made challenges, points, streaks, groups and rankings. Free, with no ads.',
    type: 'latest',
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
    bio: 'Founded ILM Hub in July 2024 and leads it: the ILM Mode challenge seasons, English Day Camp, IT Bootcamp, ILM HUB Camp S3 and the Habit Zone app.',
  },
  {
    name: 'Anvarjon Xolmirzayev',
    role: 'Mentor & Finance',
    photo: '/assets/team-anvarjon.jpg',
    lead: true,
    bio: 'Mentors challenge participants and manages ILM Hub’s finances.',
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
