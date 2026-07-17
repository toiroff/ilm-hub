import { Hero } from '../components/Hero'
import { Stats, About } from '../components/AboutStats'
import { Impact } from '../components/Impact'
import { WhatWeDo } from '../components/WhatWeDo'
import {
  FeaturedChallenge,
  PreviousSeasons,
} from '../components/ChallengeSeasons'
import {
  Timeline,
  Gallery,
  Testimonials,
} from '../components/TimelineGallery'
import { Contact, FinalCTA } from '../components/ContactCTA'

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Impact />
      <WhatWeDo />
      <FeaturedChallenge />
      <PreviousSeasons />
      <Timeline />
      <Gallery />
      <Testimonials />
      <Contact />
      <FinalCTA />
    </>
  )
}
