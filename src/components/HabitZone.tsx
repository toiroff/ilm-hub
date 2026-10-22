import { ArrowRight, Download } from 'lucide-react'
import { Button } from './Button'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

/** A real Habit Zone screenshot (780×1688, no status bar) in a plain phone frame. */
export function Phone({ screen, alt, className = '' }: { screen: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[34px] bg-ink p-[7px] shadow-[0_24px_60px_-20px_rgba(11,18,32,0.35)] ${className}`}>
      <div className="relative overflow-hidden rounded-[28px] bg-white pt-7">
        <span className="absolute top-2 left-1/2 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        <img
          src={`/assets/habit-zone/${screen}.png`}
          alt={alt}
          width={390}
          height={844}
          loading="lazy"
          className="block aspect-[390/844] w-full"
        />
      </div>
    </div>
  )
}

export function HabitZoneSection() {
  const { t } = useLocale()
  const steps = [t('hz.step1'), t('hz.step2'), t('hz.step3')]

  return (
    <section id="habit-zone" className="scroll-mt-20 bg-white">
      <div className="container-page grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4">
            <img src="/assets/habit-zone/app-icon.png" alt="" className="h-14 w-14 rounded-2xl" />
            <div>
              <p className="text-xl font-bold tracking-tight">Habit Zone</p>
              <p className="text-[15px] text-ink-soft">{t('hz.byline')}</p>
            </div>
          </div>
          <h2 className="h-section mt-8">
            {t('hz.title')} <span className="text-blue">{t('hz.titleAccent')}</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-xl leading-relaxed text-ink-soft">{t('hz.body')}</p>

          <ol className="mt-10 space-y-5">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-base font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-lg leading-snug font-medium text-ink">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-11 flex flex-wrap gap-3">
            <Button href={HABIT_ZONE_DOWNLOAD_URL} size="lg">
              <Download className="h-5 w-5" /> {t('cta.download')}
            </Button>
            <Button to="/habit-zone" variant="secondary" size="lg">
              {t('cta.learnApp')} <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 items-start gap-5 rounded-2xl bg-tint px-6 pt-10 pb-6 sm:gap-8 sm:px-12 sm:pt-14">
            <Phone screen="home" alt={t('hz.shot.home')} />
            <Phone screen="group-today" alt={t('hz.shot.group')} className="mt-12 sm:mt-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
