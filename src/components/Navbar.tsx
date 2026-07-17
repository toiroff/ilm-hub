import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { SEASON3_APPLY_URL } from '../lib/links'

const links = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/events', label: 'Events' },
  { to: '/#contact', label: 'Contact', hash: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
      }
    }
  }, [location])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-navy/85 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between lg:h-20">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault()
            goHome()
          }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/assets/logo-icon.png"
            alt="ILM Hub"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-10 lg:w-10"
          />
          <span className="font-display text-lg font-bold tracking-tight text-white lg:text-xl">
            ILM <span className="text-teal">HUB</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={(e) => {
                if (link.to === '/') {
                  e.preventDefault()
                  goHome()
                }
              }}
              className={({ isActive }) => {
                const homeActive =
                  link.to === '/' &&
                  location.pathname === '/' &&
                  !location.hash
                const hashActive =
                  link.hash &&
                  location.pathname === '/' &&
                  location.hash === `#${link.hash}`
                const routeActive =
                  link.to !== '/' &&
                  !link.hash &&
                  isActive &&
                  location.pathname.startsWith(link.to)

                const active = homeActive || hashActive || routeActive

                return `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-white/65 hover:text-white'
                }`
              }}
            >
              {({ isActive }) => {
                const homeActive =
                  link.to === '/' &&
                  location.pathname === '/' &&
                  !location.hash
                const hashActive =
                  link.hash &&
                  location.pathname === '/' &&
                  location.hash === `#${link.hash}`
                const routeActive =
                  link.to !== '/' &&
                  !link.hash &&
                  isActive &&
                  location.pathname.startsWith(link.to)
                const active = homeActive || hashActive || routeActive

                return (
                  <>
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-indigo"
                      />
                    )}
                  </>
                )
              }}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={SEASON3_APPLY_URL} className="!py-2.5 !px-5 text-sm">
            Join Next Season <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <div className="section-pad flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => {
                    if (link.to === '/') {
                      e.preventDefault()
                      goHome()
                    }
                  }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={SEASON3_APPLY_URL} className="mt-3 w-full">
                Join Next Season <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
