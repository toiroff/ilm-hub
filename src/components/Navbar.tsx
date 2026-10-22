import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './Button'
import { HABIT_ZONE_DOWNLOAD_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'
import type { Locale } from '../i18n/messages'

function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale()
  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {(['en', 'uz'] as Locale[]).map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-line">/</span>}
          <button
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={locale === loc}
            className={`press rounded px-1 font-medium ${locale === loc ? 'text-ink' : 'text-ink-faint hover:text-ink-soft'}`}
          >
            {t(`lang.${loc}`)}
          </button>
        </span>
      ))}
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLocale()

  const links = useMemo(
    () => [
      { to: '/challenges', label: t('nav.challenges') },
      { to: '/habit-zone', label: t('nav.habitZone') },
      { to: '/projects', label: t('nav.projects') },
      { to: '/gallery', label: t('nav.gallery') },
      { to: '/about', label: t('nav.about') },
    ],
    [t],
  )

  const goHome = () => {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Once the page scrolls, the bar lifts into a floating rounded pill (closed menu only)
  const floating = scrolled && !open

  return (
    <header className={`sticky top-0 z-50 h-[72px] ${floating ? 'pt-2' : open ? 'border-b border-line bg-white' : 'bg-white'}`}>
      <div className={floating ? 'container-page' : ''}>
        <nav
          className={`flex items-center justify-between gap-6 transition-[height,padding,box-shadow,border-color] duration-200 ${
            floating
              ? 'h-16 rounded-full border border-line bg-white/90 pr-2.5 pl-5 shadow-[0_10px_30px_-12px_rgba(11,18,32,0.25)] backdrop-blur-md'
              : 'container-page h-[72px] border border-transparent'
          }`}
        >
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault()
              goHome()
            }}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="ILM Hub — home"
          >
            <img src="/assets/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
            <span className="text-lg font-bold tracking-tight">ILM Hub</span>
          </Link>

          <div className="hidden flex-1 items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = location.pathname.startsWith(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-full px-3 py-2 text-[15px] transition-colors ${
                    active ? `text-ink ${floating ? 'bg-tint' : ''}` : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                  {active && !floating && <span className="absolute inset-x-3 -bottom-[17px] h-0.5 bg-accent" />}
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <LanguageSwitch />
            <Button href={HABIT_ZONE_DOWNLOAD_URL} size="sm" className={floating ? '!rounded-full' : ''}>
              {t('nav.join')}
            </Button>
          </div>

          <button
            type="button"
            className="press -mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-tint lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-white lg:hidden">
          <div className="container-page flex flex-col py-4">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                goHome()
              }}
              className="border-b border-line py-4 text-2xl font-semibold tracking-tight"
            >
              {t('nav.home')}
            </Link>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="border-b border-line py-4 text-2xl font-semibold tracking-tight">
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center justify-between">
              <LanguageSwitch />
              <Button href={HABIT_ZONE_DOWNLOAD_URL}>{t('nav.join')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
