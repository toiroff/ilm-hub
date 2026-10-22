import { Link, useNavigate } from 'react-router-dom'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

type FooterLink = { label: string; to?: string; href?: string }

export function Footer() {
  const navigate = useNavigate()
  const { t, locale } = useLocale()
  const uz = locale === 'uz'

  const columns: { title: string; items: FooterLink[] }[] = [
    {
      title: t('footer.explore'),
      items: [
        { label: t('nav.challenges'), to: '/challenges' },
        { label: t('nav.habitZone'), to: '/habit-zone' },
        { label: t('nav.projects'), to: '/projects' },
        { label: t('nav.gallery'), to: '/gallery' },
      ],
    },
    {
      title: 'ILM Hub',
      items: [
        { label: t('nav.about'), to: '/about' },
        { label: uz ? 'Jamoa' : 'Team', to: '/about#team' },
        { label: uz ? 'Keyingi mavsum' : 'Next season', to: '/register' },
      ],
    },
    {
      title: t('footer.connect'),
      items: [
        { label: t('footer.downloadApp'), href: HABIT_ZONE_DOWNLOAD_URL },
        { label: 'hello@ilmhub.community', href: 'mailto:hello@ilmhub.community' },
      ],
    },
  ]

  const goHome = () => {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)] lg:py-20">
        <div className="col-span-2 md:col-span-1">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault()
              goHome()
            }}
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <img src="/assets/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
            </span>
            <span className="text-lg font-bold tracking-tight">ILM Hub</span>
          </Link>
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/60">
            {uz
              ? 'Litsey oʻquvchilari va bitiruvchilarga Oʻzbekiston boʻylab intizom, izchillik va amaliy koʻnikmalar qurishga yordam beruvchi taʼlim tashabbusi.'
              : 'An educational initiative helping high school students and graduates build discipline, consistency, and practical skills across Uzbekistan.'}
          </p>
        </div>

        {columns.map((col, i) => (
          <div key={col.title + col.items[0].label} className={i === columns.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
            <p className="text-sm font-semibold text-white/40">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className="text-[15px] text-white/75 hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-[15px] break-words text-white/75 hover:text-white"
                      {...(item.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} ILM Hub. {uz ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}
          </p>
          <p>{uz ? 'Oʻrgan. Yarat. Ilhomlantir.' : 'Learn. Build. Inspire.'}</p>
        </div>
      </div>
    </footer>
  )
}
