import { ArrowRight, CheckCircle2, Calendar, AlertCircle } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { SEASON3_APPLY_URL } from '../lib/links'

export function RegisterPage() {
  return (
    <div className="pt-20">
      <section className="section-pad relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,190,188,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(246,199,68,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              Season 3 Application
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              ILM Mode Challenge Season 3
            </h1>
            <p className="mt-5 text-lg text-white/60">
              A 21-day discipline challenge to sharpen focus, build
              self-control, and grow into a stronger version of yourself.
              We&apos;ll place you into groups based on your interests and
              goals.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-white">
                Special tracks
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['IELTS', 'SAT', 'IT (No-coding)', 'Biology'].map((track) => (
                  <span
                    key={track}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-10 space-y-4">
              {[
                'Detailed 21-day tasks for every participant',
                'Daily activity tracked for accountability',
                'Build discipline with community support',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3 text-sm text-white/55">
              <p className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange" />
                Application deadline: July 25
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" />
                Challenge starts: July 27
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-light flex min-h-[360px] flex-col items-center justify-center rounded-[1.75rem] p-8 text-center sm:p-10">
              <img
                src="/assets/logo-icon.png"
                alt=""
                className="h-16 w-16 object-contain"
              />
              <h2 className="mt-6 font-display text-3xl font-bold">
                Apply for Season 3
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/55">
                Complete the official application form to join ILM Mode
                Challenge Season 3.
              </p>
              <Button href={SEASON3_APPLY_URL} variant="gold" className="mt-8">
                Open Application Form <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-6 text-xs text-white/35">
                Questions? Contact @Umar_Toirov
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
