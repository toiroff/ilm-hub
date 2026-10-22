import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost-inverse'
type Size = 'md' | 'sm' | 'lg'

const styles: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-hover',
  secondary: 'border border-line bg-white text-ink hover:border-ink-faint',
  inverse: 'bg-white text-navy hover:bg-white/90',
  'ghost-inverse': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[15px]',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-7 text-[17px]',
}

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}: Props) {
  const classes = `press inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap ${sizes[size]} ${styles[variant]} ${className}`

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
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
