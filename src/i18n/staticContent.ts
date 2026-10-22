import { weekOneWins } from '../data/content'
import { journeyTimeline } from '../data/team'
import type { Locale } from '../i18n/messages'

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
    period: 'May 2025',
    title: 'IT Bootcamp',
    detail:
      'Sunʼiy intellekt, Python va Frontend boʻyicha uchta IT spikeri — soʻng Frontend va Backendni oʻrganish uchun yoʻl xaritasi va kundalik vazifalar.',
    type: 'project' as const,
  },
  {
    period: '6-noyabr, 2025',
    title: 'ILM Hub Camp S3',
    detail:
      'Fargʻonada universitetga kirish lageri — chet elda oʻqish sessiyalari, grantlar boʻyicha maslahat, networking va sertifikatlar.',
    type: 'project' as const,
  },
  {
    period: 'Yanvar 2026',
    title: 'Challenge 1-mavsum',
    detail:
      'Birinchi Intizom Challenge — ishtirokchilarning 70% bitirdi.',
    type: 'challenge' as const,
  },
  {
    period: 'Fevral – Mart 2026',
    title: 'Challenge 2-mavsum',
    detail:
      'Sodiq ishtirokchilardan iborat tanlovli mavsum — 75% 21 kundan soʻng bitirdi.',
    type: 'challenge' as const,
  },
  {
    period: 'Iyul 2026',
    title: 'Challenge 3-mavsum',
    detail:
      'Uchinchi ILM Mode mavsumi — IELTS, SAT, IT (No-coding) va Biologiya yoʻnalishlari.',
    type: 'challenge' as const,
  },
  {
    period: 'Kuz 2026',
    title: 'Habit Zone ilovasi',
    detail:
      'Android uchun oʻz odat ilovamiz — 40 ta tayyor dastur, ballar, ketma-ket kunlar, guruhlar va reytinglar. Bepul va reklamasiz.',
    type: 'latest' as const,
  },
]

export function localizedWeekOneWins(locale: Locale) {
  return locale === 'uz' ? weekOneWinsUz : weekOneWins
}

export function localizedJourney(locale: Locale) {
  return locale === 'uz' ? journeyUz : journeyTimeline
}
