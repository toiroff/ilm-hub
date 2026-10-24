import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSiteContent } from '../content/ContentContext'
import { useLocale } from '../i18n/locale'

const SITE = 'ILM Hub'
const ORIGIN = 'https://www.ilm-hub.uz'

type Meta = { title: string; description: string }

const pages: Record<string, { en: Meta; uz: Meta }> = {
  '/': {
    en: {
      title: 'ILM Hub — 21-day discipline challenges for students in Uzbekistan',
      description:
        'ILM Hub is a student-led community in Uzbekistan: ILM Mode 21-day discipline challenges, camps and projects, and the free Habit Zone app.',
    },
    uz: {
      title: 'ILM Hub — Oʻzbekistondagi talabalar uchun 21 kunlik intizom challengelari',
      description:
        'ILM Hub — Oʻzbekistondagi talabalar hamjamiyati: ILM Mode 21 kunlik intizom challengelari, lager va loyihalar hamda bepul Habit Zone ilovasi.',
    },
  },
  '/challenges': {
    en: {
      title: 'ILM Mode Challenge — 21 days of daily tasks',
      description:
        'How the ILM Mode 21-day discipline challenge works: tracks (IELTS, SAT, IT, Biology), daily tasks checked by mentors, weekly meetings and a closing ceremony.',
    },
    uz: {
      title: 'ILM Mode Challenge — 21 kunlik kundalik vazifalar',
      description:
        'ILM Mode 21 kunlik intizom challenge qanday ishlaydi: yoʻnalishlar, mentorlar tekshiradigan kundalik vazifalar, haftalik uchrashuvlar va yakuniy marosim.',
    },
  },
  '/habit-zone': {
    en: {
      title: 'Habit Zone — free habit app by ILM Hub',
      description:
        'Habit Zone is ILM Hub’s free Android app: 40 ready-made 21- or 30-day challenges, points, streaks, groups and rankings. No ads.',
    },
    uz: {
      title: 'Habit Zone — ILM Hubning bepul odat ilovasi',
      description:
        'Habit Zone — ILM Hubning bepul Android ilovasi: 40 ta tayyor 21 yoki 30 kunlik dastur, ballar, guruhlar va reytinglar. Reklamasiz.',
    },
  },
  '/projects': {
    en: {
      title: 'Projects — camps and bootcamps',
      description:
        'ILM Hub projects: English Day Camp, IT Bootcamp and ILM HUB Camp S3 — camps and bootcamps for students across Uzbekistan.',
    },
    uz: {
      title: 'Loyihalar — lager va bootcamplar',
      description:
        'ILM Hub loyihalari: English Day Camp, IT Bootcamp va ILM HUB Camp S3 — Oʻzbekiston boʻylab talabalar uchun lager va bootcamplar.',
    },
  },
  '/gallery': {
    en: { title: 'Gallery — photos and videos', description: 'Photos and videos from ILM Hub camps, projects and ceremonies.' },
    uz: { title: 'Galereya — suratlar va videolar', description: 'ILM Hub lagerlari, loyihalari va marosimlaridan suratlar va videolar.' },
  },
  '/about': {
    en: {
      title: 'About ILM Hub — mission, story and team',
      description:
        'Built by students, for students: ILM Hub’s mission, how it grew since July 2024, and the people behind it.',
    },
    uz: {
      title: 'ILM Hub haqida — maqsad, tarix va jamoa',
      description: 'Talabalar tomonidan, talabalar uchun: ILM Hub maqsadi, 2024-yil iyulidan beri qanday oʻsgani va jamoasi.',
    },
  },
  '/register': {
    en: {
      title: 'ILM Mode Season 3 has ended',
      description: 'Season 3 of the ILM Mode challenge is complete. Keep building the habit with the Habit Zone app until the next season.',
    },
    uz: {
      title: 'ILM Mode 3-mavsum yakunlandi',
      description: 'ILM Mode challenge 3-mavsumi yakunlandi. Keyingi mavsumgacha odatni Habit Zone ilovasi bilan davom ettiring.',
    },
  },
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/** Per-route <title> and description so search engines can tell the pages apart. */
export function PageMeta() {
  const { pathname } = useLocation()
  const { content } = useSiteContent()
  const { locale } = useLocale()

  useEffect(() => {
    let meta = pages[pathname]?.[locale]
    const project = pathname.match(/^\/projects\/([^/]+)/)?.[1]
    const season = pathname.match(/^\/seasons\/([^/]+)/)?.[1]
    if (project) {
      const p = content.projects.find((x) => x.id === project)
      if (p) meta = { title: `${p.title} — ${p.date}`, description: p.summary }
    } else if (season) {
      const s = content.seasons.find((x) => x.id === season)
      if (s) meta = { title: `ILM Mode ${s.title}`, description: s.description }
    }
    meta ??= pages['/'][locale]

    document.title = pathname === '/' ? meta.title : `${meta.title} | ${SITE}`
    document.documentElement.lang = locale
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', ORIGIN + pathname)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = ORIGIN + pathname
  }, [pathname, locale, content])

  return null
}
