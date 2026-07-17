import {
  challenges,
  challengeWeeks,
  events,
  projects,
  seasons,
  stats,
} from '../data/content'
import { teamLeads, teamMembers } from '../data/team'
import { testimonials } from '../data/testimonials'
import type { SiteContent } from './types'

export const defaultSiteContent: SiteContent = {
  hero: {
    line1: 'Learn.',
    line2: 'Build.',
    line3: 'Inspire.',
    subtitle:
      'A community across Uzbekistan where students build discipline through 21-day challenges, real projects, and shared growth.',
    backgroundImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
    backgroundVideo: '',
  },
  about: {
    eyebrow: 'About ILM Hub',
    headline: 'Built by students,',
    headlineAccent: 'for students.',
    intro:
      'ILM Hub helps high school students and graduates develop discipline, consistency, and practical skills through structured challenges, collaborative projects, mentorship, and community support — preparing them for university and their future careers.',
    mission:
      'Empower students to build lifelong habits of learning, discipline, and leadership through practical experiences and supportive communities.',
    story:
      'ILM Hub started in July 2024 by sharing useful posts on Telegram. From there it grew into English Day Camp, IT Bootcamp, ILM Hub Camp, and discipline challenges — a community of students across Uzbekistan learning and growing together.',
    values: [
      'Consistency',
      'Community',
      'Growth',
      'Accountability',
      'Continuous Learning',
    ],
  },
  whoWeAre: {
    eyebrow: 'Who We Are',
    headline: 'A community built for',
    headlineAccent: 'disciplined learners',
    description:
      'ILM Hub helps high school students and graduates develop discipline, consistency, and practical skills through structured challenges, collaborative projects, mentorship, and community support — preparing them for university and future careers.',
    mission:
      'Empower students to build lifelong habits of learning, discipline, and leadership through practical experiences and supportive communities.',
    story:
      'Started in July 2024 with useful posts on Telegram, then grew into camps, challenges, and a student community across Uzbekistan.',
    values: [
      'Consistency',
      'Community',
      'Growth',
      'Accountability',
      'Continuous Learning',
    ],
    photoTop: '/assets/who-we-are-outdoor.jpg',
    photoBottom: '/assets/who-we-are.jpg',
    badgeValue: '250+',
    badgeLabel: 'Students in Uzbekistan',
  },
  teamLeads: structuredClone(teamLeads),
  teamMembers: structuredClone(teamMembers),
  projects: structuredClone(projects),
  stats: stats.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    label: s.label,
    decimals: 'decimals' in s ? (s.decimals as number) : undefined,
  })),
  testimonials: structuredClone(testimonials),
  events: structuredClone(events),
  challenges: structuredClone(challenges),
  challengeWeeks: structuredClone(challengeWeeks),
  seasons: structuredClone(seasons),
}
