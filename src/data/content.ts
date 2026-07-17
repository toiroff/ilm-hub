export type Season = {
  id: string
  number: number
  title: string
  period?: string
  cover: string
  participants: number
  cities: number
  graduates: number
  completion: number
  satisfaction: number
  rating: number
  description: string
  story: string
  highlights: string[]
}

export const seasons: Season[] = [
  {
    id: 'season-2',
    number: 2,
    title: 'Season 2',
    period: 'February – March 2026',
    cover:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    participants: 20,
    cities: 0,
    graduates: 15,
    completion: 75,
    satisfaction: 95,
    rating: 5,
    description:
      'A focused season of 20 selected participants who truly wanted to become disciplined — 15 graduated.',
    story:
      'Season 2 was intentionally selective. We chose 20 participants who were committed to becoming disciplined. Through daily tasks, mentorship, and accountability, 15 graduates proved that intention and consistency create real change over 21 days.',
    highlights: [
      '20 carefully selected participants',
      '15 disciplined graduates',
      'Daily mentorship & check-ins',
      '21 days of focused habit building',
    ],
  },
  {
    id: 'season-1',
    number: 1,
    title: 'Season 1 — The Beginning',
    period: 'January 2026',
    cover:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    participants: 40,
    cities: 0,
    graduates: 28,
    completion: 70,
    satisfaction: 95,
    rating: 5,
    description:
      'Our first challenge season — 40 participants, 28 graduates who proved themselves as disciplined learners.',
    story:
      'In January 2026, ILM Hub ran its first Discipline Challenge. Forty students committed to building better habits. Twenty-eight graduated — proving that with intention and consistency, real change is possible. From reading and exercise to focus and teamwork, Season 1 set the foundation for everything that followed.',
    highlights: [
      '40 participants in the first cohort',
      '28 disciplined graduates',
      'Daily reading, exercise & reflection habits',
      'Mentorship and community support',
    ],
  },
]

