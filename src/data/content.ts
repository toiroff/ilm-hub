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
    cover: '',
    participants: 20,
    cities: 0,
    graduates: 15,
    completion: 75,
    satisfaction: 95,
    rating: 5,
    description:
      'A focused, selective season for students who truly wanted to become disciplined — 75% of them graduated.',
    story:
      'Season 2 was intentionally selective. We chose participants who were committed to becoming disciplined. Through daily tasks, mentorship, and accountability, 75% of them graduated — proof that intention and consistency create real change in 21 days.',
    highlights: [
      'Carefully selected participants',
      '75% completion rate',
      'Daily mentorship & check-ins',
      '21 days of focused habit building',
    ],
  },
  {
    id: 'season-1',
    number: 1,
    title: 'Season 1 — The Beginning',
    period: 'January 2026',
    cover: '',
    participants: 40,
    cities: 0,
    graduates: 28,
    completion: 70,
    satisfaction: 95,
    rating: 5,
    description:
      'Our first challenge season — 70% of participants graduated as disciplined learners.',
    story:
      'In January 2026, ILM Hub ran its first Discipline Challenge. Students from across Uzbekistan committed to building better habits, and 70% of them graduated — proving that with intention and consistency, real change is possible. From reading and exercise to focus and teamwork, Season 1 set the foundation for everything that followed.',
    highlights: [
      'Our first cohort',
      '70% completion rate',
      'Daily reading, exercise & reflection habits',
      'Mentorship and community support',
    ],
  },
]

export const stats = [
  { value: 250, suffix: '+', label: 'Students Across Uzbekistan' },
  { value: 3, suffix: '', label: 'Challenge Seasons' },
  { value: 3, suffix: '', label: 'Major Projects' },
  { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
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
    cover: '',
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
  /** Guest speakers shown on the project page */
  speakers?: Speaker[]
}

export type Speaker = {
  name: string
  role: string
  photo?: string
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
      'A May 2025 bootcamp where people working in IT introduced students to AI, Python and frontend development.',
    description:
      'An IT Bootcamp with three speakers from the industry. After the session, every participant received a roadmap and daily tasks to keep learning Frontend and Backend.',
    cover: '',
    season: 'Spring 2025',
    date: 'May 2025',
    location: 'Hybrid',
    participants: 120,
    category: 'Bootcamp',
    featured: true,
    highlights: [
      'Talks from three IT professionals',
      'AI, Python and Frontend development',
      'A learning roadmap for every participant',
    ],
    overview:
      'IT Bootcamp took place in May 2025. Three speakers working in IT — Elzodxon Sharofaddinov (founder of AISHA AI), Asadbek Rahimov (AI engineer, Python) and Farrux Adxamov (frontend developer) — shared how they learned and how they work. After the session, participants received a roadmap and daily tasks to learn Frontend and Backend on their own.',
    activities: [
      'Speaker sessions on AI, Python and Frontend',
      'A roadmap for Frontend and Backend',
      'Daily learning tasks after the bootcamp',
    ],
    outcomes: [
      'A clear Frontend and Backend roadmap',
      'Daily tasks to keep learning',
      'Direct advice from working IT professionals',
    ],
    speakers: [
      { name: 'Elzodxon Sharofaddinov', role: 'Founder of AISHA AI', photo: '/assets/projects/it-bootcamp/speaker-elzodxon-sharofaddinov.png' },
      { name: 'Asadbek Rahimov', role: 'AI Engineer & Python · 6+ years of experience', photo: '/assets/projects/it-bootcamp/speaker-asadbek-rahimov.png' },
      { name: 'Farrux Adxamov', role: 'Frontend Developer · 3+ years of experience', photo: '/assets/projects/it-bootcamp/speaker-farrux-adxamov.png' },
    ],
    gallery: [],
  },
  {
    id: 'ilm-hub-camp-s3',
    title: 'ILM HUB Camp S3',
    summary:
      'A college admissions camp in Fergana — study abroad sessions, grant advice and real stories from people who did it.',
    description:
      'ILM HUB Camp S3 helped students figure out what to do after school: how to study in Europe and the USA, how to win grants, and what to learn next — from people who have done it.',
    cover: '/assets/projects/ilm-hub-camp-s3/cover.jpg',
    backgroundVideo: '/assets/projects/ilm-hub-camp-s3/camp-s3.mp4',
    season: 'College admissions',
    date: 'November 2025',
    location: 'In-person',
    participants: 150,
    category: 'Camp',
    featured: true,
    highlights: [
      'Study in Europe and USA sessions',
      'Foreign grants and El-yurt umidi, fully explained',
      'Opportunities for girls in IT',
    ],
    overview:
      'ILM HUB Camp S3 (Fergana, November 2025) was about college admissions and the next step after school. Students learned from people who have studied abroad: Saidamir Egamberdiev — FLEX’23, Clarkson University student and founder of educateduz.com — and Gulnoza Xamidova, a University of Aberdeen graduate and winner of Fulbright TEA, ITEC and EYUF. Between sessions there was networking, games, a pizza party and a coffee break, and every participant received a certificate.',
    activities: [
      'Study in Europe and USA sessions',
      'Everything about foreign grants and El-yurt umidi',
      'Opportunities for girls in IT',
      'Networking and games',
      'Pizza party and coffee break',
      'Certificates for every participant',
    ],
    outcomes: [
      'A clear picture of studying in Europe and the USA',
      'Knowing which grants and scholarships to apply for',
      'Practical admission tips from people who got in',
    ],
    speakers: [
      {
        name: 'Saidamir Egamberdiev',
        role: 'FLEX’23 · Clarkson University student · founder of educateduz.com, mentor to many students studying abroad',
        photo: '/assets/projects/ilm-hub-camp-s3/speaker-saidamir-egamberdiev.jpg',
      },
      {
        name: 'Gulnoza Xamidova',
        role: 'University of Aberdeen graduate (UK) · winner of Fulbright TEA, ITEC and EYUF',
        photo: '/assets/projects/ilm-hub-camp-s3/speaker-gulnoza-xamidova.jpg',
      },
    ],
    gallery: [
      '/assets/projects/ilm-hub-camp-s3/photo-1.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-2.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-3.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-4.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-5.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-6.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-7.jpg',
      '/assets/projects/ilm-hub-camp-s3/photo-8.jpg',
    ],
  },
]

export {
  testimonials,
  weekOneWins,
  getTestimonialsBySeason,
} from './testimonials'
export type { Testimonial } from './testimonials'

