import { whatWeDo, impactStats, timeline, weekOneWins } from '../data/content'
import { journeyTimeline } from '../data/team'
import type { Locale } from '../i18n/messages'

const whatWeDoUz = [
  {
    title: 'Challenges',
    description:
      'Talabalarga samarali odatlar yaratishga yordam beruvchi kundalik hisobdorlik challenges.',
    icon: 'target',
    accent: 'teal',
  },
  {
    title: 'Loyihalar',
    description:
      'Oʻrganishni isbotga aylantiradigan haqiqiy hamkorlikdagi loyihalar.',
    icon: 'folder',
    accent: 'indigo',
  },
  {
    title: 'Tadbirlar',
    description:
      'Workshopʼlar, mehmon spikerlar, networking va jamiyat sessiyalari.',
    icon: 'calendar',
    accent: 'gold',
  },
  {
    title: 'Eʼtirof',
    description:
      'Sertifikatlar, nishonlar va yutuqlar — safaringizni belgilaydi.',
    icon: 'award',
    accent: 'orange',
  },
]

const impactStatsUz = [
  { value: 250, suffix: '+', label: 'Qamrab olingan talabalar' },
  { value: 2, suffix: '', label: 'Challenge mavsumlari' },
  { value: 3, suffix: '', label: 'Jamiyat loyihalari' },
  { value: 15, suffix: '+', label: 'Shaharlar' },
]

const timelineUz = [
  {
    title: 'Ochilish marosimi',
    detail:
      'Google Meet · ~80 kishi. Challenge tanishtiruvi, qoidalar va muzlatuvchi mashgʻulotlar.',
  },
  {
    title: 'Mehmon spikerlar',
    detail:
      'Google Meet yoki Telegram · ~70–80 kishi. Mehmon spikerlardan ilhom va yoʻl-yoʻriq.',
  },
  {
    title: 'Haftalik uchrashuvlar',
    detail:
      'Google Meet · ~70–80 kishi. Haftani koʻrib chiqish, qoʻllab-quvvatlash va eng faol ishtirokchini eʼtirof etish.',
  },
  {
    title: 'Yakuniy marosim',
    detail:
      'Google Meet · ~60–80 kishi. 21 kunlik natijalar, sertifikatlar va rasmiy yakun.',
  },
]

const weekOneWinsUz = [
  'Ijtimoiyroq va ishonchliroq boʻldim',
  'Kundalik oʻqish odati qurildi',
  'Muntazam sport qildim',
  'Hozirgi lahza ongini rivojlantirdim',
  'Har kuni yangi narsa oʻrgandim',
  'Vazifalarni oʻtkazib yubormasdan bajardim',
  'Ekran vaqtini sezilarli qisqartirdim',
]

const journeyUz = [
  {
    period: 'Avgust 2024',
    title: 'English Day Camp',
    detail:
      'Birinchi yirik loyihamiz — talabalar uchun ingliz tilida mashq, oʻyinlar va ishonchni oshirish kuni.',
    type: 'project' as const,
  },
  {
    period: 'Yil davomida',
    title: 'Telegram kanal va suhbatlar',
    detail:
      'Telegram kanalimizdagi foydali postlar, munozaralar va suhbatlar — jamiyat doimiy oʻrganadi.',
    type: 'community' as const,
  },
  {
    period: 'May – Iyun 2025',
    title: 'IT Bootcamp',
    detail:
      'Talabalar workshopʼlar va jamoaviy mini-loyihalar orqali raqamli koʻnikmalar qurgan amaliy IT bootcamp.',
    type: 'project' as const,
  },
  {
    period: '6-noyabr, 2025',
    title: 'ILM Hub Camp S3',
    detail:
      'Toʻliq jamiyat lageri — workshopʼlar, doʻstlik va challenge formatidan tashqari bayram.',
    type: 'project' as const,
  },
  {
    period: 'Yanvar 2026',
    title: 'Challenge 1-mavsum',
    detail:
      'Birinchi Intizom Challenge — 40 ishtirokchi, 28 bitiruvchi.',
    type: 'challenge' as const,
  },
  {
    period: 'Fevral – Mart 2026',
    title: 'Challenge 2-mavsum',
    detail:
      '20 sodiq ishtirokchidan iborat tanlovli mavsum — 15 nafari 21 kundan soʻng bitirdi.',
    type: 'challenge' as const,
  },
  {
    period: 'Iyul 2026',
    title: '3-mavsum yaqinlashmoqda',
    detail:
      'ILM Mode Challenge 3-mavsum ochiladi — IELTS, SAT, IT (No-coding) va Biologiya yoʻnalishlari.',
    type: 'upcoming' as const,
  },
]

export function localizedWhatWeDo(locale: Locale) {
  return locale === 'uz' ? whatWeDoUz : whatWeDo
}

export function localizedImpactStats(locale: Locale) {
  return locale === 'uz' ? impactStatsUz : impactStats
}

export function localizedTimeline(locale: Locale) {
  return locale === 'uz' ? timelineUz : timeline
}

export function localizedWeekOneWins(locale: Locale) {
  return locale === 'uz' ? weekOneWinsUz : weekOneWins
}

export function localizedJourney(locale: Locale) {
  return locale === 'uz' ? journeyUz : journeyTimeline
}
