import { Hero } from '../components/Hero'
import {
  WhatWeDo,
  Challenge,
  Seasons,
  FeaturedProject,
  Voices,
  Team,
  Faq,
  ClosingCta,
} from '../components/HomeSections'
import { HabitZoneSection } from '../components/HabitZone'

export function HomePage() {
  return (
    <>
      <Hero />
      <Challenge />
      <Voices />
      <WhatWeDo />
      <Seasons />
      <FeaturedProject />
      <HabitZoneSection />
      <Team />
      <Faq />
      <ClosingCta />
    </>
  )
}