export const stats = [
  { value: 250, suffix: '+', label: 'Students Across Uzbekistan' },
  { value: 2, suffix: '', label: 'Challenge Seasons' },
  { value: 3, suffix: '', label: 'Major Projects' },
  { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
]

export const impactStats = [
  { value: 250, suffix: '+', label: 'Students Reached' },
  { value: 2, suffix: '', label: 'Challenge Seasons' },
  { value: 3, suffix: '', label: 'Community Projects' },
  { value: 15, suffix: '+', label: 'Cities Represented' },
]

export const values = [
  {
    title: 'Consistency',
    description: 'Small daily actions compound into lasting discipline.',
  },
  {
    title: 'Community',
    description: 'Grow faster when peers hold you accountable.',
  },
  {
    title: 'Growth',
    description: 'Stretch beyond comfort with structured challenges.',
  },
  {
    title: 'Accountability',
    description: 'Show up. Check in. Finish what you start.',
  },
  {
    title: 'Continuous Learning',
    description: 'Curiosity never graduates — neither should you.',
  },
]

export const whatWeDo = [
  {
    title: 'Challenges',
    description:
      'Daily accountability challenges that help students create productive habits.',
    icon: 'target',
    accent: 'teal',
  },
  {
    title: 'Projects',
    description: 'Real-world collaborative projects that turn learning into proof.',
    icon: 'folder',
    accent: 'indigo',
  },
  {
    title: 'Events',
    description: 'Workshops, guest speakers, networking, and community sessions.',
    icon: 'calendar',
    accent: 'gold',
  },
  {
    title: 'Recognition',
    description: 'Certificates, badges, and achievements that mark your journey.',
    icon: 'award',
    accent: 'orange',
  },
]

export const challengeWeeks = [
  {
    week: 'Session 1',
    title: 'Opening Ceremony',
    detail:
      'Via Google Meet (~80 participants). Introduction to the challenge, rules explained, and ice-breaking activities.',
  },
  {
    week: 'Throughout',
    title: 'Guest Speakers',
    detail:
      'Via Google Meet or Telegram (~70–80 participants). Guest speaker sessions to inspire and guide challengers.',
  },
  {
    week: 'Weekly',
    title: 'Weekly Meetings',
    detail:
      'Via Google Meet (~70–80 participants). Review the past week, support anyone facing challenges, and recognize the most active challenger of the week.',
  },
  {
    week: 'Finale',
    title: 'Closing Ceremony',
    detail:
      'Via Google Meet (~60–80 participants). Review 21-day achievements, honor outstanding participants, present certificates and awards, and formally close the challenge.',
  },
]

export type Challenge = {
  id: string
  title: string
  duration: string
  category: string
  cover: string
  description: string
  outcomes: string[]
  featured?: boolean
}

export const challenges: Challenge[] = [
  {
    id: 'ilm-mode-s3',
    title: 'ILM Mode Challenge',
    duration: '21 days',
    category: 'Flagship',
    cover:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    description:
      'A 21-day discipline challenge to sharpen focus, build self-control, and grow into a stronger version of yourself. Participants join tracks based on their goals: IELTS, SAT, IT (No-coding), or Biology.',
    outcomes: [
      'Daily tasks for 21 days',
      'Tracked activity & accountability',
      'Certificate on completion',
    ],
    featured: true,
  },
]

export const timeline = [
  {
    title: 'Opening Ceremony',
    detail:
      'Google Meet · ~80 people. Challenge intro, rules, and ice-breaking.',
  },
  {
    title: 'Guest Speakers',
    detail:
      'Google Meet or Telegram · ~70–80 people. Inspiration and guidance from guest speakers.',
  },
  {
    title: 'Weekly Meetings',
    detail:
      'Google Meet · ~70–80 people. Weekly review, support, and most active challenger recognition.',
  },
  {
    title: 'Closing Ceremony',
    detail:
      'Google Meet · ~60–80 people. Achievements review, certificates, awards, and formal closing.',
  },
]

export const cities = [
  { name: 'Tashkent', lon: 69.24, lat: 41.31 },
  { name: 'Samarkand', lon: 66.96, lat: 39.65 },
  { name: 'Bukhara', lon: 64.42, lat: 39.77 },
  { name: 'Namangan', lon: 71.67, lat: 40.99 },
  { name: 'Andijan', lon: 72.34, lat: 40.78 },
  { name: 'Fergana', lon: 71.79, lat: 40.39 },
  { name: 'Nukus', lon: 59.61, lat: 42.46 },
  { name: 'Khiva', lon: 60.36, lat: 41.38 },
  { name: 'Termez', lon: 67.28, lat: 37.22 },
  { name: 'Karshi', lon: 65.79, lat: 38.86 },
  { name: 'Navoi', lon: 65.38, lat: 40.08 },
  { name: 'Jizzakh', lon: 67.84, lat: 40.12 },
]

export type Project = {
  id: string
  title: string
  description: string
  summary: string
  cover: string
  /** Optional looping background video for the project hero */
  backgroundVideo?: string
  season: string
  date: string
  location: string
  participants: number
  category: string
  featured?: boolean
  highlights: string[]
  overview: string
  activities: string[]
  outcomes: string[]
  gallery: string[]
  schedule?: { time: string; activity: string }[]
  scheduleImage?: string
}

export const projects: Project[] = [
  {
    id: 'english-day-camp',
    title: 'English Day Camp',
    summary:
      'An immersive day of English practice, games, and confidence-building activities for students.',
    description:
      'Our first signature project — a lively English Day Camp where students practiced speaking, teamwork, and real-world communication beyond the classroom.',
    cover: '/assets/projects/english-day-camp/cover.png',
    season: 'First project',
    date: 'August 2024',
    location: 'In-person',
    participants: 30,
    category: 'Camp',
    featured: true,
    highlights: [
      'Speaking mock & public speaking',
      'Debate, workshop & movie time',
      'Networking and overnight “Watching Stars”',
    ],
    overview:
      'English Day Camp was ILM Hub’s first major project. Thirty students spent a full day immersed in English — from networking and speaking practice to debate, workshops, and a closing camp under the stars.',
    activities: [
      'Introduction & networking',
      'Speaking mock & public speaking',
      'Movie time & debate',
      'Workshop & closing camp',
      'Watching stars overnight',
    ],
    outcomes: [
      'Stronger speaking confidence',
      '30 students connected through English',
      'A blueprint for future ILM Hub camps',
    ],
    schedule: [
      { time: '08:30 – 09:00', activity: 'Introduction' },
      { time: '09:00 – 10:00', activity: 'Networking Activity' },
      { time: '10:00 – 11:00', activity: 'Speaking Mock' },
      { time: '11:00 – 12:00', activity: 'Public Speaking' },
      { time: '12:00 – 13:00', activity: 'Free Time' },
      { time: '13:00 – 15:00', activity: 'Movie Time' },
      { time: '15:00 – 17:30', activity: 'Debate' },
      { time: '17:30 – 18:30', activity: 'Workshop' },
      { time: '18:30 – 19:00', activity: 'Closing Camp' },
      { time: '19:30 – 08:30', activity: 'Watching Stars' },
    ],
    gallery: [
      '/assets/projects/english-day-camp/photo-1.png',
      '/assets/projects/english-day-camp/photo-2.png',
      '/assets/projects/english-day-camp/photo-3.png',
      '/assets/projects/english-day-camp/photo-4.png',
      '/assets/projects/english-day-camp/photo-5.png',
      '/assets/projects/english-day-camp/photo-6.png',
      '/assets/projects/english-day-camp/photo-7.png',
    ],
  },
  {
    id: 'it-bootcamp',
    title: 'IT Bootcamp',
    summary:
      'A hands-on technology bootcamp introducing students to digital skills and collaborative building.',
    description:
      'A focused IT Bootcamp where students explored digital tools, basic tech skills, and teamwork through practical sessions and mini-projects.',
    cover:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    season: 'Season 2',
    date: '2024',
    location: 'Hybrid',
    participants: 120,
    category: 'Bootcamp',
    featured: true,
    highlights: [
      'Hands-on tech workshops',
      'Team mini-projects',
      'Mentor-led sessions',
    ],
    overview:
      'IT Bootcamp brought ILM Hub students into a practical technology learning experience. Through workshops and collaborative mini-projects, participants built foundational digital skills while learning how to work as a team — preparing them for future growth beyond the challenge seasons.',
    activities: [
      'Orientation and goal setting',
      'Digital literacy workshops',
      'Guided hands-on practice',
      'Team mini-project build',
      'Demo day and feedback',
    ],
    outcomes: [
      'Practical tech foundations',
      'Completed team mini-projects',
      'Stronger collaboration skills',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'ilm-hub-camp-s3',
    title: 'ILM HUB Camp S3',
    summary:
      'A full community camp experience for Season 3 — learning, bonding, and growth beyond the challenge.',
    description:
      'ILM HUB Camp S3 brought Season 3 learners together for an unforgettable camp of workshops, activities, and community connection.',
    cover:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c6a?auto=format&fit=crop&w=1200&q=80',
    season: 'Season 3',
    date: '2025',
    location: 'In-person',
    participants: 150,
    category: 'Camp',
    featured: true,
    highlights: [
      'Workshops & team activities',
      'Community bonding sessions',
      'Season 3 celebration moments',
    ],
    overview:
      'ILM HUB Camp S3 was a landmark community project for Season 3. Separate from the 21-day challenge, the camp gave students space to learn together, build friendships, and celebrate growth through workshops, outdoor activities, and shared experiences that strengthened the ILM Hub community.',
    activities: [
      'Opening ceremony and welcome',
      'Skill workshops and breakout sessions',
      'Team challenges and games',
      'Reflection circles',
      'Closing celebration',
    ],
    outcomes: [
      'Deeper community bonds',
      'Memorable Season 3 milestone',
      'Inspired next-generation camps',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c6a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    ],
  },
]

export type EventItem = {
  id: string
  title: string
  date: string
  time: string
  type: string
  location: string
  description: string
  featured?: boolean
  cover: string
}

export const events: EventItem[] = [
  {
    id: 'opening-ceremony',
    title: 'Opening Ceremony',
    date: 'Start of challenge',
    time: 'Online',
    type: 'Ceremony',
    location: 'Google Meet · ~80 people',
    description:
      'Introduction to the challenge, explanation of the rules, and ice-breaking activities.',
    featured: true,
    cover:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'guest-speakers',
    title: 'Guest Speakers',
    date: 'During the challenge',
    time: 'Online',
    type: 'Talk',
    location: 'Google Meet / Telegram · ~70–80 people',
    description:
      'Guest speaker sessions to inspire and guide challengers throughout the season.',
    cover:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'weekly-meetings',
    title: 'Weekly Meetings',
    date: 'Every week',
    time: 'Online',
    type: 'Meeting',
    location: 'Google Meet · ~70–80 people',
    description:
      'Review the past week, support participants facing difficulties, and recognize the most active challenger of the week.',
    cover:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'closing-ceremony',
    title: 'Closing Ceremony',
    date: 'End of challenge',
    time: 'Online',
    type: 'Ceremony',
    location: 'Google Meet · ~60–80 people',
    description:
      'Overall review of 21-day achievements, recognition of outstanding participants, certificates and awards, and formal closing.',
    cover:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
]

export {
  testimonials,
  weekOneWins,
  getTestimonialsBySeason,
} from './testimonials'
export type { Testimonial } from './testimonials'

