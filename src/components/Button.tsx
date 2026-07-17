import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'

const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-indigo to-teal text-white shadow-lg shadow-indigo/25 hover:shadow-teal/30 hover:scale-[1.02]',
  secondary:
    'border border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40',
  ghost: 'text-white/80 hover:text-white',
  gold: 'bg-gold text-navy-deep font-semibold hover:bg-gold-soft hover:scale-[1.02] shadow-lg shadow-gold/20',
}

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${styles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
