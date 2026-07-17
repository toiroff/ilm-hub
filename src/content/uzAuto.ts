import type { Project, Season, Challenge, EventItem } from '../data/content'
import type { TeamMember } from '../data/team'
import type { Testimonial } from '../data/testimonials'
import type { SiteContent, SiteStat, ChallengeWeek, GalleryItem } from './types'
import { defaultSiteContentUz } from './defaults'

/** Keep live media from English CMS; overlay Uzbek text from catalog / defaults. */
export function buildAutoUzbek(en: SiteContent): SiteContent {
  const catalog = defaultSiteContentUz

  return {
    hero: {
      ...catalog.hero,
      backgroundImage: en.hero.backgroundImage || catalog.hero.backgroundImage,
      backgroundVideo: en.hero.backgroundVideo || catalog.hero.backgroundVideo,
    },
    about: { ...catalog.about },
    whoWeAre: {
      ...catalog.whoWeAre,
      photoTop: en.whoWeAre.photoTop || catalog.whoWeAre.photoTop,
      photoBottom: en.whoWeAre.photoBottom || catalog.whoWeAre.photoBottom,
      badgeValue: en.whoWeAre.badgeValue || catalog.whoWeAre.badgeValue,
    },
    teamLeads: en.teamLeads.map((m, i) => localizeTeam(m, catalog.teamLeads[i])),
    teamMembers: en.teamMembers.map((m, i) =>
      localizeTeam(m, catalog.teamMembers[i]),
    ),
    projects: en.projects.map((p) =>
      localizeProject(p, catalog.projects.find((x) => x.id === p.id)),
    ),
    stats: en.stats.map((s, i) => localizeStat(s, catalog.stats[i])),
    testimonials: en.testimonials.map((t, i) =>
      localizeTestimonial(
        t,
        catalog.testimonials.find(
          (x) => x.name === t.name && x.seasonId === t.seasonId,
        ) ?? catalog.testimonials[i],
      ),
    ),
    events: en.events.map((e) =>
      localizeEvent(e, catalog.events.find((x) => x.id === e.id)),
    ),
    challenges: en.challenges.map((c) =>
      localizeChallenge(c, catalog.challenges.find((x) => x.id === c.id)),
    ),
    challengeWeeks: en.challengeWeeks.map((w, i) =>
      localizeWeek(w, catalog.challengeWeeks[i]),
    ),
    seasons: en.seasons.map((s) =>
      localizeSeason(s, catalog.seasons.find((x) => x.id === s.id)),
    ),
    gallery: en.gallery.map((g, i) => localizeGallery(g, catalog.gallery[i])),
  }
}

function localizeTeam(en: TeamMember, uz?: TeamMember): TeamMember {
  if (!uz) {
    return {
      ...en,
      role: translateRole(en.role),
      bio: en.bio ? undefined : en.bio,
    }
  }
  return {
    ...en,
    role: uz.role,
    bio: uz.bio ?? en.bio,
    photo: en.photo || uz.photo,
  }
}

function translateRole(role: string): string {
  const map: Record<string, string> = {
    'Founder & CEO': 'Asoschi va CEO',
    'Project Manager': 'Loyiha menejeri',
    'Organizer & Mentor': 'Tashkilotchi va mentor',
    Organizer: 'Tashkilotchi',
    Finance: 'Moliya',
  }
  return map[role] ?? role
}

function localizeProject(en: Project, uz?: Project): Project {
  if (!uz) {
    return {
      ...en,
      category: translateCategory(en.category),
      location: translateLocation(en.location),
      season: translateSeasonLabel(en.season),
    }
  }
  return {
    ...uz,
    id: en.id,
    cover: en.cover,
    gallery: en.gallery?.length ? en.gallery : uz.gallery,
    backgroundVideo: en.backgroundVideo ?? uz.backgroundVideo,
    participants: en.participants,
    featured: en.featured,
    schedule: en.schedule ?? uz.schedule,
    scheduleImage: en.scheduleImage ?? uz.scheduleImage,
  }
}

function translateCategory(c: string): string {
  const map: Record<string, string> = {
    Camp: 'Lager',
    Bootcamp: 'Bootcamp',
  }
  return map[c] ?? c
}

function translateLocation(l: string): string {
  const map: Record<string, string> = {
    'In-person': 'Offline',
    Hybrid: 'Gibrid',
    Online: 'Online',
  }
  return map[l] ?? l
}

function translateSeasonLabel(s: string): string {
  const map: Record<string, string> = {
    'First project': 'Birinchi loyiha',
    'Season 1': '1-mavsum',
    'Season 2': '2-mavsum',
    'Season 3': '3-mavsum',
  }
  return map[s] ?? s
}

function localizeStat(en: SiteStat, uz?: SiteStat): SiteStat {
  return {
    ...en,
    label: uz?.label ?? en.label,
  }
}

function localizeTestimonial(en: Testimonial, uz?: Testimonial): Testimonial {
  if (!uz) {
    return {
      ...en,
      role: en.role
        .replace('Season 1 Graduate', '1-mavsum bitiruvchisi')
        .replace('Season 2 Graduate', '2-mavsum bitiruvchisi')
        .replace('Season 2 Participant', '2-mavsum ishtirokchisi')
        .replace('21-Day Discipline Challenge', '21 kunlik intizom challenge'),
    }
  }
  return {
    ...en,
    role: uz.role,
    quote: uz.quote,
  }
}

function localizeEvent(en: EventItem, uz?: EventItem): EventItem {
  if (!uz) return { ...en, type: translateEventType(en.type) }
  return {
    ...uz,
    id: en.id,
    cover: en.cover,
    featured: en.featured,
  }
}

function translateEventType(t: string): string {
  const map: Record<string, string> = {
    Ceremony: 'Marosim',
    Talk: 'Suhbat',
    Meeting: 'Uchrashuv',
  }
  return map[t] ?? t
}

function localizeChallenge(en: Challenge, uz?: Challenge): Challenge {
  if (!uz) return en
  return {
    ...uz,
    id: en.id,
    cover: en.cover,
    featured: en.featured,
  }
}

function localizeWeek(en: ChallengeWeek, uz?: ChallengeWeek): ChallengeWeek {
  if (!uz) return en
  return { ...uz }
}

function localizeSeason(en: Season, uz?: Season): Season {
  if (!uz) {
    return {
      ...en,
      title: en.title
        .replace('Season 2', '2-mavsum')
        .replace('Season 1 — The Beginning', '1-mavsum — Boshlanish')
        .replace('Season 1', '1-mavsum'),
    }
  }
  return {
    ...uz,
    id: en.id,
    cover: en.cover,
    number: en.number,
    participants: en.participants,
    cities: en.cities,
    graduates: en.graduates,
    completion: en.completion,
    satisfaction: en.satisfaction,
    rating: en.rating,
  }
}

function localizeGallery(en: GalleryItem, uz?: GalleryItem): GalleryItem {
  return {
    ...en,
    label: uz?.label ?? en.label,
  }
}

/** True when UZ bundle is still basically English (not hand-translated). */
export function uzNeedsAutoTranslate(uz: SiteContent, en: SiteContent): boolean {
  return (
    uz.hero.line1 === en.hero.line1 ||
    uz.hero.subtitle === en.hero.subtitle ||
    uz.about.headline === en.about.headline
  )
}
