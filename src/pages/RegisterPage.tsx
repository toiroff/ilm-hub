import { ArrowRight, Check, Download } from 'lucide-react'
import { Button } from '../components/Button'
import { PageHeader, DetailRow } from '../components/PageHeader'
import { TRACKS } from '../lib/tracks'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

const copy = {
  en: {
    eyebrow: 'ILM Mode Challenge',
    title: 'Season 3',
    titleAccent: 'has ended',
    subtitle:
      'Thank you to everyone who took part. Applications for the next season are not open yet — we will announce it on our channels. Until then, keep building the habit with Habit Zone.',
    seasons: 'See past seasons',
    tracks: 'Tracks',
    includedLabel: 'Every season includes',
    included: [
      'Detailed 21-day tasks for every participant',
      'Daily activity tracked for accountability',
      'Weekly meetings and guest speakers',
      'Certificate at the closing ceremony',
    ],
    asideEyebrow: 'Between seasons',
    asideTitle: 'Keep your streak going',
    asideBody: 'Run your own 21-day challenge in Habit Zone — alone, with friends or with your class.',
    contact: 'Questions? Contact @Umar_Toirov',
  },
  uz: {
    eyebrow: 'ILM Mode Challenge',
    title: '3-mavsum',
    titleAccent: 'yakunlandi',
    subtitle:
      'Qatnashgan barchaga rahmat. Keyingi mavsumga arizalar hali ochilmagan — uni kanallarimizda eʼlon qilamiz. Ungacha odatni Habit Zone bilan davom ettiring.',
    seasons: 'Oʻtgan mavsumlar',
    tracks: 'Yoʻnalishlar',
    includedLabel: 'Har bir mavsumda',
    included: [
      'Har bir ishtirokchi uchun 21 kunlik batafsil vazifalar',
      'Hisobdorlik uchun kunlik faollik nazorati',
      'Haftalik uchrashuvlar va mehmon spikerlar',
      'Yakuniy marosimda sertifikat',
    ],
    asideEyebrow: 'Mavsumlar orasida',
    asideTitle: 'Ketma-ket kunlaringizni saqlang',
    asideBody: 'Habit Zoneʼda oʻz 21 kunlik challengeʼingizni boshlang — yolgʻiz, doʻstlar yoki sinfingiz bilan.',
    contact: 'Savollar boʻlsa: @Umar_Toirov',
  },
}

export function RegisterPage() {
  const { locale, t } = useLocale()
  const c = copy[locale]

  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title} <span className="text-blue">{c.titleAccent}</span>
          </>
        }
        subtitle={c.subtitle}
        image={{ src: '/assets/who-we-are.png', alt: 'Season graduates holding their certificates' }}
      >
        <Button to="/habit-zone" size="lg">
          {t('cta.getApp')} <ArrowRight className="h-5 w-5" />
        </Button>
        <Button to="/challenges" variant="secondary" size="lg">
          {c.seasons}
        </Button>
      </PageHeader>

      <section className="bg-tint">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
          <div className="rounded-2xl bg-white px-7 sm:px-10 lg:col-span-8">
            <DetailRow label={c.tracks}>
              <ul className="flex flex-wrap gap-2">
                {TRACKS.map((track) => (
                  <li key={track} className="rounded-lg bg-tint px-3 py-1.5 font-medium text-ink">
                    {track}
                  </li>
                ))}
              </ul>
            </DetailRow>
            <DetailRow label={c.includedLabel}>
              <ul className="space-y-3">
                {c.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailRow>
          </div>

          <aside className="h-fit rounded-2xl bg-navy p-8 text-white lg:sticky lg:top-28 lg:col-span-4">
            <p className="flex items-center gap-2.5 text-sm font-semibold text-white/60">
              <img src="/assets/habit-zone/app-icon.png" alt="" className="h-7 w-7 rounded-lg" />
              {c.asideEyebrow}
            </p>
            <h2 className="mt-4 text-[28px] leading-tight font-bold tracking-tight">{c.asideTitle}</h2>
            <p className="mt-3 leading-relaxed text-white/70">{c.asideBody}</p>
            <Button href={HABIT_ZONE_DOWNLOAD_URL} variant="inverse" className="mt-8 w-full">
              <Download className="h-4 w-4" /> {t('cta.download')}
            </Button>
            <p className="mt-6 text-sm text-white/60">{c.contact}</p>
          </aside>
        </div>
      </section>
    </>
  )
}
