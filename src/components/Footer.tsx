import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Globe2 } from 'lucide-react'
import { SEASON3_APPLY_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

export function Footer() {
  const navigate = useNavigate()
  const { t, locale } = useLocale()

  const footerLinks = [
    {
      title: t('footer.explore'),
      items: [
        { label: t('nav.about'), to: '/about' },
        { label: t('nav.challenges'), to: '/challenges' },
        { label: t('nav.projects'), to: '/projects' },
        { label: t('nav.events'), to: '/events' },
      ],
    },
    {
      title: locale === 'uz' ? 'Jamiyat' : 'Community',
      items: [
        {
          label: locale === 'uz' ? 'Fikrlar' : 'Testimonials',
          to: '/#testimonials',
        },
        { label: t('nav.gallery'), to: '/gallery' },
        {
          label: locale === 'uz' ? 'Roʻyxat' : 'Register',
          to: '/register',
        },
      ],
    },
  ]

  const goHome = () => {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,190,188,0.08),transparent_50%)]" />
      <div className="section-pad relative mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                goHome()
              }}
              className="inline-flex items-center gap-3"
            >
              <img
                src="/assets/logo-wordmark.png"
                alt="ILM Hub"
                className="h-12 object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {locale === 'uz'
                ? 'Litsey oʻquvchilari va bitiruvchilarga Oʻzbekiston boʻylab intizom, izchillik va amaliy koʻnikmalar qurishga yordam beruvchi taʼlim tashabbusi.'
                : 'An educational initiative helping high school students and graduates build discipline, consistency, and practical skills across Uzbekistan.'}
            </p>
            <a
              href={SEASON3_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:gap-3"
            >
              {t('footer.joinSeason')} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h4 className="font-display text-sm font-semibold tracking-wide text-white">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-white/50 transition hover:text-teal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold tracking-wide text-white">
              {t('footer.connect')}
            </h4>
            <p className="mt-4 text-sm text-white/50">
              hello@ilmhub.community
            </p>
            <div className="mt-5 flex gap-3">
              {['Instagram', 'LinkedIn', 'YouTube'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-teal/40 hover:text-teal"
                  aria-label={label}
                >
                  <Globe2 className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ILM Hub.{' '}
            {locale === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}
          </p>
          <p>{locale === 'uz' ? 'Oʻrgan. Yarat. Ilhomlantir.' : 'Learn. Build. Inspire.'}</p>
        </div>
      </div>
    </footer>
  )
}
