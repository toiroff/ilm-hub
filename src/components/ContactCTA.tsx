import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, MapPin, Send } from 'lucide-react'
import { Reveal } from './Reveal'
import { Button } from './Button'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

export function Contact() {
  const [sent, setSent] = useState(false)
  const { t } = useLocale()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section-pad py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-teal uppercase">
            Contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to join the next season?
          </h2>
          <p className="mt-5 text-white/55 leading-relaxed">
            Questions about Season 3, partnerships, or mentorship? Reach out —
            we&apos;d love to hear from you.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4 text-white/70">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                <Mail className="h-5 w-5" />
              </span>
              hello@ilmhub.community
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              Uzbekistan · Online community
            </div>
          </div>

            <Button href={SEASON3_APPLY_URL} className="mt-10">
              {t('cta.registerSeason3')} <ArrowRight className="h-4 w-4" />
            </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="glass-light rounded-[1.75rem] p-7 sm:p-9"
          >
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-teal">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Message sent
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium tracking-wide text-white/50 uppercase">
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide text-white/50 uppercase">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal/50"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide text-white/50 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal/50"
                    placeholder="How can we help?"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCTA() {
  const { t } = useLocale()
  return (
    <section className="section-pad pb-24 lg:pb-32">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-navy via-indigo/80 to-navy p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-teal/25 blur-[70px]" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Your next 21 days can change everything.
            </h2>
            <p className="mt-4 text-white/70">
              Join Season 3 — build habits, grow with peers across Uzbekistan,
              and graduate with a community of learners.
            </p>
            <Button href={SEASON3_APPLY_URL} variant="gold" className="mt-8">
              {t('cta.registerNext')} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
