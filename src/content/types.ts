import type { Challenge, EventItem, Project, Season } from '../data/content'
import type { TeamMember } from '../data/team'
import type { Testimonial } from '../data/testimonials'

export type SiteStat = {
  value: number
  suffix: string
  label: string
  decimals?: number
}

export type ChallengeWeek = {
  week: string
  title: string
  detail: string
}

export type SiteContent = {
  hero: {
    line1: string
    line2: string
    line3: string
    subtitle: string
    backgroundImage: string
    /** Optional looping background video (preferred over image when set) */
    backgroundVideo: string
  }
  about: {
    eyebrow: string
    headline: string
    headlineAccent: string
    intro: string
    mission: string
    story: string
    values: string[]
  }
  whoWeAre: {
    eyebrow: string
    headline: string
    headlineAccent: string
    description: string
    mission: string
    story: string
    values: string[]
    photoTop: string
    photoBottom: string
    badgeValue: string
    badgeLabel: string
  }
  teamLeads: TeamMember[]
  teamMembers: TeamMember[]
  projects: Project[]
  stats: SiteStat[]
  testimonials: Testimonial[]
  events: EventItem[]
  challenges: Challenge[]
  challengeWeeks: ChallengeWeek[]
  seasons: Season[]
}

export const CONTENT_ROW_ID = 'main'
